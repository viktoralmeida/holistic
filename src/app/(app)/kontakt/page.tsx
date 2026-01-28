import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Navigation, Car, Train, Bus } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt - Salon Holistic Point | Warszawa, Żoliborz",
  description: "Skontaktuj się z Salonem Holistic Point w Warszawie, Żoliborz. Adres: Ul. Powązkowska 13/U5. Telefon: +48 534 569 240. Email: headspa.holistic@gmail.com",
  keywords: [
    "kontakt holistic point", "salon spa warszawa kontakt", "holistic point żoliborz",
    "adres salon spa warszawa", "telefon salon urody", "zabiegi spa warszawa kontakt"
  ],
  openGraph: {
    title: "Kontakt - Salon Holistic Point | Warszawa, Żoliborz",
    description: "Skontaktuj się z Salonem Holistic Point w Warszawie, Żoliborz. Adres: Ul. Powązkowska 13/U5. Telefon: +48 534 569 240.",
    images: [
      {
        url: '/salon.jpg',
        width: 1200,
        height: 630,
        alt: 'Salon Holistic Point - Kontakt Warszawa, Żoliborz',
      },
    ],
  },
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Skontaktuj się z nami
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Jesteśmy tutaj, aby odpowiedzieć na Twoje pytania i pomóc w umówieniu wizyty. 
              Znajdź nas w sercu Warszawy, Żoliborz.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Contact Information - Left Column */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Szybki kontakt
              </h2>
              
              <div className="space-y-4">
                {/* Phone - Salon */}
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Phone className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Salon Holistic Point</p>
                    <a 
                      href="tel:+48534569240" 
                      className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                    >
                      +48 534 569 240
                    </a>
                  </div>
                </div>

                {/* Phone - HEAD SPA */}
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Phone className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">HEAD SPA - Sprzedaż</p>
                    <a 
                      href="tel:+48570111791" 
                      className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                    >
                      +48 570 111 791
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Mail className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <a 
                      href="mailto:headspa.holistic@gmail.com"
                      className="text-amber-600 hover:text-amber-700 text-sm font-medium break-all"
                    >
                      headspa.holistic@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Nasz adres
              </h2>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <MapPin className="h-5 w-5 text-amber-600 mt-0.5" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Salon Holistic Point</p>
                  <p className="text-gray-600 text-sm">
                    Ul. Powązkowska 13/U5<br />
                    01-797 Warszawa, Żoliborz
                  </p>
                </div>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Godziny otwarcia
              </h2>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Poniedziałek - Piątek</span>
                    <span className="text-gray-900 font-medium">09:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sobota</span>
                    <span className="text-gray-900 font-medium">10:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Niedziela</span>
                    <span className="text-gray-500">Zamknięte</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transportation Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Jak do nas dotrzeć
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Train className="h-4 w-4 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Metro</p>
                    <p className="text-xs text-gray-600">Plac Wilsona (linia M1)</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Bus className="h-4 w-4 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Autobus</p>
                    <p className="text-xs text-gray-600">107, 127, 128, 131, 180, 517</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Navigation className="h-4 w-4 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Tramwaj</p>
                    <p className="text-xs text-gray-600">1, 2, 6, 13, 20, 26</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Car className="h-4 w-4 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Parking</p>
                    <p className="text-xs text-gray-600">Dostępny w okolicy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Right Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Contact Form */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Napisz do nas
                </h2>
                <p className="text-gray-600">
                  Wypełnij formularz, a skontaktujemy się z Tobą w ciągu 24 godzin.
                </p>
              </div>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Imię i nazwisko *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      placeholder="Jan Kowalski"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Adres email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      placeholder="jan.kowalski@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Numer telefonu
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="+48 123 456 789"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Temat wiadomości *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  >
                    <option value="">Wybierz temat</option>
                    <option value="appointment">Umówienie wizyty</option>
                    <option value="information">Informacje o zabiegach</option>
                    <option value="equipment">Sprzedaż urządzeń HEAD SPA</option>
                    <option value="training">Szkolenia HEAD SPA</option>
                    <option value="other">Inne pytania</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Wiadomość *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none"
                    placeholder="Opisz szczegółowo, czego potrzebujesz lub jakie masz pytania..."
                  ></textarea>
                </div>
                
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    required
                    className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na moją wiadomość. *
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-amber-600 text-white py-3 px-6 rounded-md font-medium hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
                >
                  Wyślij wiadomość
                </button>
              </form>
            </div>

            {/* Google Maps */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Znajdź nas na mapie
                </h2>
                <p className="text-gray-600">
                  Salon Holistic Point znajduje się w centrum Żoliborza, przy ul. Powązkowskiej 13/U5.
                </p>
              </div>
              
              <div className="relative w-full h-96 rounded-lg overflow-hidden border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.1234567890123!2d20.9851!3d52.2689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc1234567890%3A0x1234567890abcdef!2sPowązkowska%2013%2FU5%2C%2001-797%20Warszawa!5e0!3m2!1spl!2spl!4v1234567890123!5m2!1spl!2spl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokalizacja Salonu Holistic Point - Warszawa, Żoliborz"
                ></iframe>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Dodatkowe informacje
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Rezerwacja wizyt</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Zalecamy wcześniejszą rezerwację zabiegów. Możesz skontaktować się z nami telefonicznie 
                    lub przez formularz kontaktowy. Odpowiadamy na wszystkie zapytania w ciągu 24 godzin.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Formy płatności</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Akceptujemy płatności gotówką, kartą płatniczą oraz przelewem bankowym. 
                    Dla stałych klientów oferujemy możliwość płatności ratalnej.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">HEAD SPA</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Oferujemy sprzedaż profesjonalnych urządzeń HEAD SPA oraz szkolenia dla kosmetologów. 
                    Skontaktuj się z nami pod numerem +48 570 111 791.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Dostępność</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Nasz salon jest w pełni dostosowany dla osób z niepełnosprawnościami. 
                    Zapewniamy bezpłatny parking dla klientów.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
