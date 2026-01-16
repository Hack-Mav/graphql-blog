'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function NewHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false)
    }
    
    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Logo and mobile menu button */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg font-semibold sm:text-xl">GraphQL Blog</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Link 
            href="/blog" 
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Blog
          </Link>
          <Link 
            href="/about" 
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search bar - hidden on mobile */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts..."
              className="w-full rounded-lg bg-background pl-9 pr-4 md:w-[180px] lg:w-[240px]"
            />
          </div>

          {/* Sign in button - hidden on mobile */}
          <Button variant="outline" size="sm" className="hidden md:inline-flex">
            Sign In
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`border-t bg-background/95 backdrop-blur-sm transition-all duration-300 md:hidden ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="mx-auto w-full max-w-7xl space-y-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts..."
              className="w-full rounded-lg bg-background pl-9 pr-4"
            />
          </div>
          <nav className="flex flex-col space-y-2 pt-2">
            <Link
              href="/blog"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </nav>
          <Button variant="outline" className="w-full justify-start">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  )
}
