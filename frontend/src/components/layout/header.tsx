import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Search, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <TooltipProvider>
      <header className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        isScrolled ? "bg-background/90 backdrop-blur-sm" : "bg-background/80 backdrop-blur-none"
      )}>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isMenuOpen ? 'Close menu' : 'Open menu'}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-lg font-bold">GraphQL Blog</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Go to homepage</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/blog"
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                Blog
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Browse all blog posts</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/about"
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                About
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Learn more about GraphQL Blog</p>
            </TooltipContent>
          </Tooltip>
        </nav>

        {/* Search and Auth */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Tooltip>
              <TooltipTrigger>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search posts..."
                    className="w-full rounded-lg bg-background pl-9 pr-4 md:w-[180px] lg:w-[240px]"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search blog posts by title or content</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="hidden md:inline-flex">
                Sign In
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sign in to your account</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "border-t bg-background/95 backdrop-blur-lg transition-all duration-300 md:hidden",
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
      )}>
        <div className="mx-auto w-full max-w-7xl space-y-4 px-4 py-4 sm:px-6 lg:px-8">
          <Tooltip>
            <TooltipTrigger>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search posts..."
                  className="w-full rounded-lg bg-background pl-9 pr-4"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Search blog posts by title or content</p>
            </TooltipContent>
          </Tooltip>
          <nav className="flex flex-col space-y-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/blog"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Browse all blog posts</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/about"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Learn more about GraphQL Blog</p>
              </TooltipContent>
            </Tooltip>
          </nav>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                Sign In
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sign in to your account</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
    </TooltipProvider>
  )
}
