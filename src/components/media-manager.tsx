"use client"

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Search, Grid, List, Trash2, Eye, Download, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { useMediaList, useMedia, type MediaFile } from '@/hooks/use-media'
import { formatFileSize, getImageDimensions, isImageOptimized } from '@/lib/image-utils'
import { ProductionUpload } from './production-upload'

interface MediaManagerProps {
  className?: string
  onSelect?: (media: MediaFile) => void
  selectionMode?: boolean
  selectedMedia?: MediaFile[]
  onSelectionChange?: (media: MediaFile[]) => void
}

type ViewMode = 'grid' | 'list'
type SortBy = 'newest' | 'oldest' | 'name' | 'size'

export function MediaManager({
  className = '',
  onSelect,
  selectionMode = false,
  selectedMedia = [],
  onSelectionChange,
}: MediaManagerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortBy>('newest')
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const { media, pagination, loadMedia, isLoading, error } = useMediaList({
    limit: 20,
  })

  const { deleteMedia } = useMedia()

  // Load media on component mount and when filters change
  useEffect(() => {
    loadMedia()
  }, [loadMedia])

  // Filter and sort media
  const filteredAndSortedMedia = React.useMemo(() => {
    let filtered = media

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.alt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'name':
          return a.filename.localeCompare(b.filename)
        case 'size':
          return b.filesize - a.filesize
        default:
          return 0
      }
    })

    return filtered
  }, [media, searchQuery, sortBy])

  const handleSelect = useCallback((media: MediaFile) => {
    if (selectionMode) {
      const isSelected = selectedMedia.some(m => m.id === media.id)
      if (isSelected) {
        onSelectionChange?.(selectedMedia.filter(m => m.id !== media.id))
      } else {
        onSelectionChange?.([...selectedMedia, media])
      }
    } else {
      onSelect?.(media)
    }
  }, [selectionMode, selectedMedia, onSelect, onSelectionChange])

  const handleDelete = useCallback(async (media: MediaFile) => {
    if (!confirm(`Are you sure you want to delete "${media.filename}"?`)) {
      return
    }

    try {
      await deleteMedia(media.id)
      loadMedia() // Reload the list
    } catch (err) {
      console.error('Failed to delete media:', err)
    }
  }, [deleteMedia, loadMedia])

  const handleUploadSuccess = useCallback(() => {
    setShowUploadDialog(false)
    loadMedia() // Reload the list
  }, [loadMedia])

  const isSelected = useCallback((media: MediaFile) => {
    return selectedMedia.some(m => m.id === media.id)
  }, [selectedMedia])

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Media Manager</h2>
          <p className="text-gray-600">Manage your uploaded images</p>
        </div>
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Upload New Images</DialogTitle>
            </DialogHeader>
            <ProductionUpload
              onUploadSuccess={handleUploadSuccess}
              maxFiles={10}
              showPreview={true}
              showMetadata={true}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search images..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>


            {/* Sort */}
            <Select value={sortBy} onValueChange={(value: SortBy) => setSortBy(value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="size">Size</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid/List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      ) : filteredAndSortedMedia.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="text-gray-400">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <div>
                <h3 className="text-lg font-medium">No images found</h3>
                <p className="text-gray-600">
                  {searchQuery 
                    ? 'Try adjusting your search'
                    : 'Upload your first image to get started'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
            : 'space-y-2'
        }>
          {filteredAndSortedMedia.map((item) => (
            <Card 
              key={item.id} 
              className={`relative group cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected(item) ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleSelect(item)}
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <Image
                    src={item.url}
                    alt={item.alt}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(item.url, '_blank')
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          const link = document.createElement('a')
                          link.href = item.url
                          link.download = item.filename
                          link.click()
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(item)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {selectionMode && isSelected(item) && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>
                  )}

                  {/* Status Badges */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    {isImageOptimized(item) && (
                      <Badge variant="outline" className="text-xs">
                        Optimized
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 space-y-2">
                  <div>
                    <h4 className="font-medium text-sm truncate" title={item.filename}>
                      {item.filename}
                    </h4>
                    <p className="text-xs text-gray-500 truncate" title={item.alt}>
                      {item.alt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatFileSize(item.filesize)}</span>
                    <span>{getImageDimensions(item)}</span>
                  </div>

                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!pagination.hasPrevPage}
            onClick={() => {
              // Implement pagination logic here
            }}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={!pagination.hasNextPage}
            onClick={() => {
              // Implement pagination logic here
            }}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}


