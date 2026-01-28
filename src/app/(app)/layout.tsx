import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import {NuqsAdapter} from 'nuqs/adapters/next/app'
import "./globals.css";
import {  TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "sonner";
import { Suspense } from "react";
import Footer from "@/modules/home/ui/components/footer";
import { Navbar } from "@/modules/home/ui/components/navbar";
import { ThemeProvider } from "next-themes";
 

import { ErrorBoundary } from "@/components/error-boundary";
import { LoadingPage } from "@/components/loading-spinner";
import { LayoutWithLoader } from "@/components/layout-with-loader";
// Import cookie banner directly
import { CookieConsentBanner } from "@/components/cookie-consent-banner";

export const dynamic = 'force-dynamic';

 const dmSans = DM_Sans({
  subsets:["latin"],
 })

export const metadata: Metadata = {
  title: {
    default: "Salon Holistic Point - Premium Organic Spa Experience | Warszawa, Żoliborz",
    template: "%s | Salon Holistic Point"
  },
  description: "Doświadcz idealnej harmonii luksusu i natury w naszym salonie organicznym. Profesjonalne zabiegi manicure, pedicure, fryzjerstwo damskie i depilacja laserowa w Warszawie, Żoliborz. Odmładzaj umysł, ciało i duszę dzięki naszym premium zabiegom wellness.",
  keywords: [
    // Core spa and wellness
    "salon spa warszawa", "holistic point warszawa", "spa żoliborz", "zabiegi organiczne warszawa",
    "wellness warszawa", "masaże warszawa", "zabiegi na twarz warszawa", "salon urody żoliborz",
    "holistic point", "spa organiczne", "wellness", "zabiegi spa", "luksusowe spa", "naturalna uroda", 
    "holistyczne leczenie", "terapia masażem", "zabiegi na twarz", "zabiegi na ciało",
    "relaksacja", "łagodzenie stresu", "salon piękności", "centrum wellness", "organiczna pielęgnacja skóry",
    "aromaterapia", "medytacja", "mindfulness", "dbanie o siebie", "pieszczenie", "head spa",
    
    // Manicure services
    "manicure warszawa", "manicure żoliborz", "manicure organiczny", "manicure hybrydowy", "manicure żelowy",
    "manicure francuski", "manicure japoński", "manicure klasyczny", "manicure spa", "manicure luksusowy",
    "pielęgnacja paznokci", "hybryda warszawa", "żel na paznokcie", "lakier hybrydowy", "przedłużanie paznokci",
    "manicure naturalny", "manicure ekologiczny", "manicure premium", "manicure holistyczny",
    
    // Pedicure services  
    "pedicure warszawa", "pedicure żoliborz", "pedicure organiczny", "pedicure spa", "pedicure luksusowy",
    "pielęgnacja stóp", "zabiegi na stopy", "pedicure francuski", "pedicure japoński", "pedicure klasyczny",
    "pedicure naturalny", "pedicure ekologiczny", "pedicure premium", "pedicure holistyczny",
    "zabiegi na paznokcie u stóp", "hybryda na stopach", "żel na paznokcie u stóp",
    
    // Women's hairdressing
    "fryzjer damski warszawa", "fryzjer damski żoliborz", "salon fryzjerski damski", "fryzjerstwo damskie",
    "strzyżenie damskie", "koloryzacja włosów", "farbowanie włosów", "wysokie światła", "balayage",
    "ombré", "sombra", "fryzjer organiczny", "fryzjer ekologiczny", "fryzjer naturalny",
    "pielęgnacja włosów", "zabiegi na włosy", "keratynowe prostowanie", "botox na włosy",
    "fryzjer luksusowy", "fryzjer premium", "fryzjer holistyczny", "stylizacja włosów",
    "upięcia ślubne", "fryzury ślubne", "fryzjer ślubny", "stylista włosów",
    
    // Laser hair removal
    "depilacja laserowa warszawa", "depilacja laserowa żoliborz", "laserowe usuwanie włosów",
    "depilacja laserowa twarz", "depilacja laserowa nogi", "depilacja laserowa bikini",
    "depilacja laserowa pachy", "depilacja laserowa plecy", "depilacja laserowa brzuch",
    "laser IPL", "zabiegi laserowe", "usuwanie włosów laserem", "depilacja definitywna",
    "depilacja laserowa bezpieczna", "depilacja laserowa skuteczna", "depilacja laserowa bezbolesna",
    "centrum depilacji laserowej", "klinika depilacji laserowej", "depilacja laserowa cena",
    
    // Location and service combinations
    "salon urody warszawa żoliborz", "centrum urody warszawa", "salon piękności warszawa",
    "luksusowy salon urody", "premium salon urody", "organiczny salon urody",
    "holistyczny salon urody", "naturalny salon urody", "ekologiczny salon urody"
  ],
  authors: [{ name: "Salon Holistic Point", url: "https://holisticpoint-headspa.com" }],
  creator: "Salon Holistic Point",
  publisher: "Salon Holistic Point",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://holisticpoint-headspa.com'),
  alternates: {
    canonical: '/',
    languages: {
      'pl-PL': '/pl',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://holisticpoint-headspa.com',
    siteName: 'Salon Holistic Point',
    title: 'Salon Holistic Point - Premium Organic Spa Experience | Warszawa, Żoliborz',
    description: 'Doświadcz idealnej harmonii luksusu i natury w naszym salonie organicznym. Profesjonalne zabiegi manicure, pedicure, fryzjerstwo damskie i depilacja laserowa w Warszawie, Żoliborz. Odmładzaj umysł, ciało i duszę dzięki naszym premium zabiegom wellness.',
    images: [
      {
        url: '/salon.jpg',
        width: 1200,
        height: 630,
        alt: 'Salon Holistic Point - Premium Organic Wellness Experience w Warszawie, Żoliborz',
      },
      {
        url: '/nails.png',
        width: 1200,
        height: 630,
        alt: 'Manicure i Pedicure - Profesjonalne zabiegi na paznokcie w Warszawie',
      },
      {
        url: '/hair.png',
        width: 1200,
        height: 630,
        alt: 'Fryzjer Damski - Profesjonalne strzyżenie i koloryzacja włosów w Warszawie',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
 
  category: 'wellness',
  classification: 'Health & Wellness',
  other: {
    'preload': 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap',
    'theme-color': '#d4af37',
    'msapplication-TileColor': '#d4af37',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d4af37" },
    { media: "(prefers-color-scheme: dark)", color: "#b8941f" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        {/* Preconnect to critical origins for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://vercel.app" />
        <link rel="dns-prefetch" href="https://vercel.app" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/logo.jpg" sizes="any" />
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
        <link rel="shortcut icon" href="/logo.jpg" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Sitemap and robots */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="robots" href="/robots.txt" />
        
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SpaAndWellnessCenter",
              "name": "Salon Holistic Point",
              "alternateName": "Holistic Point Head Spa",
              "description": "Premium organic spa experience offering luxury wellness treatments for mind, body, and soul rejuvenation in Warsaw, Żoliborz.",
              "url": "https://holisticpoint-headspa.com",
              "logo": "https://holisticpoint-headspa.com/logo.jpg",
              "image": [
                "https://holisticpoint-headspa.com/salon.jpg",
                "https://holisticpoint-headspa.com/masaze.jpg",
                "https://holisticpoint-headspa.com/nails.png",
                "https://holisticpoint-headspa.com/hair.png"
              ],
              "telephone": "+48 534 569 240",
              "email": "headspa.holistic@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ul. Powązkowska 13/U5",
                "addressLocality": "Warszawa",
                "addressRegion": "Żoliborz",
                "postalCode": "01-797",
                "addressCountry": "PL"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "52.2689",
                "longitude": "20.9851"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "20:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "10:00",
                  "closes": "18:00"
                }
              ],
              "priceRange": "$$",
              "currenciesAccepted": "PLN",
              "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Holistic Beauty & Wellness Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Organic Facial Treatment",
                      "description": "Luxury organic facial treatment for radiant skin"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Therapeutic Massage",
                      "description": "Professional therapeutic massage for stress relief"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Aromatherapy Session",
                      "description": "Relaxing aromatherapy session with essential oils"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Manicure Services",
                      "description": "Professional manicure services including organic, hybrid, gel, and classic manicures"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Pedicure Services",
                      "description": "Luxury pedicure treatments for foot care and nail enhancement"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Women's Hairdressing",
                      "description": "Professional women's hairdressing including cutting, coloring, styling, and hair treatments"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Laser Hair Removal",
                      "description": "Safe and effective laser hair removal treatments for permanent hair reduction"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "127",
                "bestRating": "5",
                "worstRating": "1"
              },
              "sameAs": [
                "https://www.facebook.com/holistic.point_",
                "https://www.instagram.com/headspa_holistic.point",
                "https://www.instagram.com/holistic.point_",
              ],
              "areaServed": {
                "@type": "City",
                "name": "Warszawa"
              },
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "52.2689",
                  "longitude": "20.9851"
                },
                "geoRadius": "50000"
              }
            })
          }}
        />
        
        {/* Additional Service-Specific Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "BeautySalon",
                "name": "Salon Holistic Point - Manicure & Pedicure",
                "description": "Professional manicure and pedicure services in Warsaw, Żoliborz",
                "url": "https://holisticpoint-headspa.com",
                "telephone": "+48 534 569 240",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Ul. Powązkowska 13/U5",
                  "addressLocality": "Warszawa",
                  "addressRegion": "Żoliborz",
                  "postalCode": "01-797",
                  "addressCountry": "PL"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Nail Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Manicure Organiczny",
                        "description": "Naturalny manicure z organicznymi produktami"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Manicure Hybrydowy",
                        "description": "Trwały manicure hybrydowy"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Pedicure Spa",
                        "description": "Luksusowy pedicure z zabiegami spa"
                      }
                    }
                  ]
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "HairSalon",
                "name": "Salon Holistic Point - Fryzjer Damski",
                "description": "Profesjonalne fryzjerstwo damskie w Warszawie, Żoliborz",
                "url": "https://holisticpoint-headspa.com",
                "telephone": "+48 534 569 240",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Ul. Powązkowska 13/U5",
                  "addressLocality": "Warszawa",
                  "addressRegion": "Żoliborz",
                  "postalCode": "01-797",
                  "addressCountry": "PL"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Hair Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Strzyżenie Damskie",
                        "description": "Profesjonalne strzyżenie włosów damskich"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Koloryzacja Włosów",
                        "description": "Koloryzacja, balayage, ombré"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Zabiegi na Włosy",
                        "description": "Keratynowe prostowanie, botox na włosy"
                      }
                    }
                  ]
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "MedicalClinic",
                "name": "Salon Holistic Point - Depilacja Laserowa",
                "description": "Bezpieczna i skuteczna depilacja laserowa w Warszawie, Żoliborz",
                "url": "https://holisticpoint-headspa.com",
                "telephone": "+48 534 569 240",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Ul. Powązkowska 13/U5",
                  "addressLocality": "Warszawa",
                  "addressRegion": "Żoliborz",
                  "postalCode": "01-797",
                  "addressCountry": "PL"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Laser Hair Removal Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "MedicalProcedure",
                        "name": "Depilacja Laserowa Twarz",
                        "description": "Laserowe usuwanie włosów z twarzy"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "MedicalProcedure",
                        "name": "Depilacja Laserowa Ciało",
                        "description": "Laserowe usuwanie włosów z ciała"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "MedicalProcedure",
                        "name": "Depilacja Laserowa IPL",
                        "description": "Depilacja laserowa technologią IPL"
                      }
                    }
                  ]
                }
              }
            ])
          }}
        />
        
        {/* Additional SEO meta tags */}
        <meta name="geo.region" content="PL-MZ" />
        <meta name="geo.placename" content="Warszawa, Żoliborz" />
        <meta name="geo.position" content="52.2689;20.9851" />
        <meta name="ICBM" content="52.2689, 20.9851" />
        
        {/* Service-specific meta tags */}
        <meta name="services" content="manicure, pedicure, fryzjer damski, depilacja laserowa, spa, wellness, masaże, zabiegi na twarz" />
        <meta name="specialties" content="manicure organiczny, pedicure spa, fryzjerstwo damskie, depilacja laserowa IPL, zabiegi holistyczne" />
     
        <meta name="business-type" content="salon urody, centrum wellness, spa organiczne, fryzjer damski, centrum depilacji laserowej" />
        
        {/* Dublin Core metadata */}
        <meta name="DC.title" content="Salon Holistic Point - Premium Organic Spa Experience | Warszawa, Żoliborz" />
        <meta name="DC.description" content="Doświadcz idealnej harmonii luksusu i natury w naszym salonie organicznym. Profesjonalne zabiegi manicure, pedicure, fryzjerstwo damskie i depilacja laserowa w Warszawie, Żoliborz. Odmładzaj umysł, ciało i duszę dzięki naszym premium zabiegom wellness." />
        <meta name="DC.subject" content="Salon Spa, Wellness, Zabiegi Organiczne, Luksusowa Uroda, Manicure, Pedicure, Fryzjer Damski, Depilacja Laserowa, Warszawa, Żoliborz" />
        <meta name="DC.language" content="pl" />
        <meta name="DC.coverage" content="Warszawa, Żoliborz, Polska" />
        <meta name="DC.creator" content="Salon Holistic Point" />
        <meta name="DC.publisher" content="Salon Holistic Point" />
        <meta name="DC.rights" content="© 2024 Salon Holistic Point. Wszystkie prawa zastrzeżone." />
        <meta name="DC.date.created" content="2024-01-01" />
        <meta name="DC.date.modified" content="2024-12-19" />
        <meta name="DC.type" content="Service" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.identifier" content="https://holisticpoint-headspa.com" />
        
        {/* Performance and Security */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
        
  
      </head>
      <body
        className={`${dmSans.className} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <NuqsAdapter>
              <TRPCReactProvider>
                <LayoutWithLoader>
                  <div className="flex flex-col min-h-screen">
                    <Suspense fallback={<div className="h-16 bg-white border-b" />}>
                      <Navbar/> 
                    </Suspense>
                    
                    <main className="flex-1">
                      <Suspense fallback={<LoadingPage text="Loading page..." />}>
                        {children}
                      </Suspense>
                    </main>
                    
                    <Suspense fallback={<div className="h-64 bg-gray-50" />}>
                      <Footer/>
                    </Suspense>
                    
                    {/* Cookie Consent Banner - appears on all pages */}
                    <CookieConsentBanner />
                  </div>
                </LayoutWithLoader>
                <Toaster 
                  position="top-right"
                  offset="80px 20px"
                  toastOptions={{
                    duration: 2000,
                    style: {
                      background: '#f5f5dc', // Beige background
                      color: '#2c2c2c', // Matte black text
                      border: '1px solid #d4af37',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      fontWeight: '500',
                    },
                  }}
                  className="cart-toast"
                />
              </TRPCReactProvider>
             </NuqsAdapter>
          </ErrorBoundary>
        </ThemeProvider>
        
 
      </body>
    </html>
  );
}
