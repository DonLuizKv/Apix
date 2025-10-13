"use client"

import { useState } from "react"
import { Send, Plus, Trash2, Clock, ChevronDown } from "lucide-react"
import { useApp } from "../contexts/AppContext"
import ResponseViewer from "./ResponseViewer"
import CodeEditor from "./CodeEditor"
import type { HttpMethod } from "../types"

const HTTP_METHODS: HttpMethod[] = ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"]

const METHOD_COLORS: Record<HttpMethod, { text: string; bg: string; border: string; solid: string }> = {
  GET: { text: "text-green-400", bg: "bg-green-500/20", border: "border-green-500/50", solid: "bg-green-500" },
  POST: { text: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/50", solid: "bg-blue-500" },
  PUT: { text: "text-orange-400", bg: "bg-orange-500/20", border: "border-orange-500/50", solid: "bg-orange-500" },
  DELETE: { text: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/50", solid: "bg-red-500" },
  PATCH: { text: "text-purple-400", bg: "bg-purple-500/20", border: "border-purple-500/50", solid: "bg-purple-500" },
  HEAD: { text: "text-cyan-400", bg: "bg-cyan-500/20", border: "border-cyan-500/50", solid: "bg-cyan-500" },
  OPTIONS: {
    text: "text-yellow-400",
    bg: "bg-yellow-500/20",
    border: "border-yellow-500/50",
    solid: "bg-yellow-500",
  },
}

export default function HttpPanel() {
  const {
    httpRequest,
    setHttpRequest,
    httpResponse,
    setHttpResponse,
    isLoading,
    setIsLoading,
    requestHistory,
    addToHistory,
    loadFromHistory,
  } = useApp()
  const [activeTab, setActiveTab] = useState<"body" | "params" | "headers">("params")
  const [showMethodDropdown, setShowMethodDropdown] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const handleSendRequest = async () => {
    setIsLoading(true)
    const startTime = Date.now()

    try {
      const url = new URL(httpRequest.endpoint, httpRequest.baseUrl)

      Object.entries(httpRequest.queryParams).forEach(([key, value]) => {
        if (key && value) url.searchParams.append(key, value)
      })

      const options: RequestInit = {
        method: httpRequest.method,
        headers: httpRequest.headers,
      }

      if (["POST", "PUT", "PATCH"].includes(httpRequest.method) && httpRequest.body) {
        options.body = httpRequest.body
      }

      const response = await fetch(url.toString(), options)
      const data = await response.json().catch(() => response.text())
      const endTime = Date.now()

      const headers: Record<string, string> = {}
      response.headers.forEach((value, key) => {
        headers[key] = value
      })

      setHttpResponse({
        status: response.status,
        statusText: response.statusText,
        headers,
        data,
        time: endTime - startTime,
      })

      addToHistory(httpRequest, response.status)
    } catch (error) {
      setHttpResponse({
        status: 0,
        statusText: "Error",
        headers: {},
        data: { error: error instanceof Error ? error.message : "Unknown error" },
        time: Date.now() - startTime,
      })

      addToHistory(httpRequest, 0)
    } finally {
      setIsLoading(false)
    }
  }

  const addQueryParam = () => {
    const newParams = { ...httpRequest.queryParams, "": "" }
    setHttpRequest({ ...httpRequest, queryParams: newParams })
  }

  const updateQueryParam = (oldKey: string, newKey: string, value: string) => {
    const newParams = { ...httpRequest.queryParams }
    if (oldKey !== newKey) {
      delete newParams[oldKey]
    }
    newParams[newKey] = value
    setHttpRequest({ ...httpRequest, queryParams: newParams })
  }

  const removeQueryParam = (key: string) => {
    const newParams = { ...httpRequest.queryParams }
    delete newParams[key]
    setHttpRequest({ ...httpRequest, queryParams: newParams })
  }

  const addHeader = () => {
    const newHeaders = { ...httpRequest.headers, "": "" }
    setHttpRequest({ ...httpRequest, headers: newHeaders })
  }

  const updateHeader = (oldKey: string, newKey: string, value: string) => {
    const newHeaders = { ...httpRequest.headers }
    if (oldKey !== newKey) {
      delete newHeaders[oldKey]
    }
    newHeaders[newKey] = value
    setHttpRequest({ ...httpRequest, headers: newHeaders })
  }

  const removeHeader = (key: string) => {
    const newHeaders = { ...httpRequest.headers }
    delete newHeaders[key]
    setHttpRequest({ ...httpRequest, headers: newHeaders })
  }

  return (
    <div className="h-full flex">
      {/* Left Panel - Request */}
      <div className="flex-1 flex flex-col border-r border-border">
        {/* URL Bar */}
        <div className="p-4 border-b border-border space-y-3">
          <div className="flex gap-2">
            <div className="relative">
              <button
                onClick={() => setShowMethodDropdown(!showMethodDropdown)}
                className={`px-4 py-2.5 rounded-lg border font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all flex items-center gap-2 min-w-[120px] justify-between ${METHOD_COLORS[httpRequest.method].text} ${METHOD_COLORS[httpRequest.method].bg} ${METHOD_COLORS[httpRequest.method].border}`}
              >
                {httpRequest.method}
                <ChevronDown className="w-4 h-4" />
              </button>

              {showMethodDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-surface-elevated border border-border rounded-lg shadow-xl z-50 overflow-hidden min-w-[120px]">
                  {HTTP_METHODS.map((method) => (
                    <button
                      key={method}
                      onClick={() => {
                        setHttpRequest({ ...httpRequest, method })
                        setShowMethodDropdown(false)
                      }}
                      className={`w-full px-4 py-2.5 text-left font-mono font-bold text-sm transition-all flex items-center gap-2 hover:bg-surface ${METHOD_COLORS[method].text}`}
                    >
                      <div className={`w-2 h-2 rounded-full ${METHOD_COLORS[method].solid}`} />
                      {method}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              value={httpRequest.baseUrl}
              onChange={(e) => setHttpRequest({ ...httpRequest, baseUrl: e.target.value })}
              placeholder="https://api.example.com"
              className="flex-1 px-4 py-2.5 bg-surface-elevated border border-border rounded-lg text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-mono text-sm"
            />

            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`px-4 py-2.5 rounded-lg border transition-all ${
                showHistory
                  ? "bg-primary/20 border-primary text-primary"
                  : "bg-surface-elevated border-border text-foreground-muted hover:text-foreground hover:border-border-hover"
              }`}
              title="Request History"
            >
              <Clock className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={httpRequest.endpoint}
              onChange={(e) => setHttpRequest({ ...httpRequest, endpoint: e.target.value })}
              placeholder="/endpoint"
              className="flex-1 px-4 py-2.5 bg-surface-elevated border border-border rounded-lg text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-mono text-sm"
            />

            <button
              onClick={handleSendRequest}
              disabled={isLoading}
              className="px-6 py-2.5 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-background font-semibold rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              <Send className="w-4 h-4" />
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>

          {showHistory && (
            <div className="bg-surface-elevated border border-border rounded-lg p-3 max-h-64 overflow-auto">
              <h4 className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-2">
                Request History
              </h4>
              {requestHistory.length === 0 ? (
                <p className="text-sm text-foreground-subtle text-center py-4">No requests yet</p>
              ) : (
                <div className="space-y-1">
                  {requestHistory.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        loadFromHistory(item)
                        setShowHistory(false)
                      }}
                      className="w-full px-3 py-2 rounded-md hover:bg-surface transition-all text-left flex items-center gap-3"
                    >
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${METHOD_COLORS[item.method].text} ${METHOD_COLORS[item.method].bg}`}
                      >
                        {item.method}
                      </span>
                      <span className="flex-1 text-sm font-mono text-foreground truncate">
                        {item.baseUrl}
                        {item.endpoint}
                      </span>
                      {item.status && (
                        <span
                          className={`text-xs font-mono ${
                            item.status >= 200 && item.status < 300
                              ? "text-success"
                              : item.status >= 400
                                ? "text-error"
                                : "text-warning"
                          }`}
                        >
                          {item.status}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Request Options Tabs */}
        <div className="border-b border-border flex">
          <button
            onClick={() => setActiveTab("params")}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "params"
                ? "border-primary text-primary"
                : "border-transparent text-foreground-muted hover:text-foreground"
            }`}
          >
            Query Params
          </button>
          <button
            onClick={() => setActiveTab("headers")}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "headers"
                ? "border-primary text-primary"
                : "border-transparent text-foreground-muted hover:text-foreground"
            }`}
          >
            Headers
          </button>
          {["POST", "PUT", "PATCH"].includes(httpRequest.method) && (
            <button
              onClick={() => setActiveTab("body")}
              className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "body"
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground-muted hover:text-foreground"
              }`}
            >
              Body
            </button>
          )}
        </div>

        {/* Request Options Content */}
        <div className="flex-1 overflow-auto p-4">
          {activeTab === "params" && (
            <div className="space-y-2">
              {Object.entries(httpRequest.queryParams).map(([key, value]) => (
                <div key={key} className="flex gap-2">
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => updateQueryParam(key, e.target.value, value)}
                    placeholder="Key"
                    className="flex-1 px-3 py-2 bg-surface-elevated border border-border rounded-md text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm font-mono"
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => updateQueryParam(key, key, e.target.value)}
                    placeholder="Value"
                    className="flex-1 px-3 py-2 bg-surface-elevated border border-border rounded-md text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm font-mono"
                  />
                  <button
                    onClick={() => removeQueryParam(key)}
                    className="p-2 hover:bg-error/20 text-error rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={addQueryParam}
                className="w-full px-4 py-2 border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 rounded-md text-foreground-muted hover:text-primary transition-all flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Parameter
              </button>
            </div>
          )}

          {activeTab === "headers" && (
            <div className="space-y-2">
              {Object.entries(httpRequest.headers).map(([key, value]) => (
                <div key={key} className="flex gap-2">
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => updateHeader(key, e.target.value, value)}
                    placeholder="Header"
                    className="flex-1 px-3 py-2 bg-surface-elevated border border-border rounded-md text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm font-mono"
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => updateHeader(key, key, e.target.value)}
                    placeholder="Value"
                    className="flex-1 px-3 py-2 bg-surface-elevated border border-border rounded-md text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm font-mono"
                  />
                  <button
                    onClick={() => removeHeader(key)}
                    className="p-2 hover:bg-error/20 text-error rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={addHeader}
                className="w-full px-4 py-2 border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 rounded-md text-foreground-muted hover:text-primary transition-all flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Header
              </button>
            </div>
          )}

          {activeTab === "body" && ["POST", "PUT", "PATCH"].includes(httpRequest.method) && (
            <div className="h-full">
              <CodeEditor
                value={httpRequest.body}
                onChange={(value) => setHttpRequest({ ...httpRequest, body: value })}
                placeholder='{"key": "value"}'
                className="w-full h-full min-h-[300px] px-4 py-3 bg-surface-elevated border border-border rounded-lg text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Response */}
      <div className="flex-1 flex flex-col bg-surface">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground-muted uppercase tracking-wide">Response</h3>
        </div>

        {httpResponse ? (
          <ResponseViewer response={httpResponse} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-foreground-subtle">
            <div className="text-center">
              <Send className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="text-sm">Send a request to see the response</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
