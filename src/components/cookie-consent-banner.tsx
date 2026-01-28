"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Shield, Check } from "lucide-react";
import Link from "next/link";

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const checkCookieConsent = () => {
      try {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
          // Show banner after a delay
          setTimeout(() => {
            setShowBanner(true);
          }, 2000);
        }
      } catch {
        // If localStorage fails, show banner anyway
        setTimeout(() => {
          setShowBanner(true);
        }, 2000);
      }
    };

    checkCookieConsent();
  }, [mounted]);

  const handleAccept = () => {
    try {
      localStorage.setItem("cookie-consent", "accepted");
    } catch {
      // Ignore localStorage errors
    }
    setShowBanner(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("cookie-consent", "declined");
    } catch {
      // Ignore localStorage errors
    }
    setShowBanner(false);
  };

  if (!mounted || !showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500">
      <div className="bg-background border-t-2 border-border shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Content */}
            <div className="flex items-start gap-3 flex-1">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-relaxed font-medium text-foreground">
                  Używamy plików cookie, aby zapewnić najlepsze doświadczenia na naszej stronie. 
                  Kontynuując przeglądanie, wyrażasz zgodę na naszą{" "}
                  <Link 
                    href="/privacy-policy" 
                    className="underline font-semibold transition-colors text-primary hover:text-primary/80"
                  >
                    Politykę Prywatności
                  </Link>{" "}
                  i{" "}
                  <Link 
                    href="/terms" 
                    className="underline font-semibold transition-colors text-primary hover:text-primary/80"
                  >
                    Regulamin
                  </Link>.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecline}
                className="font-medium transition-all duration-300 text-xs px-4 py-2"
              >
                Odrzuć
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="font-semibold transition-all duration-300 flex items-center gap-1.5 text-xs px-4 py-2 shadow-lg hover:shadow-xl"
              >
                <Check className="w-3 h-3" />
                Akceptuję
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDecline}
                className="p-2 h-8 w-8 rounded-lg transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}