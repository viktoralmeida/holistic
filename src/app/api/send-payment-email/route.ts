import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createPaymentSuccessUserEmailHtml, createPaymentSuccessAdminEmailHtml } from '@/components/payment-email-templates';
import { stripe } from '@/lib/stripe';
import type Stripe from 'stripe';

// Extend global type to include our custom property
declare global {
  var emailSentSessions: Set<string> | undefined;
}

// Initialize Resend (only when needed)
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set. Please add it to your .env.local file');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

// Payment email API - called from checkout success page
// Includes deduplication to prevent duplicate emails
export async function POST(request: NextRequest) {
  console.log('📧 Payment email API called');
  console.log('📧 Environment check:', {
    RESEND_API_KEY: process.env.RESEND_API_KEY ? 'SET' : 'NOT SET',
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || 'NOT SET',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'NOT SET',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'NOT SET'
  });
  
  try {
    const body = await request.json();
    console.log('📧 Request body received:', JSON.stringify(body, null, 2));
    
    // Check for duplicate email sending
    const { sessionId: requestSessionId } = body;
    if (requestSessionId) {
      // Simple in-memory deduplication (for development)
      // In production, you might want to use a database or Redis
      const emailSentKey = `email_sent_${requestSessionId}`;
      if (global.emailSentSessions?.has(emailSentKey)) {
        console.log('📧 Emails already sent for this session, skipping to prevent duplicates');
        return NextResponse.json({ message: 'Emails already sent' }, { status: 200 });
      }
      
      // Mark as sent
      if (!global.emailSentSessions) {
        global.emailSentSessions = new Set();
      }
      global.emailSentSessions.add(emailSentKey);
    }
    
    const { 
      customerName, 
      customerEmail, 
      orderItems, 
      totalAmount, 
      orderId,
      sessionId
    } = body;

    let finalCustomerName = customerName;
    let finalCustomerEmail = customerEmail;
    let finalOrderItems = orderItems;
    let finalTotalAmount = totalAmount;
    let finalOrderId = orderId;
    let invoiceUrl = null;

    // If sessionId is provided but we don't have order details from webhook, retrieve from Stripe
    if (sessionId && (!orderItems || !totalAmount)) {
      console.log('📧 Retrieving order details from Stripe session:', sessionId);
      
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ['line_items.data.price.product']
        });

        if (!session) {
          return NextResponse.json(
            { error: 'Stripe session not found' },
            { status: 404 }
          );
        }

        // Only override if we don't have webhook data
        if (!finalCustomerEmail) {
          finalCustomerEmail = session.customer_email || session.customer_details?.email;
        }
        if (!finalCustomerName || finalCustomerName === 'Klient') {
          finalCustomerName = session.customer_details?.name || 'Klient';
        }
        finalOrderId = sessionId;

        if (!finalOrderItems && session.line_items?.data) {
          finalOrderItems = session.line_items.data.map((item: Stripe.LineItem) => {
            // Handle different product types (string ID, Product object, or DeletedProduct)
            let productName = 'Product';
            if (item.price?.product && typeof item.price.product === 'object' && 'name' in item.price.product) {
              productName = item.price.product.name || 'Product';
            }
            
            return {
              name: productName,
              quantity: item.quantity || 1,
              price: (item.price?.unit_amount || 0) / 100
            };
          });

          finalTotalAmount = finalOrderItems.reduce((sum: number, item: { price: number; quantity: number }) => 
            sum + (item.price * item.quantity), 0
          );
        }

        // Create custom receipt URL (more reliable than Stripe invoices)
        invoiceUrl = `${process.env.NEXT_PUBLIC_APP_URL}/receipt/${sessionId}`;
        console.log('📧 Custom receipt URL created:', invoiceUrl);

        console.log('📧 Retrieved order details from Stripe:', {
          customerEmail: finalCustomerEmail,
          customerName: finalCustomerName,
          orderItems: finalOrderItems,
          totalAmount: finalTotalAmount,
          orderId: finalOrderId
        });
      } catch (stripeError) {
        console.error('❌ Error retrieving Stripe session:', stripeError);
        return NextResponse.json(
          { error: 'Failed to retrieve order details from Stripe' },
          { status: 500 }
        );
      }
    } else if (sessionId) {
      // We have webhook data, just create the receipt URL
      invoiceUrl = `${process.env.NEXT_PUBLIC_APP_URL}/receipt/${sessionId}`;
      console.log('📧 Using webhook data, created receipt URL:', invoiceUrl);
    }

    // Validate required fields
    console.log('📧 Validating required fields...');
    if (!finalCustomerEmail || !finalOrderItems || !finalTotalAmount || !finalOrderId) {
      console.log('❌ Missing required fields:', {
        customerEmail: !!finalCustomerEmail,
        orderItems: !!finalOrderItems,
        totalAmount: !!finalTotalAmount,
        orderId: !!finalOrderId
      });
      return NextResponse.json(
        { error: 'Wymagane pola: customerEmail, orderItems, totalAmount, orderId' },
        { status: 400 }
      );
    }
    console.log('✅ All required fields present');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(finalCustomerEmail)) {
      return NextResponse.json(
        { error: 'Nieprawidłowy format email' },
        { status: 400 }
      );
    }

    // Send confirmation email to customer
    console.log('📧 Creating customer email...');
    const userEmailHtml = createPaymentSuccessUserEmailHtml({
      customerName: finalCustomerName || 'Klient',
      orderItems: finalOrderItems,
      totalAmount: finalTotalAmount,
      orderId: finalOrderId,
      invoiceUrl: invoiceUrl
    });

    console.log('📧 Sending customer email to:', finalCustomerEmail);
    console.log('📧 Email from address:', process.env.RESEND_FROM_EMAIL || 'Holistic Point <onboarding@resend.dev>');
    
    const userEmailResult = await getResendClient().emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Holistic Point <onboarding@resend.dev>',
      to: [finalCustomerEmail],
      subject: `Płatność zakończona pomyślnie - Zamówienie #${finalOrderId}`,
      html: userEmailHtml,
    });

    console.log('📧 Customer email result:', userEmailResult);

    if (userEmailResult.error) {
      console.error('❌ User payment email error:', userEmailResult.error);
      return NextResponse.json(
        { error: 'Wystąpił błąd podczas wysyłania email do klienta' },
        { status: 500 }
      );
    }
    console.log('✅ Customer email sent successfully');

    // Add delay to avoid rate limiting (Resend allows 2 requests per second)
    console.log('📧 Waiting 1 second to avoid rate limiting...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Send notification email to admin
    console.log('📧 Creating admin email...');
    const adminEmailHtml = createPaymentSuccessAdminEmailHtml({
      customerEmail: finalCustomerEmail,
      totalAmount: finalTotalAmount,
      orderId: finalOrderId,
      invoiceUrl: invoiceUrl
    });

    console.log('📧 Sending admin email to:', process.env.ADMIN_EMAIL || 'admin@holisticpoint.pl');
    const adminEmailResult = await getResendClient().emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Holistic Point <onboarding@resend.dev>',
      to: [process.env.ADMIN_EMAIL || 'admin@holisticpoint.pl'],
      subject: `Nowe zamówienie #${finalOrderId} - ${formatCurrency(finalTotalAmount)}`,
      html: adminEmailHtml,
    });

    console.log('📧 Admin email result:', adminEmailResult);

    if (adminEmailResult.error) {
      console.error('❌ Admin payment email error:', adminEmailResult.error);
      // Don't fail the request if admin email fails, just log it
    } else {
      console.log('✅ Admin email sent successfully');
    }

    console.log('✅ All payment emails processed successfully');
    return NextResponse.json(
      { 
        success: true, 
        message: 'Emaile o płatności zostały wysłane pomyślnie',
        data: userEmailResult.data 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Payment email API error:', error);
    console.error('❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera' },
      { status: 500 }
    );
  }
}

// Helper function for currency formatting
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN'
  }).format(amount);
}