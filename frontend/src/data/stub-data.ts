// Stub data for making the frontend interactive

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  role: 'admin' | 'user' | 'author'
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  readTime: string
  date: string
  slug: string
  author: User
  tags: string[]
  featured: boolean
}

export interface SearchResult {
  posts: BlogPost[]
  users: User[]
}

// Stub users
export const stubUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    bio: 'Full-stack developer passionate about GraphQL and React',
    role: 'author'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    bio: 'Frontend specialist and UI/UX enthusiast',
    role: 'author'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    bio: 'Backend architect and database expert',
    role: 'admin'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    bio: 'DevOps engineer and cloud specialist',
    role: 'user'
  },
  {
    id: '5',
    name: 'Alex Brown',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
    bio: 'Mobile developer and React Native expert',
    role: 'author'
  }
]

// Stub blog posts
export const stubPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with GraphQL',
    excerpt: 'Learn the basics of GraphQL and how to set up your first server with Apollo.',
    content: `# Getting Started with GraphQL

GraphQL is a query language for APIs and a runtime for executing those queries. In this comprehensive guide, we'll explore everything you need to know to get started with GraphQL.

## What is GraphQL?

GraphQL is an open-source query language and runtime for APIs. It was developed by Facebook in 2012 and publicly released in 2015. Unlike REST APIs, which require multiple endpoints for different data requirements, GraphQL allows you to request exactly the data you need in a single request.

## Key Concepts

### Schema
A GraphQL schema defines the structure of your API. It describes the types of data available and the relationships between them.

### Queries
Queries are used to fetch data from the server. You can specify exactly which fields you need.

### Mutations
Mutations are used to modify data on the server (create, update, delete).

### Subscriptions
Subscriptions allow real-time data updates using WebSockets.

## Setting Up Your First GraphQL Server

Let's create a simple GraphQL server using Node.js and Apollo Server:

\`\`\`javascript
const { ApolloServer, gql } = require('apollo-server');

// Define your schema
const typeDefs = gql\`
  type Query {
    hello: String
  }
\`;

// Define your resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
};

// Create the server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(\`🚀 Server ready at \${url}\`);
});
\`\`\`

## Conclusion

GraphQL provides a flexible and efficient way to build APIs. By allowing clients to request exactly what they need, it reduces over-fetching and under-fetching of data, leading to better performance and developer experience.`,
    category: 'Tutorial',
    readTime: '5 min read',
    date: '2023-06-15',
    slug: 'getting-started-with-graphql',
    author: stubUsers[0],
    tags: ['GraphQL', 'Apollo', 'Node.js', 'Tutorial'],
    featured: true
  },
  {
    id: '2',
    title: 'Building Modern UIs with Next.js',
    excerpt: 'Discover how to build fast and SEO-friendly web applications with Next.js 13+ features.',
    content: `# Building Modern UIs with Next.js

Next.js has revolutionized the way we build React applications. With the introduction of the App Router and Server Components in Next.js 13, we now have even more powerful tools at our disposal.

## What's New in Next.js 13?

### App Router
The new App Router introduces a more intuitive file-system based routing with support for layouts, nested routes, and loading states.

### Server Components
Server Components run on the server and have direct access to databases and APIs, reducing the client-side JavaScript bundle.

### Streaming UI
Next.js now supports streaming UI updates, providing a faster perceived loading experience.

## Creating Your First Next.js App

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app
npm run dev
\`\`\`

## Building a Blog with Next.js

Let's create a simple blog using the new App Router:

### 1. Create the Blog Layout

\`\`\`tsx
// app/blog/layout.tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Blog</h1>
      {children}
    </div>
  )
}
\`\`\`

### 2. Create the Blog Index Page

\`\`\`tsx
// app/blog/page.tsx
export default function BlogPage() {
  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-semibold">Latest Posts</h2>
      {/* Blog posts will go here */}
    </div>
  )
}
\`\`\`

## Conclusion

Next.js 13+ provides powerful features for building modern web applications. The combination of Server Components and the App Router makes it easier than ever to create fast, SEO-friendly applications.`,
    category: 'Guide',
    readTime: '8 min read',
    date: '2023-06-10',
    slug: 'building-modern-uis-with-nextjs',
    author: stubUsers[1],
    tags: ['Next.js', 'React', 'Server Components', 'Frontend'],
    featured: true
  },
  {
    id: '3',
    title: 'Advanced TypeScript Patterns',
    excerpt: 'Master advanced TypeScript patterns to write more maintainable and type-safe code.',
    content: `# Advanced TypeScript Patterns

TypeScript offers powerful type system features that can help you write more maintainable and type-safe code. Let's explore some advanced patterns.

## Utility Types

TypeScript provides several built-in utility types that can transform existing types:

### Partial\<T\>
Makes all properties of T optional:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; }
\`\`\`

### Required\<T\>
Makes all properties of T required:

\`\`\`typescript
type RequiredUser = Required<PartialUser>;
// { id: number; name: string; email: string; }
\`\`\`

### Pick\<T, K\>
Creates a type by picking a set of properties from T:

\`\`\`typescript
type UserBasicInfo = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }
\`\`\`

## Conditional Types

Conditional types allow you to create types that depend on other types:

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false
\`\`\`

## Mapped Types

Mapped types allow you to create new types by transforming existing ones:

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyUser = Readonly<User>;
\`\`\`

## Template Literal Types

TypeScript 4.1 introduced template literal types:

\`\`\`typescript
type EventName = \`on\${Capitalize<string>}\`;

type ClickEvent = EventName<'click'>; // 'onClick'
type HoverEvent = EventName<'hover'>; // 'onHover'
\`\`\`

## Conclusion

These advanced TypeScript patterns can help you write more expressive and type-safe code. Start incorporating them into your projects to take full advantage of TypeScript's powerful type system.`,
    category: 'Tutorial',
    readTime: '10 min read',
    date: '2023-06-05',
    slug: 'advanced-typescript-patterns',
    author: stubUsers[2],
    tags: ['TypeScript', 'Types', 'Advanced', 'Patterns'],
    featured: true
  },
  {
    id: '4',
    title: 'React Performance Optimization',
    excerpt: 'Learn techniques to optimize your React applications for better performance.',
    content: `# React Performance Optimization

Performance is crucial for user experience. Let's explore various techniques to optimize React applications.

## React.memo

React.memo is a higher-order component that prevents re-renders if props haven't changed:

\`\`\`tsx
const ExpensiveComponent = React.memo(({ data }: { data: Data[] }) => {
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});
\`\`\`

## useMemo and useCallback

### useMemo
Memoize expensive calculations:

\`\`\`tsx
const ExpensiveList = ({ items }: { items: Item[] }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  return <div>Total: {expensiveValue}</div>;
};
\`\`\`

### useCallback
Memoize functions to prevent unnecessary re-renders:

\`\`\`tsx
const ButtonComponent = ({ onClick }: { onClick: () => void }) => {
  return <button onClick={onClick}>Click me</button>;
};

const Parent = () => {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <ButtonComponent onClick={handleClick} />
    </div>
  );
};
\`\`\`

## Code Splitting

Use React.lazy and Suspense for code splitting:

\`\`\`tsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

## Virtual Scrolling

For large lists, implement virtual scrolling:

\`\`\`tsx
import { FixedSizeList as List } from 'react-window';

const VirtualList = ({ items }: { items: any[] }) => {
  const Row = ({ index, style }: any) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <List
      height={400}
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </List>
  );
};
\`\`\`

## Conclusion

By applying these optimization techniques, you can significantly improve the performance of your React applications. Remember to profile your app before and after optimizations to measure the actual impact.`,
    category: 'Tutorial',
    readTime: '12 min read',
    date: '2023-05-28',
    slug: 'react-performance-optimization',
    author: stubUsers[3],
    tags: ['React', 'Performance', 'Optimization', 'Best Practices'],
    featured: false
  },
  {
    id: '5',
    title: 'CSS Grid vs Flexbox',
    excerpt: 'Understanding when to use CSS Grid and when to use Flexbox for layout.',
    content: `# CSS Grid vs Flexbox

Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes. Let's explore when to use each.

## Flexbox

Flexbox is designed for one-dimensional layouts:

### When to Use Flexbox
- Aligning items in a row or column
- Distributing space between items
- Centering content
- Navigation bars
- Form layouts

### Example

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.navbar__logo {
  flex: 0 0 auto;
}

.navbar__links {
  display: flex;
  gap: 1rem;
}

.navbar__button {
  flex: 0 0 auto;
}
\`\`\`

## CSS Grid

CSS Grid is designed for two-dimensional layouts:

### When to Use Grid
- Complex page layouts
- Card grids
- Dashboard layouts
- Image galleries
- Magazine-style layouts

### Example

\`\`\`css
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  min-height: 100vh;
  gap: 1rem;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
\`\`\`

## Combining Both

You can use both together:

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  display: flex;
  flex-direction: column;
}
\`\`\`

## Conclusion

- Use **Flexbox** for one-dimensional layouts (components, navigation)
- Use **Grid** for two-dimensional layouts (pages, complex layouts)
- They can work together beautifully

Understanding both tools and knowing when to use each will make you a more effective CSS developer.`,
    category: 'CSS',
    readTime: '7 min read',
    date: '2023-05-20',
    slug: 'css-grid-vs-flexbox',
    author: stubUsers[4],
    tags: ['CSS', 'Grid', 'Flexbox', 'Layout'],
    featured: false
  }
]

// Search functionality
export const searchStubData = (query: string): SearchResult => {
  const lowercaseQuery = query.toLowerCase()
  
  const filteredPosts = stubPosts.filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
  
  const filteredUsers = stubUsers.filter(user =>
    user.name.toLowerCase().includes(lowercaseQuery) ||
    user.email.toLowerCase().includes(lowercaseQuery) ||
    (user.bio && user.bio.toLowerCase().includes(lowercaseQuery))
  )
  
  return {
    posts: filteredPosts,
    users: filteredUsers
  }
}

// Authentication stub
export const stubAuth = {
  login: (email: string, password: string): { token: string; user: User } | null => {
    // Simple stub authentication - any email/password combination works for demo
    const user = stubUsers.find(u => u.email === email)
    if (user) {
      return {
        token: 'stub-jwt-token-' + Math.random().toString(36).substr(2, 9),
        user
      }
    }
    // If email not found, create a new user
    const newUser: User = {
      id: 'new-' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role: 'user'
    }
    return {
      token: 'stub-jwt-token-' + Math.random().toString(36).substr(2, 9),
      user: newUser
    }
  },
  
  getCurrentUser: (token: string): User | null => {
    // In a real app, this would validate the JWT token
    // For stub purposes, return a random user
    return stubUsers[0]
  }
}

// Pagination helpers
export const getPaginatedPosts = (page: number = 1, limit: number = 6) => {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const posts = stubPosts.slice(startIndex, endIndex)
  
  return {
    posts,
    pagination: {
      page,
      limit,
      total: stubPosts.length,
      totalPages: Math.ceil(stubPosts.length / limit),
      hasNext: endIndex < stubPosts.length,
      hasPrev: page > 1
    }
  }
}

export const getPaginatedUsers = (page: number = 1, limit: number = 6) => {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const users = stubUsers.slice(startIndex, endIndex)
  
  return {
    users,
    pagination: {
      page,
      limit,
      total: stubUsers.length,
      totalPages: Math.ceil(stubUsers.length / limit),
      hasNext: endIndex < stubUsers.length,
      hasPrev: page > 1
    }
  }
}
