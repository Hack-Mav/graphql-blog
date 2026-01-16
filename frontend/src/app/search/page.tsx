'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ArrowRight, Calendar, Clock, Search, User, FileText } from 'lucide-react'
import { searchStubData, BlogPost, User as UserType } from '@/data/stub-data'

function SearchPageContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<{ posts: BlogPost[]; users: UserType[] }>({ posts: [], users: [] })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery])

  const performSearch = (searchQuery: string) => {
    setIsLoading(true)
    
    setTimeout(() => {
      const searchResults = searchStubData(searchQuery)
      setResults(searchResults)
      setIsLoading(false)
    }, 300)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      performSearch(query.trim())
    }
  }

  return (
    <TooltipProvider>
      <div className="container py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-left">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Search</h1>
          <form onSubmit={handleSubmit} className="relative max-w-2xl">
            <Tooltip>
              <TooltipTrigger>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search posts, users, and content..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-lg bg-background pl-9 pr-4 text-lg"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search by title, content, or author name</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2" size="sm">
                  Search
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to search or press Enter</p>
              </TooltipContent>
            </Tooltip>
          </form>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Searching...</p>
          </div>
        ) : (
          <>
            {query && (
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {results.posts.length + results.users.length} results found for "{query}"
                </p>
              </div>
            )}

            {results.posts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-left">
                  <FileText className="h-5 w-5" />
                  Posts ({results.posts.length})
                </h2>
                <div className="space-y-4">
                  {results.posts.map((post: BlogPost) => (
                    <Card key={post.id} className="group">
                      <CardHeader className="text-left">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge variant="secondary" className="cursor-help">{post.category}</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Category: {post.category}</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger>
                              <span className="flex items-center cursor-help">
                                <Calendar className="mr-1 h-3.5 w-3.5" />
                                {new Date(post.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Published on {new Date(post.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}</p>
                            </TooltipContent>
                          </Tooltip>
                          <span>•</span>
                          <Tooltip>
                            <TooltipTrigger>
                              <span className="flex items-center cursor-help">
                                <Clock className="mr-1 h-3.5 w-3.5" />
                                {post.readTime}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Estimated reading time: {post.readTime}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </CardHeader>
                      <CardContent className="text-left">
                        <h3 className="text-lg font-semibold mb-2 text-left">
                          <Link href={`/blog/${post.slug}`} className="hover:underline">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-muted-foreground mb-3 text-left">{post.excerpt}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex items-center gap-2 cursor-help">
                                <User className="h-3.5 w-3.5" />
                                <span>By {post.author.name}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Written by {post.author.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {post.tags.map((tag) => (
                              <Tooltip key={tag}>
                                <TooltipTrigger>
                                  <Badge variant="outline" className="text-xs cursor-help">
                                    #{tag}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Tag: {tag}</p>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="text-left">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="link" className="p-0" asChild>
                              <Link href={`/blog/${post.slug}`} className="group flex items-center">
                                Read more
                                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Read the full article: {post.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {results.users.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-left">
                  <User className="h-5 w-5" />
                  Users ({results.users.length})
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {results.users.map((user: UserType) => (
                    <Card key={user.id} className="group">
                      <CardContent className="pt-6">
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-3 cursor-help">
                      {user.avatar && (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        {user.bio && (
                          <p className="text-sm text-muted-foreground mt-1">{user.bio}</p>
                        )}
                        <Badge variant="outline" className="mt-2 text-xs">
                          {user.role}
                        </Badge>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{user.name} - {user.role}</p>
                    {user.bio && <p className="text-xs">{user.bio}</p>}
                  </TooltipContent>
                </Tooltip>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {!isLoading && query && results.posts.length === 0 && results.users.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try searching with different keywords or check your spelling.
                </p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" asChild>
                      <Link href="/blog">Browse all posts</Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View all available blog posts</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}

            {!query && !isLoading && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Search for content</h3>
                <p className="text-muted-foreground mb-4">
                  Enter keywords to search posts, users, and content.
                </p>
                <div className="space-y-2 text-left max-w-2xl mx-auto">
                  <p className="text-sm font-medium">Try searching for:</p>
                  <div className="flex flex-wrap gap-2">
                    {['GraphQL', 'React', 'TypeScript', 'Next.js', 'Tutorial'].map((term) => (
                      <Tooltip key={term}>
                        <TooltipTrigger asChild>
                          <Button
                            key={term}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setQuery(term)
                              performSearch(term)
                            }}
                          >
                            {term}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Search for "{term}"</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
    </TooltipProvider>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container py-8"><div className="text-center">Loading...</div></div>}>
      <SearchPageContent />
    </Suspense>
  )
}
