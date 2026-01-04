import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react"

// This would typically come from your GraphQL API
const getAllPosts = async () => {
  // Simulate API call
  return [
    {
      id: '1',
      slug: 'getting-started-with-graphql',
      title: 'Getting Started with GraphQL',
      excerpt: 'Learn the basics of GraphQL and how to set up your first server with Apollo.',
      category: 'Tutorial',
      readTime: '5 min read',
      date: '2023-06-15',
    },
    {
      id: '2',
      slug: 'building-modern-uis-with-nextjs',
      title: 'Building Modern UIs with Next.js',
      excerpt: 'Discover how to build fast and SEO-friendly web applications with Next.js 13+ features.',
      category: 'Guide',
      readTime: '8 min read',
      date: '2023-06-10',
    },
    {
      id: '3',
      slug: 'advanced-typescript-patterns',
      title: 'Advanced TypeScript Patterns',
      excerpt: 'Master advanced TypeScript patterns to write more maintainable and type-safe code.',
      category: 'Tutorial',
      readTime: '10 min read',
      date: '2023-06-05',
    },
    {
      id: '4',
      slug: 'graphql-vs-rest',
      title: 'GraphQL vs REST: Key Differences',
      excerpt: 'Compare GraphQL and REST APIs to understand when to use each approach.',
      category: 'Comparison',
      readTime: '7 min read',
      date: '2023-05-28',
    },
    {
      id: '5',
      slug: 'state-management-in-react',
      title: 'State Management in React',
      excerpt: 'Explore different state management solutions for React applications.',
      category: 'Guide',
      readTime: '12 min read',
      date: '2023-05-20',
    },
    {
      id: '6',
      slug: 'introduction-to-apollo-client',
      title: 'Introduction to Apollo Client',
      excerpt: 'Learn how to use Apollo Client to manage local and remote data with GraphQL.',
      category: 'Tutorial',
      readTime: '9 min read',
      date: '2023-05-15',
    },
  ]
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="container py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Discover the latest articles, tutorials, and insights about web development, GraphQL, and modern JavaScript.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} className="group flex h-full flex-col overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-gray-800/50">
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
            <CardContent className="flex-1">
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

      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="ghost" size="sm">
            2
          </Button>
          <Button variant="ghost" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
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
