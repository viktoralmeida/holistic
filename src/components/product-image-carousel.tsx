"use client"

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import { Circle, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getProductImageUrl, getProductImageAlt, type ProductImage, type ServerProductImage, type ProductImageUrl } from '@/lib/image-utils'

interface ProductImageCarouselProps {
  images: (ProductImage | ServerProductImage | ProductImageUrl)[]
  className?: string
  showThumbnails?: boolean
}

export function ProductImageCarousel({
  images,
  className = '',
  showThumbnails = true
}: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [transformOrigin, setTransformOrigin] = useState('center center')

  // Enhanced mouse position tracking for smooth zoom
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    // Set transform origin to mouse position for natural zoom effect
    setTransformOrigin(`${x}% ${y}%`)
  }, [isHovering])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setTransformOrigin('center center')
  }, [])

  const goToImage = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex || !images || index >= images.length) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
    }, 300)
  }, [currentIndex, isTransitioning, images])


  if (!images || images.length === 0) {
    return (
      <div className={cn(
        "relative aspect-square rounded-sm overflow-hidden  border-muted-foreground/20 bg-gradient-to-br from-muted/50 to-muted/30",
        "flex items-center justify-center",
        className
      )}>
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-muted-foreground/10 rounded-sm flex items-center justify-center">
            <Circle className="h-8 w-8 text-muted-foreground/40" />
          </div>
          <span className="text-muted-foreground text-lg font-medium">No images available</span>
        </div>
      </div>
    )
  }

  if (images.length === 1) {
    const imageUrl = getProductImageUrl(images[0]);
    if (!imageUrl) {
      return (
        <div className={cn(
          "relative aspect-square rounded-sm overflow-hidden  shadow-lg bg-gradient-to-br from-muted/30 to-muted/50",
          "flex items-center justify-center",
          className
        )}>
          <div className="text-muted-foreground text-sm">No image available</div>
        </div>
      );
    }
    
    return (
      <div 
        className={cn(
          "relative aspect-square rounded-sm overflow-hidden bg-muted/10 group hover-zoom-container",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={imageUrl}
          alt={images[0]?.alt || ''}
          fill
          className="object-cover transition-transform duration-500 ease-out hover-zoom-image"
          style={{
            transform: isHovering ? 'scale(1.2)' : 'scale(1)',
            transformOrigin: transformOrigin
          }}
          priority
        />
      </div>
    )
  }

  return (
    <div className={cn("relative group space-y-4", className)}>
      {/* Main Image Container */}
      <div 
        className="relative aspect-square rounded-sm overflow-hidden bg-muted/10 group/main-image hover-zoom-container"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Image */}
        <div className="relative w-full h-full">
          {getProductImageUrl(images[currentIndex]) ? (
            <Image
              src={getProductImageUrl(images[currentIndex])!}
              alt={getProductImageAlt(images[currentIndex], 'Product image')}
              fill
              className={cn(
                "object-cover transition-transform duration-500 ease-out hover-zoom-image",
                isTransitioning ? "opacity-90" : "opacity-100"
              )}
              style={{
                transform: isHovering ? 'scale(1.2)' : 'scale(1)',
                transformOrigin: transformOrigin
              }}
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted/30 to-muted/50 flex items-center justify-center">
              <div className="text-muted-foreground text-sm">No image available</div>
            </div>
          )}
          
        </div>

        {/* Top Controls */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 opacity-0 group-hover/main-image:opacity-100 transition-all duration-300">
            <div className="bg-black/80 text-white rounded-sm px-2 py-1 text-xs font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-black text-white rounded-sm w-8 h-8 opacity-0 group-hover/main-image:opacity-100 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-0"
              onClick={() => goToImage((currentIndex - 1 + images.length) % images.length)}
              disabled={isTransitioning}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-black text-white rounded-sm w-8 h-8 opacity-0 group-hover/main-image:opacity-100 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-0"
              onClick={() => goToImage((currentIndex + 1) % images.length)}
              disabled={isTransitioning}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* Minimalistic Thumbnail Slider */}
      {showThumbnails && images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative flex-shrink-0 w-20 h-20 rounded-sm overflow-hidden transition-all duration-200",
                "hover:opacity-80 focus:outline-none focus:ring-0",
                index === currentIndex 
                  ? "opacity-100" 
                  : "opacity-60 hover:opacity-80"
              )}
              onClick={() => goToImage(index)}
              disabled={isTransitioning}
            >
              {getProductImageUrl(image) ? (
                <Image
                  src={getProductImageUrl(image)!}
                  alt={image?.alt || ''}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted/40 flex items-center justify-center">
                  <div className="text-muted-foreground text-xs">No image</div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

    </div>
  )
}
