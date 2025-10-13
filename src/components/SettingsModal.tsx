"use client"

import { X } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"
import type { ThemeColor } from "../types"

interface SettingsModalProps {
  onClose: () => void
}

const themeOptions: { color: ThemeColor; label: string; hex: string }[] = [
  { color: "blue", label: "Blue", hex: "#0ea5e9" },
  { color: "cyan", label: "Cyan", hex: "#06b6d4" },
  { color: "purple", label: "Purple", hex: "#a855f7" },
  { color: "green", label: "Green", hex: "#22c55e" },
  { color: "orange", label: "Orange", hex: "#f97316" },
  { color: "pink", label: "Pink", hex: "#ec4899" },
]

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const { themeColor, setThemeColor } = useTheme()

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-surface-elevated border border-border rounded-lg w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-border rounded-md transition-colors" title="Close">
            <X className="w-5 h-5 text-foreground-muted" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Theme Color Selection */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">Theme Color</label>
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map((option) => (
                <button
                  key={option.color}
                  onClick={() => setThemeColor(option.color)}
                  className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                    themeColor === option.color
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-border-hover bg-surface"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full shadow-lg" style={{ backgroundColor: option.hex }} />
                    <span className="text-xs font-medium text-foreground-muted">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* App Info */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground-muted">Version</span>
              <span className="text-foreground font-mono">1.0.0</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary hover:bg-primary-hover text-background font-medium rounded-md transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
