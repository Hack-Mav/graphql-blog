import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { markdownToHtml } from '@/lib/markdown';
import { TableOfContents } from '@/components/blog/table-of-contents';

// This would typically come from your GraphQL API
const getPostBySlug = async (slug: string) => {
  // Simulate API call
  const posts = [
    {
      id: '1',
      slug: 'getting-started-with-graphql',
      title: 'Getting Started with GraphQL',
      content: `# Getting Started with GraphQL

## What is GraphQL?
GraphQL is a query language for your API that provides a more efficient, powerful, and flexible alternative to REST.

## Key Features
- **Efficient Data Loading**: Fetch exactly what you need in a single request
- **Strongly Typed**: Every GraphQL API is defined by a schema
- **Developer Experience**: Great tooling and auto-generated documentation

## Basic Example
\`\`\`graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
    posts {
      title
      publishedAt
    }
  }
}
\`\`\`

## Next Steps
- Set up a GraphQL server
- Define your schema
- Implement resolvers
- Connect to your database

## Conclusion
GraphQL is a powerful tool for building modern APIs.`,
      excerpt: 'Learn the basics of GraphQL and how to set up your first server with Apollo.',
      category: 'Tutorial',
      readTime: '5 min read',
      date: '2023-06-15',
      tags: ['graphql', 'api', 'tutorial']
    },
    // ... other posts
  ];

  return posts.find(post => post.slug === slug) || null;
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/blog" className="group flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
        <article className="prose max-w-none dark:prose-invert">
          <header className="mb-10">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {post.category}
              </span>
              <span className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {post.readTime}
              </span>
            </div>
            
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            
            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div 
            className="prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="mt-16 pt-8 border-t">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold">Enjoyed this article?</h2>
                <p className="text-muted-foreground">
                  Share it with your friends or leave a comment below!
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                  Share on Twitter
                </Button>
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                  Share on LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </article>

        <aside className="hidden lg:block">
          <TableOfContents />
        </aside>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The post you are looking for does not exist.'
    };
  }

  return {
    title: `${post.title} | GraphQL Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}