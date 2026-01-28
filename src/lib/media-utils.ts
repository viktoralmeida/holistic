/**
 * Utility functions for handling media files and image URLs
 */

export interface MediaFile {
  id: string
  filename: string
  url: string
  alt: string
  filesize: number
  mimeType: string
  width?: number
  height?: number
  sizes?: {
    thumbnail?: {
      url: string
      width: number
      height: number
    }
    card?: {
      url: string
      width: number
      height: number
    }
  }
  createdAt: string
  updatedAt: string
}

export interface ProductImage {
  image: string | MediaFile
  alt?: string
  isPrimary?: boolean
}

/**
 * Get the URL for a media file, handling both string IDs and full media objects
 */
export function getMediaUrl(media: string | MediaFile, size: 'original' | 'thumbnail' | 'card' = 'original'): string {
  if (typeof media === 'string') {
    // If it's just an ID, we need to fetch the media first
    // For now, return a placeholder - in production you'd fetch the media
    return `/media/${media}`
  }

  // Return the appropriate size based on the request
  switch (size) {
    case 'thumbnail':
      return media.sizes?.thumbnail?.url || media.url;
    case 'card':
      return media.sizes?.card?.url || media.url;
    case 'original':
    default:
      return media.url;
  }
}

/**
 * Get the alt text for a media file
 */
export function getMediaAlt(media: string | MediaFile, fallbackAlt?: string): string {
  if (typeof media === 'string') {
    return fallbackAlt || 'Product image'
  }
  
  return media.alt || fallbackAlt || 'Product image'
}

/**
 * Format file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Validate if a file is an image
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/')
}

/**
 * Get the primary image from a product's image array
 */
export function getPrimaryImage(images: ProductImage[]): ProductImage | null {
  if (!images || images.length === 0) return null
  
  // First, try to find an image marked as primary
  const primaryImage = images.find(img => img.isPrimary)
  if (primaryImage) return primaryImage
  
  // If no primary image is marked, return the first image
  return images[0] || null
}

/**
 * Get all image URLs for a product
 */
export function getProductImageUrls(images: ProductImage[], size: 'original' | 'thumbnail' | 'card' = 'original'): string[] {
  if (!images || images.length === 0) return []
  
  return images.map(img => getMediaUrl(img.image, size))
}

/**
 * Check if a media file exists and is accessible
 */
export async function checkMediaExists(mediaId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/media?id=${mediaId}`)
    return response.ok
  } catch {
    return false
  }
}

/**
 * Get media file by ID
 */
export async function getMediaById(mediaId: string): Promise<MediaFile | null> {
  try {
    const response = await fetch(`/api/media?id=${mediaId}`)
    
    if (!response.ok) {
      return null
    }
    
    const result = await response.json()
    
    if (!result.success) {
      return null
    }
    
    return result.data
  } catch {
    return null
  }
}

/**
 * Upload a media file
 */
export async function uploadMediaFile(file: File, alt?: string): Promise<MediaFile | null> {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('alt', alt || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "))
    
    const response = await fetch('/api/media', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
    
    if (!response.ok) {
      return null
    }
    
    const result = await response.json()
    
    if (!result.success) {
      return null
    }
    
    return result.data
  } catch {
    return null
  }
}

/**
 * Delete a media file
 */
export async function deleteMediaFile(mediaId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/media?id=${mediaId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    
    return response.ok
  } catch {
    return false
  }
}

/**
 * Get responsive image props for Next.js Image component
 */
export function getResponsiveImageProps(
  media: string | MediaFile,
  alt?: string,
  sizes: string = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
) {
  const url = getMediaUrl(media)
  const altText = getMediaAlt(media, alt)
  
  return {
    src: url,
    alt: altText,
    sizes,
    // Add width and height if available
    ...(typeof media === 'object' && media.width && media.height && {
      width: media.width,
      height: media.height,
    }),
  }
}
