"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-card/95 backdrop-blur-xl border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform-gpu hover:scale-105 z-50 group flex items-center justify-center"
      aria-label="Scroll to top"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Icon with proper centering */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <ChevronUp className="w-5 h-5 text-primary group-hover:text-primary/80 transition-all duration-300 group-hover:-translate-y-0.5" />
      </div>
    </button>
  );
}
