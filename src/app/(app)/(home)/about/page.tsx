"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Check, 
  ArrowRight, 
  Heart, 
  Scissors, 
  Phone,
  Calendar,
  Clock,
  Award,
  Users,
  Sparkles,
  Shield,
  Star
} from "lucide-react";
import Link from "next/link";
import { OptimizedHeroImage } from "@/components/optimized-hero-image";
import { useEffect, useState, useMemo } from "react";

const Page = () => {
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);

  const stats = useMemo(() => [
    { value: 500, label: "Zadowolonych klientów", icon: <Heart className="w-8 h-8" />, suffix: "+" },
    { value: 5, label: "Lat doświadczenia", icon: <Award className="w-8 h-8" />, suffix: "+" },
    { value: 100, label: "Bezpieczeństwo", icon: <Shield className="w-8 h-8" />, suffix: "%" },
    { value: 24, label: "Wsparcie", icon: <Clock className="w-8 h-8" />, suffix: "/7" }
  ], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const statsElement = document.getElementById('stats-section');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        const duration = 2000;
        const increment = stat.value / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }
          setAnimatedStats(prev => {
            const newStats = [...prev];
            newStats[index] = Math.floor(current);
            return newStats;
          });
        }, 16);
      });
    }
  }, [isVisible, stats]);

  const whyChooseUs = [
    {
      title: "Profesjonalny zespół",
      description: "Nasi specjaliści mają wieloletnie doświadczenie i regularnie podnoszą swoje kwalifikacje.",
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "Najwyższa jakość",
      description: "Używamy tylko sprawdzonych, premium kosmetyków i najnowszych technologii.",
      icon: <Star className="w-5 h-5" />
    },
    {
      title: "Indywidualne podejście",
      description: "Każdy klient otrzymuje spersonalizowaną opiekę dostosowaną do swoich potrzeb.",
      icon: <Heart className="w-5 h-5" />
    },
    {
      title: "Komfortowa atmosfera",
      description: "Stworzyliśmy przytulne wnętrze, które sprzyja relaksowi i odprężeniu.",
      icon: <Sparkles className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/5 to-background">
      {/* Hero Section - Advanced Design */}
      <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-background via-background/95 to-background">
        {/* Advanced animated background with floating particles */}
        <div className="absolute inset-0 z-0">
          {/* Animated floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#b19681]/30 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#b19681]/20 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-[#b19681]/40 rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-[#b19681]/15 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-[#b19681]/25 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-2/3 right-1/6 w-1.5 h-1.5 bg-[#b19681]/35 rounded-full animate-bounce delay-1200"></div>
        </div>

        {/* Enhanced flowing lines with animation */}
        <div className="absolute inset-0 opacity-40 z-0">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="aboutLineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#b19681', stopOpacity: 0.6}} />
                <stop offset="50%" style={{stopColor: '#b19681', stopOpacity: 0.4}} />
                <stop offset="100%" style={{stopColor: '#b19681', stopOpacity: 0.1}} />
              </linearGradient>
              <linearGradient id="aboutLineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#b19681', stopOpacity: 0.5}} />
                <stop offset="50%" style={{stopColor: '#b19681', stopOpacity: 0.3}} />
                <stop offset="100%" style={{stopColor: '#b19681', stopOpacity: 0.1}} />
              </linearGradient>
              <linearGradient id="aboutLineGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#b19681', stopOpacity: 0.55}} />
                <stop offset="50%" style={{stopColor: '#b19681', stopOpacity: 0.35}} />
                <stop offset="100%" style={{stopColor: '#b19681', stopOpacity: 0.1}} />
              </linearGradient>
              <linearGradient id="aboutLineGradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#b19681', stopOpacity: 0.45}} />
                <stop offset="50%" style={{stopColor: '#b19681', stopOpacity: 0.25}} />
                <stop offset="100%" style={{stopColor: '#b19681', stopOpacity: 0.1}} />
              </linearGradient>
            </defs>
            <path d="M0,15 Q20,5 40,15 T80,15 T100,15" stroke="url(#aboutLineGradient1)" strokeWidth="0.8" fill="none" className="animate-pulse" />
            <path d="M0,35 Q25,25 50,35 T100,35" stroke="url(#aboutLineGradient2)" strokeWidth="0.7" fill="none" className="animate-pulse delay-300" />
            <path d="M0,55 Q30,45 60,55 T100,55" stroke="url(#aboutLineGradient3)" strokeWidth="0.75" fill="none" className="animate-pulse delay-700" />
            <path d="M0,75 Q35,65 70,75 T100,75" stroke="url(#aboutLineGradient4)" strokeWidth="0.65" fill="none" className="animate-pulse delay-1000" />
          </svg>
        </div>
        
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20 z-10 backdrop-blur-sm"></div>
        
        <div className="relative flex flex-col lg:flex-row min-h-screen">
          {/* Left Content - Modern Design */}
          <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 z-40">
            <div className="max-w-2xl space-y-6 sm:space-y-8">
              {/* Modern title */}
              <div className="space-y-4 sm:space-y-6">
                <div className="relative">
                  <div className="absolute -left-3 top-0 w-0.5 h-16 sm:h-20 bg-gradient-to-b from-[#b19681] to-[#b19681]/20 rounded-full"></div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                    <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary/80 dark:text-primary/90 font-medium mb-2 sm:mb-3 tracking-wide">
                      SALON HOLISTIC POINT
                    </span>
                    <span className="block text-foreground dark:text-foreground mb-1 sm:mb-2 font-semibold">
                      W WARSZAWIE
                    </span>
                  </h1>
                </div>
                
                {/* Modern subtitle */}
                <div className="relative pl-4 sm:pl-6">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 sm:w-4 h-0.5 bg-[#b19681]"></div>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 dark:text-foreground/95 leading-relaxed font-medium">
                    Piękno, relaks i pielęgnacja w jednym miejscu
                  </p>
                </div>
              </div>
              
              {/* Advanced glassmorphism content card */}
              <div className="relative group">
                <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-[#b19681]/30 rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/15 dark:hover:bg-black/15 hover:border-[#b19681]/50 hover:scale-[1.02]">
                  {/* Animated corner decorations */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 border-2 border-[#b19681] rounded-full bg-background animate-pulse group-hover:animate-spin transition-all duration-500"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 sm:w-4 sm:h-4 border-2 border-[#b19681] rounded-full bg-background animate-pulse delay-300 group-hover:animate-bounce transition-all duration-500"></div>
                  
                  {/* Floating sparkle effects */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-[#b19681]/40 rounded-full animate-ping delay-500"></div>
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-[#b19681]/30 rounded-full animate-ping delay-1000"></div>
                  
                  <p className="text-base sm:text-lg text-foreground/90 dark:text-foreground/95 leading-relaxed font-medium group-hover:text-foreground dark:group-hover:text-foreground transition-colors duration-300">
                    W HOLISTIC POINT dbamy o to, aby każda wizyta była wyjątkowym doświadczeniem.
                    Łączymy najnowsze technologie beauty z mistrzowskimi technikami manualnymi, 
                    aby wydobyć Twoje naturalne piękno.
                  </p>
                </div>
              </div>
              
              {/* Advanced CTA button with multiple effects */}
              <div className="pt-2 sm:pt-4">
                <Button asChild size="lg" className="group relative overflow-hidden bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-primary-foreground font-bold px-6 sm:px-8 lg:px-10 py-4 sm:py-5 lg:py-6 text-base sm:text-lg lg:text-xl rounded-2xl shadow-2xl hover:shadow-[8px_8px_0px_0px_rgba(177,150,129,0.3)] hover:-translate-x-[4px] hover:-translate-y-[4px] transition-all duration-500 border-2 border-[#b19681] w-full sm:w-auto hover:scale-105">
                  <Link href="/contact" className="flex items-center justify-center">
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">Umów wizytę online</span>
                    <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-2 group-hover:rotate-12 transition-all duration-300" />
                    
                    {/* Multiple wave effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 delay-200"></div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-sm"></div>
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
                <OptimizedHeroImage
                  src="/salon.jpg"
                  alt="Salon Holistic Point - Warszawa"
                  priority={true}
                  quality={100}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="empty"
                  className="object-cover w-full h-full object-top transition-transform duration-700 hover:scale-105"
                />
                
                {/* Enhanced overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#b19681]/15 via-transparent to-[#b19681]/15"></div>
                
                {/* Enhanced decorative elements */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 border-2 border-white/70 rounded-full bg-white/20 backdrop-blur-sm shadow-md sm:shadow-lg"></div>
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-6 h-6 sm:w-10 sm:h-10 border-2 border-white/50 rounded-full bg-white/10 backdrop-blur-sm shadow-md sm:shadow-lg"></div>
                <div className="absolute top-1/2 left-2 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-2 border-white/40 rounded-full bg-white/5 backdrop-blur-sm"></div>
              </div>
              
              {/* Enhanced floating decorative elements */}
              <div className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 w-12 h-12 sm:w-20 sm:h-20 border-2 border-[#b19681]/50 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center shadow-lg sm:shadow-xl">
                <div className="w-6 h-6 sm:w-10 sm:h-10 border-2 border-[#b19681] rounded-full bg-[#b19681]/15"></div>
                </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 w-10 h-10 sm:w-16 sm:h-16 border-2 border-[#b19681]/60 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center shadow-lg sm:shadow-xl">
                <div className="w-5 h-5 sm:w-8 sm:h-8 border-2 border-[#b19681] rounded-full bg-[#b19681]/15"></div>
              </div>
              <div className="absolute top-1/3 -left-3 sm:-left-6 w-8 h-8 sm:w-12 sm:h-12 border-2 border-[#b19681]/50 rounded-full bg-background/50 backdrop-blur-sm shadow-md sm:shadow-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Stats Section with Animated Counters */}
      <section id="stats-section" className="py-16 bg-gradient-to-r from-card/10 via-card/20 to-card/10 dark:from-card/5 dark:via-card/10 dark:to-card/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group text-center p-6 bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-2xl border border-[#b19681]/30 hover:border-[#b19681]/60 transition-all duration-500 hover:bg-white/20 dark:hover:bg-black/20 hover:scale-105 hover:shadow-2xl hover:shadow-[#b19681]/20">
                {/* Animated icon container */}
                <div className="flex items-center justify-center mb-4">
                  <div className="relative p-4 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 group-hover:from-primary/30 group-hover:via-accent/30 group-hover:to-primary/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <div className="text-[#b19681] group-hover:text-[#b19681]/80 transition-colors duration-300">
                    {stat.icon}
                    </div>
                    {/* Floating sparkle */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#b19681]/40 rounded-full animate-ping group-hover:animate-bounce"></div>
                  </div>
                </div>
                
                {/* Animated counter */}
                <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2 group-hover:text-[#b19681] transition-colors duration-300">
                  {animatedStats[index]}{stat.suffix}
                </div>
                
                {/* Label with hover effect */}
                <div className="text-sm lg:text-base text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 font-medium">
                  {stat.label}
                </div>
                
                {/* Progress bar animation */}
                <div className="mt-4 h-1 bg-[#b19681]/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#b19681] to-[#b19681]/60 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: isVisible ? '100%' : '0%',
                      transitionDelay: `${index * 200}ms`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Nasze Usługi
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Kompleksowa oferta beauty & wellness w sercu Warszawy
            </p>
          </div>

          {/* Services Grid - 2x2 layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* HEAD SPA Card - Advanced Design */}
            <div className="relative group">
              <div className="relative h-[28rem] lg:h-[32rem] rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-white/30 transition-all duration-700 group-hover:shadow-3xl group-hover:shadow-[#b19681]/20">
                {/* Advanced image with multiple effects */}
                <Image
                  src="/hair.png"
                  alt="HEAD SPA - Japoński rytuał relaksu"
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110"
                />
                
                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 transition-all duration-500 group-hover:from-black/90 group-hover:via-black/50 group-hover:to-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#b19681]/10 via-transparent to-[#b19681]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Advanced animated background elements */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-4 right-4 w-3 h-3 bg-white/40 rounded-full animate-ping"></div>
                  <div className="absolute bottom-20 left-6 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-300"></div>
                  <div className="absolute top-1/3 right-8 w-2 h-2 bg-white/35 rounded-full animate-pulse delay-700"></div>
                  <div className="absolute top-1/2 left-4 w-1 h-1 bg-white/25 rounded-full animate-ping delay-1000"></div>
                </div>
                
                {/* Floating decorative elements */}
                <div className="absolute top-6 right-6 w-8 h-8 border-2 border-white/20 rounded-full bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"></div>
                <div className="absolute bottom-6 left-6 w-6 h-6 border-2 border-white/15 rounded-full bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 group-hover:scale-125 group-hover:-rotate-12"></div>
                
                {/* Content overlay with advanced animations */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                  <div className="space-y-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                    {/* Title with advanced effects */}
                    <div className="relative">
                      <h3 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-300 relative z-10">
                        HEAD SPA
                      </h3>
                      <div className="absolute -inset-2 bg-gradient-to-r from-[#b19681]/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    </div>
                    
                    <p className="text-lg lg:text-xl text-white font-medium drop-shadow-lg transform group-hover:translate-x-2 transition-transform duration-300 delay-100">
                      Japoński rytuał relaksu
                    </p>
                    
                    <p className="text-white/95 text-sm lg:text-base leading-relaxed drop-shadow-md transform group-hover:translate-x-3 transition-transform duration-300 delay-200">
                      Doświadcz japońskiego rytuału, który oczyszcza, odżywia i głęboko relaksuje.
                    </p>
                    
                    {/* Enhanced feature list */}
                    <div className="space-y-3">
                      {["Demakijaż twarzy", "Masaż karku", "Suchy masaż skóry głowy", "Peeling skóry głowy"].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm lg:text-base transform group-hover:translate-x-4 transition-transform duration-300" style={{transitionDelay: `${300 + index * 100}ms`}}>
                          <div className="relative">
                          <Check className="w-4 h-4 lg:w-5 lg:h-5 text-green-300 flex-shrink-0 drop-shadow-md group-hover:text-green-200 transition-colors duration-300" />
                            <div className="absolute inset-0 bg-green-300/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
                          </div>
                          <span className="text-white drop-shadow-sm group-hover:text-white/90 transition-colors duration-300 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <p className="text-white/85 text-xs lg:text-sm italic drop-shadow-sm transform group-hover:translate-x-2 transition-transform duration-300 delay-700">
                      Pełne odprężenie, dotleniona skóra głowy, pobudzone krążenie.
                    </p>
                    
                    {/* Advanced CTA button */}
                    <div className="pt-4 transform group-hover:scale-105 transition-transform duration-300 delay-800">
                      <Button asChild size="sm" className="relative overflow-hidden bg-white/20 hover:bg-white/35 backdrop-blur-xl text-white border border-white/50 hover:border-white/80 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-white/30 group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] group-hover:-translate-x-1 group-hover:-translate-y-1">
                        <Link href="/contact" className="flex items-center gap-2">
                          <span>Zarezerwuj termin</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fryzjerstwo Card - Advanced Design */}
            <div className="relative group">
              <div className="relative h-[28rem] lg:h-[32rem] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#b19681]/20 via-[#b19681]/10 to-[#b19681]/5 border border-[#b19681]/40 hover:border-[#b19681]/70 transition-all duration-700 group-hover:shadow-3xl group-hover:shadow-[#b19681]/30">
                {/* Advanced background layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent transition-all duration-500 group-hover:from-white/25 group-hover:via-white/10"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-[#b19681]/10 via-transparent to-[#b19681]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Advanced animated background elements */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-6 right-6 w-4 h-4 bg-[#b19681]/40 rounded-full animate-ping"></div>
                  <div className="absolute bottom-24 left-8 w-3 h-3 bg-[#b19681]/30 rounded-full animate-bounce delay-500"></div>
                  <div className="absolute top-1/2 right-10 w-2 h-2 bg-[#b19681]/35 rounded-full animate-pulse delay-1000"></div>
                  <div className="absolute top-1/3 left-6 w-2 h-2 bg-[#b19681]/25 rounded-full animate-ping delay-700"></div>
                </div>
                
                {/* Floating decorative elements */}
                <div className="absolute top-8 right-8 w-10 h-10 border-2 border-[#b19681]/30 rounded-full bg-[#b19681]/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"></div>
                <div className="absolute bottom-8 left-8 w-8 h-8 border-2 border-[#b19681]/25 rounded-full bg-[#b19681]/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 group-hover:scale-125 group-hover:-rotate-12"></div>
                
                {/* Content with advanced animations */}
                <div className="relative h-full flex flex-col justify-center p-6 lg:p-8">
                  <div className="space-y-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                    {/* Enhanced header with icon */}
                    <div className="flex items-center gap-4 mb-6 transform group-hover:scale-105 transition-transform duration-300">
                      <div className="relative p-4 rounded-2xl bg-gradient-to-br from-pink-500/20 via-rose-500/20 to-pink-500/20 group-hover:from-pink-500/30 group-hover:via-rose-500/30 group-hover:to-pink-500/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <Scissors className="w-8 h-8 text-pink-600 dark:text-pink-400 group-hover:text-pink-500 transition-colors duration-300" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500/40 rounded-full animate-ping group-hover:animate-bounce"></div>
                      </div>
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-[#b19681] transition-colors duration-300">
                          Fryzjerstwo
                        </h3>
                        <p className="text-lg lg:text-xl text-muted-foreground font-medium group-hover:text-foreground/80 transition-colors duration-300">
                          Stylizacja, koloryzacja
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-base lg:text-lg leading-relaxed transform group-hover:translate-x-3 transition-transform duration-300 delay-100 group-hover:text-foreground/90">
                      Twoje włosy w rękach specjalistów. Dbamy o kondycję Twoich włosów, używając premium kosmetyków.
                    </p>
                    
                    {/* Enhanced feature list */}
                    <div className="space-y-3">
                      {["Strzyżenie damskie", "Strzyżenie męskie", "Koloryzacje klasyczne", "Koloryzacje zaawansowane"].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 text-base transform group-hover:translate-x-4 transition-transform duration-300" style={{transitionDelay: `${200 + index * 100}ms`}}>
                          <div className="relative">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 group-hover:text-green-500 group-hover:scale-110 transition-all duration-300" />
                            <div className="absolute inset-0 bg-green-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
                          </div>
                          <span className="text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Advanced CTA button */}
                    <div className="pt-6 transform group-hover:scale-105 transition-transform duration-300 delay-600">
                      <Button asChild size="sm" className="relative overflow-hidden w-full bg-gradient-to-r from-[#d4a574] via-[#c19a6b] to-[#d4a574] hover:from-[#c19a6b] hover:via-[#b19681] hover:to-[#c19a6b] text-white border-2 border-[#b19681] hover:shadow-[6px_6px_0px_0px_rgba(177,150,129,0.3)] hover:-translate-x-[3px] hover:-translate-y-[3px] transition-all duration-500 shadow-xl hover:shadow-2xl group-hover:shadow-[#b19681]/30">
                        <Link href="/contact" className="flex items-center justify-center gap-2">
                          <span>Zarezerwuj termin</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Manicure & Pedicure Card - Advanced Design */}
            <div className="relative group">
              <div className="relative h-[28rem] lg:h-[32rem] rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-white/30 transition-all duration-700 group-hover:shadow-3xl group-hover:shadow-[#b19681]/20">
                {/* Advanced image with multiple effects */}
                <Image
                  src="/nails.png"
                  alt="MANICURE & PEDICURE - Piękne dłonie i stopy"
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110"
                />
                
                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 transition-all duration-500 group-hover:from-black/90 group-hover:via-black/50 group-hover:to-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Advanced animated background elements */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-4 right-4 w-3 h-3 bg-pink-400/40 rounded-full animate-ping"></div>
                  <div className="absolute bottom-20 left-6 w-2 h-2 bg-purple-400/30 rounded-full animate-bounce delay-300"></div>
                  <div className="absolute top-1/3 right-8 w-2 h-2 bg-pink-400/35 rounded-full animate-pulse delay-700"></div>
                  <div className="absolute top-1/2 left-4 w-1 h-1 bg-purple-400/25 rounded-full animate-ping delay-1000"></div>
                </div>
                
                {/* Floating decorative elements */}
                <div className="absolute top-6 right-6 w-8 h-8 border-2 border-pink-400/20 rounded-full bg-pink-400/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"></div>
                <div className="absolute bottom-6 left-6 w-6 h-6 border-2 border-purple-400/15 rounded-full bg-purple-400/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 group-hover:scale-125 group-hover:-rotate-12"></div>
                
                {/* Content overlay with advanced animations */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                  <div className="space-y-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                    {/* Title with advanced effects */}
                    <div className="relative">
                      <h3 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-300 relative z-10">
                        MANICURE & PEDICURE
                      </h3>
                      <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    </div>
                    
                    <p className="text-lg lg:text-xl text-white font-medium drop-shadow-lg transform group-hover:translate-x-2 transition-transform duration-300 delay-100">
                      Piękne dłonie i stopy
                    </p>
                    
                    <p className="text-white/95 text-sm lg:text-base leading-relaxed drop-shadow-md transform group-hover:translate-x-3 transition-transform duration-300 delay-200">
                      Stylowe, zadbane paznokcie to wizytówka każdej osoby.
                    </p>
                    
                    {/* Enhanced feature list */}
                    <div className="space-y-3">
                      {["Manicure klasyczny", "Manicure hybrydowy", "Pedicure klasyczny", "Nail art"].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm lg:text-base transform group-hover:translate-x-4 transition-transform duration-300" style={{transitionDelay: `${300 + index * 100}ms`}}>
                          <div className="relative">
                          <Check className="w-4 h-4 lg:w-5 lg:h-5 text-green-300 flex-shrink-0 drop-shadow-md group-hover:text-green-200 transition-colors duration-300" />
                            <div className="absolute inset-0 bg-green-300/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
                          </div>
                          <span className="text-white drop-shadow-sm group-hover:text-white/90 transition-colors duration-300 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Advanced CTA button */}
                    <div className="pt-4 transform group-hover:scale-105 transition-transform duration-300 delay-800">
                      <Button asChild size="sm" className="relative overflow-hidden bg-white/20 hover:bg-white/35 backdrop-blur-xl text-white border border-white/50 hover:border-white/80 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-white/30 group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] group-hover:-translate-x-1 group-hover:-translate-y-1">
                        <Link href="/contact" className="flex items-center gap-2">
                          <span>Zarezerwuj termin</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Masaże Card - Advanced Design */}
            <div className="relative group">
              <div className="relative h-[28rem] lg:h-[32rem] rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-white/30 transition-all duration-700 group-hover:shadow-3xl group-hover:shadow-[#b19681]/20">
                {/* Advanced image with multiple effects */}
                <Image
                  src="/masaze.jpg"
                  alt="Masaże - Odprężenie i relaks"
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110"
                />
                
                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 transition-all duration-500 group-hover:from-black/90 group-hover:via-black/50 group-hover:to-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Advanced animated background elements */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-4 right-4 w-3 h-3 bg-amber-400/40 rounded-full animate-ping"></div>
                  <div className="absolute bottom-20 left-6 w-2 h-2 bg-orange-400/30 rounded-full animate-bounce delay-300"></div>
                  <div className="absolute top-1/3 right-8 w-2 h-2 bg-amber-400/35 rounded-full animate-pulse delay-700"></div>
                  <div className="absolute top-1/2 left-4 w-1 h-1 bg-orange-400/25 rounded-full animate-ping delay-1000"></div>
                </div>
                
                {/* Floating decorative elements */}
                <div className="absolute top-6 right-6 w-8 h-8 border-2 border-amber-400/20 rounded-full bg-amber-400/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"></div>
                <div className="absolute bottom-6 left-6 w-6 h-6 border-2 border-orange-400/15 rounded-full bg-orange-400/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 group-hover:scale-125 group-hover:-rotate-12"></div>
                
                {/* Content overlay with advanced animations */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                  <div className="space-y-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                    {/* Title with advanced effects */}
                    <div className="relative">
                      <h3 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-300 relative z-10">
                        Masaże
                      </h3>
                      <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    </div>
                    
                    <p className="text-lg lg:text-xl text-white font-medium drop-shadow-lg transform group-hover:translate-x-2 transition-transform duration-300 delay-100">
                      Odprężenie i relaks
                    </p>
                    
                    <p className="text-white/95 text-sm lg:text-base leading-relaxed drop-shadow-md transform group-hover:translate-x-3 transition-transform duration-300 delay-200">
                      Wybierz masaż, który odpowiada Twoim potrzebom.
                    </p>
                    
                    {/* Enhanced feature list */}
                    <div className="space-y-3">
                      {["Masaż relaksacyjny", "Masaż klasyczny", "Masaż modelujący", "Body wrapping"].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm lg:text-base transform group-hover:translate-x-4 transition-transform duration-300" style={{transitionDelay: `${300 + index * 100}ms`}}>
                          <div className="relative">
                          <Check className="w-4 h-4 lg:w-5 lg:h-5 text-green-300 flex-shrink-0 drop-shadow-md group-hover:text-green-200 transition-colors duration-300" />
                            <div className="absolute inset-0 bg-green-300/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
                          </div>
                          <span className="text-white drop-shadow-sm group-hover:text-white/90 transition-colors duration-300 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Advanced CTA button */}
                    <div className="pt-4 transform group-hover:scale-105 transition-transform duration-300 delay-800">
                      <Button asChild size="sm" className="relative overflow-hidden bg-white/20 hover:bg-white/35 backdrop-blur-xl text-white border border-white/50 hover:border-white/80 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-white/30 group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] group-hover:-translate-x-1 group-hover:-translate-y-1">
                        <Link href="/contact" className="flex items-center gap-2">
                          <span>Zarezerwuj termin</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Depilacja laserowa Card - Advanced Design */}
            <div className="relative group">
              <div className="relative h-[28rem] lg:h-[32rem] rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-white/30 transition-all duration-700 group-hover:shadow-3xl group-hover:shadow-[#b19681]/20">
                {/* Advanced image with multiple effects */}
                <Image
                  src="/legs.jpg"
                  alt="Depilacja laserowa - Gładka skóra na długo"
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110"
                />
                
                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 transition-all duration-500 group-hover:from-black/90 group-hover:via-black/50 group-hover:to-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Advanced animated background elements */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400/40 rounded-full animate-ping"></div>
                  <div className="absolute bottom-20 left-6 w-2 h-2 bg-indigo-400/30 rounded-full animate-bounce delay-300"></div>
                  <div className="absolute top-1/3 right-8 w-2 h-2 bg-blue-400/35 rounded-full animate-pulse delay-700"></div>
                  <div className="absolute top-1/2 left-4 w-1 h-1 bg-indigo-400/25 rounded-full animate-ping delay-1000"></div>
                </div>
                
                {/* Floating decorative elements */}
                <div className="absolute top-6 right-6 w-8 h-8 border-2 border-blue-400/20 rounded-full bg-blue-400/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"></div>
                <div className="absolute bottom-6 left-6 w-6 h-6 border-2 border-indigo-400/15 rounded-full bg-indigo-400/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 group-hover:scale-125 group-hover:-rotate-12"></div>
                
                {/* Content overlay with advanced animations */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                  <div className="space-y-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                    {/* Title with advanced effects */}
                    <div className="relative">
                      <h3 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-300 relative z-10">
                        Depilacja laserowa
                      </h3>
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    </div>
                    
                    <p className="text-lg lg:text-xl text-white font-medium drop-shadow-lg transform group-hover:translate-x-2 transition-transform duration-300 delay-100">
                      Gładka skóra na długo
                    </p>
                    
                    <p className="text-white/95 text-sm lg:text-base leading-relaxed drop-shadow-md transform group-hover:translate-x-3 transition-transform duration-300 delay-200">
                      Nowoczesna, bezpieczna i skuteczna metoda usuwania owłosienia.
                    </p>
                    
                    {/* Enhanced feature list */}
                    <div className="space-y-3">
                      {["Bez bólu", "Efekt po kilku zabiegach", "Odpowiednia dla różnych typów skóry"].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm lg:text-base transform group-hover:translate-x-4 transition-transform duration-300" style={{transitionDelay: `${300 + index * 100}ms`}}>
                          <div className="relative">
                          <Check className="w-4 h-4 lg:w-5 lg:h-5 text-green-300 flex-shrink-0 drop-shadow-md group-hover:text-green-200 transition-colors duration-300" />
                            <div className="absolute inset-0 bg-green-300/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
                          </div>
                          <span className="text-white drop-shadow-sm group-hover:text-white/90 transition-colors duration-300 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <p className="text-white/85 text-xs lg:text-sm italic drop-shadow-sm transform group-hover:translate-x-2 transition-transform duration-300 delay-700">
                      Dzięki naszym urządzeniom premium zabieg jest szybki i komfortowy.
                    </p>
                    
                    {/* Advanced CTA button */}
                    <div className="pt-4 transform group-hover:scale-105 transition-transform duration-300 delay-800">
                      <Button asChild size="sm" className="relative overflow-hidden bg-white/20 hover:bg-white/35 backdrop-blur-xl text-white border border-white/50 hover:border-white/80 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-white/30 group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] group-hover:-translate-x-1 group-hover:-translate-y-1">
                        <Link href="/contact" className="flex items-center gap-2">
                          <span>Zarezerwuj termin</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Advanced Why Choose Us Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-card/10 via-card/20 to-card/10 dark:from-card/5 dark:via-card/10 dark:to-card/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced section header */}
          <div className="text-center mb-16 lg:mb-20">
            <div className="relative inline-block">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-foreground relative z-10">
                Dlaczego warto wybrać 
                <span className="block text-[#b19681] mt-2">HOLISTIC POINT?</span>
            </h2>
              <div className="absolute -inset-4 bg-gradient-to-r from-[#b19681]/10 via-transparent to-[#b19681]/10 rounded-2xl blur-sm"></div>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Profesjonalizm, jakość i indywidualne podejście w każdym szczególe
            </p>
          </div>

          {/* Advanced benefits grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((benefit, index) => (
              <Card key={index} className="group relative text-center p-8 transition-all duration-700 !border-2 !border-[#b19681]/30 bg-white/10 dark:bg-black/10 backdrop-blur-xl hover:!border-[#b19681]/60 hover:bg-white/20 dark:hover:bg-black/20 hover:scale-105 hover:shadow-2xl hover:shadow-[#b19681]/20">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#b19681]/5 via-transparent to-[#b19681]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                
                {/* Floating decorative elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-[#b19681]/30 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-[#b19681]/20 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300"></div>
                
                {/* Enhanced icon container */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:from-primary/30 group-hover:via-accent/30 group-hover:to-primary/30">
                    <div className="text-[#b19681] group-hover:text-[#b19681]/80 transition-colors duration-300">
                  {benefit.icon}
                    </div>
                    {/* Floating sparkle */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#b19681]/40 rounded-full animate-ping group-hover:animate-bounce"></div>
                  </div>
                </div>
                
                {/* Enhanced content */}
                <div className="relative z-10">
                  <h3 className="font-bold text-xl lg:text-2xl mb-4 text-foreground group-hover:text-[#b19681] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-base lg:text-lg text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                    {benefit.description}
                  </p>
                </div>
                
                {/* Progress bar animation */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#b19681]/20 rounded-b-lg overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#b19681] to-[#b19681]/60 rounded-b-lg transition-all duration-1000 ease-out w-0 group-hover:w-full"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Final CTA Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 dark:from-primary/5 dark:via-accent/5 dark:to-primary/5 relative overflow-hidden">
        {/* Advanced background effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#b19681]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#b19681]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#b19681]/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Enhanced header */}
            <div className="relative mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-foreground relative z-10">
                Ostatni krok do 
                <span className="block text-[#b19681] mt-2">piękna i relaksu</span>
            </h2>
              <div className="absolute -inset-6 bg-gradient-to-r from-[#b19681]/10 via-transparent to-[#b19681]/10 rounded-3xl blur-lg"></div>
            </div>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              Twoje piękno zasługuje na najlepszą opiekę.
              Zarezerwuj swoją wizytę i poczuj różnicę od pierwszego dotyku.
            </p>
            
            {/* Advanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button asChild size="lg" className="group relative overflow-hidden !bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 backdrop-blur-xl !border-2 !border-[#b19681] text-primary-foreground font-bold px-10 py-6 text-lg lg:text-xl rounded-3xl shadow-2xl hover:shadow-[8px_8px_0px_0px_rgba(177,150,129,0.3)] hover:-translate-x-[4px] hover:-translate-y-[4px] transition-all duration-500 transform hover:scale-105 w-full sm:w-auto">
                <Link href="/contact" className="flex items-center justify-center gap-3">
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">Zarezerwuj online</span>
                  <Calendar className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                  
                  {/* Multiple wave effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 delay-200"></div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-sm"></div>
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="group relative overflow-hidden bg-white/10 dark:bg-black/20 backdrop-blur-xl !border-2 !border-[#b19681] text-foreground font-bold px-10 py-6 text-lg lg:text-xl rounded-3xl shadow-2xl hover:shadow-[8px_8px_0px_0px_rgba(177,150,129,0.3)] hover:-translate-x-[4px] hover:-translate-y-[4px] hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-500 transform hover:scale-105 w-full sm:w-auto">
                <Link href="/contact" className="flex items-center justify-center gap-3">
                  <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="group-hover:text-[#b19681] transition-colors duration-300">Zadzwoń do nas</span>
                  
                  {/* Subtle wave effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#b19681]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Link>
              </Button>
            </div>
            
            {/* Additional decorative elements */}
            <div className="mt-12 flex justify-center items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Dostępne 7 dni w tygodniu</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground/50 rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                <span className="text-sm font-medium">Bezpłatna konsultacja</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;