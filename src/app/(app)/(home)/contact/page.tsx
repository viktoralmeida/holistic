"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight,
  MessageCircle,
  Building,
  Navigation,
  Star,
  Calendar,
  Users,
  Award
} from "lucide-react";
import { Suspense, lazy } from "react";
import Link from "next/link";
import Image from "next/image";

// Lazy load heavy components
const ContactFormLazy = lazy(() => import("@/components/contact-form-new").then(module => ({ default: module.ContactFormNew })));

// Loading skeleton components
const ContactFormSkeleton = () => (
  <div className="space-y-4">
    <div className="space-y-3">
      <div className="h-4 bg-muted/50 rounded w-1/4 animate-pulse"></div>
      <div className="h-10 bg-muted/50 rounded animate-pulse"></div>
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-muted/50 rounded w-1/3 animate-pulse"></div>
      <div className="h-10 bg-muted/50 rounded animate-pulse"></div>
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-muted/50 rounded w-1/2 animate-pulse"></div>
      <div className="h-24 bg-muted/50 rounded animate-pulse"></div>
    </div>
    <div className="h-10 bg-primary/20 rounded animate-pulse"></div>
  </div>
);

const MapSkeleton = () => (
  <div className="aspect-video w-full bg-muted/50 rounded-lg animate-pulse flex items-center justify-center">
    <div className="text-muted-foreground text-sm">Ładowanie mapy...</div>
  </div>
);

const SocialMediaSkeleton = () => (
  <div className="space-y-4">
    <div className="h-4 bg-muted/50 rounded w-3/4 animate-pulse"></div>
    <div className="flex gap-4 justify-center">
      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
        <div className="w-6 h-6 bg-muted/50 rounded animate-pulse"></div>
        <div className="h-4 bg-muted/50 rounded w-16 animate-pulse"></div>
      </div>
      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
        <div className="w-6 h-6 bg-muted/50 rounded animate-pulse"></div>
        <div className="h-4 bg-muted/50 rounded w-20 animate-pulse"></div>
      </div>
    </div>
  </div>
);

export default function ContactPage() {
  // Most critical contact information - prominently displayed
  const criticalContact = {
    salonPhone: "+48 534 569 240",
    headSpaPhone: "+48 570 111 791",
    email: "headspa.holistic@gmail.com",
    address: "Ul. Powązkowska 13/U5, 01-797 Warszawa, Żoliborz",
    hours: {
      weekdays: "Poniedziałek - Piątek: 9:00 - 20:00",
      saturday: "Sobota: 10:00 - 18:00",
      sunday: "Niedziela: Zamknięte"
    }
  };

  // Quick action buttons
  const quickActions = [
    {
      title: "Umów wizytę online",
      description: "Szybka rezerwacja przez Booksy",
      icon: <Calendar className="w-6 h-6" />,
      href: "https://holisticpoint.booksy.com",
      primary: true
    },
    {
      title: "Zadzwoń do salonu",
      description: "Rezerwacja zabiegów",
      icon: <Phone className="w-6 h-6" />,
      href: `tel:${criticalContact.salonPhone}`,
      primary: false
    },
    {
      title: "HEAD SPA Sprzedaż",
      description: "Urządzenia i szkolenia",
      icon: <Phone className="w-6 h-6" />,
      href: `tel:${criticalContact.headSpaPhone}`,
      primary: false
    }
  ];

  // Services offered
  const services = [
    { name: "HEAD SPA", description: "Profesjonalne urządzenia i szkolenia", icon: <Users className="w-5 h-5" /> },
    { name: "Zabiegi organiczne", description: "Naturalne kosmetyki i terapie", icon: <Award className="w-5 h-5" /> },
    { name: "Masaże terapeutyczne", description: "Relaksacja i regeneracja", icon: <Star className="w-5 h-5" /> },
    { name: "Zabiegi na twarz", description: "Pielęgnacja i odmładzanie", icon: <Building className="w-5 h-5" /> },
    { name: "Aromaterapia", description: "Terapia zapachami", icon: <MessageCircle className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Ładowanie strony kontaktowej...</p>
          </div>
        </div>
      }>
      
      {/* Critical Information Banner - Most Important */}
      <section className="bg-primary text-primary-foreground py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              Salon Holistic Point
            </h1>
            <p className="text-lg lg:text-xl opacity-90">
              Premium Organic Spa Experience w Warszawie, Żoliborz
            </p>
          </div>
          
          {/* Critical Contact Info - Prominently Displayed */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">Salon Holistic Point</h3>
              <p className="text-xl font-semibold mb-1">{criticalContact.salonPhone}</p>
              <p className="text-sm opacity-80">Rezerwacja zabiegów</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">HEAD SPA Sprzedaż</h3>
              <p className="text-xl font-semibold mb-1">{criticalContact.headSpaPhone}</p>
              <p className="text-sm opacity-80">Urządzenia i szkolenia</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">Email</h3>
              <p className="text-lg font-semibold mb-1 break-all">{criticalContact.email}</p>
              <p className="text-sm opacity-80">Odpowiadamy w 24h</p>
            </div>
          </div>
          
          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                size="lg"
                className={`h-16 px-8 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group ${
                  action.primary 
                    ? 'text-white hover:opacity-90 border-2 border-[#b19681]' 
                    : 'bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 border-2 border-[#b19681]'
                }`}
                style={action.primary ? { backgroundColor: '#43a6af' } : {}}
                asChild
              >
                <Link href={action.href} target={action.href.startsWith('http') ? '_blank' : undefined}>
                  <div className="flex items-center gap-4">
                    {action.primary ? (
                      <div className="p-2   rounded-full border border-white/30">
                        <Image 
                          src="/booksyimg.jpeg"
                          alt="Booksy"
                          width={32}
                          height={32}
                          className="w-8 h-8"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="  rounded-full border border-primary-foreground/20">
                        <div className="w-8 h-8 flex items-center justify-center">
                          {action.icon}
                        </div>
                      </div>
                    )}
                    <div className="text-left">
                      <div className="font-bold text-lg">{action.title}</div>
                      <div className="text-sm opacity-80">{action.description}</div>
                    </div>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-card border-b border-[#b19681]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Address & Hours */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <MapPin className="w-8 h-8 text-primary" />
                Lokalizacja i godziny
              </h2>
              
              <div className="space-y-6">
                <Card className="bg-background border-2 border-[#b19681] shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <MapPin className="w-6 h-6 text-primary" />
                      Nasz adres
                    </h3>
                    <p className="text-lg text-foreground font-semibold mb-2">
                      {criticalContact.address}
                    </p>
                    <p className="text-muted-foreground">
                      Centrum Żoliborza, łatwy dojazd komunikacją miejską
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-background border-2 border-[#b19681] shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="w-6 h-6 text-primary" />
                      Godziny otwarcia
                    </h3>
                    <div className="space-y-2">
                      <p className="text-foreground font-medium">{criticalContact.hours.weekdays}</p>
                      <p className="text-foreground font-medium">{criticalContact.hours.saturday}</p>
                      <p className="text-muted-foreground">{criticalContact.hours.sunday}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Map */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Navigation className="w-8 h-8 text-primary" />
                Znajdź nas na mapie
              </h2>
              
              <Card className="bg-background border-2 border-[#b19681] shadow-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-96 lg:h-[400px] w-full">
                    <Suspense fallback={<MapSkeleton />}>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.1234567890123!2d20.9851!3d52.2689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc1234567890%3A0x1234567890abcdef!2sPowązkowska%2013%2FU5%2C%2001-797%20Warszawa!5e0!3m2!1spl!2spl!4v1234567890123!5m2!1spl!2spl"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Salon Holistic Point - Warszawa, Żoliborz"
                      />
                    </Suspense>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Contact Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Services */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Building className="w-8 h-8 text-primary" />
                Nasze usługi
              </h2>
              
              <Card className="bg-card border-2 border-[#b19681] shadow-lg">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 gap-4">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-primary/10 transition-colors group">
                        <div className="text-primary group-hover:scale-110 transition-transform mt-1">
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">{service.name}</h3>
                          <p className="text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-primary" />
                Napisz do nas
              </h2>
              
              <Card className="bg-card border-2 border-[#b19681] shadow-lg">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6">
                    Masz pytania dotyczące zabiegów spa, HEAD SPA, szkoleń lub chcesz umówić wizytę?
                  </p>
                  <Suspense fallback={<ContactFormSkeleton />}>
                    <ContactFormLazy />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media & Why Choose Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Social Media */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-primary" />
                Śledź nas
              </h2>
              
              <Card className="bg-background border-2 border-[#b19681] shadow-lg">
                <CardContent className="p-6">
                  <Suspense fallback={<SocialMediaSkeleton />}>
                    <p className="text-muted-foreground mb-6 text-center">
                      Bądź na bieżąco z naszymi najnowszymi usługami i promocjami
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Link 
                        href="https://facebook.com/holisticpoint" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-primary/10 transition-all duration-300 hover:scale-105 group border border-[#b19681]"
                      >
                        <Image 
                          src="/facebook.png"
                          alt="Facebook"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                          loading="lazy"
                        />
                        <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                          Facebook
                        </span>
                      </Link>
                      <Link 
                        href="https://instagram.com/holisticpoint" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-primary/10 transition-all duration-300 hover:scale-105 group border border-[#b19681]"
                      >
                        <Image 
                          src="/instagram.png"
                          alt="Instagram"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                          loading="lazy"
                        />
                        <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                          Instagram
                        </span>
                      </Link>
                    </div>
                  </Suspense>
                </CardContent>
              </Card>
            </div>

            {/* Why Choose Us */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Star className="w-8 h-8 text-primary" />
                Dlaczego warto wybrać nas?
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    title: "Doświadczenie",
                    description: "Wieloletnie doświadczenie w branży wellness i organicznych zabiegów spa",
                    icon: <Star className="w-6 h-6" />
                  },
                  {
                    title: "Profesjonalizm",
                    description: "Certyfikowane zabiegi i najwyższe standardy jakości w Warszawie",
                    icon: <Building className="w-6 h-6" />
                  },
                  {
                    title: "Wsparcie",
                    description: "Kompleksowe wsparcie w wyborze zabiegów i umówieniu wizyt",
                    icon: <MessageCircle className="w-6 h-6" />
                  }
                ].map((item, index) => (
                  <Card key={index} className="bg-background border-2 border-[#b19681] shadow-lg hover:shadow-xl transition-all duration-300 group hover:border-primary/50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-primary group-hover:scale-110 transition-transform mt-1">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      </Suspense>
    </div>
  );
}