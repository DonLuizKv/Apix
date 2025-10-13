"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { ThemeColor } from "../types"

interface ThemeContextType {
  themeColor: ThemeColor
  setThemeColor: (color: ThemeColor) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const themeColors: Record<ThemeColor, string> = {
  blue: "#0ea5e9",
  cyan: "#06b6d4",
  purple: "#a855f7",
  green: "#22c55e",
  orange: "#f97316",
  pink: "#ec4899",
}

const hoverColors: Record<ThemeColor, string> = {
  blue: "#38bdf8",
  cyan: "#22d3ee",
  purple: "#c084fc",
  green: "#4ade80",
  orange: "#fb923c",
  pink: "#f472b6",
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeColor, setThemeColor] = useState<ThemeColor>("blue")

  useEffect(() => {
    const saved = localStorage.getItem("apix-theme-color")
    if (saved && saved in themeColors) {
      setThemeColor(saved as ThemeColor)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("apix-theme-color", themeColor)
    document.documentElement.style.setProperty("--color-primary", themeColors[themeColor])
    document.documentElement.style.setProperty("--color-primary-hover", hoverColors[themeColor])
  }, [themeColor])

  return <ThemeContext.Provider value={{ themeColor, setThemeColor }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
