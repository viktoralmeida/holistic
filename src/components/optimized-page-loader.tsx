"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface OptimizedPageLoaderProps {
  children: React.ReactNode;
  className?: string;
}

export const OptimizedPageLoader = ({ children, className }: OptimizedPageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialLoadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Handle initial page load
    if (isInitialLoad) {
      // Show loader immediately for initial load
      setIsLoading(true);
      
      // Minimum time for initial load to prevent flash
      initialLoadTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      }, 800); // Slightly longer for initial load

      return () => {
        if (initialLoadTimeoutRef.current) {
          clearTimeout(initialLoadTimeoutRef.current);
        }
      };
    }

    // Handle route changes
    setIsLoading(true);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Shorter timeout for route changes
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname, isInitialLoad]);

  return (
    <>
      {/* Optimized Page Loader */}
      <div
        className={cn(
          "minimal-page-loader",
          !isLoading && "minimal-loader-fade-out",
          className
        )}
        style={{
          display: isLoading ? 'flex' : 'none'
        }}
      >
        <div className="minimal-loader-container">
          <div className="minimal-spinner" />
        </div>
      </div>

      {/* Page Content */}
      <div 
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

// Hook for manual control with optimized performance
export const useOptimizedPageLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startLoading = () => {
    setIsLoading(true);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const stopLoading = () => {
    // Add a small delay to prevent flash
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  const forceStopLoading = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsLoading(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isLoading,
    startLoading,
    stopLoading,
    forceStopLoading,
  };
};



