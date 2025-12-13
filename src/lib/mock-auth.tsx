// Mock member context to replace Wix Members
'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Member {
  profile?: {
    nickname?: string
    email?: string
  }
}

interface MemberContextType {
  member: Member | null
  isAuthenticated: boolean
  isLoading: boolean
  actions: {
    login: () => void
    logout: () => void
  }
}

const MemberContext = createContext<MemberContextType | undefined>(undefined)

export function MemberProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<Member | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = () => {
    // Mock login - in a real app, this would connect to your auth service
    console.log('Login clicked')
    alert('Authentication will be implemented with your preferred auth solution (NextAuth, Auth0, etc.)')
  }

  const logout = () => {
    setMember(null)
  }

  return (
    <MemberContext.Provider
      value={{
        member,
        isAuthenticated: !!member,
        isLoading,
        actions: { login, logout },
      }}
    >
      {children}
    </MemberContext.Provider>
  )
}

export function useMember() {
  const context = useContext(MemberContext)
  if (context === undefined) {
    throw new Error('useMember must be used within a MemberProvider')
  }
  return context
}
