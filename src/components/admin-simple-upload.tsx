"use client"

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, CheckCircle } from 'lucide-react'

interface AdminSimpleUploadProps {
  onChange?: (value: string) => void
  className?: string
}

export function AdminSimpleUpload({ onChange, className = '' }: AdminSimpleUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<{ id: string; url: string; filename: string } | null>(null)

  const uploadImage = useCallback(async (file: File) => {
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('alt', file.name)

      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Upload failed')
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
      
      // Call the onChange function with the image ID
      onChange?.(result.data.id)
    } catch (err) {
      console.error('Upload error:', err)
      alert('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }, [onChange])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0 && acceptedFiles[0]) {
      uploadImage(acceptedFiles[0])
    }
  }, [uploadImage])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif', '.svg']
    },
    maxFiles: 1,
    disabled: isUploading
  })

  return (
    <div className={`w-full ${className}`}>
      {!uploadedImage ? (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center space-y-2">
            {isUploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            ) : (
              <Upload className="h-8 w-8 text-gray-400" />
            )}
            
            <div className="text-sm font-medium">
              {isUploading ? 'Uploading...' : 'Drop image here or click to select'}
            </div>
            
            <p className="text-xs text-gray-500">
              JPEG, PNG, WebP, GIF, SVG (max 10MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-3 bg-green-50">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-700">{uploadedImage.filename}</p>
              <p className="text-xs text-green-600">Uploaded successfully</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 