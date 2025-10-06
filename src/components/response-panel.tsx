

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { ScrollArea } from "../components/ui/scroll-area"
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import type { HttpResponse } from "../App"

interface ResponsePanelProps {
  response: HttpResponse
}

export function ResponsePanel({ response }: ResponsePanelProps) {
  const getStatusColor = (status: number) => {
    if (status === 0) return "bg-gray-500"
    if (status >= 200 && status < 300) return "bg-green-500"
    if (status >= 300 && status < 400) return "bg-yellow-500"
    if (status >= 400 && status < 500) return "bg-orange-500"
    if (status >= 500) return "bg-red-500"
    return "bg-gray-500"
  }

  const getStatusIcon = (status: number) => {
    if (status === 0) return <XCircle className="w-4 h-4" />
    if (status >= 200 && status < 300) return <CheckCircle className="w-4 h-4" />
    if (status >= 400) return <XCircle className="w-4 h-4" />
    return <AlertCircle className="w-4 h-4" />
  }

  const formatJson = (data: any) => {
    try {
      if (typeof data === "string") {
        // Intentar parsear si es un string JSON
        try {
          const parsed = JSON.parse(data)
          return JSON.stringify(parsed, null, 2)
        } catch {
          return data
        }
      }
      return JSON.stringify(data, null, 2)
    } catch {
      return String(data)
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Respuesta</CardTitle>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{response.time}ms</span>
            </div>
            <Badge className={`${getStatusColor(response.status)} text-white flex items-center gap-1`}>
              {getStatusIcon(response.status)}
              {response.status} {response.statusText}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {response.error ? (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-destructive" />
              <span className="font-medium text-destructive">Error</span>
            </div>
            <p className="text-sm text-destructive">{response.error}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Respuesta JSON</span>
              <Badge variant="outline" className="text-xs">
                {typeof response.data === "object" ? "JSON" : "TEXT"}
              </Badge>
            </div>

            <ScrollArea className="h-64 w-full rounded-md border border-border bg-muted/30">
              <pre className="p-4 text-xs font-mono text-foreground whitespace-pre-wrap">
                {formatJson(response.data)}
              </pre>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
