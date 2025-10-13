"use client"

import { useRef, type KeyboardEvent } from "react"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export default function CodeEditor({ value, onChange, placeholder, disabled, className = "" }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const { selectionStart, selectionEnd } = textarea
    const currentValue = textarea.value

    const pairs: Record<string, string> = {
      "{": "}",
      "[": "]",
      "(": ")",
      '"': '"',
      "'": "'",
    }

    // Auto-close brackets/braces/quotes
    if (pairs[e.key]) {
      e.preventDefault()
      const before = currentValue.substring(0, selectionStart)
      const after = currentValue.substring(selectionEnd)
      const newValue = before + e.key + pairs[e.key] + after
      onChange(newValue)

      // Set cursor position between the pair
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 1
      }, 0)
    }

    // Handle Tab key for indentation
    if (e.key === "Tab") {
      e.preventDefault()
      const before = currentValue.substring(0, selectionStart)
      const after = currentValue.substring(selectionEnd)
      const newValue = before + "  " + after
      onChange(newValue)

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 2
      }, 0)
    }

    // Auto-indent on Enter
    if (e.key === "Enter") {
      const lines = currentValue.substring(0, selectionStart).split("\n")
      const currentLine = lines[lines.length - 1]
      const indent = currentLine.match(/^\s*/)?.[0] || ""

      // Add extra indent if previous line ends with opening bracket
      const extraIndent = currentLine.trim().endsWith("{") || currentLine.trim().endsWith("[") ? "  " : ""

      e.preventDefault()
      const before = currentValue.substring(0, selectionStart)
      const after = currentValue.substring(selectionEnd)
      const newValue = before + "\n" + indent + extraIndent + after
      onChange(newValue)

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 1 + indent.length + extraIndent.length
      }, 0)
    }
  }

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      className={`code-editor ${className}`}
      spellCheck={false}
    />
  )
}
