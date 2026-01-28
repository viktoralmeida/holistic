import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  email: string;
  message?: string;
}

export function EmailTemplate({ firstName, email, message }: EmailTemplateProps) {
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: '#fdfbf7',
      color: '#1a1a1a'
    }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: '#7A1317', 
        color: 'white', 
        padding: '20px', 
        textAlign: 'center',
        borderRadius: '8px 8px 0 0'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
          HOLISTIC POINT
        </h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.9 }}>
          HEAD SPA - Twoje źródło piękna i relaksu
        </p>
      </div>

      {/* Content */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '0 0 8px 8px',
        border: '1px solid #b19681',
        borderTop: 'none'
      }}>
        <h2 style={{ 
          color: '#7A1317', 
          fontSize: '20px', 
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>
          Witaj {firstName}!
        </h2>

        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.6', 
          marginBottom: '20px',
          color: '#1a1a1a'
        }}>
          Dziękujemy za zainteresowanie naszymi usługami HEAD SPA! 
          Otrzymaliśmy Twoją wiadomość i skontaktujemy się z Tobą w ciągu 24 godzin.
        </p>

        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #e9ecef',
          marginBottom: '20px'
        }}>
          <h3 style={{ 
            color: '#7A1317', 
            fontSize: '16px', 
            marginBottom: '10px',
            fontWeight: 'bold'
          }}>
            Twoje dane kontaktowe:
          </h3>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>
            <strong>Email:</strong> {email}
          </p>
          {message && (
            <p style={{ margin: '5px 0', fontSize: '14px' }}>
              <strong>Wiadomość:</strong> {message}
            </p>
          )}
        </div>

        <div style={{ 
          backgroundColor: '#f1f0e5', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #b19681',
          marginBottom: '20px'
        }}>
          <h3 style={{ 
            color: '#7A1317', 
            fontSize: '16px', 
            marginBottom: '15px',
            fontWeight: 'bold'
          }}>
            Co możemy dla Ciebie zrobić?
          </h3>
          <ul style={{ 
            margin: 0, 
            paddingLeft: '20px', 
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Sprzęt HEAD SPA</strong> - Profesjonalne urządzenia do Twojego salonu
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Szkolenia</strong> - Naucz się wykonywać HEAD SPA jak mistrz
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Wsparcie</strong> - Doradztwo w wyborze i wdrożeniu
            </li>
            <li>
              <strong>Wizyty w salonie</strong> - Doświadcz HEAD SPA na własnej skórze
            </li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <a 
            href="https://holisticpoint.booksy.com" 
            style={{ 
              display: 'inline-block',
              backgroundColor: '#7A1317', 
              color: 'white', 
              padding: '12px 24px', 
              textDecoration: 'none', 
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            Umów wizytę w salonie
          </a>
        </div>

        <p style={{ 
          fontSize: '14px', 
          color: '#666', 
          textAlign: 'center', 
          marginTop: '30px',
          lineHeight: '1.5'
        }}>
          Z poważaniem,<br />
          Zespół Holistic Point<br />
          <br />
          📍 Warsaw, Poland<br />
          📞 +48 123 456 789<br />
          ✉️ info@holisticpoint.pl
        </p>
      </div>
    </div>
  );
}




























