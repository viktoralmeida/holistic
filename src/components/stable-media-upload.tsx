"use client"

import React, { useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

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

interface StableMediaUploadProps {
  onUploadSuccess?: (media: UploadedMedia) => void
  onUploadError?: (error: string) => void
  className?: string
  maxFiles?: number
  maxFileSize?: number
  acceptedTypes?: string[]
  showPreview?: boolean
  title?: string
  description?: string
}

export function StableMediaUpload({
  onUploadSuccess,
  onUploadError,
  className = '',
  maxFiles = 5,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  showPreview = true,
  title = "Upload Images",
  description = "Drag and drop images here or click to select"
}: StableMediaUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedMedia[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [error, setError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = useCallback((file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize) {
      return `File size too large. Maximum size is ${Math.round(maxFileSize / 1024 / 1024)}MB.`
    }

    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      return `File type not supported. Accepted types: ${acceptedTypes.join(', ')}`
    }

    return null
  }, [maxFileSize, acceptedTypes])

  const uploadFile = useCallback(async (file: File, customTitle?: string): Promise<UploadedMedia> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', customTitle || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "))
    formData.append('alt', file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "))

    const response = await fetch('/api/media', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })

    if (!response.ok) {
      let errorMessage = `Upload failed: ${response.status}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.error || errorMessage
      } catch {
        errorMessage = response.statusText || errorMessage
      }
      throw new Error(errorMessage)
    }

    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.error || 'Upload failed')
    }

    if (!result.data) {
      throw new Error('No data returned from upload')
    }

    return result.data
  }, [])

  const handleFiles = useCallback(async (files: FileList) => {
    if (uploadedFiles.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`)
      return
    }

    setIsUploading(true)
    setError(null)

    const fileArray = Array.from(files)
    const newUploadedFiles: UploadedMedia[] = []

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i]
      if (!file) continue
      
      const fileId = `${file.name}-${Date.now()}-${i}`

      // Validate file
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        continue
      }

      try {
        // Set initial progress
        setUploadProgress(prev => ({ ...prev, [fileId]: 0 }))

        // Simulate progress (since we can't track real progress with fetch)
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            const current = prev[fileId] || 0
            if (current < 90) {
              return { ...prev, [fileId]: current + 10 }
            }
            return prev
          })
        }, 100)

        const uploadedFile = await uploadFile(file)
        
        // Complete progress
        clearInterval(progressInterval)
        setUploadProgress(prev => ({ ...prev, [fileId]: 100 }))

        newUploadedFiles.push(uploadedFile)
        onUploadSuccess?.(uploadedFile)

        // Clean up progress after a delay
        setTimeout(() => {
          setUploadProgress(prev => {
            const newProgress = { ...prev }
            delete newProgress[fileId]
            return newProgress
          })
        }, 1000)

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Upload failed'
        setError(errorMessage)
        onUploadError?.(errorMessage)
        console.error('Upload error:', err)
      }
    }

    setUploadedFiles(prev => [...prev, ...newUploadedFiles])
    setIsUploading(false)
  }, [uploadedFiles.length, maxFiles, validateFile, uploadFile, onUploadSuccess, onUploadError])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFiles(files)
    }
  }, [handleFiles])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFiles(files)
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [handleFiles])

  const removeFile = useCallback((index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${isUploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          multiple={maxFiles > 1}
          className="hidden"
        />
        
        <div className="flex flex-col items-center space-y-3">
          {isUploading ? (
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
          ) : (
            <Upload className="h-10 w-10 text-gray-400" />
          )}
          
          <div className="text-lg font-medium">
            {isUploading ? 'Uploading...' : title}
          </div>
          
          <p className="text-sm text-gray-500 max-w-md">
            {description}
          </p>
          
          <div className="text-xs text-gray-400">
            Max {maxFiles} files, {Math.round(maxFileSize / 1024 / 1024)}MB each
          </div>
        </div>
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2">
          {Object.entries(uploadProgress).map(([fileId, progress]) => (
            <div key={fileId} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Uploading...</span>
                <span className="text-gray-500">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Uploaded Files ({uploadedFiles.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles.map((file, index) => (
              <div key={file.id} className="border rounded-lg p-4 bg-green-50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium text-green-700 truncate">
                      {file.title}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                {showPreview && file.url && (
                  <div className="mb-2">
                    <Image
                      src={file.url}
                      alt={file.alt || file.title}
                      width={120}
                      height={120}
                      className="w-full h-24 object-cover rounded border"
                    />
                  </div>
                )}
                
                <div className="text-xs text-gray-600 space-y-1">
                  <p><strong>ID:</strong> {file.id}</p>
                  <p><strong>File:</strong> {file.filename}</p>
                  {file.filesize && (
                    <p><strong>Size:</strong> {(file.filesize / 1024).toFixed(1)} KB</p>
                  )}
                  {file.width && file.height && (
                    <p><strong>Dimensions:</strong> {file.width} × {file.height}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="border rounded-lg p-4 bg-red-50">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <button
              onClick={clearError}
              className="text-sm text-red-600 hover:text-red-800 underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Summary */}
      {uploadedFiles.length > 0 && (
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
          <p><strong>Successfully uploaded {uploadedFiles.length} file(s)</strong></p>
          <p>These files are now available in your media library and ready to use in products.</p>
        </div>
      )}
    </div>
  )
}
