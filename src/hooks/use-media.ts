import { useState, useCallback } from 'react'

export interface MediaFile {
  id: string
  filename: string
  alt: string
  filesize: number
  mimeType: string
  width: number
  height: number
  url: string
  sizes?: {
    thumbnail?: {
      url: string
      width: number
      height: number
    }
    card?: {
      url: string
      width: number
      height: number
    }
  }
  createdAt: string
  updatedAt: string
}

export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

export interface MediaUploadOptions {
  alt?: string
  onProgress?: (progress: UploadProgress) => void
}

export interface MediaListOptions {
  limit?: number
  page?: number
}

export interface MediaListResponse {
  success: boolean
  data: MediaFile[]
  pagination: {
    totalDocs: number
    limit: number
    totalPages: number
    page: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number | null
    nextPage: number | null
  }
}

export interface MediaResponse {
  success: boolean
  data: MediaFile
  processingTime?: string
}

export interface MediaError {
  success: false
  error: string
  code: string
  processingTime?: string
}

export function useMedia() {
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadMedia = useCallback(async (
    file: File, 
    options: MediaUploadOptions = {}
  ): Promise<MediaFile> => {
    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      
      if (options.alt) {
        formData.append('alt', options.alt)
      }

      // Use our custom API route
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed')
      }

      if (!result.success) {
        throw new Error(result.error || 'Upload failed')
      }

      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsUploading(false)
    }
  }, [])

  const getMedia = useCallback(async (id: string): Promise<MediaFile> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/media?id=${id}`, {
        method: 'GET',
        credentials: 'include',
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch media')
      }

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch media')
      }

      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch media'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const listMedia = useCallback(async (options: MediaListOptions = {}): Promise<MediaListResponse> => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      
      if (options.limit) {
        params.append('limit', options.limit.toString())
      }
      
      if (options.page) {
        params.append('page', options.page.toString())
      }

      const response = await fetch(`/api/media?${params.toString()}`, {
        method: 'GET',
        credentials: 'include',
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch media list')
      }

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch media list')
      }

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch media list'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteMedia = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/media?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete media')
      }

      if (!result.success) {
        throw new Error(result.error || 'Failed to delete media')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete media'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    // State
    isUploading,
    isLoading,
    error,
    
    // Actions
    uploadMedia,
    getMedia,
    listMedia,
    deleteMedia,
    clearError,
  }
}

export function useMediaUpload(options: MediaUploadOptions = {}) {
  const { uploadMedia, isUploading, error, clearError } = useMedia()

  const upload = useCallback(async (file: File) => {
    return uploadMedia(file, options)
  }, [uploadMedia, options])

  return {
    upload,
    isUploading,
    error,
    clearError,
  }
}

export function useMediaList(options: MediaListOptions = {}) {
  const { listMedia, isLoading, error, clearError } = useMedia()
  const [media, setMedia] = useState<MediaFile[]>([])
  const [pagination, setPagination] = useState<MediaListResponse['pagination'] | null>(null)

  const loadMedia = useCallback(async () => {
    try {
      const result = await listMedia(options)
      setMedia(result.data)
      setPagination(result.pagination)
    } catch {
      // Error is handled by the hook
    }
  }, [listMedia, options])

  return {
    media,
    pagination,
    loadMedia,
    isLoading,
    error,
    clearError,
  }
}


