"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface InitialPageLoaderProps {
  children: React.ReactNode;
  className?: string;
}

export const InitialPageLoader = ({ children, className }: InitialPageLoaderProps) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Show loader immediately on mount
    setIsMounted(true);
    
    // Minimum loading time to prevent flash
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!isMounted) {
    return (
      <div className="minimal-page-loader">
        <div className="minimal-loader-container">
          <div className="minimal-spinner" />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Initial Loader */}
      {isInitialLoading && (
        <div className="minimal-page-loader">
          <div className="minimal-loader-container">
            <div className="minimal-spinner" />
          </div>
        </div>
      )}

      {/* Page Content */}
      <div 
        className={cn(
          "transition-opacity duration-500 ease-out",
          isInitialLoading ? "opacity-0" : "opacity-100",
          className
        )}
      >
        {children}
      </div>
    </>
  );
};



