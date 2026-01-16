'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { StubLoginForm } from '@/components/auth/stub-login-form'
import { useStubUser } from '@/contexts/stub-user-context'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const { user } = useStubUser()
  const router = useRouter()

  // If user is already logged in, redirect to dashboard
  if (user) {
    router.push('/dashboard')
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <div className="w-full max-w-md px-4">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/" className="group flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
            <CardDescription>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StubLoginForm />
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button variant="link" className="p-0 h-auto text-sm">
                Sign up
              </Button>
            </div>
            
            <div className="mt-4 text-center text-xs text-muted-foreground">
              <p>Demo credentials:</p>
              <p>Email: john@example.com</p>
              <p>Password: any password</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
