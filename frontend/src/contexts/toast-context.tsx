'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useToast } from '@/components/ui/use-toast'

interface ToastContextType {
  toast: ReturnType<typeof useToast>['toast']
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProps {
  children: ReactNode
}

export function ToastContextProvider({ children }: ToastProviderProps) {
  const { toast } = useToast()

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToastContext() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastContextProvider')
  }
  return context
}
