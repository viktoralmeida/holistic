"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Check, XCircle } from "lucide-react";

export function PrivacyBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const privacyChoice = localStorage.getItem("privacy-policy-choice");
    
    if (!privacyChoice) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      // User has already made a choice, don't show banner
      const choice = JSON.parse(privacyChoice);
      if (choice.accepted) {
        setIsAccepted(true);
      } else if (choice.declined) {
        setIsDeclined(true);
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("privacy-policy-choice", JSON.stringify({ accepted: true, declined: false }));
    setIsAccepted(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("privacy-policy-choice", JSON.stringify({ accepted: false, declined: true }));
    setIsDeclined(true);
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  // Don't render if user has already made a choice
  if (isAccepted || isDeclined) {
    return null;
  }

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border/50 animate-in slide-in-from-bottom duration-300">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
                             {/* Message */}
               <div className="flex-1 text-sm text-muted-foreground">
                 Korzystając z tej strony, akceptujesz naszą{" "}
                 <a 
                   href="/privacy-policy" 
                   className="text-primary hover:underline font-medium"
                   target="_blank"
                   rel="noopener noreferrer"
                 >
                   Politykę Prywatności
                 </a>
                 {" "}i{" "}
                 <a 
                   href="/terms" 
                   className="text-primary hover:underline font-medium"
                   target="_blank"
                   rel="noopener noreferrer"
                 >
                   Regulamin
                 </a>
                 .
               </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDecline}
                  className="h-8 px-3 text-xs border-destructive/50 text-destructive hover:bg-destructive/10"
                >
                  <XCircle className="w-3 h-3 mr-1" />
                  Odrzuć
                </Button>
                <Button
                  size="sm"
                  onClick={handleAccept}
                  className="h-8 px-3 text-xs bg-primary hover:bg-primary/90"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Akceptuję
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
