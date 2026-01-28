"use client";

import { InitialPageLoader } from "./initial-page-loader";
import { NavigationLoadingIndicator } from "./navigation-loading-indicator";

interface LayoutWithLoaderProps {
  children: React.ReactNode;
}

export const LayoutWithLoader = ({ children }: LayoutWithLoaderProps) => {
  return (
    <>
      {/* Navigation-based loader for route changes */}
      <NavigationLoadingIndicator />
      
      {/* Initial page loader wrapper */}
      <InitialPageLoader>
        {children}
      </InitialPageLoader>
    </>
  );
};

// Alternative: Simple wrapper for just initial loading
export const SimpleLayoutWithLoader = ({ children }: LayoutWithLoaderProps) => {
  return (
    <InitialPageLoader>
      {children}
    </InitialPageLoader>
  );
};



