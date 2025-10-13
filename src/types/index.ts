export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS"

export type ThemeColor = "blue" | "cyan" | "purple" | "green" | "orange" | "pink"

export interface HttpRequest {
  baseUrl: string
  endpoint: string
  method: HttpMethod
  headers: Record<string, string>
  queryParams: Record<string, string>
  body: string
}

export interface HttpRequestHistory {
  id: string
  baseUrl: string
  endpoint: string
  method: HttpMethod
  timestamp: number
  status?: number
}

export interface WebSocketEvent {
  type: "emit" | "on"
  eventName: string
  data: string
  timestamp: number
}

export interface AppSettings {
  themeColor: ThemeColor
}

export interface HttpResponse {
  status: number
  statusText: string
  headers: Record<string, string>
  data: any
  time: number
}

export interface WebSocketConnection {
  url: string
  connected: boolean
  events: WebSocketEvent[]
}
