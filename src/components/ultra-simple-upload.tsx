"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Upload, CheckCircle, AlertCircle } from 'lucide-react'

interface UltraSimpleUploadProps {
  onUploadSuccess?: (imageId: string) => void
  className?: string
}

export function UltraSimpleUpload({ onUploadSuccess, className = '' }: UltraSimpleUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<{ id: string; filename: string; url?: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      // Create form data
      const formData = new FormData()
      formData.append('file', file)
      formData.append('alt', file.name)

             // Upload directly to Payload's media endpoint
       console.log('Uploading file:', file.name, 'Size:', file.size)
       
       const response = await fetch('/api/media', {
         method: 'POST',
         body: formData,
         credentials: 'include',
       })
       
       console.log('Upload response status:', response.status)

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

      const data = await response.json()
      
      setUploadedImage({
        id: data.id,
        filename: data.filename,
        url: data.url
      })
      
      onUploadSuccess?.(data.id)
      
      // Reset the file input
      event.target.value = ''
      
    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const resetUpload = () => {
    setUploadedImage(null)
    setError(null)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {!uploadedImage ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={isUploading}
            className="hidden"
            id="file-upload"
          />
          
          <label 
            htmlFor="file-upload" 
            className={`cursor-pointer block ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <div className="flex flex-col items-center space-y-3">
              {isUploading ? (
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
              ) : (
                <Upload className="h-10 w-10 text-gray-400" />
              )}
              
              <div className="text-lg font-medium">
                {isUploading ? 'Uploading...' : 'Click to select image'}
              </div>
              
              <p className="text-sm text-gray-500">
                Any image format (JPEG, PNG, WebP, GIF, SVG)
              </p>
            </div>
          </label>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-green-50">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
            <div className="flex-1">
              <p className="font-medium text-green-700">{uploadedImage.filename}</p>
              <p className="text-sm text-green-600">Uploaded successfully!</p>
              {uploadedImage.url && (
                <div className="mt-2">
                  <Image 
                    src={uploadedImage.url} 
                    alt="Uploaded image preview" 
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded border"
                  />
                </div>
              )}
            </div>
            <button
              onClick={resetUpload}
              className="text-sm text-green-600 hover:text-green-800 underline"
            >
              Upload another
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="border rounded-lg p-4 bg-red-50">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <div className="flex-1">
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <button
              onClick={resetUpload}
              className="text-sm text-red-600 hover:text-red-800 underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {uploadedImage && (
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
          <p><strong>Image ID:</strong> {uploadedImage.id}</p>
          <p>This image is now available in your media library and ready to use in products.</p>
        </div>
      )}
    </div>
  )
} 