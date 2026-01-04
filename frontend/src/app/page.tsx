import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ArrowRight, Calendar, Clock } from "lucide-react"

type BlogPost = {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  slug: string
}

const featuredPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with GraphQL',
    excerpt: 'Learn the basics of GraphQL and how to set up your first server with Apollo.',
    category: 'Tutorial',
    readTime: '5 min read',
    date: '2023-06-15',
    slug: 'getting-started-with-graphql'
  },
  {
    id: '2',
    title: 'Building Modern UIs with Next.js',
    excerpt: 'Discover how to build fast and SEO-friendly web applications with Next.js 13+ features.',
    category: 'Guide',
    readTime: '8 min read',
    date: '2023-06-10',
    slug: 'building-modern-uis-with-nextjs'
  },
  {
    id: '3',
    title: 'Advanced TypeScript Patterns',
    excerpt: 'Master advanced TypeScript patterns to write more maintainable and type-safe code.',
    category: 'Tutorial',
    readTime: '10 min read',
    date: '2023-06-05',
    slug: 'advanced-typescript-patterns'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-20 lg:py-28">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Welcome to the{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  GraphQL Blog
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Discover the latest articles, tutorials, and insights about web development, GraphQL, and modern JavaScript.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/blog">
                  Read Blog Posts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Posts</h2>
            <p className="mx-auto mt-2 max-w-[700px] text-gray-500 md:text-lg dark:text-gray-400">
              Check out our latest and greatest articles
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="group overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-gray-800/50">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {post.category}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-3.5 w-3.5" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="mr-1 h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="mb-2 text-xl font-semibold tracking-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
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

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/blog" className="group">
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white shadow-lg">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Ready to dive in?</h2>
            <p className="mb-6 text-lg text-blue-100 md:text-xl">
              Join our community of developers and stay updated with the latest content.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
