"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Alert, AlertDescription } from './ui/alert'
import { PayloadImageUpload } from './payload-image-upload'
import { CheckCircle, AlertCircle } from 'lucide-react'

interface ProductFormData {
  name: string
  price: number
  category: string
  productType: string
  description: string
  images: string[]
}

export function SimpleProductForm() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    category: '',
    productType: 'other-products',
    description: '',
    images: []
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (field: keyof ProductFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImagesUploaded = (imageIds: string[]) => {
    setFormData(prev => ({
      ...prev,
      images: imageIds
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Validate form
      if (!formData.name.trim()) {
        throw new Error('Product name is required')
      }
      
      if (formData.price <= 0) {
        throw new Error('Product price must be greater than 0')
      }
      
      if (formData.images.length === 0) {
        throw new Error('At least one image is required')
      }

      // Prepare product data
      const productData = {
        name: formData.name,
        price: formData.price,
        category: formData.category || null,
        productType: formData.productType,
        content: formData.description,
        images: formData.images.map(imageId => ({
          image: imageId,
          alt: formData.name
        })),
        characteristics: [],
        refundPolicy: '30-day' as const,
        status: 'draft' as const
      }

      // Submit to your API endpoint
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create product')
      }

      setSubmitStatus('success')
      
      // Reset form
      setFormData({
        name: '',
        price: 0,
        category: '',
        productType: 'other-products',
        description: '',
        images: []
      })

    } catch (err) {
      setSubmitStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                type="text"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                placeholder="Enter category"
              />
            </div>

            {/* Product Type */}
            <div className="space-y-2">
              <Label htmlFor="productType">Product Type</Label>
              <Select value={formData.productType} onValueChange={(value) => handleInputChange('productType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="investment-pack">Investment Pack</SelectItem>
                  <SelectItem value="beds-and-washers">Beds and Washers</SelectItem>
                  <SelectItem value="online-training">Online Training</SelectItem>
                  <SelectItem value="personal-training">Personal Training</SelectItem>
                  <SelectItem value="other-products">Other Products</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter product description"
                rows={4}
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Product Images *</Label>
              <PayloadImageUpload
                onImagesUploaded={handleImagesUploaded}
                maxFiles={5}
                multiple={true}
                showPreview={true}
                title="Upload Product Images"
                description="Upload images for your product (at least 1 required)"
              />
            </div>

            {/* Submit Status */}
            {submitStatus === 'success' && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Product created successfully! You can now view it in the admin panel.
                </AlertDescription>
              </Alert>
            )}

            {submitStatus === 'error' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isSubmitting || formData.images.length === 0}
              className="w-full"
            >
              {isSubmitting ? 'Creating Product...' : 'Create Product'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Form Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Form Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>Name:</strong> {formData.name || 'Not set'}</p>
            <p><strong>Price:</strong> ${formData.price || '0.00'}</p>
            <p><strong>Category:</strong> {formData.category || 'Not set'}</p>
            <p><strong>Product Type:</strong> {formData.productType}</p>
            <p><strong>Description:</strong> {formData.description || 'Not set'}</p>
            <p><strong>Images:</strong> {formData.images.length} uploaded</p>
            <p><strong>Image IDs:</strong> {formData.images.join(', ') || 'None'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}





















