import { useState } from "react"
import { HttpRequestPanel } from "./components/http-request-panel"
import { ResponsePanel } from "./components/response-panel"
import { WebSocketPanel } from "./components/websocket-panel"
import { Button } from "./components/ui/button"
import { Plus, Zap, Minimize2, Maximize2, X, Radio } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import "./globals.css"
import { getCurrentWindow } from "@tauri-apps/api/window"

export interface HttpRequest {
  id: string
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  baseUrl: string
  route: string
  params: { key: string; value: string }[]
  headers: { key: string; value: string }[]
  body: string
}

export interface HttpResponse {
  id: string
  status: number
  statusText: string
  time: number
  data: any
  error?: string
}

export default function HttpClientApp() {
  const [requests, setRequests] = useState<HttpRequest[]>([
    {
      id: "1",
      method: "GET",
      baseUrl: "",
      route: "",
      params: [{ key: "", value: "" }],
      headers: [{ key: "", value: "" }],
      body: "",
    },
  ])

  const [maximized, setMaximized] = useState<boolean>(false);
  const [responses, setResponses] = useState<HttpResponse[]>([])
  const [isLoading, setIsLoading] = useState<string[]>([])
  const [activeView, setActiveView] = useState<"http" | "websocket">("http")

  const addRequest = () => {
    if (requests.length < 3) {
      const newRequest: HttpRequest = {
        id: Date.now().toString(),
        method: "GET",
        baseUrl: "",
        route: "",
        params: [{ key: "", value: "" }],
        headers: [{ key: "", value: "" }],
        body: "",
      }
      setRequests([...requests, newRequest])
    }
  }

  const removeRequest = (id: string) => {
    setRequests(requests.filter((req) => req.id !== id))
    setResponses(responses.filter((res) => res.id !== id))
  }

  const updateRequest = (id: string, updatedRequest: Partial<HttpRequest>) => {
    setRequests(requests.map((req) => (req.id === id ? { ...req, ...updatedRequest } : req)))
  }

  const executeRequest = async (request: HttpRequest) => {
    setIsLoading((prev) => [...prev, request.id])
    const startTime = Date.now()

    try {
      // Construir URL completa
      let url = request.baseUrl
      if (request.route) {
        url += request.route.startsWith("/") ? request.route : `/${request.route}`
      }

      // Agregar parámetros de consulta para GET
      if (request.method === "GET" && request.params.some((p) => p.key && p.value)) {
        const searchParams = new URLSearchParams()
        request.params.forEach((param) => {
          if (param.key && param.value) {
            searchParams.append(param.key, param.value)
          }
        })
        url += `?${searchParams.toString()}`
      }

      // Configurar headers
      const headers: Record<string, string> = {}
      request.headers.forEach((header) => {
        if (header.key && header.value) {
          headers[header.key] = header.value
        }
      })

      // Configurar opciones de fetch
      const fetchOptions: RequestInit = {
        method: request.method,
        headers,
      }

      // Agregar body para POST, PUT, PATCH
      if (["POST", "PUT", "PATCH"].includes(request.method)) {
        if (request.body) {
          fetchOptions.body = request.body
          if (!headers["Content-Type"]) {
            headers["Content-Type"] = "application/json"
          }
        }

        // Para PUT, también agregar parámetros como form data si no hay body JSON
        if (request.method === "PUT" && !request.body && request.params.some((p) => p.key && p.value)) {
          const formData = new FormData()
          request.params.forEach((param) => {
            if (param.key && param.value) {
              formData.append(param.key, param.value)
            }
          })
          fetchOptions.body = formData
        }
      }

      const response = await fetch(url, fetchOptions)
      const endTime = Date.now()

      let data
      try {
        data = await response.json()
      } catch {
        data = await response.text()
      }

      const httpResponse: HttpResponse = {
        id: request.id,
        status: response.status,
        statusText: response.statusText,
        time: endTime - startTime,
        data,
      }

      setResponses((prev) => prev.filter((res) => res.id !== request.id).concat(httpResponse))
    } catch (error) {
      const endTime = Date.now()
      const httpResponse: HttpResponse = {
        id: request.id,
        status: 0,
        statusText: "Network Error",
        time: endTime - startTime,
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      }
      setResponses((prev) => prev.filter((res) => res.id !== request.id).concat(httpResponse))
    } finally {
      setIsLoading((prev) => prev.filter((id) => id !== request.id))
    }
  }

  const executeAllRequests = async () => {
    const validRequests = requests.filter((req) => req.baseUrl)
    await Promise.all(validRequests.map(executeRequest))
  }

  const window = getCurrentWindow();

  const handleClose = () => window.close();

  const handleMinimize = () => window.minimize();

  const handleMaximize = async () => {
    setMaximized(!maximized);

    const isMaximized = await window.isMaximized();

    isMaximized ?? setMaximized(true);

    window.toggleMaximize();

  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#f1f1f1]">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="p-4">
          <div data-tauri-drag-region className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground select-none">Apix</h1>
                <p className="text-sm text-muted-foreground select-none">Rápido, simple y elegante</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={handleMinimize} size="sm" className="h-8 w-8 p-0 hover:bg-muted cursor-pointer pointer-events-auto">
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" onClick={handleMaximize} size="sm" className="h-8 w-8 p-0 hover:bg-muted cursor-pointer pointer-events-auto">
                <Maximize2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" onClick={handleClose} size="sm" className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive cursor-pointer pointer-events-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <Tabs value={activeView} onValueChange={(v) => setActiveView(v as "http" | "websocket")} className="w-full p-6">
        <TabsList className="grid w-64 grid-cols-2 mb-6">
          <TabsTrigger value="http" className="gap-2">
            <Zap className="w-4 h-4" />
            HTTP
          </TabsTrigger>
          <TabsTrigger value="websocket" className="gap-2">
            <Radio className="w-4 h-4" />
            WebSocket
          </TabsTrigger>
        </TabsList>

        <TabsContent value="http" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
            {/* Panel de Peticiones */}
            <div className="space-y-6 ">
              <div className="flex items-center justify-between pb-4 border-b border-border/50 ">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Peticiones HTTP</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Configura y ejecuta hasta 3 peticiones en paralelo
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={addRequest}
                    disabled={requests.length >= 3}
                    variant="outline"
                    size="sm"
                    className="h-9 px-4"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar ({requests.length}/3)
                  </Button>
                  <Button
                    onClick={executeAllRequests}
                    disabled={isLoading.length > 0 || !requests.some((req) => req.baseUrl)}
                    className="bg-primary hover:bg-primary/90 h-9 px-4"
                    size="sm"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Ejecutar Todo
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {requests.map((request) => (
                  <HttpRequestPanel
                    key={request.id}
                    request={request}
                    onUpdate={(updates) => updateRequest(request.id, updates)}
                    onExecute={() => executeRequest(request)}
                    onRemove={() => removeRequest(request.id)}
                    isLoading={isLoading.includes(request.id)}
                    canRemove={requests.length > 1}
                  />
                ))}
              </div>
            </div>

            {/* Panel de Respuestas */}
            <div className="space-y-6 ">
              <div className="pb-4 border-b border-border/50">
                <h2 className="text-xl font-semibold text-foreground">Respuestas</h2>
                <p className="text-sm text-muted-foreground mt-1">Resultados de las peticiones ejecutadas</p>
              </div>

              {responses.length === 0 ? (
                <div className="bg-[#1e1e1e] border border-border rounded-lg p-12 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Las respuestas aparecerán aquí después de ejecutar las peticiones
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {responses.map((response) => (
                    <ResponsePanel key={response.id} response={response} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="websocket" className="mt-0">
          <WebSocketPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
