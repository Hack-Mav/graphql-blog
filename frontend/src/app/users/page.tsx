import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Mail, MapPin, Calendar } from 'lucide-react'
import { getPaginatedUsers } from '@/data/stub-data'

export default async function UsersPage({
  searchParams
}: {
  searchParams?: { page?: string }
}) {
  const page = parseInt(searchParams?.page || '1', 10)
  const { users, pagination } = getPaginatedUsers(page, 6)

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Our Authors</h1>
          <p className="text-muted-foreground max-w-2xl">
            Meet the talented writers and developers who contribute to GraphQL Blog. 
            Learn from their expertise and connect with the community.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <Card key={user.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-20 w-20 rounded-full object-cover mx-auto border-2 border-border"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto">
                      <User className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <Badge variant="outline" className="w-fit mx-auto">
                  {user.role}
                </Badge>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                {user.bio && (
                  <p className="text-sm text-muted-foreground">{user.bio}</p>
                )}
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/authors/${user.id}`}>
                      View Profile
                    </Link>
                  </Button>
                  <Button size="sm" className="w-full" asChild>
                    <Link href={`/blog?author=${user.id}`}>
                      Read Posts
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={!pagination.hasPrev}
              asChild={pagination.hasPrev}
            >
              {pagination.hasPrev ? (
                <Link href={`/users?page=${pagination.page - 1}`}>Previous</Link>
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
                  <Link href={`/users?page=${pageNum}`}>{pageNum}</Link>
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
                <Link href={`/users?page=${pagination.page + 1}`}>Next</Link>
              ) : (
                'Next'
              )}
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">
                {pagination.total}
              </CardTitle>
              <p className="text-muted-foreground">Total Authors</p>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">
                {users.filter(u => u.role === 'author').length}
              </CardTitle>
              <p className="text-muted-foreground">Active Writers</p>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">
                5
              </CardTitle>
              <p className="text-muted-foreground">Expertise Areas</p>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}
