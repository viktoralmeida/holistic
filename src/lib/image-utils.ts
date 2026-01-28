/**
 * Production-ready utility functions for handling product images with URL-based system and legacy support
 */

// Media collection removed - using direct URLs now

export interface LegacyProductImage {
  imageUrl?: string
  imageFile?: string
  url?: string
  alt?: string
}

export interface MediaProductImage {
  image?: {
    id: string
    filename: string
    url: string
    alt?: string
  }
  alt?: string
}

export interface ProcessedProductImage {
  url: string
  alt?: string
  image?: {
    id: string
    filename: string
    url: string
    alt?: string
  }
  imageFile?: string
  imageUrl?: string
}

export type ProductImage = LegacyProductImage | MediaProductImage | ProcessedProductImage

// Type for images that come from the server with processed URLs
export interface ServerProductImage {
  image: string; // Now just a string (URL) since we removed Media collection
  alt?: string | null;
  id?: string | null;
  url?: string; // Added by server processing
}

// Type for the new Product collection structure with direct URLs
export interface ProductImageUrl {
  url: string;
  alt?: string | null;
  isPrimary?: boolean | null;
  id?: string | null;
}

// Type for images that have been processed by server procedures and guaranteed to have a url
export interface ServerProcessedImage {
  url: string
  alt?: string
  image?: {
    id: string
    filename: string
    url: string
    alt?: string
  }
  imageFile?: string
  imageUrl?: string
  id?: string
}

/**
 * Get the image URL from a product image object, supporting both new URL-based and legacy formats
 */
export function getProductImageUrl(image: ProductImage | ServerProductImage | ProductImageUrl | null | undefined): string | null {
  if (!image) return null;
  
  // Check for direct URL property first (new Cloudinary URL structure)
  if ('url' in image && image.url) return image.url;
  
  // Legacy Media collection structure (for backward compatibility)
  if ('image' in image && image.image && typeof image.image === 'object' && 'url' in image.image) {
    // Ensure the URL is properly formatted
    const url = image.image.url;
    if (url && (url.startsWith('/img/products/') || url.startsWith('http'))) {
      return url;
    }
    // If it's just a filename, prepend the path
    if (url) {
      return `/img/products/${url}`;
    }
  }
  
  // Legacy support for old structure
  if ('imageFile' in image && image.imageFile) return `/img/products/${image.imageFile}`;
  if ('imageUrl' in image && image.imageUrl) return image.imageUrl;
  
  return null;
}

/**
 * Get the alt text from a product image object, supporting both new URL-based and legacy formats
 */
export function getProductImageAlt(image: ProductImage | ServerProductImage | ProductImageUrl | null | undefined, fallback: string = ''): string {
  if (!image) return fallback;
  
  // New URL-based structure (direct alt property)
  if ('alt' in image && image.alt) return image.alt;
  
  // Legacy Media collection structure
  if ('image' in image && image.image && typeof image.image === 'object' && 'alt' in image.image) {
    return image.image.alt || fallback;
  }
  
  return fallback;
}

/**
 * Check if an image object has a valid image
 */
export function hasValidImage(image: ProductImage | null | undefined): boolean {
  return getProductImageUrl(image) !== null;
}

/**
 * Get the first valid image from an array of product images
 */
export function getFirstValidImage(images: ProductImage[] | null | undefined): ProductImage | null {
  if (!images || !Array.isArray(images)) return null;
  
  return images.find(hasValidImage) || null;
}

/**
 * Get the image URL from a server-processed image (guaranteed to have url property)
 */
export function getServerProcessedImageUrl(image: ServerProcessedImage | null | undefined): string | null {
  if (!image) return null;
  return image.url;
}

/**
 * Get the alt text from a server-processed image
 */
export function getServerProcessedImageAlt(image: ServerProcessedImage | null | undefined, fallback: string = ''): string {
  if (!image) return fallback;
  return image.alt || fallback;
}

// Enhanced interfaces for production use
export interface MediaFile {
  id: string
  filename: string
  alt: string
  filesize: number
  mimeType: string
  width: number
  height: number
  url: string
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

export interface ImageSize {
  name: string
  width: number
  height: number
  url: string
}

/**
 * Get the best image URL for a specific use case
 */
export function getBestImageUrl(
  media: MediaFile | null | undefined,
  useCase: 'original' | 'thumbnail' | 'card' = 'original'
): string | null {
  if (!media) return null;
  
  // Return the appropriate size based on use case
  switch (useCase) {
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
 * Get all available image sizes for a media file
 */
export function getImageSizes(media: MediaFile | null | undefined): ImageSize[] {
  if (!media) return [];
  
  const sizes: ImageSize[] = [];
  
  // Add original size
  if (media.url) {
    sizes.push({
      name: 'original',
      width: media.width,
      height: media.height,
      url: media.url,
    });
  }
  
  // Add thumbnail size if available
  if (media.sizes?.thumbnail) {
    sizes.push({
      name: 'thumbnail',
      width: media.sizes.thumbnail.width,
      height: media.sizes.thumbnail.height,
      url: media.sizes.thumbnail.url,
    });
  }
  
  // Add card size if available
  if (media.sizes?.card) {
    sizes.push({
      name: 'card',
      width: media.sizes.card.width,
      height: media.sizes.card.height,
      url: media.sizes.card.url,
    });
  }
  
  return sizes;
}

/**
 * Format file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get image dimensions as a formatted string
 */
export function getImageDimensions(media: MediaFile | null | undefined): string {
  if (!media || !media.width || !media.height) return 'Unknown';
  return `${media.width} × ${media.height}`;
}

/**
 * Check if an image is optimized (has multiple sizes)
 */
export function isImageOptimized(media: MediaFile | null | undefined): boolean {
  if (!media) return false;
  // Check if we have multiple image sizes available
  return !!(media.sizes?.thumbnail || media.sizes?.card);
}

/**
 * Get image aspect ratio
 */
export function getImageAspectRatio(media: MediaFile | null | undefined): number | null {
  if (!media || !media.width || !media.height) return null;
  return media.width / media.height;
}

/**
 * Check if image is landscape, portrait, or square
 */
export function getImageOrientation(media: MediaFile | null | undefined): 'landscape' | 'portrait' | 'square' | null {
  const aspectRatio = getImageAspectRatio(media);
  if (aspectRatio === null) return null;
  
  if (aspectRatio > 1.1) return 'landscape';
  if (aspectRatio < 0.9) return 'portrait';
  return 'square';
}

/**
 * Generate responsive image srcset
 */
export function generateSrcSet(media: MediaFile | null | undefined): string {
  if (!media) return '';
  
  const sizes = getImageSizes(media);
  return sizes
    .map(size => `${size.url} ${size.width}w`)
    .join(', ');
}

/**
 * Generate responsive image sizes attribute
 */
export function generateSizes(useCase: string = 'original'): string {
  switch (useCase) {
    case 'thumbnail':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    case 'card':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw';
    case 'original':
    default:
      return '100vw';
  }
}

/**
 * Validate image file before upload
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml'
  ];
  
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type: ${file.type}. Allowed types: ${allowedTypes.join(', ')}`
    };
  }
  
  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size too large: ${formatFileSize(file.size)}. Maximum size is ${formatFileSize(maxSize)}.`
    };
  }
  
  // Check file name
  if (!file.name || file.name.length > 255) {
    return {
      valid: false,
      error: 'Invalid file name. Must be between 1 and 255 characters.'
    };
  }
  
  return { valid: true };
}

/**
 * Generate a unique filename
 */
export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const fileExtension = originalName.split('.').pop()?.toLowerCase();
  return `${timestamp}-${randomString}.${fileExtension}`;
}

/**
 * Extract alt text from filename
 */
export function generateAltFromFilename(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, '') // Remove file extension
    .replace(/[-_]/g, ' ') // Replace dashes and underscores with spaces
    .replace(/\b\w/g, (l: string) => l.toUpperCase()); // Capitalize first letter of each word
}
