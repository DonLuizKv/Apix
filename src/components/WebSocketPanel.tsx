"use client"

import { useState, useRef, useEffect } from "react"
import { Plug, PlugZap, Send, Trash2, Radio, Ear } from "lucide-react"
import { useApp } from "../contexts/AppContext"
import { WebSocketConnection } from "../types"

export default function WebSocketPanel() {
  const { wsConnection, setWsConnection } = useApp()
  const [url, setUrl] = useState(wsConnection.url)
  const [eventType, setEventType] = useState<"emit" | "on">("emit")
  const [eventName, setEventName] = useState("")
  const [eventData, setEventData] = useState("")
  const [listeners, setListeners] = useState<string[]>([])
  const wsRef = useRef<WebSocket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [wsConnection.events])

  const handleConnect = () => {
    try {
      const ws = new WebSocket(url)

      ws.onopen = () => {
        console.log("[v0] WebSocket connected")
        setWsConnection({
          ...wsConnection,
          url,
          connected: true,
          events: [
            ...wsConnection.events,
            {
              type: "on",
              eventName: "connection",
              data: "Connected to server",
              timestamp: Date.now(),
            },
          ],
        })
      }

      ws.onmessage = (event) => {
        console.log("[v0] WebSocket message received:", event.data)
        setWsConnection((prev:WebSocketConnection) => ({
          ...prev,
          events: [
            ...prev.events,
            {
              type: "on",
              eventName: "message",
              data: event.data,
              timestamp: Date.now(),
            },
          ],
        }))
      }

      ws.onerror = (error) => {
        console.log("[v0] WebSocket error:", error)
        setWsConnection((prev) => ({
          ...prev,
          events: [
            ...prev.events,
            {
              type: "on",
              eventName: "error",
              data: "Connection error",
              timestamp: Date.now(),
            },
          ],
        }))
      }

      ws.onclose = () => {
        console.log("[v0] WebSocket disconnected")
        setWsConnection((prev) => ({
          ...prev,
          connected: false,
          events: [
            ...prev.events,
            {
              type: "on",
              eventName: "disconnect",
              data: "Disconnected from server",
              timestamp: Date.now(),
            },
          ],
        }))
      }

      wsRef.current = ws
    } catch (error) {

      console.log("[v0] WebSocket connection error:", error)
      setWsConnection({
        ...wsConnection,
        events: [
          ...wsConnection.events,
          {
            type: "on",
            eventName: "error",
            data: error instanceof Error ? error.message : "Connection failed",
            timestamp: Date.now(),
          },
        ],
      })
    }
  }

  const handleDisconnect = () => {
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
  }

  const handleSendEvent = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      return
    }

    try {
      const message = JSON.stringify({
        event: eventName,
        data: JSON.parse(eventData || "{}"),
      })

      wsRef.current.send(message)

      setWsConnection({
        ...wsConnection,
        events: [
          ...wsConnection.events,
          {
            type: "emit",
            eventName,
            data: eventData,
            timestamp: Date.now(),
          },
        ],
      })

      setEventName("")
      setEventData("")
    } catch (error) {
      console.log("[v0] Error sending event:", error)
    }
  }

  const handleAddListener = () => {
    if (eventName && !listeners.includes(eventName)) {
      setListeners([...listeners, eventName])
      setEventName("")
    }
  }

  const handleRemoveListener = (listener: string) => {
    setListeners(listeners.filter((l) => l !== listener))
  }

  const clearEvents = () => {
    setWsConnection({ ...wsConnection, events: [] })
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  return (
    <div className="h-full flex">
      {/* Left Panel - Connection & Events */}
      <div className="w-96 flex flex-col border-r border-border bg-surface">
        {/* Connection */}
        <div className="p-4 border-b border-border space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase tracking-wide">Connection</h3>
            <div
              className={`flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium ${
                wsConnection.connected ? "bg-success/20 text-success" : "bg-foreground-subtle/20 text-foreground-muted"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${wsConnection.connected ? "bg-success animate-pulse" : "bg-foreground-subtle"}`}
              />
              {wsConnection.connected ? "Connected" : "Disconnected"}
            </div>
          </div>

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="ws://localhost:3000"
            disabled={wsConnection.connected}
            className="w-full px-4 py-2.5 bg-surface-elevated border border-border rounded-lg text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-mono text-sm disabled:opacity-50"
          />

          {wsConnection.connected ? (
            <button
              onClick={handleDisconnect}
              className="w-full px-4 py-2.5 bg-error hover:bg-error/80 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Plug className="w-4 h-4" />
              Disconnect
            </button>
          ) : (
            <button
              onClick={handleConnect}
              className="w-full px-4 py-2.5 bg-primary hover:bg-primary-hover text-background font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              <PlugZap className="w-4 h-4" />
              Connect
            </button>
          )}
        </div>

        {/* Event Type Selector */}
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground-muted uppercase tracking-wide mb-3">Event Type</h3>
          <div className="flex gap-2 bg-surface-elevated rounded-lg p-1">
            <button
              onClick={() => setEventType("emit")}
              className={`flex-1 px-4 py-2 rounded-md font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                eventType === "emit"
                  ? "bg-primary text-background shadow-lg shadow-primary/20"
                  : "text-foreground-muted hover:text-foreground hover:bg-border"
              }`}
            >
              <Radio className="w-4 h-4" />
              Emit
            </button>
            <button
              onClick={() => setEventType("on")}
              className={`flex-1 px-4 py-2 rounded-md font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                eventType === "on"
                  ? "bg-primary text-background shadow-lg shadow-primary/20"
                  : "text-foreground-muted hover:text-foreground hover:bg-border"
              }`}
            >
              <Ear className="w-4 h-4" />
              Listen
            </button>
          </div>
        </div>

        {/* Event Configuration */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {eventType === "emit" ? (
            <>
              <div>
                <label className="text-sm font-medium text-foreground-muted mb-2 block">Event Name</label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="message"
                  disabled={!wsConnection.connected}
                  className="w-full px-3 py-2 bg-surface-elevated border border-border rounded-md text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm font-mono disabled:opacity-50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground-muted mb-2 block">Event Data (JSON)</label>
                <textarea
                  value={eventData}
                  onChange={(e) => setEventData(e.target.value)}
                  placeholder='{"message": "Hello"}'
                  disabled={!wsConnection.connected}
                  className="w-full h-32 px-3 py-2 bg-surface-elevated border border-border rounded-md text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm font-mono resize-none disabled:opacity-50"
                />
              </div>

              <button
                onClick={handleSendEvent}
                disabled={!wsConnection.connected || !eventName}
                className="w-full px-4 py-2.5 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-background font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                <Send className="w-4 h-4" />
                Send Event
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium text-foreground-muted mb-2 block">Event Name</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="message"
                    disabled={!wsConnection.connected}
                    className="flex-1 px-3 py-2 bg-surface-elevated border border-border rounded-md text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm font-mono disabled:opacity-50"
                  />
                  <button
                    onClick={handleAddListener}
                    disabled={!wsConnection.connected || !eventName}
                    className="px-4 py-2 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-background font-semibold rounded-md transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground-muted mb-2 block">Active Listeners</label>
                <div className="space-y-2">
                  {listeners.length === 0 ? (
                    <div className="text-center py-8 text-foreground-subtle text-sm">No active listeners</div>
                  ) : (
                    listeners.map((listener) => (
                      <div
                        key={listener}
                        className="flex items-center justify-between px-3 py-2 bg-surface-elevated border border-border rounded-md"
                      >
                        <span className="text-sm font-mono text-foreground">{listener}</span>
                        <button
                          onClick={() => handleRemoveListener(listener)}
                          className="p-1 hover:bg-error/20 text-error rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Panel - Events Log */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground-muted uppercase tracking-wide">Events Log</h3>
          <button
            onClick={clearEvents}
            className="px-3 py-1.5 text-sm text-foreground-muted hover:text-error hover:bg-error/10 rounded-md transition-all flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-2">
          {wsConnection.events.length === 0 ? (
            <div className="h-full flex items-center justify-center text-foreground-subtle">
              <div className="text-center">
                <Radio className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-sm">No events yet</p>
              </div>
            </div>
          ) : (
            wsConnection.events.map((event, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  event.type === "emit"
                    ? "bg-primary/5 border-primary/30"
                    : event.eventName === "error"
                      ? "bg-error/5 border-error/30"
                      : "bg-success/5 border-success/30"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {event.type === "emit" ? (
                      <Radio className="w-4 h-4 text-primary" />
                    ) : (
                      <Ear className="w-4 h-4 text-success" />
                    )}
                    <span
                      className={`text-sm font-semibold ${
                        event.type === "emit"
                          ? "text-primary"
                          : event.eventName === "error"
                            ? "text-error"
                            : "text-success"
                      }`}
                    >
                      {event.type === "emit" ? "EMIT" : "ON"}
                    </span>
                    <span className="text-sm font-mono text-foreground">{event.eventName}</span>
                  </div>
                  <span className="text-xs font-mono text-foreground-muted">{formatTime(event.timestamp)}</span>
                </div>
                <pre className="text-sm font-mono text-foreground-muted bg-surface-elevated rounded p-2 overflow-auto">
                  {typeof event.data === "string" ? event.data : JSON.stringify(event.data, null, 2)}
                </pre>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  )
}
