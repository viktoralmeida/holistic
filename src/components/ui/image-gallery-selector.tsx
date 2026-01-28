"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Search, Upload, X, Check, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaItem {
  id: string;
  filename: string;
  alt: string;
  caption?: string;
  category?: string;
  isPublic?: boolean;
  tags?: Array<{ tag: string }>;
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
    colorSpace?: string;
    hasAlpha?: boolean;
    format?: string;
    density?: number;
    channels?: number;
  };
  createdAt: string;
}

interface ImageGallerySelectorProps {
  value?: string[];
  onChange: (selectedIds: string[]) => void;
  maxSelections?: number;
  className?: string;
}

export function ImageGallerySelector({ 
  value = [], 
  onChange, 
  maxSelections = 10,
  className 
}: ImageGallerySelectorProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItems, setSelectedItems] = useState<string[]>(value);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Fetch media items
  const fetchMediaItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      params.append('limit', '50');

      const response = await fetch(`/api/media?${params}`, {
        credentials: 'include', // Include cookies for authentication
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setMediaItems(result.data || []);
      } else {
        console.error('Failed to fetch media items:', result.error);
        setMediaItems([]);
      }
    } catch (error) {
      console.error('Error fetching media items:', error);
      setMediaItems([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    fetchMediaItems();
  }, [fetchMediaItems]);

  useEffect(() => {
    setSelectedItems(value);
  }, [value]);

  const handleItemSelect = (itemId: string) => {
    let newSelection: string[];
    
    if (selectedItems.includes(itemId)) {
      // Remove from selection
      newSelection = selectedItems.filter(id => id !== itemId);
    } else {
      // Add to selection (if under limit)
      if (selectedItems.length < maxSelections) {
        newSelection = [...selectedItems, itemId];
      } else {
        return; // Don't add if at limit
      }
    }
    
    setSelectedItems(newSelection);
    onChange(newSelection);
  };

  const handleUpload = async (file: File, alt: string, category: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('alt', alt);
    formData.append('category', category);
    formData.append('isPublic', 'true');

    try {
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
        credentials: 'include', // Include cookies for authentication
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        // Refresh the media items list
        await fetchMediaItems();
        setShowUploadModal(false);
        
        // Optionally auto-select the newly uploaded image
        if (selectedItems.length < maxSelections) {
          const newSelection = [...selectedItems, result.data.id];
          setSelectedItems(newSelection);
          onChange(newSelection);
        }
      } else {
        console.error('Upload failed:', result.error);
        alert(`Upload failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const categories = [
    { value: 'all', label: 'All Images' },
    { value: 'product', label: 'Products' },
    { value: 'hero', label: 'Hero' },
    { value: 'gallery', label: 'Gallery' },
    { value: 'banner', label: 'Banner' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header with search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        
        <Button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload New
        </Button>
      </div>

      {/* Selection info */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          {selectedItems.length} of {maxSelections} images selected
        </span>
        {selectedItems.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedItems([]);
              onChange([]);
            }}
          >
            Clear Selection
          </Button>
        )}
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {loading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-200 rounded-md mb-2" />
                <div className="h-4 bg-gray-200 rounded mb-1" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </CardContent>
            </Card>
          ))
        ) : mediaItems.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No images found</p>
            <p className="text-sm">Try uploading some images or adjusting your search</p>
          </div>
        ) : (
          mediaItems.map((item) => {
            const isSelected = selectedItems.includes(item.id);
            const isAtLimit = selectedItems.length >= maxSelections && !isSelected;
            
            return (
              <Card
                key={item.id}
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:shadow-md",
                  isSelected && "ring-2 ring-blue-500 bg-blue-50",
                  isAtLimit && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => !isAtLimit && handleItemSelect(item.id)}
              >
                <CardContent className="p-2">
                  <div className="relative">
                    <div className="aspect-square bg-gray-100 rounded-md overflow-hidden mb-2">
                      {item.urls?.thumbnail ? (
                        <Image
                          src={item.urls.thumbnail}
                          alt={item.alt}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <ImageIcon className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                    
                    {/* Selection indicator */}
                    <div className="absolute top-2 right-2">
                      {isSelected ? (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-300 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-medium truncate" title={item.alt}>
                      {item.alt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{item.metadata?.dimensions?.width}×{item.metadata?.dimensions?.height}</span>
                      <span>{formatFileSize(item.metadata?.originalSize || 0)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
}

// Upload Modal Component
interface UploadModalProps {
  onClose: () => void;
  onUpload: (file: File, alt: string, category: string) => void;
}

function UploadModal({ onClose, onUpload }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState('');
  const [category, setCategory] = useState('product');
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      await onUpload(file, alt, category);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!alt) {
        // Auto-generate alt text from filename
        const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, "");
        setAlt(nameWithoutExt.replace(/[-_]/g, " "));
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Upload New Image
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="file">Image File</Label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                id="alt"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Describe the image for accessibility"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="product">Product</option>
                <option value="hero">Hero</option>
                <option value="gallery">Gallery</option>
                <option value="banner">Banner</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={!file || uploading} className="flex-1">
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
