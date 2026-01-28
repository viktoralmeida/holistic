"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ImageGallerySelector } from '@/components/ui/image-gallery-selector';
import { X, Image as ImageIcon } from 'lucide-react';

interface MediaItem {
  id: string;
  filename: string;
  alt: string;
  filesize?: number;
  mimeType?: string;
  width?: number;
  height?: number;
  urls?: {
    original: string;
    thumbnail?: string;
    card?: string;
  };
  metadata?: {
    originalSize: number;
    dimensions: {
      width: number;
      height: number;
    };
  };
  createdAt: string;
}

interface ImageGalleryFieldProps {
  value?: Array<{
    image: string;
    alt?: string;
  }>;
  setValue: (value: Array<{ image: string; alt?: string }>) => void;
}

function ImageGalleryField({ value = [], setValue }: ImageGalleryFieldProps) {
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  // Initialize selected image IDs from value
  useEffect(() => {
    const ids = value.map(item => item.image).filter(Boolean);
    setSelectedImageIds(ids);
  }, [value]);

  // Fetch media items for selected IDs
  const fetchMediaItems = async (ids: string[]) => {
    if (ids.length === 0) {
      setMediaItems([]);
      return;
    }

    try {
      const promises = ids.map(id => 
        fetch(`/api/media/${id}`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(async (res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
      );
      
      const results = await Promise.all(promises);
      const items = results
        .filter(result => result.success)
        .map(result => result.data);
      
      setMediaItems(items);
    } catch (error) {
      console.error('Error fetching media items:', error);
      setMediaItems([]);
    }
  };

  useEffect(() => {
    fetchMediaItems(selectedImageIds);
  }, [selectedImageIds]);

  const handleImageSelection = (selectedIds: string[]) => {
    setSelectedImageIds(selectedIds);
    
    // Update the form value
    const newValue = selectedIds.map(id => {
      const existingItem = value.find(item => item.image === id);
      return {
        image: id,
        alt: existingItem?.alt || ''
      };
    });
    
    setValue(newValue);
  };

  const handleAltTextChange = (imageId: string, altText: string) => {
    const newValue = value.map(item => 
      item.image === imageId 
        ? { ...item, alt: altText }
        : item
    );
    setValue(newValue);
  };

  const removeImage = (imageId: string) => {
    const newValue = value.filter(item => item.image !== imageId);
    setValue(newValue);
    setSelectedImageIds(prev => prev.filter(id => id !== imageId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Current Selection */}
      {mediaItems.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Selected Images ({mediaItems.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediaItems.map((item) => {
              const currentValue = value.find(v => v.image === item.id);
              
              return (
                <Card key={item.id} className="relative">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        {item.urls?.thumbnail ? (
                          <Image
                            src={item.urls.thumbnail}
                            alt={item.alt}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ImageIcon className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate" title={item.filename}>
                              {item.filename}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{item.metadata?.dimensions?.width}×{item.metadata?.dimensions?.height}</span>
                              <span>•</span>
                              <span>{formatFileSize(item.metadata?.originalSize || 0)}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeImage(item.id)}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <label className="text-xs font-medium text-gray-700">Alt Text</label>
                            <input
                              type="text"
                              value={currentValue?.alt || ''}
                              onChange={(e) => handleAltTextChange(item.id, e.target.value)}
                              placeholder="Describe the image for accessibility"
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Image Gallery Selector */}
      <div>
        <h3 className="text-lg font-medium mb-4">
          {mediaItems.length > 0 ? 'Add More Images' : 'Select Images'}
        </h3>
        <ImageGallerySelector
          value={selectedImageIds}
          onChange={handleImageSelection}
          maxSelections={10}
        />
      </div>

      {/* Validation Messages */}
      {value.length === 0 && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          At least one image is required for this product.
        </div>
      )}
      
      {value.length > 10 && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          Maximum 10 images allowed per product.
        </div>
      )}
    </div>
  );
}

export default ImageGalleryField;
