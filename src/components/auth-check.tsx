"use client"

import { useState, useEffect } from 'react'
import type { User } from '@/payload-types'

export function AuthCheck() {
  const [authStatus, setAuthStatus] = useState<{
    isAuthenticated: boolean
    user: User | null
    error: string | null
  }>({
    isAuthenticated: false,
    user: null,
    error: null
  })

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/users/me', {
        credentials: 'include',
      })
      
      if (response.ok) {
        const user = (await response.json()) as User
        setAuthStatus({
          isAuthenticated: true,
          user,
          error: null
        })
      } else {
        setAuthStatus({
          isAuthenticated: false,
          user: null,
          error: `Auth failed: ${response.status}`
        })
      }
    } catch (error) {
      setAuthStatus({
        isAuthenticated: false,
        user: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold mb-2">Authentication Status</h3>
      
      {authStatus.isAuthenticated ? (
        <div className="space-y-2">
          <p className="text-green-600">✅ Authenticated</p>
          <div className="text-sm">
            <p><strong>User ID:</strong> {authStatus.user?.id}</p>
            <p><strong>Email:</strong> {authStatus.user?.email}</p>
            <p><strong>Roles:</strong> {authStatus.user?.roles?.join(', ') || 'None'}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-red-600">❌ Not Authenticated</p>
          {authStatus.error && (
            <p className="text-sm text-red-500">Error: {authStatus.error}</p>
          )}
          <button
            onClick={checkAuth}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Check Again
          </button>
        </div>
      )}
    </div>
  )
} 