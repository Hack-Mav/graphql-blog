import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
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
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {post.category}
                </span>
                <span className="flex items-center">
                  <Calendar className="mr-1 h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  {post.readTime}
                </span>
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
                <User className="h-3.5 w-3.5" />
                <span>{post.author.name}</span>
              </div>
              {post.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="text-left">
              <Button variant="link" className="p-0" asChild>
                <Link href={`/blog/${post.slug}`} className="group flex items-center">
                  Read more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2">
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
          
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Button
              key={pageNum}
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
          ))}
          
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
        </div>
      </div>
    </div>
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
