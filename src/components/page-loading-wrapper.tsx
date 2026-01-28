"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { MinimalPageLoader } from "./minimal-page-loader";

interface PageLoadingWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLoadingWrapper = ({ children, className }: PageLoadingWrapperProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Start loading when pathname changes
    setIsLoading(true);

    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    // Set a minimum loading time for better UX (prevents flash)
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Minimum 300ms loading time

    loadingTimeoutRef.current = timeout;

    // Cleanup timeout on unmount
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [pathname]);

  return (
    <>
      <MinimalPageLoader isLoading={isLoading} />
      <div className={className}>
        {children}
      </div>
    </>
  );
};

// Alternative hook-based approach for manual control
export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = () => {
    setIsTransitioning(true);
  };

  const endTransition = () => {
    setIsTransitioning(false);
  };

  return {
    isTransitioning,
    startTransition,
    endTransition,
  };
};