"use client"

import React, { useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Image as ImageIcon, AlertCircle, Loader2, Trash2, Eye, Download } from 'lucide-react'
import { Button } from './ui/button'
import { Alert, AlertDescription } from './ui/alert'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useMedia, type MediaFile, type MediaUploadOptions } from '@/hooks/use-media'
import { validateImageFile, formatFileSize, generateAltFromFilename } from '@/lib/image-utils'

interface ProductionUploadProps {
  onUploadSuccess?: (media: MediaFile) => void
  onUploadError?: (error: string) => void
  className?: string
  maxFiles?: number
  acceptedFileTypes?: string[]
  maxFileSize?: number
  showPreview?: boolean
  showMetadata?: boolean
}

interface UploadedFile {
  file: File
  preview: string
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
  media?: MediaFile
}

export function ProductionUpload({
  onUploadSuccess,
  onUploadError,
  className = '',
  maxFiles = 5,
  acceptedFileTypes = ['.jpeg', '.jpg', '.png', '.webp', '.gif', '.svg'],
  maxFileSize = 10 * 1024 * 1024, // 10MB
  showPreview = true,
  showMetadata = true,
}: ProductionUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { uploadMedia, isUploading, error, clearError } = useMedia()

  const validateFile = useCallback((file: File): { valid: boolean; error?: string } => {
    // Use our validation utility
    const validation = validateImageFile(file)
    if (!validation.valid) {
      return validation
    }

    // Check file size against component limit
    if (file.size > maxFileSize) {
      return {
        valid: false,
        error: `File size too large: ${formatFileSize(file.size)}. Maximum size is ${formatFileSize(maxFileSize)}.`
      }
    }

    // Check file type against component accepted types
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!acceptedFileTypes.includes(fileExtension)) {
      return {
        valid: false,
        error: `Invalid file type: ${fileExtension}. Accepted types: ${acceptedFileTypes.join(', ')}`
      }
    }

    return { valid: true }
  }, [maxFileSize, acceptedFileTypes])

  const handleFileSelect = useCallback(async (files: File[]) => {
    clearError()

    // Validate files
    const validFiles: File[] = []
    const errors: string[] = []

    for (const file of files) {
      const validation = validateFile(file)
      if (validation.valid) {
        validFiles.push(file)
      } else {
        errors.push(`${file.name}: ${validation.error}`)
      }
    }

    if (errors.length > 0) {
      onUploadError?.(errors.join('\n'))
      return
    }

    // Check if adding these files would exceed maxFiles limit
    if (uploadedFiles.length + validFiles.length > maxFiles) {
      onUploadError?.(`Maximum ${maxFiles} files allowed. You're trying to add ${validFiles.length} files but already have ${uploadedFiles.length}.`)
      return
    }

    // Create preview objects for valid files
    const newFiles: UploadedFile[] = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: 'pending' as const,
    }))

    setUploadedFiles(prev => [...prev, ...newFiles])

    // Upload files one by one
    for (let i = 0; i < newFiles.length; i++) {
      const fileIndex = uploadedFiles.length + i
      const file = newFiles[i]
      
      if (!file) continue

      try {
        // Update status to uploading
        setUploadedFiles(prev => prev.map((f, index) => 
          index === fileIndex ? { ...f, status: 'uploading' } : f
        ))

        // Prepare upload options
        const uploadOptions: MediaUploadOptions = {
          alt: generateAltFromFilename(file.file.name),
        }

        // Upload the file
        const media = await uploadMedia(file.file, uploadOptions)

        // Update status to success
        setUploadedFiles(prev => prev.map((f, index) => 
          index === fileIndex 
            ? { ...f, status: 'success', progress: 100, media }
            : f
        ))

        onUploadSuccess?.(media)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Upload failed'
        
        // Update status to error
        setUploadedFiles(prev => prev.map((f, index) => 
          index === fileIndex 
            ? { ...f, status: 'error', error: errorMessage }
            : f
        ))

        onUploadError?.(errorMessage)
      }
    }
  }, [uploadedFiles.length, maxFiles, validateFile, uploadMedia, onUploadSuccess, onUploadError, clearError])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleFileSelect(acceptedFiles)
  }, [handleFileSelect])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': acceptedFileTypes
    },
    maxFiles: maxFiles - uploadedFiles.length,
    disabled: isUploading || uploadedFiles.length >= maxFiles,
  })

  const removeFile = useCallback((index: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev]
      const file = newFiles[index]
      
      // Clean up preview URL
      if (file && file.preview) {
        URL.revokeObjectURL(file.preview)
      }
      
      newFiles.splice(index, 1)
      return newFiles
    })
  }, [])

  const retryUpload = useCallback(async (index: number) => {
    const file = uploadedFiles[index]
    if (!file || file.status !== 'error') return

    try {
      // Reset status to uploading
      setUploadedFiles(prev => prev.map((f, i) => 
        i === index ? { ...f, status: 'uploading', progress: 0, error: undefined } : f
      ))

      const uploadOptions: MediaUploadOptions = {
        alt: generateAltFromFilename(file.file.name),
      }

      const media = await uploadMedia(file.file, uploadOptions)

      setUploadedFiles(prev => prev.map((f, i) => 
        i === index 
          ? { ...f, status: 'success', progress: 100, media }
          : f
      ))

      onUploadSuccess?.(media)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed'
      setUploadedFiles(prev => prev.map((f, i) => 
        i === index 
          ? { ...f, status: 'error', error: errorMessage }
          : f
      ))
    }
  }, [uploadedFiles, uploadMedia, onUploadSuccess])

  const clearAll = useCallback(() => {
    uploadedFiles.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
    })
    setUploadedFiles([])
    clearError()
  }, [uploadedFiles, clearError])

  const canUpload = uploadedFiles.length < maxFiles && !isUploading

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Images
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
              ${isDragActive && !isDragReject ? 'border-blue-500 bg-blue-50 scale-105' : ''}
              ${isDragReject ? 'border-red-500 bg-red-50' : ''}
              ${!isDragActive && !isDragReject ? 'border-gray-300 hover:border-gray-400 hover:bg-gray-50' : ''}
              ${!canUpload ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <input {...getInputProps()} ref={fileInputRef} />
            
            <div className="flex flex-col items-center space-y-4">
              {isUploading ? (
                <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
              ) : (
                <Upload className="h-12 w-12 text-gray-400" />
              )}
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">
                  {isDragActive ? (
                    isDragReject ? (
                      <span className="text-red-500">Invalid file type</span>
                    ) : (
                      <span className="text-blue-500">Drop the images here</span>
                    )
                  ) : (
                    <span>
                      {isUploading ? 'Uploading...' : 'Drop images here or click to select'}
                    </span>
                  )}
                </h3>
                
                <p className="text-sm text-gray-500">
                  Supports: {acceptedFileTypes.join(', ')} (max {formatFileSize(maxFileSize)} each)
                </p>
                
                <p className="text-xs text-gray-400">
                  {uploadedFiles.length} of {maxFiles} files uploaded
                </p>
              </div>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Uploaded Files ({uploadedFiles.length})
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedFiles.map((file, index) => (
                <Card key={index} className="relative">
                  <CardContent className="p-4">
                    {/* File Preview */}
                    {showPreview && (
                      <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={file.preview}
                          alt={file.file.name}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* File Info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm truncate" title={file.file.name}>
                          {file.file.name}
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant={
                          file.status === 'success' ? 'default' :
                          file.status === 'error' ? 'destructive' :
                          file.status === 'uploading' ? 'secondary' : 'outline'
                        }>
                          {file.status}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatFileSize(file.file.size)}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      {file.status === 'uploading' && (
                        <div className="space-y-1">
                          <Progress value={file.progress} className="h-2" />
                          <p className="text-xs text-gray-500 text-center">
                            {file.progress}%
                          </p>
                        </div>
                      )}

                      {/* Error Message */}
                      {file.status === 'error' && file.error && (
                        <div className="space-y-2">
                          <Alert variant="destructive" className="py-2">
                            <AlertCircle className="h-3 w-3" />
                            <AlertDescription className="text-xs">
                              {file.error}
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

                      {/* Success Actions */}
                      {file.status === 'success' && file.media && (
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs"
                            onClick={() => window.open(file.media!.url, '_blank')}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs"
                            onClick={() => {
                              const link = document.createElement('a')
                              link.href = file.media!.url
                              link.download = file.media!.filename
                              link.click()
                            }}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      )}

                      {/* Metadata */}
                      {showMetadata && file.media && (
                        <div className="text-xs text-gray-500 space-y-1">
                          <p>ID: {file.media.id}</p>
                          <p>Dimensions: {file.media.width} × {file.media.height}</p>
                          <p>Size: {formatFileSize(file.media.filesize)}</p>
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
    </div>
  )
}


