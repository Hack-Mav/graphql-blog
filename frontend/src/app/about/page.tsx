import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export default function AboutPage() {
  return (
    <TooltipProvider>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">GraphQL Blog</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A modern platform for developers to learn about GraphQL, web development, and cutting-edge JavaScript technologies.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground leading-relaxed">
                We're dedicated to creating high-quality, practical content that helps developers master modern web technologies. 
                Our focus on GraphQL and related ecosystems provides developers with the knowledge they need to build scalable, 
                efficient applications.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* What We Cover */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">What We Cover</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="text-center p-6">
              <CardHeader>
                <CardTitle className="text-lg">GraphQL</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  From basics to advanced patterns, learn everything about GraphQL schema design, resolvers, and best practices.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardHeader>
                <CardTitle className="text-lg">React & Next.js</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Modern React development with Next.js, including server components, API routes, and performance optimization.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardHeader>
                <CardTitle className="text-lg">TypeScript</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Type-safe development with TypeScript, from fundamentals to advanced patterns and integration strategies.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-2">
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary" className="cursor-help">Next.js</Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>React framework for production</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary" className="cursor-help">GraphQL</Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Query language for APIs</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary" className="cursor-help">Apollo</Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>GraphQL platform for building APIs</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary" className="cursor-help">TypeScript</Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Type-safe JavaScript</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary" className="cursor-help">React</Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>JavaScript library for UI</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary" className="cursor-help">Tailwind CSS</Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Utility-first CSS framework</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary" className="cursor-help">Node.js</Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>JavaScript runtime for servers</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary" className="cursor-help">PostgreSQL</Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Powerful open-source database</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
              <p className="mb-6 text-blue-100">
                Stay updated with the latest tutorials and insights. Subscribe to our newsletter or follow us on social media.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                      Subscribe to Newsletter
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Get weekly updates and tutorials</p>
                  </TooltipContent>
                </Tooltip>
                <div className="flex gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="outline" className="border-white text-white hover:bg-white/10">
                        <Github className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on GitHub</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="outline" className="border-white text-white hover:bg-white/10">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on Twitter</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="outline" className="border-white text-white hover:bg-white/10">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Connect on LinkedIn</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="outline" className="border-white text-white hover:bg-white/10">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Subscribe via email</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
    </TooltipProvider>
  )
}

export const metadata = {
  title: 'About | GraphQL Blog',
  description: 'Learn about GraphQL Blog - a modern platform for developers to learn about GraphQL, web development, and cutting-edge JavaScript technologies.',
  openGraph: {
    title: 'About | GraphQL Blog',
    description: 'Learn about GraphQL Blog - a modern platform for developers to learn about GraphQL, web development, and cutting-edge JavaScript technologies.',
  },
}
