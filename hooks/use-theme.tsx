"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
const ThemeContext = createContext({ theme: "light" as Theme, toggleTheme: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const saved = localStorage.getItem("observaacao-theme") as Theme | null
    const initial = saved ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    document.documentElement.classList.toggle("dark", initial === "dark")
    Promise.resolve().then(() => setTheme(initial))
  }, [])

  function toggleTheme() {
    setTheme((current) => {
      const next = current === "light" ? "dark" : "light"
      document.documentElement.classList.toggle("dark", next === "dark")
      localStorage.setItem("observaacao-theme", next)
      return next
    })
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
