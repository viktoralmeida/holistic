import { NextResponse } from 'next/server';
import { getAvailableProductImages } from '@/lib/product-images';

export async function GET() {
  try {
    const images = getAvailableProductImages();
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching product images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product images' },
      { status: 500 }
    );
  }
}





