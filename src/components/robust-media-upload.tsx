'use client'

import React, { useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, X, AlertCircle, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UploadedMedia {
  id: string
  filename: string
  url: string
  alt: string
  filesize: number
  mimeType: string
  width?: number
  height?: number
}

interface RobustMediaUploadProps {
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

export function RobustMediaUpload({
  onUploadSuccess,
  onUploadError,
  className = '',
  maxFiles = 5,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  showPreview = true,
  title = "Upload Images",
  description = "Drag and drop images here or click to select"
}: RobustMediaUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedMedia[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = useCallback((file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize) {
      return `File size too large. Maximum size is ${Math.round(maxFileSize / 1024 / 1024)}MB.`
    }

    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      return `Invalid file type. Accepted types: ${acceptedTypes.map(type => type.split('/')[1]).join(', ')}.`
    }

    return null
  }, [maxFileSize, acceptedTypes])

  const uploadFile = useCallback(async (file: File): Promise<UploadedMedia> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('alt', file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "))

    const response = await fetch('/api/media', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Upload failed: ${response.status}`)
    }

    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.error || 'Upload failed')
    }

    return {
      id: result.data.id,
      filename: result.data.filename,
      url: result.data.url,
      alt: result.data.alt,
      filesize: result.data.filesize,
      mimeType: result.data.mimeType,
      width: result.data.width,
      height: result.data.height,
    }
  }, [])

  const handleFiles = useCallback(async (files: FileList) => {
    if (uploadedFiles.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed.`)
      return
    }

    setIsUploading(true)
    setError(null)
    setUploadProgress(0)

    const validFiles: File[] = []
    const errors: string[] = []

    // Validate all files first
    Array.from(files).forEach(file => {
      const validationError = validateFile(file)
      if (validationError) {
        errors.push(`${file.name}: ${validationError}`)
      } else {
        validFiles.push(file)
      }
    })

    if (errors.length > 0) {
      setError(errors.join('\n'))
      setIsUploading(false)
      onUploadError?.(errors.join('\n'))
      return
    }

    if (validFiles.length === 0) {
      setIsUploading(false)
      return
    }

    // Upload files sequentially to avoid overwhelming the server
    const newUploadedFiles: UploadedMedia[] = []
    
    for (let i = 0; i < validFiles.length; i++) {
      try {
        const file = validFiles[i]
        if (!file) continue // Skip if file is undefined
        
        const uploadedMedia = await uploadFile(file)
        newUploadedFiles.push(uploadedMedia)
        
        // Update progress
        setUploadProgress(((i + 1) / validFiles.length) * 100)
        
        // Call success callback for each file
        onUploadSuccess?.(uploadedMedia)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Upload failed'
        setError(errorMessage)
        onUploadError?.(errorMessage)
        break
      }
    }

    setUploadedFiles(prev => [...prev, ...newUploadedFiles])
    setIsUploading(false)
    setUploadProgress(0)
  }, [uploadedFiles.length, maxFiles, validateFile, uploadFile, onUploadSuccess, onUploadError])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [handleFiles])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }, [handleFiles])

  const removeFile = useCallback((index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }, [])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={cn("w-full", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Upload Area */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              dragActive 
                ? "border-primary bg-primary/5" 
                : "border-muted-foreground/25 hover:border-primary/50",
              isUploading && "pointer-events-none opacity-50"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={acceptedTypes.join(',')}
              onChange={handleFileInput}
              className="hidden"
              disabled={isUploading}
            />
            
            <div className="flex flex-col items-center gap-4">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
              <div>
                <p className="text-lg font-medium">
                  {dragActive ? "Drop files here" : "Drag and drop files here"}
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to select files
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading || uploadedFiles.length >= maxFiles}
              >
                Select Files
              </Button>
              <p className="text-xs text-muted-foreground">
                Max {maxFiles} files, {Math.round(maxFileSize / 1024 / 1024)}MB each
              </p>
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="whitespace-pre-line">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Uploaded Files Preview */}
          {showPreview && uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Uploaded Files ({uploadedFiles.length})</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {uploadedFiles.map((file, index) => (
                  <div key={file.id} className="relative group">
                    <div className="border rounded-lg p-3 space-y-2">
                      <div className="aspect-video bg-muted rounded overflow-hidden relative">
                        <Image
                          src={file.url}
                          alt={file.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium truncate" title={file.filename}>
                          {file.filename}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.filesize)}
                        </p>
                        {file.width && file.height && (
                          <p className="text-xs text-muted-foreground">
                            {file.width} × {file.height}
                          </p>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
