"use client"

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Image as ImageIcon, CheckCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Alert, AlertDescription } from './ui/alert'
import { AlertCircle } from 'lucide-react'

interface SimpleProductUploadProps {
  onImageUploaded?: (imageId: string) => void
  className?: string
}

export function SimpleProductUpload({ onImageUploaded, className = '' }: SimpleProductUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<{ id: string; url: string; filename: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const uploadImage = useCallback(async (file: File) => {
    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('alt', file.name) // Use filename as alt text

      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      if (!response.ok) {
        let errorMessage = `Upload failed: ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorData.message || errorMessage
        } catch {
          const errorText = await response.text()
          errorMessage = errorText || errorMessage
        }
        console.error('Upload failed:', response.status, errorMessage)
        throw new Error(errorMessage)
      }

      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Upload failed')
      }
      
      setUploadedImage({
        id: result.data.id,
        url: result.data.url,
        filename: result.data.filename
      })
      
      onImageUploaded?.(result.data.id)
    } catch (err) {
      setError('Failed to upload image. Please try again.')
      console.error('Upload error:', err)
    } finally {
      setIsUploading(false)
    }
  }, [onImageUploaded])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0 && acceptedFiles[0]) {
      uploadImage(acceptedFiles[0])
    }
  }, [uploadImage])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif', '.svg']
    },
    maxFiles: 1,
    disabled: isUploading
  })

  const removeImage = () => {
    setUploadedImage(null)
    setError(null)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {!uploadedImage ? (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive && !isDragReject ? 'border-blue-500 bg-blue-50' : ''}
            ${isDragReject ? 'border-red-500 bg-red-50' : ''}
            ${!isDragActive && !isDragReject ? 'border-gray-300 hover:border-gray-400' : ''}
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center space-y-3">
            {isUploading ? (
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
            ) : (
              <Upload className="h-10 w-10 text-gray-400" />
            )}
            
            <div className="text-lg font-medium">
              {isDragActive ? (
                isDragReject ? (
                  <span className="text-red-500">Invalid file type</span>
                ) : (
                  <span className="text-blue-500">Drop the image here</span>
                )
              ) : (
                <span>
                  {isUploading ? 'Uploading...' : 'Drop image here or click to select'}
                </span>
              )}
            </div>
            
            <p className="text-sm text-gray-500">
              Supports: JPEG, PNG, WebP, GIF, SVG (max 10MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center space-x-3">
            <ImageIcon className="h-8 w-8 text-green-500" />
            <div className="flex-1">
              <p className="font-medium text-green-700">{uploadedImage.filename}</p>
              <p className="text-sm text-gray-500">Image uploaded successfully</p>
            </div>
            <CheckCircle className="h-5 w-5 text-green-500" />
            <Button
              variant="ghost"
              size="sm"
              onClick={removeImage}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {uploadedImage && (
        <div className="text-sm text-gray-600">
          <p>Image ID: {uploadedImage.id}</p>
          <p>This image is now ready to be used in your product.</p>
        </div>
      )}
    </div>
  )
} 