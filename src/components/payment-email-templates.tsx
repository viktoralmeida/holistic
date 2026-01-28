// Payment success email templates

export function createPaymentSuccessUserEmailHtml({ 
  customerName,
  orderItems,
  totalAmount, 
  orderId,
  invoiceUrl
}: {
  customerName: string;
  orderItems: Array<{ name: string; quantity: number; price: number }>;
  totalAmount: number;
  orderId: string;
  invoiceUrl?: string | null;
}) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN'
    }).format(amount);
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Zamówienie otrzymane</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #1a1a1a; line-height: 1.5;">
      <div style="max-width: 400px; margin: 60px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background-color: #8b4513; padding: 32px 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 18px; font-weight: 400; color: #ffffff; letter-spacing: 1px;">HOLISTIC POINT</h1>
        </div>

        <!-- Content -->
        <div style="padding: 48px 24px;">
          
          <!-- Header Text -->
          <div style="text-align: center; margin-bottom: 40px;">
            <h2 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 600; color: #1a1a1a;">Otrzymaliśmy Twoje zamówienie</h2>
            <p style="margin: 0; font-size: 15px; color: #6b7280;">Dziękujemy za zakup, ${customerName}!</p>
          </div>

          <!-- Order Summary -->
          <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin-bottom: 32px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 13px; color: #6b7280;">Zamówienie</span>
              <span style="font-size: 13px; color: #1a1a1a; font-family: monospace; font-weight: 500;">#${orderId.slice(-8)}</span>
            </div>
            
            <!-- Order Items -->
            ${orderItems.map(item => `
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 14px; color: #1a1a1a;">${item.name} × ${item.quantity}</span>
                <span style="font-size: 14px; color: #1a1a1a; font-weight: 500;">${formatCurrency(item.price * item.quantity)}</span>
              </div>
            `).join('')}
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 12px; margin-top: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 15px; color: #1a1a1a; font-weight: 500;">Razem</span>
                <span style="font-size: 16px; color: #8b4513; font-weight: 600;">${formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <div style="text-align: center;">
            ${invoiceUrl ? `
            <a href="${invoiceUrl}" style="display: inline-block; background-color: #f3f4f6; color: #374151; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 14px; border: 1px solid #e5e7eb;">
              Zobacz paragon
            </a>
            ` : ''}
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #f3f4f6;">
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">
            Holistic Point • Warsaw
          </p>
        </div>

      </div>
    </body>
    </html>
  `;
}

export function createPaymentSuccessAdminEmailHtml({ 
  customerEmail, 
  totalAmount, 
  orderId,
  invoiceUrl
}: {
  customerEmail: string;
  totalAmount: number;
  orderId: string;
  invoiceUrl?: string | null;
}) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN'
    }).format(amount);
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nowe zamówienie</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #1a1a1a; line-height: 1.5;">
      <div style="max-width: 400px; margin: 60px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background-color: #8b4513; padding: 32px 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 18px; font-weight: 400; color: #ffffff; letter-spacing: 1px;">HOLISTIC POINT</h1>
          <p style="margin: 8px 0 0 0; font-size: 13px; color: #ffffff; opacity: 0.8;">Nowe zamówienie</p>
        </div>

        <!-- Content -->
        <div style="padding: 48px 24px;">
          
          <!-- Header Text -->
          <div style="text-align: center; margin-bottom: 40px;">
            <h2 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 600; color: #1a1a1a;">Nowe zamówienie</h2>
            <p style="margin: 0; font-size: 15px; color: #6b7280;">Płatność została przetworzona</p>
          </div>

          <!-- Order Details -->
          <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin-bottom: 32px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 13px; color: #6b7280;">Zamówienie</span>
              <span style="font-size: 13px; color: #1a1a1a; font-family: monospace; font-weight: 500;">#${orderId.slice(-8)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 13px; color: #6b7280;">Email</span>
              <a href="mailto:${customerEmail}" style="font-size: 13px; color: #8b4513; font-weight: 500; text-decoration: none;">${customerEmail}</a>
            </div>
            <div style="border-top: 1px solid #e5e7eb; padding-top: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 15px; color: #1a1a1a; font-weight: 500;">Razem</span>
                <span style="font-size: 16px; color: #8b4513; font-weight: 600;">${formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="text-align: center;">
            ${invoiceUrl ? `
            <a href="${invoiceUrl}" style="display: inline-block; background-color: #f3f4f6; color: #374151; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: 500; font-size: 14px; border: 1px solid #e5e7eb; margin: 0 8px 8px 0;">
              Zobacz paragon
            </a>
            ` : ''}
            <a href="mailto:${customerEmail}" style="display: inline-block; background-color: #8b4513; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 14px; margin: 0 8px 8px 0;">
              Napisz do klienta
            </a>
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #f3f4f6;">
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">
            Wiadomość wygenerowana automatycznie
          </p>
        </div>

      </div>
    </body>
    </html>
  `;
}