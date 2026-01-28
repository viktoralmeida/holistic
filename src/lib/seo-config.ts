/**
 * SEO Configuration for Holistic Point Spa
 * Centralized configuration for all SEO-related settings
 */

export const seoConfig = {
  // Basic site information
  site: {
    name: "Salon Holistic Point",
    shortName: "Holistic Point",
    description: "Doświadcz idealnej harmonii luksusu i natury w naszym salonie organicznym. Odmładzaj umysł, ciało i duszę dzięki naszym premium zabiegom wellness w Warszawie, Żoliborz.",
    url: "https://holisticpoint-headspa.com",
    logo: "https://holisticpoint-headspa.com/logo.jpg",
    defaultImage: "https://holisticpoint-headspa.com/salon.jpg",
    language: "pl",
    locale: "pl_PL",
  },

  // Business information for structured data
  business: {
    name: "Salon Holistic Point",
    alternateName: "Holistic Point Head Spa",
    description: "Premium organic spa experience offering luxury wellness treatments for mind, body, and soul rejuvenation in Warsaw, Żoliborz.",
    telephone: "+48 534 569 240",
    email: "headspa.holistic@gmail.com",
    address: {
      streetAddress: "Ul. Powązkowska 13/U5",
      addressLocality: "Warszawa",
      addressRegion: "Żoliborz",
      postalCode: "01-797",
      addressCountry: "PL"
    },
    geo: {
      latitude: "52.2689",
      longitude: "20.9851"
    },
    openingHours: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:00"
      },
      {
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "18:00"
      }
    ],
    priceRange: "$$",
    currenciesAccepted: "PLN",
    paymentAccepted: ["Cash", "Credit Card", "Debit Card"],
    aggregateRating: {
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1"
    }
  },

  // Social media profiles
  social: {
    facebook: "https://www.facebook.com/holisticpointspa",
    instagram: "https://www.instagram.com/holisticpointspa",
    tiktok: "https://www.tiktok.com/@holisticpointspa",
    twitter: "@holisticpointspa"
  },

  // Analytics and tracking
  analytics: {
    googleSearchConsole: "your-google-search-console-verification-code", // Replace with actual verification code
    bingWebmaster: "your-bing-verification-code", // Replace with actual verification code
    yandexWebmaster: "your-yandex-verification-code", // Replace with actual verification code
    facebookPixel: "YOUR_PIXEL_ID" // Replace with actual Facebook Pixel ID
  },

  // SEO keywords
  keywords: [
    "salon spa warszawa", "holistic point warszawa", "spa żoliborz", "zabiegi organiczne warszawa",
    "wellness warszawa", "masaże warszawa", "zabiegi na twarz warszawa", "salon urody żoliborz",
    "holistic point", "spa organiczne", "wellness", "zabiegi spa", "luksusowe spa", "naturalna uroda", 
    "holistyczne leczenie", "terapia masażem", "zabiegi na twarz", "zabiegi na ciało",
    "relaksacja", "łagodzenie stresu", "salon piękności", "centrum wellness", "organiczna pielęgnacja skóry",
    "aromaterapia", "medytacja", "mindfulness", "dbanie o siebie", "pieszczenie", "head spa",
    "salon holistic point", "holistic point head spa", "organiczne wellness", "luksusowe zabiegi",
    "spa polska", "wellness polska", "zabiegi piękności", "masaż terapeutyczny",
    "organiczna twarz", "sesja aromaterapii", "pakiety wellness", "usługi spa"
  ],

  // Service categories for structured data
  services: [
    {
      name: "Organic Facial Treatment",
      description: "Luxury organic facial treatment for radiant skin",
      category: "Facial Treatments"
    },
    {
      name: "Therapeutic Massage",
      description: "Professional therapeutic massage for stress relief",
      category: "Massage Therapy"
    },
    {
      name: "Aromatherapy Session",
      description: "Relaxing aromatherapy session with essential oils",
      category: "Aromatherapy"
    },
    {
      name: "Wellness Package",
      description: "Complete wellness package combining multiple treatments",
      category: "Wellness Packages"
    }
  ],

  // Technical SEO settings
  technical: {
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
    themeColor: "#d4af37",
    themeColorDark: "#b8941f",
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 5,
      userScalable: true,
    }
  },

  // Security headers
  security: {
    contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com;",
    xFrameOptions: "DENY",
    xContentTypeOptions: "nosniff",
    xXSSProtection: "1; mode=block",
    referrerPolicy: "strict-origin-when-cross-origin",
    permissionsPolicy: "camera=(), microphone=(), geolocation=()"
  }
};

// Helper function to generate structured data
export function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "SpaAndWellnessCenter",
    "name": seoConfig.business.name,
    "alternateName": seoConfig.business.alternateName,
    "description": seoConfig.business.description,
    "url": seoConfig.site.url,
    "logo": seoConfig.site.logo,
    "image": [
      seoConfig.site.defaultImage,
      "https://holisticpoint-headspa.com/masaze.jpg",
      "https://holisticpoint-headspa.com/nails.png"
    ],
    "telephone": seoConfig.business.telephone,
    "email": seoConfig.business.email,
    "address": seoConfig.business.address,
    "geo": seoConfig.business.geo,
    "openingHoursSpecification": seoConfig.business.openingHours,
    "priceRange": seoConfig.business.priceRange,
    "currenciesAccepted": seoConfig.business.currenciesAccepted,
    "paymentAccepted": seoConfig.business.paymentAccepted,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Spa Services",
      "itemListElement": seoConfig.services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description
        }
      }))
    },
    "aggregateRating": seoConfig.business.aggregateRating,
    "sameAs": [
      seoConfig.social.facebook,
      seoConfig.social.instagram,
      seoConfig.social.tiktok
    ],
    "areaServed": {
      "@type": "City",
      "name": seoConfig.business.address.addressLocality
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": seoConfig.business.geo,
      "geoRadius": "50000"
    }
  };
}

// Helper function to generate Open Graph data
export function generateOpenGraphData(pageTitle?: string, pageDescription?: string, pageImage?: string) {
  return {
    type: 'website',
    locale: seoConfig.site.locale,
    url: seoConfig.site.url,
    siteName: seoConfig.site.name,
    title: pageTitle || seoConfig.site.name,
    description: pageDescription || seoConfig.site.description,
    images: [
      {
        url: pageImage || seoConfig.site.defaultImage,
        width: 1200,
        height: 630,
        alt: `${seoConfig.site.name} - ${pageTitle || 'Premium Organic Wellness Experience'}`,
      },
    ],
  };
}

// Helper function to generate Twitter Card data
export function generateTwitterCardData(pageTitle?: string, pageDescription?: string, pageImage?: string) {
  return {
    card: 'summary_large_image',
    site: seoConfig.social.twitter,
    creator: seoConfig.social.twitter,
    title: pageTitle || seoConfig.site.name,
    description: pageDescription || seoConfig.site.description,
    images: [pageImage || seoConfig.site.defaultImage],
  };
}
