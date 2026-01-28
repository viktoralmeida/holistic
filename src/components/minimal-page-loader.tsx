"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MinimalPageLoaderProps {
  isLoading: boolean;
  className?: string;
}

export const MinimalPageLoader = ({ isLoading, className }: MinimalPageLoaderProps) => {
  const [shouldRender, setShouldRender] = useState(isLoading);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShouldRender(true);
      setIsFading(false);
    } else {
      setIsFading(true);
      // Hide the loader after fade animation completes
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsFading(false);
      }, 600); // Match the fade-out animation duration

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={cn(
        "minimal-page-loader",
        isFading && "minimal-loader-fade-out",
        className
      )}
    >
      <div className="minimal-loader-container">
        {/* Modern retro spinner */}
        <div className="minimal-spinner" />
      </div>
    </div>
  );
};

// Hook for managing page loading state
export const usePageLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
};
