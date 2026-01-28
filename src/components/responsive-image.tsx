"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Eye, Download, ExternalLink, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { type MediaFile } from '@/hooks/use-media'
import { 
  getBestImageUrl, 
  formatFileSize, 
  getImageDimensions,
  getImageOrientation,
  isImageOptimized
} from '@/lib/image-utils'

interface ResponsiveImageProps {
  media: MediaFile
  useCase?: 'original' | 'thumbnail' | 'card'
  className?: string
  alt?: string
  loading?: 'lazy' | 'eager'
  showMetadata?: boolean
  showActions?: boolean
  onClick?: () => void
  onLoad?: () => void
  onError?: () => void
}

interface ImageMetadataProps {
  media: MediaFile
  className?: string
}

function ImageMetadata({ media, className = '' }: ImageMetadataProps) {
  const orientation = getImageOrientation(media)
  const optimized = isImageOptimized(media)

  return (
    <div className={`text-xs text-gray-500 space-y-1 ${className}`}>
      <div className="flex items-center justify-between">
        <span>{formatFileSize(media.filesize)}</span>
        <span>{getImageDimensions(media)}</span>
      </div>
      
      <div className="flex items-center gap-2">
        {orientation && (
          <Badge variant="outline" className="text-xs">
            {orientation}
          </Badge>
        )}
        {optimized && (
          <Badge variant="default" className="text-xs">
            Optimized
          </Badge>
        )}
      </div>

    </div>
  )
}

export function ResponsiveImage({
  media,
  useCase = 'original',
  className = '',
  alt,
  loading = 'lazy',
  showMetadata = false,
  showActions = false,
  onClick,
  onLoad,
  onError,
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [showFullscreen, setShowFullscreen] = useState(false)

  const imageUrl = getBestImageUrl(media, useCase)
  const imageAlt = alt || media.alt

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = media.url
    link.download = media.filename
    link.click()
  }

  const handleOpenFullscreen = () => {
    setShowFullscreen(true)
  }

  const handleImageClick = () => {
    if (showActions) {
      handleOpenFullscreen()
    }
    onClick?.()
  }

  if (!imageUrl) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center p-4">
          <div className="text-gray-400 mb-2">
            <Eye className="h-8 w-8 mx-auto" />
          </div>
          <p className="text-sm text-gray-500">Image not available</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`relative group ${className}`}>
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4">
            <div className="text-center">
              <div className="text-gray-400 mb-2">
                <Eye className="h-8 w-8 mx-auto" />
              </div>
              <p className="text-sm text-gray-500">Failed to load image</p>
            </div>
          </div>
        )}

        {/* Image */}
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={800}
          height={600}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          onClick={handleImageClick}
          className={`
            w-full h-full object-cover rounded-lg transition-opacity duration-300
            ${isLoading ? 'opacity-0' : 'opacity-100'}
            ${onClick || showActions ? 'cursor-pointer' : ''}
            ${showActions ? 'group-hover:opacity-90' : ''}
          `}
        />

        {/* Actions Overlay */}
        {showActions && !isLoading && !hasError && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleOpenFullscreen()
                }}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDownload()
                }}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Metadata */}
        {showMetadata && !isLoading && !hasError && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 rounded-b-lg">
            <ImageMetadata media={media} className="text-white" />
          </div>
        )}
      </div>

      {/* Fullscreen Dialog */}
      <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center justify-between">
              <span>{media.filename}</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(media.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Original
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-6 space-y-4">
            {/* Full Image */}
            <div className="relative">
              <Image
                src={media.url}
                alt={imageAlt}
                width={800}
                height={600}
                className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
              />
            </div>

            {/* Image Details */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Image Information</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Filename:</span>
                        <span className="font-mono text-xs">{media.filename}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span>{formatFileSize(media.filesize)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dimensions:</span>
                        <span>{getImageDimensions(media)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Format:</span>
                        <span>{media.mimeType}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Available Sizes</h4>
                    <div className="space-y-2">
                      {media.url && (
                        <div className="flex items-center justify-between text-sm">
                          <span>Original</span>
                          <Badge variant="outline">{media.width} × {media.height}</Badge>
                        </div>
                      )}
                      {media.sizes?.thumbnail && (
                        <div className="flex items-center justify-between text-sm">
                          <span>Thumbnail</span>
                          <Badge variant="outline">{media.sizes.thumbnail.width} × {media.sizes.thumbnail.height}</Badge>
                        </div>
                      )}
                      {media.sizes?.card && (
                        <div className="flex items-center justify-between text-sm">
                          <span>Card</span>
                          <Badge variant="outline">{media.sizes.card.width} × {media.sizes.card.height}</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </div>


                <div className="mt-4">
                  <h4 className="font-medium mb-2">Alt Text</h4>
                  <p className="text-sm text-gray-600">{media.alt}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Convenience components for common use cases
export function ThumbnailImage(props: Omit<ResponsiveImageProps, 'useCase'>) {
  return <ResponsiveImage {...props} useCase="thumbnail" />
}

export function CardImage(props: Omit<ResponsiveImageProps, 'useCase'>) {
  return <ResponsiveImage {...props} useCase="card" />
}

export function HeroImage(props: Omit<ResponsiveImageProps, 'useCase'>) {
  return <ResponsiveImage {...props} useCase="original" />
}

export function MobileImage(props: Omit<ResponsiveImageProps, 'useCase'>) {
  return <ResponsiveImage {...props} useCase="thumbnail" />
}


