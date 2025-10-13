import { createContext, useContext, useState, type ReactNode } from "react"
import type { HttpRequest, HttpResponse, WebSocketConnection, HttpRequestHistory } from "../types"

interface AppContextType {
  httpRequest: HttpRequest
  setHttpRequest: (request: HttpRequest) => void
  httpResponse: HttpResponse | null
  setHttpResponse: (response: HttpResponse | null) => void
  wsConnection: WebSocketConnection
  setWsConnection: (connection: WebSocketConnection) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  requestHistory: HttpRequestHistory[]
  addToHistory: (request: HttpRequest, status?: number) => void
  loadFromHistory: (historyItem: HttpRequestHistory) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [httpRequest, setHttpRequest] = useState<HttpRequest>({
    baseUrl: "https://api.example.com",
    endpoint: "/users",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    queryParams: {},
    body: "",
  })

  const [httpResponse, setHttpResponse] = useState<HttpResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [requestHistory, setRequestHistory] = useState<HttpRequestHistory[]>([])

  const addToHistory = (request: HttpRequest, status?: number) => {
    const historyItem: HttpRequestHistory = {
      id: Date.now().toString(),
      baseUrl: request.baseUrl,
      endpoint: request.endpoint,
      method: request.method,
      timestamp: Date.now(),
      status,
    }
    setRequestHistory((prev) => [historyItem, ...prev].slice(0, 20)) // Keep last 20 requests
  }

  const loadFromHistory = (historyItem: HttpRequestHistory) => {
    setHttpRequest({
      ...httpRequest,
      baseUrl: historyItem.baseUrl,
      endpoint: historyItem.endpoint,
      method: historyItem.method,
    })
  }

  const [wsConnection, setWsConnection] = useState<WebSocketConnection>({
    url: "ws://localhost:3000",
    connected: false,
    events: [],
  })

  return (
    <AppContext.Provider
      value={{
        httpRequest,
        setHttpRequest,
        httpResponse,
        setHttpResponse,
        wsConnection,
        setWsConnection,
        isLoading,
        setIsLoading,
        requestHistory,
        addToHistory,
        loadFromHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
