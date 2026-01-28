'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, X, AlertCircle, CheckCircle } from 'lucide-react'

interface UploadedMedia {
  id: string
  filename: string
  url: string
  alt: string
}

interface DatabaseUploadProps {
  onUploadSuccess?: (media: UploadedMedia) => void
  onUploadError?: (error: string) => void
  className?: string
}

export function DatabaseUpload({
  onUploadSuccess,
  onUploadError,
  className = '',
}: DatabaseUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedMedia[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadFile = async (file: File): Promise<UploadedMedia> => {
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

    return result.data
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setError(null)
    setSuccess(null)

    const newUploadedFiles: UploadedMedia[] = []
    
    for (const file of Array.from(files)) {
      try {
        if (!file.type.startsWith('image/')) {
          throw new Error(`${file.name}: Only image files allowed`)
        }

        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`${file.name}: File too large (max 10MB)`)
        }

        const uploadedMedia = await uploadFile(file)
        newUploadedFiles.push(uploadedMedia)
        onUploadSuccess?.(uploadedMedia)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Upload failed'
        setError(errorMessage)
        onUploadError?.(errorMessage)
        break
      }
    }

    if (newUploadedFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...newUploadedFiles])
      setSuccess(`Successfully uploaded ${newUploadedFiles.length} file(s)`)
      setTimeout(() => setSuccess(null), 3000)
    }

    setIsUploading(false)
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Images to Database
          </CardTitle>
          <CardDescription>
            Images are stored directly in the database. Max 10MB per file.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isUploading}
            />
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Select Images'}
            </Button>
            {uploadedFiles.length > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setUploadedFiles([])}
              >
                Clear All
              </Button>
            )}
          </div>

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {success}
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}

          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Uploaded Files ({uploadedFiles.length})</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {uploadedFiles.map((file, index) => (
                  <div key={file.id} className="relative group border rounded-lg p-3">
                    <div className="aspect-video bg-muted rounded overflow-hidden mb-2 relative">
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
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
