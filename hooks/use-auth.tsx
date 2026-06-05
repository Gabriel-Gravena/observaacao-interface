"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

import * as authApi from "@/api/auth"
import type { LoginPayload, RegisterPayload, User } from "@/api/types"

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  signIn: (payload: LoginPayload) => Promise<User>
  signUp: (payload: RegisterPayload) => Promise<User>
  signOut: () => Promise<void>
  refreshUser: () => Promise<User | null>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await authApi.getCurrentUser()
      setUser(currentUser)
      return currentUser
    } catch {
      setUser(null)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    authApi.getCurrentUser().then(
      (currentUser) => {
        setUser(currentUser)
        setIsLoading(false)
      },
      () => {
        setUser(null)
        setIsLoading(false)
      }
    )

    const clearUser = () => setUser(null)
    window.addEventListener("observaação:unauthorized", clearUser)
    return () => window.removeEventListener("observaação:unauthorized", clearUser)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      signIn: async (payload) => {
        const authenticatedUser = await authApi.login(payload)
        setUser(authenticatedUser)
        return authenticatedUser
      },
      signUp: async (payload) => {
        const createdUser = await authApi.register(payload)
        setUser(createdUser)
        return createdUser
      },
      signOut: async () => {
        await authApi.logout()
        setUser(null)
      },
      refreshUser,
    }),
    [isLoading, refreshUser, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider.")
  }

  return context
}
