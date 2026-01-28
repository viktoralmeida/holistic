import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string[] }> }
) {
  try {
    const { filename } = await params
    const filenameStr = Array.isArray(filename) ? filename.join('/') : filename
    
    if (!filenameStr) {
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      )
    }

    // Security check - prevent directory traversal
    if (filenameStr.includes('..') || filenameStr.includes('/')) {
      return NextResponse.json(
        { error: 'Invalid filename' },
        { status: 400 }
      )
    }

    // Try multiple possible file locations
    const possiblePaths = [
      path.join('/tmp/uploads', filenameStr),
      path.join('/tmp/media', filenameStr),
      path.join(process.cwd(), 'public', 'media', filenameStr),
    ]

    let fileBuffer: Buffer | null = null

    // Check each possible path
    for (const possiblePath of possiblePaths) {
      try {
        await fs.access(possiblePath)
        fileBuffer = await fs.readFile(possiblePath)
        break
      } catch {
        // File doesn't exist at this path, try next one
        continue
      }
    }

    if (!fileBuffer) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }

    // Determine content type based on file extension
    const ext = path.extname(filenameStr).toLowerCase()
    const mimeTypes: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
    }
    
    const contentType = mimeTypes[ext] || 'application/octet-stream'

    // Return the file with proper headers
    return new NextResponse(fileBuffer as BodyInit, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': fileBuffer.length.toString(),
      },
    })

  } catch (error) {
    console.error('File serving error:', error)
    
    return NextResponse.json(
      { error: 'Failed to serve file' },
      { status: 500 }
    )
  }
}