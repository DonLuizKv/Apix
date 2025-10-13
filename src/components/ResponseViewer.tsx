"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import type { HttpResponse } from "../types"

interface ResponseViewerProps {
  response: HttpResponse
}

export default function ResponseViewer({ response }: ResponseViewerProps) {
  const [activeTab, setActiveTab] = useState<"body" | "headers">("body")
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatJson = (data: any) => {
    try {
      return JSON.stringify(data, null, 2)
    } catch {
      return String(data)
    }
  }

  const getStatusColor = () => {
    if (response.status >= 200 && response.status < 300) return "success"
    if (response.status >= 400) return "error"
    return "warning"
  }

  const statusColorClasses = {
    success: "bg-success/20 text-success border-success/30",
    error: "bg-error/20 text-error border-error/30",
    warning: "bg-warning/20 text-warning border-warning/30",
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Response Header */}
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span
              className={`px-3 py-1.5 rounded-md font-mono font-semibold text-sm border ${statusColorClasses[getStatusColor()]}`}
            >
              {response.status} {response.statusText}
            </span>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-foreground-muted">Time:</span>
              <span className="font-mono font-semibold text-primary">{response.time}ms</span>
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(formatJson(response.data))}
            className="px-3 py-1.5 text-sm text-foreground-muted hover:text-foreground hover:bg-surface-elevated rounded-md transition-all flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-success" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface-elevated rounded-lg p-1">
          <button
            onClick={() => setActiveTab("body")}
            className={`flex-1 px-4 py-2 rounded-md font-medium text-sm transition-all ${
              activeTab === "body"
                ? "bg-primary text-background shadow-lg shadow-primary/20"
                : "text-foreground-muted hover:text-foreground hover:bg-border"
            }`}
          >
            Body
          </button>
          <button
            onClick={() => setActiveTab("headers")}
            className={`flex-1 px-4 py-2 rounded-md font-medium text-sm transition-all ${
              activeTab === "headers"
                ? "bg-primary text-background shadow-lg shadow-primary/20"
                : "text-foreground-muted hover:text-foreground hover:bg-border"
            }`}
          >
            Headers ({Object.keys(response.headers).length})
          </button>
        </div>
      </div>

      {/* Response Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === "body" ? (
          <div className="code-editor bg-surface-elevated border border-border rounded-lg p-4 overflow-auto">
            <pre className="text-foreground">{formatJson(response.data)}</pre>
          </div>
        ) : (
          <div className="space-y-2">
            {Object.entries(response.headers).map(([key, value]) => (
              <div key={key} className="p-3 bg-surface-elevated border border-border rounded-lg">
                <div className="text-sm font-semibold text-primary mb-1 font-mono">{key}</div>
                <div className="text-sm text-foreground-muted font-mono break-all">{value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
