"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { StableMediaUpload } from './stable-media-upload'
import { MediaGallery } from './media-gallery'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, Package, CheckCircle } from 'lucide-react'

interface UploadedMedia {
  id: string
  title: string
  filename: string
  url: string
  alt?: string
  filesize?: number
  mimeType?: string
  width?: number
  height?: number
}

interface ProductData {
  name: string
  description: string
  price: number
  category: string
  images: UploadedMedia[]
}

export function ProductWithMedia() {
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    images: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleImageUpload = (media: UploadedMedia) => {
    setProductData(prev => ({
      ...prev,
      images: [...prev.images, media]
    }))
  }

  const handleImageSelect = (media: UploadedMedia) => {
    setProductData(prev => ({
      ...prev,
      images: [...prev.images, media]
    }))
  }

  const removeImage = (index: number) => {
    setProductData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call to create product
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Product data:', productData)
      setSubmitSuccess(true)
      
      // Reset form
      setProductData({
        name: '',
        description: '',
        price: 0,
        category: '',
        images: []
      })
    } catch (error) {
      console.error('Error creating product:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Product with Media</h1>
        <p className="text-gray-600">
          Upload images and create a product with the new stable media system
        </p>
      </div>

      {submitSuccess && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Product created successfully!</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="product" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="product" className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Product Details</span>
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Upload Images</span>
          </TabsTrigger>
          <TabsTrigger value="gallery" className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>Select from Gallery</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="product" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>
                Fill in the basic product details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={productData.name}
                      onChange={(e) => setProductData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={productData.price}
                      onChange={(e) => setProductData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={productData.category}
                    onChange={(e) => setProductData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Enter category"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={productData.description}
                    onChange={(e) => setProductData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter product description"
                    rows={4}
                    required
                  />
                </div>

                {/* Selected Images Preview */}
                {productData.images.length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Images ({productData.images.length})</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {productData.images.map((image, index) => (
                        <div key={image.id} className="relative border rounded-lg p-2">
                          <Image
                            src={image.url}
                            alt={image.alt || image.title}
                            width={80}
                            height={80}
                            className="w-full h-20 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                          <p className="text-xs text-gray-600 mt-1 truncate" title={image.title}>
                            {image.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || productData.images.length === 0}
                  className="w-full"
                >
                  {isSubmitting ? 'Creating Product...' : 'Create Product'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Images</CardTitle>
              <CardDescription>
                Upload images directly for this product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StableMediaUpload
                onUploadSuccess={handleImageUpload}
                maxFiles={10}
                showPreview={true}
                title="Upload Product Images"
                description="Drag and drop product images here or click to select"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select from Gallery</CardTitle>
              <CardDescription>
                Choose from previously uploaded images
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MediaGallery
                onSelectMedia={handleImageSelect}
                showSelectButton={true}
                selectButtonText="Add to Product"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Product Summary */}
      {productData.images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Product Summary</CardTitle>
            <CardDescription>
              Preview of your product with selected images
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">{productData.name || 'Product Name'}</h3>
                  <p className="text-gray-600">${productData.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{productData.category || 'Category'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{productData.description || 'Description'}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Images ({productData.images.length})</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {productData.images.map((image) => (
                    <div key={image.id} className="aspect-square relative">
                      <Image
                        src={image.url}
                        alt={image.alt || image.title}
                        fill
                        className="object-cover rounded border"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
