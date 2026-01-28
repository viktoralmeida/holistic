import fs from 'fs';
import path from 'path';

const PRODUCTS_IMAGES_DIR = path.join(process.cwd(), 'public', 'img', 'products');

export interface ProductImage {
  filename: string;
  url: string;
  alt?: string;
}

/**
 * Get all available product images from the local directory
 */
export function getAvailableProductImages(): ProductImage[] {
  try {
    if (!fs.existsSync(PRODUCTS_IMAGES_DIR)) {
      return [];
    }

    const files = fs.readdirSync(PRODUCTS_IMAGES_DIR);
    
    return files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext);
      })
      .map(file => ({
        filename: file,
        url: `/img/products/${file}`,
        alt: path.parse(file).name.replace(/[-_]/g, ' ')
      }));
  } catch {
    console.error('Error reading product images directory');
    return [];
  }
}

/**
 * Check if an image exists in the products directory
 */
export function imageExists(filename: string): boolean {
  try {
    const imagePath = path.join(PRODUCTS_IMAGES_DIR, filename);
    return fs.existsSync(imagePath);
  } catch {
    return false;
  }
}

/**
 * Get image options for Payload select field
 */
export function getImageOptions() {
  const images = getAvailableProductImages();
  return images.map(img => ({
    label: img.alt || img.filename,
    value: img.filename
  }));
}
