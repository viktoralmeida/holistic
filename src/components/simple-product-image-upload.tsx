"use client"

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { Alert, AlertDescription } from './ui/alert'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'

interface SimpleProductImageUploadProps {
  onImageUploaded?: (imageId: string) => void
  onImagesUploaded?: (imageIds: string[]) => void
  className?: string
  maxFiles?: number
  multiple?: boolean
  showPreview?: boolean
}

interface UploadedImage {
  id: string
  filename: string
  url: string
  alt: string
  filesize: number
  status: 'uploading' | 'success' | 'error'
  error?: string
}

export function SimpleProductImageUpload({
  onImageUploaded,
  onImagesUploaded,
  className = '',
  maxFiles = 5,
  multiple = true,
  showPreview = true,
}: SimpleProductImageUploadProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadImage = useCallback(async (file: File, index: number): Promise<void> => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('alt', file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "))
      formData.append('category', 'product')
      formData.append('isPublic', 'true')

      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || `Upload failed: ${response.status}`)
      }

      // Update the uploaded image with success data
      setUploadedImages(prev => prev.map((img, i) => 
        i === index 
          ? {
              id: result.data.id,
              filename: result.data.filename,
              url: result.data.url,
              alt: result.data.alt,
              filesize: result.data.filesize,
              status: 'success' as const
            }
          : img
      ))

      // Call the callback with the image ID
      onImageUploaded?.(result.data.id)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed'
      
      // Update the uploaded image with error
      setUploadedImages(prev => prev.map((img, i) => 
        i === index 
          ? { ...img, status: 'error' as const, error: errorMessage }
          : img
      ))
    }
  }, [onImageUploaded])

  const handleFileSelect = useCallback(async (files: File[]) => {
    setError(null)
    setIsUploading(true)

    // Validate files
    const validFiles: File[] = []
    const errors: string[] = []

    for (const file of files) {
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
      if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name}: Invalid file type`)
        continue
      }

      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        errors.push(`${file.name}: File too large (max 10MB)`)
        continue
      }

      validFiles.push(file)
    }

    if (errors.length > 0) {
      setError(errors.join('\n'))
      setIsUploading(false)
      return
    }

    // Check if adding these files would exceed maxFiles limit
    if (uploadedImages.length + validFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed. You're trying to add ${validFiles.length} files but already have ${uploadedImages.length}.`)
      setIsUploading(false)
      return
    }

    // Create placeholder entries for uploading files
    const newImages: UploadedImage[] = validFiles.map((file, index) => ({
      id: `temp-${Date.now()}-${index}`,
      filename: file.name,
      url: URL.createObjectURL(file),
      alt: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      filesize: file.size,
      status: 'uploading' as const,
    }))

    setUploadedImages(prev => [...prev, ...newImages])

    // Upload files one by one
    const startIndex = uploadedImages.length
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i]
      if (file) {
        await uploadImage(file, startIndex + i)
      }
    }

    setIsUploading(false)

    // Call the multiple images callback
    const successfulImages = uploadedImages.filter(img => img.status === 'success')
    if (successfulImages.length > 0) {
      onImagesUploaded?.(successfulImages.map(img => img.id))
    }
  }, [uploadedImages, maxFiles, uploadImage, onImagesUploaded])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return
    
    const filesToUpload = multiple ? acceptedFiles : acceptedFiles.slice(0, 1)
    handleFileSelect(filesToUpload)
  }, [handleFileSelect, multiple])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif', '.svg']
    },
    maxFiles: multiple ? maxFiles - uploadedImages.length : 1,
    disabled: isUploading || (!multiple && uploadedImages.length > 0),
    multiple,
  })

  const removeImage = useCallback((index: number) => {
    setUploadedImages(prev => {
      const newImages = [...prev]
      const image = newImages[index]
      
      // Clean up object URL if it's a temporary one
      if (image && image.url && image.url.startsWith('blob:')) {
        URL.revokeObjectURL(image.url)
      }
      
      newImages.splice(index, 1)
      return newImages
    })
  }, [])

  const retryUpload = useCallback(async (index: number) => {
    const image = uploadedImages[index]
    if (!image || image.status !== 'error') return

    // Find the original file (this is a simplified retry - in a real app you'd store the file)
    // For now, we'll just reset the status and let the user re-upload
    setUploadedImages(prev => prev.map((img, i) => 
      i === index 
        ? { ...img, status: 'uploading' as const, error: undefined }
        : img
    ))
  }, [uploadedImages])

  const clearAll = useCallback(() => {
    uploadedImages.forEach(image => {
      if (image.url.startsWith('blob:')) {
        URL.revokeObjectURL(image.url)
      }
    })
    setUploadedImages([])
    setError(null)
  }, [uploadedImages])

  const canUpload = uploadedImages.length < maxFiles && !isUploading
  const hasImages = uploadedImages.length > 0

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
          ${isDragActive && !isDragReject ? 'border-blue-500 bg-blue-50 scale-105' : ''}
          ${isDragReject ? 'border-red-500 bg-red-50' : ''}
          ${!isDragActive && !isDragReject ? 'border-gray-300 hover:border-gray-400 hover:bg-gray-50' : ''}
          ${!canUpload ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-3">
          {isUploading ? (
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
          ) : (
            <Upload className="h-10 w-10 text-gray-400" />
          )}
          
          <div className="space-y-1">
            <h3 className="text-lg font-medium">
              {isDragActive ? (
                isDragReject ? (
                  <span className="text-red-500">Invalid file type</span>
                ) : (
                  <span className="text-blue-500">Drop the images here</span>
                )
              ) : (
                <span>
                  {isUploading ? 'Uploading...' : multiple ? 'Drop images here or click to select' : 'Drop image here or click to select'}
                </span>
              )}
            </h3>
            
            <p className="text-sm text-gray-500">
              Supports: JPEG, PNG, WebP, GIF, SVG (max 10MB each)
            </p>
            
            <p className="text-xs text-gray-400">
              {uploadedImages.length} of {maxFiles} files uploaded
            </p>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="whitespace-pre-line">{error}</AlertDescription>
        </Alert>
      )}

      {/* Uploaded Images */}
      {hasImages && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Uploaded Images ({uploadedImages.length})</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedImages.map((image, index) => (
                <Card key={image.id} className="relative">
                  <CardContent className="p-3">
                    {/* Image Preview */}
                    {showPreview && (
                      <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={image.url}
                          alt={image.alt}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Image Info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-sm truncate" title={image.filename}>
                          {image.filename}
                        </h5>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant={
                          image.status === 'success' ? 'default' :
                          image.status === 'error' ? 'destructive' :
                          'secondary'
                        }>
                          {image.status}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {(image.filesize / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>

                      {/* Error Message */}
                      {image.status === 'error' && image.error && (
                        <div className="space-y-2">
                          <Alert variant="destructive" className="py-2">
                            <AlertCircle className="h-3 w-3" />
                            <AlertDescription className="text-xs">
                              {image.error}
                            </AlertDescription>
                          </Alert>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => retryUpload(index)}
                            className="w-full text-xs"
                          >
                            Retry Upload
                          </Button>
                        </div>
                      )}

                      {/* Success Indicator */}
                      {image.status === 'success' && (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-3 w-3" />
                          <span className="text-xs">Ready to use</span>
                        </div>
                      )}

                      {/* Uploading Indicator */}
                      {image.status === 'uploading' && (
                        <div className="flex items-center gap-1 text-blue-600">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span className="text-xs">Uploading...</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      {hasImages && (
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          <p>
            <strong>Image IDs:</strong> {uploadedImages.filter(img => img.status === 'success').map(img => img.id).join(', ')}
          </p>
          <p className="mt-1">
            These images are now ready to be used in your product. Copy the IDs above to use them in your product form.
          </p>
        </div>
      )}
    </div>
  )
}


