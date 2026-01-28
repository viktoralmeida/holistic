"use client"

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { Alert, AlertDescription } from './ui/alert'

interface UltraSimpleImageUploadProps {
  onImageUploaded?: (imageId: string) => void
  className?: string
  placeholder?: string
}

export function UltraSimpleImageUpload({
  onImageUploaded,
  className = '',
  placeholder = 'Drop image here or click to select'
}: UltraSimpleImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<{ id: string; filename: string; url: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const uploadImage = useCallback(async (file: File) => {
    setIsUploading(true)
    setError(null)

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

      setUploadedImage({
        id: result.data.id,
        filename: result.data.filename,
        url: result.data.url
      })
      
      onImageUploaded?.(result.data.id)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed'
      setError(errorMessage)
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
    <div className={`space-y-3 ${className}`}>
      {!uploadedImage ? (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${isDragActive && !isDragReject ? 'border-blue-500 bg-blue-50' : ''}
            ${isDragReject ? 'border-red-500 bg-red-50' : ''}
            ${!isDragActive && !isDragReject ? 'border-gray-300 hover:border-gray-400' : ''}
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center space-y-3">
            {isUploading ? (
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            ) : (
              <Upload className="h-8 w-8 text-gray-400" />
            )}
            
            <div className="text-sm font-medium">
              {isDragActive ? (
                isDragReject ? (
                  <span className="text-red-500">Invalid file type</span>
                ) : (
                  <span className="text-blue-500">Drop the image here</span>
                )
              ) : (
                <span>
                  {isUploading ? 'Uploading...' : placeholder}
                </span>
              )}
            </div>
            
            <p className="text-xs text-gray-500">
              JPEG, PNG, WebP, GIF, SVG (max 10MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-green-50">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <div className="flex-1">
              <p className="font-medium text-green-700">{uploadedImage.filename}</p>
              <p className="text-sm text-green-600">Image uploaded successfully</p>
              <p className="text-xs text-gray-500 mt-1">ID: {uploadedImage.id}</p>
            </div>
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
    </div>
  )
}


