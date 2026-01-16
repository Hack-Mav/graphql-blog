'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStubUser } from '@/contexts/stub-user-context'
import { stubAuth } from '@/data/stub-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

export function StubLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useStubUser()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        const result = stubAuth.login(email, password)
        
        if (result) {
          login(result.token, result.user)
          toast({
            title: 'Login successful',
            description: `Welcome back, ${result.user.name}!`,
          })
          router.push('/dashboard')
        } else {
          toast({
            title: 'Login failed',
            description: 'Invalid credentials',
            variant: 'destructive',
          })
        }
      } catch (error) {
        toast({
          title: 'Login failed',
          description: error instanceof Error ? error.message : 'An error occurred',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }, 1000) // Simulate network delay
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        Demo: Use any email/password combination
      </p>
    </form>
  )
}
