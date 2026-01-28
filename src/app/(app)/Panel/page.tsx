import { redirect } from 'next/navigation'
import Link from 'next/link'
import { caller } from '@/trpc/server'
import { Button } from '@/components/ui/button'
import { User, Home, ShoppingCart } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function PanelPage() {
  const session = await caller.auth.session()

  if (!session.user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Panel użytkownika</h1>
                <p className="text-muted-foreground">Witaj z powrotem, {session.user.username || 'admin'}!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Powrót do sklepu
                </Link>
              </Button>
              <Button variant="default" size="sm" asChild>
                <Link href="/products" className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Produkty
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
