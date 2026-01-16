'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/data/stub-data'

interface StubUserContextType {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
  isLoading: boolean
}

const StubUserContext = createContext<StubUserContextType | undefined>(undefined)

interface StubUserProviderProps {
  children: ReactNode
}

export function StubUserProvider({ children }: StubUserProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved auth data on mount
    const savedToken = localStorage.getItem('stub-token')
    const savedUser = localStorage.getItem('stub-user')
    
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (newToken: string, newUser: User) => {
    setToken(newToken)
    setUser(newUser)
    localStorage.setItem('stub-token', newToken)
    localStorage.setItem('stub-user', JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('stub-token')
    localStorage.removeItem('stub-user')
  }

  const value = {
    user,
    token,
    login,
    logout,
    isLoading
  }

  return (
    <StubUserContext.Provider value={value}>
      {children}
    </StubUserContext.Provider>
  )
}

export function useStubUser() {
  const context = useContext(StubUserContext)
  if (context === undefined) {
    throw new Error('useStubUser must be used within a StubUserProvider')
  }
  return context
}
