"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedHeroImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export const OptimizedHeroImage = ({
  src,
  alt,
  className,
  style,
  priority = true,
  quality = 85,
  sizes = "100vw",
  placeholder = "blur",
  blurDataURL,
}: OptimizedHeroImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // For priority images, start loading immediately
    if (priority) {
      setIsInView(true);
    } else {
      // Use Intersection Observer for non-priority images
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry && entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { rootMargin: "50px" }
      );

      const element = document.getElementById("hero-image-container");
      if (element) {
        observer.observe(element);
      }

      return () => observer.disconnect();
    }
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      id="hero-image-container"
      className={cn(
        "relative w-full h-full transition-opacity duration-500",
        isLoaded ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {isInView && (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          style={style}
          priority={priority}
          quality={quality}
          sizes={sizes}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={handleLoad}
          // Optimize loading
          loading={priority ? "eager" : "lazy"}
          // Add fetch priority for critical images
          fetchPriority={priority ? "high" : "auto"}
        />
      )}
      
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      )}
    </div>
  );
};

// Preload critical images
export const preloadCriticalImages = () => {
  if (typeof window !== "undefined") {
    const criticalImages = [
      "/banner.jpg",
      "/about.jpg",
    ];

    criticalImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      link.fetchPriority = "high";
      document.head.appendChild(link);
    });
  }
};

// Hook for image optimization
export const useImageOptimization = () => {
  const [isPreloaded, setIsPreloaded] = useState(false);

  useEffect(() => {
    // Preload critical images on mount
    preloadCriticalImages();
    setIsPreloaded(true);
  }, []);

  return { isPreloaded };
};
