"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Search, Grid, List, Loader2, AlertCircle, FileImage, CheckCircle } from 'lucide-react'

interface MediaItem {
  id: string
  title: string
  filename: string
  url: string
  alt?: string
  filesize?: number
  mimeType?: string
  width?: number
  height?: number
  createdAt: string
}

interface MediaGalleryProps {
  onSelectMedia?: (media: MediaItem) => void
  className?: string
  showSelectButton?: boolean
  selectButtonText?: string
}

export function MediaGallery({
  onSelectMedia,
  className = '',
  showSelectButton = false,
  selectButtonText = 'Select'
}: MediaGalleryProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)

  const fetchMedia = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/media?limit=50', {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch media: ${response.status}`)
      }

      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch media')
      }

      setMediaItems(result.data || [])
      setFilteredItems(result.data || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch media'
      setError(errorMessage)
      console.error('Media fetch error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMedia()
  }, [])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredItems(mediaItems)
    } else {
      const filtered = mediaItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.alt && item.alt.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setFilteredItems(filtered)
    }
  }, [searchTerm, mediaItems])

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleSelect = (item: MediaItem) => {
    if (showSelectButton) {
      setSelectedItem(item)
      onSelectMedia?.(item)
    }
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-2" />
          <p className="text-gray-600">Loading media library...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`p-8 ${className}`}>
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchMedia}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Media Library</h2>
          <p className="text-gray-600">{filteredItems.length} of {mediaItems.length} items</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by title, filename, or alt text..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Media Items */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-8">
          <FileImage className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {searchTerm ? 'No media found matching your search.' : 'No media uploaded yet.'}
          </p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-4'}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`
                border rounded-lg overflow-hidden transition-all duration-200
                ${viewMode === 'grid' ? 'bg-white hover:shadow-md' : 'bg-white p-4 flex items-center space-x-4'}
                ${selectedItem?.id === item.id ? 'ring-2 ring-blue-500' : ''}
              `}
            >
              {viewMode === 'grid' ? (
                <>
                  <div className="aspect-square relative bg-gray-100">
                    <Image
                      src={item.url}
                      alt={item.alt || item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 truncate" title={item.title}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 truncate" title={item.filename}>
                      {item.filename}
                    </p>
                    <div className="mt-2 text-xs text-gray-400 space-y-1">
                      <p>{formatFileSize(item.filesize)}</p>
                      {item.width && item.height && (
                        <p>{item.width} × {item.height}</p>
                      )}
                      <p>{formatDate(item.createdAt)}</p>
                    </div>
                    {showSelectButton && (
                      <button
                        onClick={() => handleSelect(item)}
                        className="mt-3 w-full px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                      >
                        {selectButtonText}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 relative bg-gray-100 rounded flex-shrink-0">
                    <Image
                      src={item.url}
                      alt={item.alt || item.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate" title={item.title}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 truncate" title={item.filename}>
                      {item.filename}
                    </p>
                    <div className="mt-1 text-xs text-gray-400">
                      {formatFileSize(item.filesize)} • {item.width && item.height ? `${item.width} × ${item.height}` : ''} • {formatDate(item.createdAt)}
                    </div>
                  </div>
                  {showSelectButton && (
                    <button
                      onClick={() => handleSelect(item)}
                      className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                    >
                      {selectButtonText}
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Selected Item Info */}
      {selectedItem && showSelectButton && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-blue-500" />
            <span className="text-blue-700 font-medium">Selected: {selectedItem.title}</span>
          </div>
        </div>
      )}
    </div>
  )
}
