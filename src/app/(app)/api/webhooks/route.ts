import type {Stripe} from "stripe";
import {getPayload} from "payload";
import config from "@payload-config";
import { NextResponse } from "next/server";
import { Resend } from 'resend';
import { createPaymentSuccessUserEmailHtml, createPaymentSuccessAdminEmailHtml } from '@/components/payment-email-templates';

import {stripe} from "@/lib/stripe";
import { ExpandedLineItem } from "@/modules/checkout/type";

// Initialize Resend (only when needed)
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

// Helper function for currency formatting
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  }).format(amount);
}

export async function POST(req: Request){
      console.log("🔥 Webhook was hit by Stripe");
      console.log("🔥 Request headers:", Object.fromEntries(req.headers.entries()));
      console.log("🔥 Request method:", req.method);
      console.log("🔥 Request URL:", req.url);

 
    let event: Stripe.Event;

    try{
        event = stripe.webhooks.constructEvent(
            await(await req.blob()).text(),
            req.headers.get("stripe-signature") as string,
            process.env.STRIPE_WEBHOOK_SECRET as string,
        );
    } catch(error){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";

        if(error! instanceof Error){
            console.log(error);
        }

        console.log(` Error message: ${errorMessage}`);
        return NextResponse.json(
            {message: `Webhook Error:${errorMessage}`},
            {status: 400}
        )
    }


    console.log("✅ Webhook event constructed successfully", event.id);
    console.log("📋 Event type:", event.type);
    console.log("📋 Event data:", JSON.stringify(event.data, null, 2));

    const permittedEvents: string[] = [
        "checkout.session.completed",
    ];

    const payload = await getPayload({config});

    // Check if this event has already been processed to prevent duplicates
    const existingEvent = await payload.find({
        collection: "orders",
        where: {
            stripeCheckoutSessionId: {
                equals: `processed_${event.id}`
            }
        }
    });

    if (existingEvent.docs.length > 0) {
        console.log("🔄 Event already processed, skipping to prevent duplicates:", event.id);
        return NextResponse.json({message: "Event already processed"}, {status: 200});
    }

    if(permittedEvents.includes(event.type)){
        console.log("✅ Event type is permitted, processing...");
        let data;

        try{
            switch(event.type){
                case "checkout.session.completed":
                    console.log("💳 Processing checkout.session.completed event");
                    data = event.data.object as Stripe.Checkout.Session;
                    console.log("💳 Checkout session data:", JSON.stringify(data, null, 2));

                    if(!data.metadata?.userId && !data.metadata?.guestEmail){
                        throw new Error("User ID or guest email is required");
                    }

                    // For authenticated users, find the user
                    let user = null;
                    if(data.metadata?.userId){
                        user = await payload.findByID({
                            collection:"users",
                            id:data.metadata.userId,
                        });
                    }

                    if(!user && !data.metadata?.guestEmail){
                        throw new Error("User not found");
                    }

                    const expandedSession = await stripe.checkout.sessions.retrieve(
                        data.id,
                        {
                            expand:["line_items.data.price.product"],
                        },

                    );

                    if(
                        !expandedSession.line_items?.data ||
                        !expandedSession.line_items?.data.length
                    ){
                        throw new Error("No line items found");
                    }

                    const lineItems = expandedSession.line_items.data as ExpandedLineItem[];

                    for(const item of lineItems){
                        // Only create order if we have a valid product ID
                        const productId = typeof item.price.product === 'object' && 'metadata' in item.price.product ? item.price.product.metadata.id : null;
                        
                        if (productId) {
                            await payload.create({
                                collection: "orders",
                                data:{
                                    stripeCheckoutSessionId: data.id,
                                    user: user?.id || null,
                                    guestEmail: data.metadata?.guestEmail || null,
                                    product: productId,
                                    name: typeof item.price.product === 'object' && 'name' in item.price.product ? item.price.product.name : 'Product',
                                },
                            });
                        } else {
                            console.warn('⚠️ Skipping order creation - no valid product ID found for item:', item);
                        }
                    }

                    // Check if emails have already been sent for this session to prevent duplicates
                    const existingOrders = await payload.find({
                        collection: "orders",
                        where: {
                            stripeCheckoutSessionId: {
                                equals: data.id
                            }
                        }
                    });

                    // Create a unique email tracking record to prevent duplicate emails
                    const emailTrackingId = `email_sent_${data.id}`;
                    const existingEmailTracking = await payload.find({
                        collection: "orders",
                        where: {
                            stripeCheckoutSessionId: {
                                equals: emailTrackingId
                            }
                        }
                    });

                    // Only send emails if this is the first time processing this session AND no email tracking exists
                    if (existingOrders.docs.length === lineItems.length && existingEmailTracking.docs.length === 0) {
                        console.log('📧 Starting payment email process...');
                        try {
                            const customerEmail = user?.email || data.metadata?.guestEmail;
                            const customerName = user?.username || 'Klient';
                            
                            console.log('👤 Customer details:', {
                                customerEmail,
                                customerName,
                                userId: user?.id,
                                guestEmail: data.metadata?.guestEmail
                            });
                            
                            if (customerEmail) {
                                const orderItems = lineItems.map(item => {
                                    // Handle different product types (string ID, Product object, or DeletedProduct)
                                    let productName = 'Product';
                                    if (item.price.product && typeof item.price.product === 'object' && 'name' in item.price.product) {
                                        productName = item.price.product.name || 'Product';
                                    }
                                    
                                    return {
                                        name: productName,
                                        quantity: item.quantity || 1,
                                        price: (item.price.unit_amount || 0) / 100
                                    };
                                });

                                const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

                                console.log('🛒 Order details:', {
                                    orderItems,
                                    totalAmount,
                                    orderId: data.id
                                });

                                // Create receipt URL
                                const invoiceUrl = `${process.env.NEXT_PUBLIC_APP_URL}/receipt/${data.id}`;
                                
                                console.log('📧 Sending payment emails directly from webhook...');
                                console.log('📧 Email details:', {
                                    customerEmail,
                                    customerName,
                                    totalAmount,
                                    orderId: data.id,
                                    invoiceUrl
                                });

                                // Send customer email
                                const userEmailHtml = createPaymentSuccessUserEmailHtml({
                                    customerName,
                                    orderItems,
                                    totalAmount,
                                    orderId: data.id,
                                    invoiceUrl
                                });

                                const userEmailResult = await getResendClient().emails.send({
                                    from: process.env.RESEND_FROM_EMAIL || 'Holistic Point <onboarding@resend.dev>',
                                    to: [customerEmail],
                                    subject: `Płatność zakończona pomyślnie - Zamówienie #${data.id.slice(-8)}`,
                                    html: userEmailHtml,
                                });

                                console.log('📧 Customer email result:', userEmailResult);

                                if (userEmailResult.error) {
                                    console.error('❌ Customer email failed:', userEmailResult.error);
                                } else {
                                    console.log('✅ Customer email sent successfully');
                                }

                                // Wait 1 second to avoid rate limiting
                                await new Promise(resolve => setTimeout(resolve, 1000));

                                // Send admin email
                                const adminEmailHtml = createPaymentSuccessAdminEmailHtml({
                                    customerEmail,
                                    totalAmount,
                                    orderId: data.id,
                                    invoiceUrl
                                });

                                const adminEmailResult = await getResendClient().emails.send({
                                    from: process.env.RESEND_FROM_EMAIL || 'Holistic Point <onboarding@resend.dev>',
                                    to: [process.env.ADMIN_EMAIL || 'admin@holisticpoint.pl'],
                                    subject: `Nowe zamówienie #${data.id.slice(-8)} - ${formatCurrency(totalAmount)}`,
                                    html: adminEmailHtml,
                                });

                                console.log('📧 Admin email result:', adminEmailResult);

                                if (adminEmailResult.error) {
                                    console.error('❌ Admin email failed:', adminEmailResult.error);
                                } else {
                                    console.log('✅ Admin email sent successfully');
                                }

                                // Create email tracking record to prevent duplicate emails
                                try {
                                    await payload.create({
                                        collection: "orders",
                                        data: {
                                            stripeCheckoutSessionId: emailTrackingId,
                                            user: null,
                                            guestEmail: null,
                                            product: "email_tracking",
                                            name: "Email Sent",
                                        },
                                    });
                                    console.log('📧 Email tracking record created to prevent duplicates');
                                } catch (trackingError) {
                                    console.error('❌ Failed to create email tracking record:', trackingError);
                                }
                            } else {
                                console.log('⚠️ No customer email found, skipping email sending');
                            }
                        } catch (emailError) {
                            console.error('❌ Failed to send payment emails:', emailError);
                            console.error('❌ Email error details:', {
                                message: emailError instanceof Error ? emailError.message : 'Unknown error',
                                stack: emailError instanceof Error ? emailError.stack : undefined
                            });
                            // Don't fail the webhook if email sending fails
                        }
                    } else {
                        if (existingEmailTracking.docs.length > 0) {
                            console.log('📧 Emails already sent for this session (tracking record exists), skipping to prevent duplicates');
                        } else {
                            console.log('📧 Orders not yet complete, skipping email sending until all orders are processed');
                        }
                    }

                    // Create event tracking record to prevent duplicate processing
                    try {
                        await payload.create({
                            collection: "orders",
                            data: {
                                stripeCheckoutSessionId: `processed_${event.id}`,
                                user: null,
                                guestEmail: null,
                                product: "event_tracking",
                                name: "Event Processed",
                            },
                        });
                        console.log('🔄 Event tracking record created to prevent duplicates:', event.id);
                    } catch (trackingError) {
                        console.error('❌ Failed to create event tracking record:', trackingError);
                    }
                    break;
                  default:
                    throw new Error(`Unhandled event: ${event.type}`);
                    
            }
        }catch (error){
            console.log(error)
            
            // Create event tracking record even if there's an error to prevent retry loops
            try {
                await payload.create({
                    collection: "orders",
                    data: {
                        stripeCheckoutSessionId: `processed_${event.id}`,
                        user: null,
                        guestEmail: null,
                        product: "event_tracking_error",
                        name: "Event Processed with Error",
                    },
                });
                console.log('🔄 Event tracking record created after error to prevent retry loops:', event.id);
            } catch (trackingError) {
                console.error('❌ Failed to create error tracking record:', trackingError);
            }
            
            return NextResponse.json(
                {message:"Webhook handler failed"},
                {status: 500},
            );
        }

    }

    return NextResponse.json({message:"Received"}, {status:200});


};