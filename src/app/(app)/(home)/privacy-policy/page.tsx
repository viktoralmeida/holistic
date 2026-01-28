import { Metadata } from "next"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { Shield, Eye, Lock, Users, FileText, Calendar, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
})

export const metadata: Metadata = {
  title: "Privacy Policy - HeadSpa",
  description: "Learn how HeadSpa collects, uses, and protects your personal information. Our comprehensive privacy policy ensures your data security and privacy rights.",
}

const PolicySection = ({ 
  title, 
  children, 
  icon: Icon 
}: { 
  title: string
  children: React.ReactNode
  icon: React.ComponentType<{ className?: string }> 
}) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h2 className={cn("text-2xl font-semibold text-foreground", poppins.className)}>
        {title}
      </h2>
    </div>
    <div className="prose prose-gray dark:prose-invert max-w-none">
      {children}
    </div>
  </div>
)

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card/30 to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-left mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className={cn("text-4xl lg:text-5xl font-bold text-foreground", poppins.className)}>
              Polityka prywatności i plików cookies
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
           TD Borowik sp. z o.o.
             
          </p>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
       
            al. Jana Pawła II 43A/37B, 01-001 Warszawa
    
          </p>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
           
            NIP: 5273011123
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Data aktualizacji: 13 sierpnia 2025 r.</span>
            </div>
          
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-card/50 to-background/50 rounded-2xl p-6 mb-12 backdrop-blur-sm border border-border/30">
          <h3 className={cn("text-lg font-semibold mb-4", poppins.className)}>
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">Headspa.holistic@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-muted-foreground">+48 534 569 240</p>
              </div>
            </div>
          </div>
        </div>

            <PolicySection title="Postanowienia ogólne" icon={Users}>
            <div className="space-y-4">
              <p>
                Niniejsza polityka prywatności określa zasady przetwarzania i ochrony danych osobowych użytkowników strony internetowej prowadzonej przez TD Borowik sp. z o.o. (dalej: „Administrator” lub „my”).
              </p>
 
              <p>
                Dbamy o bezpieczeństwo Twoich danych i stosujemy się do przepisów RODO oraz innych obowiązujących regulacji prawnych.
              </p>
            </div>
          </PolicySection>






        {/* Policy Content */}
        <div className="space-y-12 pt-4">
          
          <PolicySection title="Administrator danych" icon={Eye}>
            <div className="space-y-4">
              <p>
                Administratorem Twoich danych osobowych jest:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>TD Borowik sp. z o.o.</strong> </li>
                <li>al. Jana Pawła II 43A/37B, 01-001 Warszawa</li>
                <li>NIP: 5273011123</li>
                <li>Kontakt:</li>
                <li>e-mail: <strong>Headspa.holistic@gmail.com</strong> </li>
                <li>tel.: <strong>+48 570 111 791</strong> </li>
              </ul>
            </div>
          </PolicySection>

          <PolicySection title="Zakres przetwarzanych danych" icon={Users}>
            <div className="space-y-4">
              <p>
              Podczas korzystania z naszej strony możemy zbierać:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>dane przekazane dobrowolnie w formularzach (imię, nazwisko, e-mail, numer telefonu)</li>
                <li>dane niezbędne do realizacji usług (adres, NIP, dane do faktury)</li>
                <li>dane techniczne dotyczące urządzenia i połączenia (adres IP, typ przeglądarki, system operacyjny, cookies)</li>
                <li>dane o aktywności na stronie (czas wizyty, kliknięte linki, odwiedzone podstrony)</li>
                 
              </ul>
            </div>
          </PolicySection>

          <PolicySection title="Cele i podstawy przetwarzania danych" icon={Lock}>
            <div className="space-y-4">
              <p>
                Twoje dane przetwarzamy w celach:
              </p>
              <ul className=" list-decimal list-inside space-y-2 ml-4">
                <li><strong>Realizacji usług</strong> – zawarcie i wykonanie umowy (art. 6 ust. 1 lit. b RODO)</li>
                <li><strong>Obsługi zapytań</strong> – formularz kontaktowy, czat, e-mail (art. 6 ust. 1 lit. f RODO)</li>
                <li><strong>Marketingu online:</strong> – Google Ads, Facebook Ads, remarketing (art. 6 ust. 1 lit. a lub f RODO)</li>
                <li><strong>Analizy ruchu na stronie</strong> – Google Analytics, Pixel Meta (art. 6 ust. 1 lit. f RODO)</li>
                <li><strong>Spełnienia obowiązków prawnych</strong> – np. przechowywanie dokumentacji księgowej (art. 6 ust. 1 lit. c RODO)</li>
              </ul>
 
            </div>
          </PolicySection>

          <PolicySection title="Odbiorcy danych" icon={Shield}>
            <div className="space-y-4">
              <p>
               Dane mogą być przekazywane podmiotom:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>świadczącym usługi hostingowe i IT</li>
                <li>dostawcom narzędzi marketingowych i analitycznych (Google, Meta)</li>
                <li>firmom kurierskim, pocztowym i płatniczym</li>
                <li>biurom rachunkowym i kancelariom prawnym</li>
                <li>organom publicznym, jeśli wymaga tego prawo</li>
              </ul>
      
            </div>
          </PolicySection>

          <PolicySection title="Pliki cookies" icon={Users}>
            <div className="space-y-4">
              <p>
                Strona korzysta z plików cookies w celu:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                   Strona korzysta z plików cookies w celu:  
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>zapewnienia prawidłowego działania strony</li>
                    <li>analizy statystyk odwiedzin (Google Analytics)</li>
                    <li>prowadzenia działań remarketingowych (Google Ads, Facebook Ads)</li>
                  </ul>
                </li>
                <li> Pliki cookies możesz wyłączyć w ustawieniach swojej przeglądarki, jednak może to wpłynąć na prawidłowe funkcjonowanie strony.  </li>
                 <li> Korzystając z naszej strony, wyrażasz zgodę na zapisywanie cookies na swoim urządzeniu, o ile ustawienia przeglądarki na to pozwalają.   </li>
                 
              </ol>
 
            </div>
          </PolicySection>

          <PolicySection title="Narzędzia analityczne i marketingowe" icon={Eye}>
            <div className="space-y-4">
              <p>
                Na naszej stronie używamy m.in.:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Google Analytics</strong> – do analizy ruchu na stronie. Dane są anonimizowane, a adres IP skracany.</li>
                <li><strong>Google Ads:</strong> – do wyświetlania reklam w sieci Google.</li>
                <li><strong>Pixel Meta (Facebook/Instagram)</strong> – do analizy skuteczności reklam i remarketingu.</li>
                  Korzystanie z tych narzędzi może wiązać się z przekazywaniem danych poza EOG – zawsze z zastosowaniem zabezpieczeń przewidzianych przez RODO.
              </ul>
     
            </div>
          </PolicySection>

          <PolicySection title="Okres przechowywania danych" icon={Calendar}>
            <div className="space-y-4">
     
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li> Dane z formularzy – do 12 miesięcy od zakończenia korespondencji lub do wycofania zgody.</li>
                <li>  Dane związane z umową – przez okres jej obowiązywania oraz czas wymagany prawem (np. 5 lat dla celów podatkowych).</li>
                <li>  Dane marketingowe – do czasu cofnięcia zgody lub wniesienia sprzeciwu.</li>
                 
              </ul>
       
            </div>
          </PolicySection>

          <PolicySection title="Twoje prawa" icon={Users}>
            <div className="space-y-4">
              <p>
               Masz prawo do:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>dostępu do danych i uzyskania ich kopii</li>
                <li>sprostowania danych</li>
                <li>usunięcia danych</li>
                <li>ograniczenia przetwarzania</li>
                <li>przenoszenia danych</li>
                <li>wniesienia sprzeciwu wobec marketingu</li>
                <li>cofnięcia zgody w dowolnym momencie</li>
                <li>złożenia skargi do Prezesa UODO</li>
              </ul>
       
            </div>
          </PolicySection>

          <PolicySection title="Dobrowolność podania danych" icon={Shield}>
            <div className="space-y-4">
              <p>
               Podanie danych jest dobrowolne, ale w niektórych przypadkach niezbędne do korzystania z naszych usług lub otrzymywania odpowiedzi na zapytanie.
              </p>
            </div>
          </PolicySection>

          <PolicySection title="Changes to This Policy" icon={FileText}>
            <div className="space-y-4">
              <p>
              Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej polityce.<br/>
Aktualna wersja zawsze znajduje się na naszej stronie internetowej.
              </p>
            </div>
          </PolicySection>

        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 text-center">
         
        
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <p>Masz jakieś pytania dotyczące polityki prywatności?</p>
            <Button asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <Link href="/contact">
                Skontaktuj się
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
