"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LuxuryPageLoaderProps {
  isLoading?: boolean;
  onComplete?: () => void;
  duration?: number; // Duration in milliseconds
  className?: string;
}

export const LuxuryPageLoader = ({ 
  isLoading = true, 
  onComplete, 
  duration = 2000,
  className 
}: LuxuryPageLoaderProps) => {
  const [isVisible, setIsVisible] = useState(isLoading);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShouldFadeOut(true);
      // Wait for fade out animation to complete before hiding
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 800); // Match the fade-out animation duration

      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
      setShouldFadeOut(false);
    }
  }, [isLoading, onComplete]);

  // Auto-hide after duration if no manual control
  useEffect(() => {
    if (isLoading && duration > 0) {
      const timer = setTimeout(() => {
        setShouldFadeOut(true);
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 800);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isLoading, duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "luxury-page-loader",
        shouldFadeOut && "luxury-loader-fade-out",
        className
      )}
    >
      {/* Vintage decorative corner ornaments */}
      <div className="luxury-corner-ornament top-left" />
      <div className="luxury-corner-ornament top-right" />
      <div className="luxury-corner-ornament bottom-left" />
      <div className="luxury-corner-ornament bottom-right" />

      <div className="luxury-loader-container">
        {/* Vintage ornate frame */}
        <div className="luxury-ornate-frame" />
        
        {/* Outer vintage ring with decorative elements */}
        <div className="luxury-ring-outer" />
        
        {/* Middle vintage ring with ornate pattern */}
        <div className="luxury-ring-middle" />
        
        {/* Inner vintage ring with delicate details */}
        <div className="luxury-ring-inner" />
        
        {/* Central vintage gem with ornate glow */}
        <div className="luxury-center-dot" />
        
        {/* Vintage floating crystals */}
        <div className="luxury-particle luxury-particle-1" />
        <div className="luxury-particle luxury-particle-2" />
        <div className="luxury-particle luxury-particle-3" />
        <div className="luxury-particle luxury-particle-4" />
        <div className="luxury-particle luxury-particle-5" />
        <div className="luxury-particle luxury-particle-6" />
      </div>
    </div>
  );
};

// Hook for easy integration with Next.js router
export const usePageLoader = (duration = 2000) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    startLoading,
    stopLoading,
    PageLoader: ({ className }: { className?: string }) => (
      <LuxuryPageLoader 
        isLoading={isLoading} 
        onComplete={stopLoading}
        duration={duration}
        className={className}
      />
    )
  };
};