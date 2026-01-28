import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createAdminEmailHtml } from '@/components/admin-email-template';

// Initialize Resend (only when needed)
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set. Please add it to your .env.local file');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, email, message, phone, preferredDate, preferredTime } = body;

    // Validate required fields
    if (!firstName || !email) {
      return NextResponse.json(
        { error: 'Imię i email są wymagane' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Nieprawidłowy format email' },
        { status: 400 }
      );
    }

    // Create HTML email template
    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Witamy w Holistic Point</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fdfbf7; color: #1a1a1a;">
      <!-- Header -->
      <div style="background-color: #7A1317; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px; font-weight: bold;">HOLISTIC POINT</h1>
        <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">HEAD SPA - Twoje źródło piękna i relaksu</p>
      </div>

      <!-- Content -->
      <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #b19681; border-top: none;">
        <h2 style="color: #7A1317; font-size: 20px; margin-bottom: 20px; font-weight: bold;">Witaj ${firstName}!</h2>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #1a1a1a;">
          Dziękujemy za zainteresowanie naszymi usługami HEAD SPA! 
          Otrzymaliśmy Twoją wiadomość i skontaktujemy się z Tobą w ciągu 24 godzin.
        </p>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef; margin-bottom: 20px;">
          <h3 style="color: #7A1317; font-size: 16px; margin-bottom: 10px; font-weight: bold;">Twoje dane kontaktowe:</h3>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Imię:</strong> ${firstName}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Email:</strong> ${email}</p>
          ${phone ? `<p style="margin: 5px 0; font-size: 14px;"><strong>Telefon:</strong> ${phone}</p>` : ''}
          ${preferredDate ? `<p style="margin: 5px 0; font-size: 14px;"><strong>Preferowana data:</strong> ${new Date(preferredDate).toLocaleDateString('pl-PL', { timeZone: 'Europe/Warsaw' })}</p>` : ''}
          ${preferredTime ? `<p style="margin: 5px 0; font-size: 14px;"><strong>Preferowana godzina:</strong> ${preferredTime}</p>` : ''}
          ${message ? `<p style="margin: 5px 0; font-size: 14px;"><strong>Wiadomość:</strong> ${message}</p>` : ''}
        </div>

        <div style="background-color: #f1f0e5; padding: 20px; border-radius: 8px; border: 1px solid #b19681; margin-bottom: 20px;">
          <h3 style="color: #7A1317; font-size: 16px; margin-bottom: 15px; font-weight: bold;">Co możemy dla Ciebie zrobić?</h3>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
            <li style="margin-bottom: 8px;"><strong>Sprzęt HEAD SPA</strong> - Profesjonalne urządzenia do Twojego salonu</li>
            <li style="margin-bottom: 8px;"><strong>Szkolenia</strong> - Naucz się wykonywać HEAD SPA jak mistrz</li>
            <li style="margin-bottom: 8px;"><strong>Wsparcie</strong> - Doradztwo w wyborze i wdrożeniu</li>
            <li><strong>Wizyty w salonie</strong> - Doświadcz HEAD SPA na własnej skórze</li>
          </ul>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="https://holisticpoint.booksy.com" style="display: inline-block; background-color: #7A1317; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Umów wizytę w salonie</a>
        </div>

        <p style="font-size: 14px; color: #666; text-align: center; margin-top: 30px; line-height: 1.5;">
          Z poważaniem,<br />
          Zespół Holistic Point<br />
          <br />
          📍 Warsaw, Poland<br />
          📞 +48 123 456 789<br />
          ✉️ info@holisticpoint.pl
        </p>
      </div>
    </body>
    </html>
    `;

    // Send confirmation email to user
    const userEmailResult = await getResendClient().emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Holistic Point <onboarding@resend.dev>',
      to: [email],
      subject: 'Witamy w Holistic Point - HEAD SPA',
      html: emailHtml,
    });

    if (userEmailResult.error) {
      console.error('User email error:', userEmailResult.error);
      return NextResponse.json(
        { error: 'Wystąpił błąd podczas wysyłania email' },
        { status: 500 }
      );
    }

    // Send notification email to admin
    const adminEmailHtml = createAdminEmailHtml({ firstName, email, phone, message, preferredDate, preferredTime });
    const adminEmailResult = await getResendClient().emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Holistic Point <onboarding@resend.dev>',
      to: [process.env.ADMIN_EMAIL || 'admin@holisticpoint.pl'],
      subject: `Nowa wiadomość od ${firstName} - Formularz kontaktowy${preferredDate ? ` (Data: ${new Date(preferredDate).toLocaleDateString('pl-PL', { timeZone: 'Europe/Warsaw' })}${preferredTime ? `, Godzina: ${preferredTime}` : ''})` : ''}`,
      html: adminEmailHtml,
    });

    if (adminEmailResult.error) {
      console.error('Admin email error:', adminEmailResult.error);
      // Don't fail the request if admin email fails, just log it
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email został wysłany pomyślnie',
        data: userEmailResult.data 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera' },
      { status: 500 }
    );
  }
}
