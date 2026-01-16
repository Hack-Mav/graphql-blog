import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowRight, Calendar, Clock, User, Info } from "lucide-react"
import { stubPosts } from "@/data/stub-data"

const featuredPosts = stubPosts.filter(post => post.featured)

export default function Home() {
  return (
    <TooltipProvider>
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
          <div className="absolute left-1/2 top-0 h-[200%] w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        </div>
        
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Welcome to the{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  GraphQL Blog
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
                Discover the latest articles, tutorials, and insights about web development, GraphQL, and modern JavaScript.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button asChild size="lg" className="w-full sm:w-auto">
                      <Link href="/blog" className="group">
                        Read Blog Posts
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Browse our latest articles and tutorials</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                      <Link href="/about">
                        Learn More
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Discover more about GraphQL Blog</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="bg-muted/40 py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Posts</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
              Explore our latest articles and tutorials on modern web development
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <Card 
                key={post.id} 
                className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:border-border/50"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background/50 via-background to-background opacity-0 transition-opacity group-hover:opacity-100" />
                <CardHeader className="pb-3 text-left">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary cursor-help">
                          {post.category}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Category: {post.category}</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex items-center text-muted-foreground cursor-help">
                          <Calendar className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
                          <time dateTime={post.date} className="text-xs">
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </time>
                        </div>
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
                        <div className="flex items-center text-muted-foreground cursor-help">
                          <Clock className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
                          <span className="text-xs">{post.readTime}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Estimated reading time: {post.readTime}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
                <CardContent className="pb-4 text-left">
                  <h3 className="mt-4 text-lg font-semibold leading-tight tracking-tight text-left">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="after:absolute after:inset-0 after:z-0 hover:underline focus:outline-none"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 text-left">
                    {post.excerpt}
                  </p>
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
                </CardContent>
                <CardFooter className="pt-0 text-left">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group/link inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        Read more
                        <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Read the full article: {post.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/blog" className="group">
                    View All Posts
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Explore all blog posts and articles</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white shadow-lg sm:p-10">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Ready to dive in?</h2>
            <p className="mb-6 text-lg text-blue-100 md:text-xl">
              Join our community of developers and stay updated with the latest content.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                    Get Started
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Start your journey with GraphQL Blog</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Discover more features and content</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>
    </div>
    </TooltipProvider>
  )
}
