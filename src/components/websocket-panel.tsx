

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Badge } from "../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Radio, Send, Trash2, Circle } from "lucide-react"

interface WebSocketMessage {
  id: string
  type: "sent" | "received"
  event: string
  data: any
  timestamp: Date
}

export function WebSocketPanel() {
  const [wsUrl, setWsUrl] = useState("")
  const [eventName, setEventName] = useState("")
  const [eventType, setEventType] = useState<"emit" | "on">("emit")
  const [messageData, setMessageData] = useState("")
  const [messages, setMessages] = useState<WebSocketMessage[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)

  const connect = () => {
    if (!wsUrl) return

    try {
      const ws = new WebSocket(wsUrl)

      ws.onopen = () => {
        setIsConnected(true)
        console.log("[v0] WebSocket conectado")
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          const newMessage: WebSocketMessage = {
            id: Date.now().toString(),
            type: "received",
            event: data.event || "message",
            data: data.data || data,
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, newMessage])
        } catch {
          const newMessage: WebSocketMessage = {
            id: Date.now().toString(),
            type: "received",
            event: "message",
            data: event.data,
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, newMessage])
        }
      }

      ws.onerror = (error) => {
        console.error("[v0] WebSocket error:", error)
      }

      ws.onclose = () => {
        setIsConnected(false)
        console.log("[v0] WebSocket desconectado")
      }

      wsRef.current = ws
    } catch (error) {
      console.error("[v0] Error al conectar WebSocket:", error)
    }
  }

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
      setIsConnected(false)
    }
  }

  const sendMessage = () => {
    if (!wsRef.current || !isConnected || !eventName) return

    try {
      let parsedData
      try {
        parsedData = JSON.parse(messageData)
      } catch {
        parsedData = messageData
      }

      const payload = {
        event: eventName,
        data: parsedData,
      }

      wsRef.current.send(JSON.stringify(payload))

      const newMessage: WebSocketMessage = {
        id: Date.now().toString(),
        type: "sent",
        event: eventName,
        data: parsedData,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, newMessage])
      setMessageData("")
    } catch (error) {
      console.error("[v0] Error al enviar mensaje:", error)
    }
  }

  const clearMessages = () => {
    setMessages([])
  }

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
      {/* Panel de Configuración */}
      <div className="space-y-6">
        <div className="pb-4 border-b border-border/50">
          <h2 className="text-xl font-semibold text-foreground">Cliente WebSocket</h2>
          <p className="text-sm text-muted-foreground mt-1">Conecta y prueba eventos en tiempo real</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <div className="space-y-4">
              {/* WebSocket URL */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Dirección WebSocket</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="ws://localhost:3000"
                    value={wsUrl}
                    onChange={(e) => setWsUrl(e.target.value)}
                    disabled={isConnected}
                    className="flex-1 h-10"
                  />
                  {!isConnected ? (
                    <Button onClick={connect} disabled={!wsUrl} className="bg-primary hover:bg-primary/90 h-10 px-4">
                      <Radio className="w-4 h-4 mr-2" />
                      Conectar
                    </Button>
                  ) : (
                    <Button
                      onClick={disconnect}
                      variant="outline"
                      className="text-destructive hover:text-destructive h-10 px-4 bg-transparent"
                    >
                      Desconectar
                    </Button>
                  )}
                </div>
              </div>

              {/* Connection Status */}
              <div className="flex items-center gap-2 pt-2">
                <Circle
                  className={`w-3 h-3 ${isConnected ? "fill-green-500 text-green-500" : "fill-red-500 text-red-500"}`}
                />
                <span className="text-sm text-muted-foreground">{isConnected ? "Conectado" : "Desconectado"}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0 space-y-4">
            {/* Event Configuration */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Nombre del Evento</Label>
                <Input
                  placeholder="message"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  disabled={!isConnected}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Tipo de Evento</Label>
                <Select value={eventType} onValueChange={(value: any) => setEventType(value)} disabled={!isConnected}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emit">
                      <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1">Emit</Badge>
                    </SelectItem>
                    <SelectItem value="on">
                      <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1">On</Badge>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Data Input for Emit */}
              {eventType === "emit" && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Datos a Enviar (JSON)</Label>
                  <Textarea
                    placeholder='{\n  "message": "Hola mundo"\n}'
                    value={messageData}
                    onChange={(e) => setMessageData(e.target.value)}
                    disabled={!isConnected}
                    className="min-h-32 font-mono text-sm resize-none"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!isConnected || !eventName || !messageData}
                    className="w-full bg-primary hover:bg-primary/90 h-10"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                </div>
              )}

              {/* Info for On */}
              {eventType === "on" && (
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    Escuchando eventos <span className="font-mono text-foreground">{eventName || "..."}</span>. Los
                    mensajes recibidos aparecerán en el panel de respuestas.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panel de Mensajes */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border/50">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Mensajes</h2>
            <p className="text-sm text-muted-foreground mt-1">Historial de mensajes enviados y recibidos</p>
          </div>
          {messages.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearMessages} className="h-9 px-3 bg-transparent">
              <Trash2 className="w-4 h-4 mr-2" />
              Limpiar
            </Button>
          )}
        </div>

        {messages.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Radio className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">Los mensajes aparecerán aquí cuando envíes o recibas datos</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <Card key={message.id} className="bg-card border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${
                          message.type === "sent" ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
                        } text-white text-xs px-2 py-1`}
                      >
                        {message.type === "sent" ? "Enviado" : "Recibido"}
                      </Badge>
                      <span className="text-sm font-mono text-foreground">{message.event}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <pre className="bg-muted/50 rounded-lg p-3 text-xs font-mono overflow-x-auto">
                    {JSON.stringify(message.data, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
