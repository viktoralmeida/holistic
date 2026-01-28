// Admin email template for contact form submissions
export function createAdminEmailHtml({ firstName, email, phone, message, preferredDate, preferredTime }: {
  firstName: string;
  email: string;
  phone?: string;
  message: string;
  preferredDate?: string;
  preferredTime?: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nowa wiadomość z formularza kontaktowego</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; color: #1a1a1a;">
      <!-- Header -->
      <div style="background-color: #7A1317; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px; font-weight: bold;">HOLISTIC POINT</h1>
        <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Nowa wiadomość z formularza kontaktowego</p>
      </div>

      <!-- Content -->
      <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #b19681; border-top: none;">
        <h2 style="color: #7A1317; font-size: 20px; margin-bottom: 20px; font-weight: bold;">
          📧 Nowa wiadomość od klienta
        </h2>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef; margin-bottom: 20px;">
          <h3 style="color: #7A1317; font-size: 16px; margin-bottom: 15px; font-weight: bold;">Dane klienta:</h3>
          <div style="margin-bottom: 10px;">
            <strong style="color: #1a1a1a;">Imię:</strong> 
            <span style="color: #1a1a1a; margin-left: 8px;">${firstName}</span>
          </div>
          <div style="margin-bottom: 10px;">
            <strong style="color: #1a1a1a;">Email:</strong> 
            <a href="mailto:${email}" style="color: #7A1317; margin-left: 8px; text-decoration: none;">${email}</a>
          </div>
          ${phone ? `
          <div style="margin-bottom: 10px;">
            <strong style="color: #1a1a1a;">Telefon:</strong> 
            <a href="tel:${phone}" style="color: #7A1317; margin-left: 8px; text-decoration: none;">${phone}</a>
          </div>
          ` : ''}
          <div style="margin-bottom: 10px;">
            <strong style="color: #1a1a1a;">Data wysłania:</strong> 
            <span style="color: #1a1a1a; margin-left: 8px;">${new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' })}</span>
          </div>
          ${preferredDate ? `
          <div style="margin-bottom: 10px;">
            <strong style="color: #1a1a1a;">Preferowana data kontaktu:</strong> 
            <span style="color: #7A1317; margin-left: 8px; font-weight: bold;">${new Date(preferredDate).toLocaleDateString('pl-PL', { timeZone: 'Europe/Warsaw' })}</span>
          </div>
          ` : ''}
          ${preferredTime ? `
          <div style="margin-bottom: 10px;">
            <strong style="color: #1a1a1a;">Preferowana godzina kontaktu:</strong> 
            <span style="color: #7A1317; margin-left: 8px; font-weight: bold;">${preferredTime}</span>
          </div>
          ` : ''}
        </div>

        <div style="background-color: #f1f0e5; padding: 20px; border-radius: 8px; border: 1px solid #b19681; margin-bottom: 20px;">
          <h3 style="color: #7A1317; font-size: 16px; margin-bottom: 15px; font-weight: bold;">Wiadomość:</h3>
          <div style="background-color: white; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef; line-height: 1.6; color: #1a1a1a;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a 
            href="mailto:${email}" 
            style="display: inline-block; background-color: #7A1317; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; margin-right: 10px;"
          >
            📧 Odpowiedz klientowi
          </a>
          ${phone ? `
          <a 
            href="tel:${phone}" 
            style="display: inline-block; background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;"
          >
            📞 Zadzwoń
          </a>
          ` : ''}
        </div>

        <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; border-left: 4px solid #2196f3; margin-top: 20px;">
          <p style="margin: 0; font-size: 14px; color: #1976d2; font-weight: bold;">
            💡 Wskazówka: Odpowiedz w ciągu 24 godzin dla najlepszego doświadczenia klienta
          </p>
        </div>

        <p style="font-size: 14px; color: #666; text-align: center; margin-top: 30px; line-height: 1.5;">
          Wiadomość została wysłana z formularza kontaktowego na stronie Holistic Point<br />
          <br />
          📍 Warsaw, Poland<br />
          📞 +48 123 456 789<br />
          ✉️ info@holisticpoint.pl
        </p>
      </div>
    </body>
    </html>
  `;
}
