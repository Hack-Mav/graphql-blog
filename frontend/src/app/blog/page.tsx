import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowRight, Calendar, Clock, Tag, User } from "lucide-react"
import { getPaginatedPosts } from "@/data/stub-data"

export default async function BlogPage({
  searchParams
}: {
  searchParams?: { page?: string }
}) {
  const page = parseInt(searchParams?.page || '1', 10)
  const { posts, pagination } = getPaginatedPosts(page, 6)

  return (
    <TooltipProvider>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mx-auto max-w-3xl mb-12 text-left">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Discover the latest articles, tutorials, and insights about web development, GraphQL, and modern JavaScript.
        </p>
      </div>

      <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} className="group flex h-full flex-col overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-gray-800/50">
            <CardHeader className="text-left">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tooltip>
                  <TooltipTrigger>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200 cursor-help">
                      {post.category}
                    </span>
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
            <CardContent className="flex-1 text-left">
              <h3 className="mb-2 text-xl font-semibold tracking-tight">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h3>
              <p className="text-muted-foreground">{post.excerpt}</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-2 cursor-help">
                      <User className="h-3.5 w-3.5" />
                      <span>{post.author.name}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Written by {post.author.name}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              {post.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <Tooltip key={tag}>
                      <TooltipTrigger>
                        <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200 cursor-help">
                          #{tag}
                        </span>
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

      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild={pagination.hasPrev}>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={!pagination.hasPrev}
                asChild={pagination.hasPrev}
              >
                {pagination.hasPrev ? (
                  <Link href={`/blog?page=${pagination.page - 1}`}>Previous</Link>
                ) : (
                  'Previous'
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Go to previous page {pagination.hasPrev ? `(${pagination.page - 1})` : '(disabled)'}</p>
            </TooltipContent>
          </Tooltip>
          
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Tooltip key={pageNum}>
              <TooltipTrigger asChild={pageNum !== pagination.page}>
                <Button
                  variant={pageNum === pagination.page ? "outline" : "ghost"}
                  size="sm"
                  asChild={pageNum !== pagination.page}
                >
                  {pageNum === pagination.page ? (
                    pageNum
                  ) : (
                    <Link href={`/blog?page=${pageNum}`}>{pageNum}</Link>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to page {pageNum}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          
          <Tooltip>
            <TooltipTrigger asChild={pagination.hasNext}>
              <Button 
                variant="outline" 
                size="sm"
                disabled={!pagination.hasNext}
                asChild={pagination.hasNext}
              >
                {pagination.hasNext ? (
                  <Link href={`/blog?page=${pagination.page + 1}`}>Next</Link>
                ) : (
                  'Next'
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Go to next page {pagination.hasNext ? `(${pagination.page + 1})` : '(disabled)'}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
    </TooltipProvider>
  )
}

export const metadata = {
  title: 'Blog | GraphQL Blog',
  description: 'Discover the latest articles, tutorials, and insights about web development, GraphQL, and modern JavaScript.',
  openGraph: {
    title: 'Blog | GraphQL Blog',
    description: 'Discover the latest articles, tutorials, and insights about web development, GraphQL, and modern JavaScript.',
  },
}
