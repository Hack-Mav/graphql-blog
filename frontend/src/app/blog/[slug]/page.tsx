import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react';
import { markdownToHtml } from '@/lib/markdown';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { stubPosts } from '@/data/stub-data';

const getPostBySlug = async (slug: string) => {
  return stubPosts.find(post => post.slug === slug) || null;
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content);

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/blog" className="group flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
        <article className="prose max-w-none dark:prose-invert text-left">
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
            
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-left">
              {post.title}
            </h1>
            
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>By {post.author.name}</span>
              {post.author.bio && (
                <span className="text-muted-foreground">• {post.author.bio}</span>
              )}
            </div>
            
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
            className="prose-lg max-w-none text-left"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="mt-16 pt-8 border-t">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-left">
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