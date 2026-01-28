"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
// Optimized icon imports - only import what's actually used
import { 
  Sparkles, 
  ArrowRight, 
  Check,
  MapPin,
  Monitor,
  Award,
  ShoppingCart,
  GraduationCap,
  Zap,
  Leaf,
  Droplets,
  Star,
  Target,
  Building,
  Scissors,
  HandHeart,
  Heart
} from "lucide-react";
// Components are now lazy loaded below
import { Suspense, lazy } from "react";
import Link from "next/link";

// Lazy load heavy components for better performance
const ContactFormNew = lazy(() => import("@/components/contact-form-new").then(module => ({ default: module.ContactFormNew })));
const ScrollToTop = lazy(() => import("@/components/scroll-to-top").then(module => ({ default: module.ScrollToTop })));

export default function Home() {

  // Optimized performance detection - runs only once
  useEffect(() => {
    // Cache user agent to avoid repeated regex tests
    const userAgent = navigator.userAgent;
    const isFirefoxMobile = /Firefox/.test(userAgent) && /Mobile/.test(userAgent);
    const isLowEndDevice = /Android.*4\.|Android.*5\.|Android.*6\./.test(userAgent);
    
    if (isFirefoxMobile) {
      document.documentElement.classList.add('firefox-mobile');
    }
    
    if (isLowEndDevice) {
      document.documentElement.classList.add('low-end-device');
    }
  }, []); // Empty dependency array ensures this runs only once
  

  const quickActions = [
    {
      title: "Kup sprzęt",
      description: "Profesjonalne urządzenia HEAD SPA",
      icon: <ShoppingCart className="w-6 h-6 text-[#7FB069]" />,
      color: "from-[#7FB069] to-[#7FB069]/80",
      href: "/products"
    },
    {
      title: "Szkolenia",
      description: "Naucz się od ekspertów",
      icon: <GraduationCap className="w-6 h-6 text-[#6B9BD2]" />,
      color: "from-[#6B9BD2] to-[#6B9BD2]/80",
      href: "/online-training"
    },
    {
      title: "Kontakt",
      description: "Skontaktuj się z nami",
      icon: <MapPin className="w-6 h-6 text-chart-3" />,
      color: "from-chart-3 to-chart-3/80",
      href: "/contact"
    }
  ];

  const features = [
    {
      title: "ŁÓŻKA HEAD SPA",
      description: "Zintegrowane z myjką",
      icon: <Droplets className="w-8 h-8" />,
      color: "from-blue-500/20 to-purple-500/20"
    },
    {
      title: "MOBILNE MYJKI",
      description: "Elastyczne rozwiązania",
      icon: <Zap className="w-8 h-8" />,
      color: "from-green-500/20 to-blue-500/20"
    },
    {
      title: "AKCESORIA",
      description: "Kompletne wyposażenie",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "KOSMETYKI PREMIUM",
      description: "Najwyższej jakości",
      icon: <Leaf className="w-8 h-8" />,
      color: "from-emerald-500/20 to-teal-500/20"
    }
  ];

  const testimonials = [
    {
      name: "Anna Kowalska",
      role: "Właścicielka salonu",
      content: "Przychody wzrosły o 40% po wprowadzeniu HEAD SPA!",
      rating: 5
    },
    {
      name: "Marek Nowak",
      role: "Fryzjer",
      content: "Szkolenie było profesjonalne i praktyczne.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="h-0" />}>
      <ScrollToTop />
      </Suspense>
      
      {/* Hero Section - Enhanced Japanese Breeze Style */}
      <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-background via-background/95 to-background">
        
        {/* Enhanced flowing lines for Japanese aesthetic */}
        <div className="absolute inset-0 opacity-40 z-0">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#b19681', stopOpacity: 0.6}} />
                <stop offset="50%" style={{stopColor: '#b19681', stopOpacity: 0.4}} />
                <stop offset="100%" style={{stopColor: '#b19681', stopOpacity: 0.1}} />
              </linearGradient>
              <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#b19681', stopOpacity: 0.5}} />
                <stop offset="50%" style={{stopColor: '#b19681', stopOpacity: 0.3}} />
                <stop offset="100%" style={{stopColor: '#b19681', stopOpacity: 0.1}} />
              </linearGradient>
              <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#b19681', stopOpacity: 0.55}} />
                <stop offset="50%" style={{stopColor: '#b19681', stopOpacity: 0.35}} />
                <stop offset="100%" style={{stopColor: '#b19681', stopOpacity: 0.1}} />
              </linearGradient>
              <linearGradient id="lineGradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#b19681', stopOpacity: 0.45}} />
                <stop offset="50%" style={{stopColor: '#b19681', stopOpacity: 0.25}} />
                <stop offset="100%" style={{stopColor: '#b19681', stopOpacity: 0.1}} />
              </linearGradient>
              <linearGradient id="lineGradient5" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#b19681', stopOpacity: 0.4}} />
                <stop offset="50%" style={{stopColor: '#b19681', stopOpacity: 0.2}} />
                <stop offset="100%" style={{stopColor: '#b19681', stopOpacity: 0.1}} />
              </linearGradient>
            </defs>
            <path d="M0,15 Q20,5 40,15 T80,15 T100,15" stroke="url(#lineGradient1)" strokeWidth="0.8" fill="none" />
            <path d="M0,35 Q25,25 50,35 T100,35" stroke="url(#lineGradient2)" strokeWidth="0.7" fill="none" />
            <path d="M0,55 Q30,45 60,55 T100,55" stroke="url(#lineGradient3)" strokeWidth="0.75" fill="none" />
            <path d="M0,75 Q35,65 70,75 T100,75" stroke="url(#lineGradient4)" strokeWidth="0.65" fill="none" />
            <path d="M0,85 Q40,75 80,85 T100,85" stroke="url(#lineGradient5)" strokeWidth="0.6" fill="none" />
          </svg>
        </div>
        
        {/* Enhanced floating bubbles with glassmorphism */}
        <div className="absolute inset-0 opacity-30 z-0">
          <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-[#b19681]/80 rounded-full animate-float-slow shadow-lg"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#b19681]/60 rounded-full animate-float-medium shadow-md"></div>
          <div className="absolute bottom-1/4 left-1/2 w-3.5 h-3.5 bg-[#b19681]/70 rounded-full animate-float-fast shadow-lg"></div>
          <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-[#b19681]/50 rounded-full animate-float-slow shadow-md"></div>
          <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-[#b19681]/65 rounded-full animate-float-medium shadow-lg"></div>
          <div className="absolute top-2/3 right-1/6 w-3.5 h-3.5 bg-[#b19681]/55 rounded-full animate-float-fast shadow-md"></div>
          <div className="absolute top-1/6 left-1/2 w-2.5 h-2.5 bg-[#b19681]/45 rounded-full animate-float-slow shadow-lg"></div>
          <div className="absolute bottom-1/6 right-1/3 w-3 h-3 bg-[#b19681]/60 rounded-full animate-float-medium shadow-md"></div>
          <div className="absolute top-1/5 right-1/5 w-2 h-2 bg-[#b19681]/40 rounded-full animate-float-fast shadow-sm"></div>
          <div className="absolute bottom-1/5 left-1/5 w-2.5 h-2.5 bg-[#b19681]/50 rounded-full animate-float-slow shadow-sm"></div>
        </div>
        
        {/* Enhanced background overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20 z-10"></div>
        
        <div className="relative flex flex-col lg:flex-row min-h-screen">
          {/* Left Content - Modern Design */}
          <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 z-40">
            <div className="max-w-2xl space-y-6 sm:space-y-8">
              {/* Modern status badge */}
              <div className="relative">
                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-0.5 h-6 bg-gradient-to-b from-[#b19681] to-[#b19681]/30 rounded-full"></div>
                <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/25 dark:bg-black/25 backdrop-blur-md border border-[#b19681]/50 rounded-xl px-4 sm:px-6 py-2 sm:py-3 text-foreground shadow-sm">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-semibold tracking-wide">HOLISTIC HEAD SPA</span>
                </div>
              </div>
              
              {/* Modern title */}
              <div className="space-y-4 sm:space-y-6">
                <div className="relative">
                  <div className="absolute -left-3 top-0 w-0.5 h-16 sm:h-20 bg-gradient-to-b from-[#b19681] to-[#b19681]/20 rounded-full"></div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                    <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary/80 dark:text-primary/90 font-medium mb-2 sm:mb-3 tracking-wide">
                      HEAD SPA
                    </span>
                    <span className="block text-foreground dark:text-foreground mb-1 sm:mb-2 font-semibold">
                  Twoje źródło
                    </span>
                    <span className="block text-primary dark:text-primary font-bold drop-shadow-sm">
                    piękna i relaksu
                  </span>
                </h1>
                </div>
                
                {/* Modern subtitle */}
                <div className="relative pl-4 sm:pl-6">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 sm:w-4 h-0.5 bg-[#b19681]"></div>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 dark:text-foreground/95 leading-relaxed font-medium">
                  Profesjonalne urządzenia i szkolenia, które zmieniają doświadczenie klienta w salonie… i Twoje wyniki sprzedaży.
                </p>
                </div>
              </div>
              
              {/* Modern CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-[#7FB069] to-[#7FB069]/90 hover:from-[#7FB069]/90 hover:to-[#7FB069]/80 text-white font-bold px-6 sm:px-8 lg:px-10 py-4 sm:py-5 lg:py-6 text-base sm:text-lg lg:text-xl rounded-md shadow-2xl hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[2px] transition-all duration-300 border-2 border-[#7FB069] w-full sm:w-auto"
                  asChild
                >
                  <Link href="/products" className="flex items-center justify-center">
                    <ShoppingCart className="mr-2 sm:mr-3 w-6 h-6 sm:w-7 sm:h-7 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="relative z-10">Kup urządzenia</span>
                    <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                    {/* Enhanced wave effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-[#6B9BD2] to-[#6B9BD2]/90 hover:from-[#6B9BD2]/90 hover:to-[#6B9BD2]/80 text-white font-bold px-6 sm:px-8 lg:px-10 py-4 sm:py-5 lg:py-6 text-base sm:text-lg lg:text-xl rounded-md shadow-2xl hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[2px] transition-all duration-300 border-2 border-[#6B9BD2] w-full sm:w-auto"
                  asChild
                >
                  <Link href="/online-training" className="flex items-center justify-center">
                    <GraduationCap className="mr-2 sm:mr-3 w-6 h-6 sm:w-7 sm:h-7 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="relative z-10">Szkolenia</span>
                    {/* Enhanced wave effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </Link>
                </Button>
              </div>
              
            </div>
            </div>
            
          {/* Enhanced Right Image Section */}
          <div className="w-full lg:w-1/2 relative h-[400px] sm:h-[500px] lg:h-screen lg:-mt-20 z-20">
            <div className="relative h-full">
              {/* Enhanced modern frame with dramatic effect */}
              <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8 bg-gradient-to-br from-[#b19681]/40 via-[#b19681]/30 to-transparent rounded-2xl sm:rounded-3xl transform rotate-2 sm:rotate-3 shadow-xl sm:shadow-2xl"></div>
              <div className="absolute -inset-3 sm:-inset-4 lg:-inset-6 bg-gradient-to-tl from-[#b19681]/30 via-[#b19681]/20 to-transparent rounded-xl sm:rounded-2xl transform -rotate-1 sm:-rotate-2 shadow-lg sm:shadow-xl"></div>
              <div className="absolute -inset-2 sm:-inset-3 lg:-inset-4 bg-gradient-to-br from-[#b19681]/20 to-transparent rounded-lg sm:rounded-xl transform rotate-0.5 sm:rotate-1 shadow-md sm:shadow-lg"></div>
              
              {/* Main image container with enhanced styling */}
              <div className="relative h-full overflow-hidden shadow-xl sm:shadow-2xl rounded-xl sm:rounded-2xl">
                    <Image 
                  src="/banner1.jpg"
                  alt="HEAD SPA - Profesjonalne urządzenia i szkolenia"
                  priority={true}
                  quality={100}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="empty"
                  className="object-cover w-full h-full object-top transition-transform duration-700 hover:scale-105"
                  fill
                />
                
                {/* Enhanced overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#b19681]/15 via-transparent to-[#b19681]/15"></div>
                
                {/* Enhanced floating decorative elements */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 border-2 border-white/70 rounded-full bg-white/20 backdrop-blur-sm shadow-md sm:shadow-lg animate-float-slow"></div>
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-6 h-6 sm:w-10 sm:h-10 border-2 border-white/50 rounded-full bg-white/10 backdrop-blur-sm shadow-md sm:shadow-lg animate-float-medium"></div>
                <div className="absolute top-1/2 left-2 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-2 border-white/40 rounded-full bg-white/5 backdrop-blur-sm animate-float-fast"></div>
                
                {/* Minimalistic Booksy Integration - Bottom Right */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                  <Link 
                    href="https://holisticpoint.booksy.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 sm:gap-4 bg-gray-800/90 dark:bg-gray-700/90 backdrop-blur-md rounded-full px-4 py-3 sm:px-6 sm:py-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-600/30"
                  >
                    <Image 
                      src="/booksyimg.jpeg" 
                      alt="Booksy - Umów o wizytę w Booksy" 
                      width={40} 
                      height={40} 
                      className="rounded-full w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-110" 
                      quality={95}
                    />
                    <span className="text-sm sm:text-base lg:text-lg font-semibold text-white dark:text-gray-100 whitespace-nowrap relative">
                      <span className="booksy-animated-text">
                        Umów o wizytę w Booksy
                      </span>
                    </span>
                  </Link>
                </div>
                  </div>
              
              {/* Enhanced floating decorative elements */}
              <div className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 w-12 h-12 sm:w-20 sm:h-20 border-2 border-[#b19681]/50 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center shadow-lg sm:shadow-xl animate-float-slow">
                <div className="w-6 h-6 sm:w-10 sm:h-10 border-2 border-[#b19681] rounded-full bg-[#b19681]/15"></div>
                </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 w-10 h-10 sm:w-16 sm:h-16 border-2 border-[#b19681]/60 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center shadow-lg sm:shadow-xl animate-float-medium">
                <div className="w-5 h-5 sm:w-8 sm:h-8 border-2 border-[#b19681] rounded-full bg-[#b19681]/15"></div>
              </div>
              <div className="absolute top-1/3 -left-3 sm:-left-6 w-8 h-8 sm:w-12 sm:h-12 border-2 border-[#b19681]/50 rounded-full bg-background/50 backdrop-blur-sm shadow-md sm:shadow-lg animate-float-fast"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section - Production Level */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-card/5 to-background relative z-30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3"></div>
        <div className="hidden sm:block absolute top-0 left-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl firefox-mobile-hidden animate-float-slow"></div>
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-32 h-32 bg-accent/5 rounded-full blur-2xl firefox-mobile-hidden animate-float-medium"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Title - Above the content */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
              Rozpocznij swoją podróż z
              <span className="block text-primary dark:text-primary font-bold">
                HEAD SPA
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Wybierz ścieżkę, która najlepiej pasuje do Twoich potrzeb
            </p>
          </div>
          
          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Image */}
            <div className="order-2 lg:order-1">
              <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/rozpocz.jpg"
                  alt="Rozpocznij swoją podróż z HEAD SPA"
                  priority={true}
                  quality={100}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="empty"
                  className="object-cover w-full h-full object-center transition-transform duration-700 hover:scale-105"
                  fill
                />
                
                {/* Overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                
                {/* Decorative elements */}
                <div className="absolute top-6 right-6 w-12 h-12 border-2 border-white/70 rounded-full bg-white/20 backdrop-blur-sm shadow-lg"></div>
                <div className="absolute bottom-6 left-6 w-10 h-10 border-2 border-white/50 rounded-full bg-white/10 backdrop-blur-sm shadow-lg"></div>
              </div>
            </div>
            
            {/* Right Side - Content and Buttons */}
            <div className="order-1 lg:order-2 space-y-8">
              <div className="space-y-6">
                <div className="flex flex-col gap-3">
                  {quickActions.map((action, index) => (
                    <Link key={index} href={action.href} className="block group">
                      <div className="bg-card/80 backdrop-blur-md border border-[#b19681] shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:bg-card/90 rounded-xl p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                            {action.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                              {action.title}
                            </h3>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                              {action.description}
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-card/3 to-background relative z-30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/2 via-transparent to-primary/2"></div>
        <div className="hidden sm:block absolute top-0 right-1/4 w-40 h-40 bg-accent/5 rounded-full blur-3xl firefox-mobile-hidden animate-float-medium"></div>
        <div className="hidden sm:block absolute bottom-0 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-2xl firefox-mobile-hidden animate-float-slow"></div>
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
                Profesjonalny sprzęt
                <span className="block bg-gradient-to-r from-primary via-accent to-chart-3 bg-clip-text text-transparent">
                  HEAD SPA
                </span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Od ekspertów dla profesjonalistów. Wyselekcjonowaliśmy urządzenia, które zapewniają najwyższą jakość zabiegów HEAD SPA.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              {features.map((feature, index) => (
                <Link key={index} href="/products" className="block group">
                  <Card className="bg-card/80 backdrop-blur-md firefox-mobile-fallback border border-[#b19681] shadow-xl hover:shadow-2xl cursor-pointer h-full transition-all duration-500 hover:scale-105 hover:bg-card/90">
                    <CardContent className="p-8 sm:p-10 text-center h-full flex flex-col">
                      <div className={`w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed flex-1">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Training & Benefits Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-card/20 to-background relative overflow-hidden z-30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="hidden sm:block absolute top-0 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-primary/5 rounded-full blur-3xl firefox-mobile-hidden animate-float-slow"></div>
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-accent/5 rounded-full blur-3xl firefox-mobile-hidden animate-float-medium"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
            {/* Enhanced Training Card */}
            <Card className="bg-card backdrop-blur-md firefox-mobile-fallback border border-[#b19681] shadow-2xl hover:shadow-3xl relative overflow-hidden h-full transition-all duration-500 hover:scale-105">
              <div className="hidden sm:block absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-accent/5 rounded-full blur-2xl"></div>
              <CardContent className="p-8 sm:p-10 lg:p-12 relative z-10 h-full flex flex-col">
                <div className="space-y-8 sm:space-y-10 flex-1">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-accent/30 to-chart-3/30 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                      <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Szkolenia HEAD SPA</h3>
                      <p className="text-lg sm:text-xl text-muted-foreground">Naucz się wykonywać HEAD SPA jak mistrz</p>
                    </div>
                  </div>
                  
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    Wprowadź do swojego salonu usługę, która wyróżni Cię na rynku i zachwyci klientów.
                  </p>
                  
                  <div className="space-y-5 sm:space-y-6">
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <span className="text-base sm:text-lg lg:text-xl text-foreground leading-relaxed">Szkolenia stacjonarne w Warszawie – 10 godzin praktyki w małych grupach 2 osobowych</span>
                    </div>
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <span className="text-base sm:text-lg lg:text-xl text-foreground leading-relaxed">Szkolenia online – dostępne z każdego miejsca na świecie (wkrótce)</span>
                    </div>
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <span className="text-base sm:text-lg lg:text-xl text-foreground leading-relaxed">Wsparcie marketingowe</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-5">
                    <h4 className="font-bold text-foreground text-lg sm:text-xl">Po naszym szkoleniu:</h4>
                    <ul className="space-y-3 sm:space-y-4 text-muted-foreground">
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        </div>
                        <span className="text-base sm:text-lg leading-relaxed">Będziesz wykonywać zabieg perfekcyjnie od pierwszego dnia</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        </div>
                        <span className="text-base sm:text-lg leading-relaxed">Poznasz techniki, które zwiększają wartość usługi</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        </div>
                        <span className="text-base sm:text-lg leading-relaxed">Zyskasz klientów, którzy wracają i polecają</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Button size="lg" className="bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-accent-foreground font-bold text-base sm:text-lg px-8 sm:px-10 lg:px-12 py-5 sm:py-6 lg:py-7 rounded-xl shadow-2xl hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300 group w-full border-2 border-[#b19681] mt-auto hover:scale-105" asChild>
                    <Link href="/online-training">
                      Zapisz się teraz
                      <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Benefits Card */}
            <Card className="bg-card backdrop-blur-md firefox-mobile-fallback border border-[#b19681] shadow-2xl hover:shadow-3xl relative overflow-hidden h-full transition-all duration-500 hover:scale-105">
              <div className="hidden sm:block absolute top-0 left-0 w-32 h-32 sm:w-40 sm:h-40 bg-primary/5 rounded-full blur-2xl"></div>
              <CardContent className="p-8 sm:p-10 lg:p-12 relative z-10 h-full flex flex-col">
                <div className="space-y-8 sm:space-y-10 flex-1">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                      <Award className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Dlaczego my?</h3>
                      <p className="text-lg sm:text-xl text-muted-foreground">Sprawdzone rozwiązania</p>
                    </div>
                  </div>

                  
                   
                  <div className="space-y-5 sm:space-y-6">
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <span className="text-base sm:text-lg lg:text-xl text-foreground leading-relaxed">Sprzęt testowany w realnych warunkach</span>
                    </div>
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <span className="text-base sm:text-lg lg:text-xl text-foreground leading-relaxed">Doradztwo w wyborze i wdrożeniu</span>
                    </div>
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <span className="text-base sm:text-lg lg:text-xl text-foreground leading-relaxed">Doświadczenie biznesowe</span>
                    </div>
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <span className="text-base sm:text-lg lg:text-xl text-foreground leading-relaxed">Wielu zadowolonych klientów</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Success Combination Section */}
      <section className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-card/3 to-background relative z-30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-accent/2"></div>
        <div className="hidden sm:block absolute top-0 left-1/3 w-40 h-40 bg-primary/5 rounded-full blur-3xl firefox-mobile-hidden animate-float-medium"></div>
        <div className="hidden sm:block absolute bottom-0 right-1/3 w-32 h-32 bg-accent/5 rounded-full blur-2xl firefox-mobile-hidden animate-float-slow"></div>
        <div className="relative z-10">
          <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-8 sm:mb-10">
            Połącz to w
            <span className="block bg-gradient-to-r from-primary via-accent to-chart-3 bg-clip-text text-transparent">
              sukces
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 sm:mb-16 leading-relaxed">
            Kupując sprzęt i przechodząc szkolenie, otrzymujesz:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-12 sm:mb-16">
            <div className="bg-card/80 backdrop-blur-md firefox-mobile-fallback border border-[#b19681] rounded-3xl p-8 sm:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-relaxed">Pełne wdrożenie usługi HEAD SPA</h3>
            </div>
            <div className="bg-card/80 backdrop-blur-md firefox-mobile-fallback border border-[#b19681] rounded-3xl p-8 sm:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
              <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-chart-3/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-relaxed">Profesjonalne narzędzia i techniki pracy</h3>
            </div>
            <div className="bg-card/80 backdrop-blur-md firefox-mobile-fallback border border-[#b19681] rounded-3xl p-8 sm:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
              <div className="w-20 h-20 bg-gradient-to-br from-chart-3/20 to-chart-5/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-bold text-chart-3">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-relaxed">Gotowy model sprzedaży i promocji</h3>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-3xl p-8 sm:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-primary" />
            </div>
            <p className="text-xl sm:text-2xl text-foreground leading-relaxed">
              Dzięki temu możesz zacząć zarabiać na usłudze HEAD SPA już od pierwszego tygodnia po szkoleniu.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* Enhanced About Us Section */}
      <section className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-card/30 to-background relative overflow-hidden z-30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="hidden sm:block absolute top-0 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl firefox-mobile-hidden animate-float-slow"></div>
        <div className="hidden sm:block absolute bottom-0 left-1/4 w-32 h-32 bg-accent/10 rounded-full blur-2xl firefox-mobile-hidden animate-float-medium"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-8 sm:mb-12">
            O nas
          </h2>
          <Link href="/about" className="block group">
            <Card className="bg-card backdrop-blur-sm md:backdrop-blur-xl border border-[#b19681] shadow-2xl relative overflow-hidden hover:shadow-3xl cursor-pointer transition-all duration-500 hover:scale-105">
              <div className="hidden sm:block absolute top-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-2xl"></div>
              <CardContent className="p-10 sm:p-12 lg:p-16 relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-chart-4/20 to-chart-5/20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Building className="w-12 h-12 text-chart-4" />
                </div>
                <p className="text-xl sm:text-2xl text-foreground leading-relaxed mb-6">
                  Jesteśmy zespołem ekspertów beauty, którzy nie tylko uczą HEAD SPA, ale codziennie je wykonują w naszym salonie w Warszawie.
                </p>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Dzięki temu wiesz, że otrzymujesz wiedzę i sprzęt sprawdzony w realnej pracy z klientem.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Enhanced Salon Services Section */}
      <section className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-card/3 to-background relative z-30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/2 via-transparent to-primary/2"></div>
        <div className="hidden sm:block absolute top-0 left-1/4 w-32 h-32 bg-accent/5 rounded-full blur-2xl firefox-mobile-hidden animate-float-fast"></div>
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl firefox-mobile-hidden animate-float-slow"></div>
        <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 sm:mb-8">
              Usługi naszego salonu
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
              Chcesz doświadczyć HEAD SPA na własnej skórze?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {[
              { name: "HEAD SPA", icon: <Heart className="w-6 h-6" /> },
              { name: "Fryzjerstwo", icon: <Scissors className="w-6 h-6" /> },
              { name: "Manicure & Pedicure", icon: <HandHeart className="w-6 h-6" /> },
              { name: "Masaże", icon: <Zap className="w-6 h-6" /> },
              { name: "Depilacja laserowa", icon: <Sparkles className="w-6 h-6" /> }
            ].map((service, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur-md firefox-mobile-fallback border border-[#b19681] shadow-xl hover:shadow-2xl group transition-all duration-500 hover:scale-105">
                <CardContent className="p-6 sm:p-8 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-chart-5/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  <div className="relative z-10">
                    <div className="flex justify-center mb-4 sm:mb-6 text-chart-5 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="font-bold text-foreground text-base sm:text-lg group-hover:text-primary transition-colors duration-300">
                      {service.name}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg sm:text-xl text-muted-foreground mb-6">Zapraszamy do naszego salonu</p>
 
          </div>
        </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-card/3 to-background relative z-30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-accent/2"></div>
        <div className="hidden sm:block absolute top-0 right-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl firefox-mobile-hidden animate-float-medium"></div>
        <div className="hidden sm:block absolute bottom-0 left-1/4 w-32 h-32 bg-accent/5 rounded-full blur-2xl firefox-mobile-hidden animate-float-slow"></div>
        <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 sm:mb-8">
              Co mówią nasi klienci
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
              Sprawdź opinie osób, które już wprowadziły HEAD SPA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur-md firefox-mobile-fallback border border-[#b19681] shadow-2xl hover:shadow-3xl group transition-all duration-500 hover:scale-105">
                <CardContent className="p-8 sm:p-10">
                  <div className="flex mb-6 sm:mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 sm:w-7 sm:h-7 text-chart-4 fill-current group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                  <p className="text-lg sm:text-xl text-foreground mb-6 sm:mb-8 italic leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="border-t border-[#b19681]/20 pt-4 sm:pt-6">
                    <p className="text-xl sm:text-2xl font-bold text-foreground mb-1">{testimonial.name}</p>
                    <p className="text-base sm:text-lg text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* Enhanced Contact Form Section */}
      <section className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden z-30">
        <div className="absolute inset-0 bg-background"></div>
        <div className="hidden sm:block absolute top-0 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-sm md:blur-3xl firefox-mobile-hidden animate-float-slow"></div>
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-32 h-32 bg-accent/10 rounded-full blur-sm md:blur-3xl firefox-mobile-hidden animate-float-medium"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <Suspense fallback={
            <div className="bg-card/80 backdrop-blur-md firefox-mobile-fallback border border-[#b19681] shadow-2xl rounded-2xl p-8 sm:p-10">
              <div className="space-y-4 sm:space-y-6">
                <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
                <div className="h-10 bg-muted rounded"></div>
                <div className="h-10 bg-muted rounded"></div>
                <div className="h-24 bg-muted rounded"></div>
                <div className="h-12 bg-primary rounded"></div>
              </div>
            </div>
          }>
            <ContactFormNew />
          </Suspense>
        </div>
      </section>

    </div>
  );
}
