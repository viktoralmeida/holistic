"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export const NavigationLoadingIndicator = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Handle initial load
    if (isInitialLoad) {
      setIsNavigating(true);
      const timer = setTimeout(() => {
        setIsNavigating(false);
        setIsInitialLoad(false);
      }, 800);
      return () => clearTimeout(timer);
    }

    // Handle route changes
    setIsNavigating(true);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Optimized timing for route changes
    timeoutRef.current = setTimeout(() => {
      setIsNavigating(false);
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname, isInitialLoad]);

  if (!isNavigating) return null;

  return (
    <div className="minimal-page-loader">
      <div className="minimal-loader-container">
        <div className="minimal-spinner" />
      </div>
    </div>
  );
};