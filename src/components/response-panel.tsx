

import { Badge } from './ui/badge'
import type { ResponseData } from '../types'

interface ResponsePanelProps {
  response: ResponseData | null
}

export function ResponsePanel({ response }: ResponsePanelProps) {
  if (!response) {
    return (
      <div className="flex-1 flex items-center justify-center bg-card/50">
        <p className="text-muted-foreground">
          Envía una petición para ver la respuesta
        </p>
      </div>
    )
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'bg-accent text-accent-foreground'
    if (status >= 300 && status < 400) return 'bg-chart-3 text-primary-foreground'
    if (status >= 400 && status < 500) return 'bg-primary text-primary-foreground'
    if (status >= 500) return 'bg-destructive text-destructive-foreground'
    return 'bg-muted text-muted-foreground'
  }

  const formatBody = () => {
    if (typeof response.body === 'object') {
      return JSON.stringify(response.body, null, 2)
    }
    return String(response.body)
  }

  return (
    <div className="flex-1 overflow-y-auto bg-card/50 p-6 space-y-4">
      {/* Status Bar */}
      <div className="flex items-center gap-4 pb-4 border-b border-border">
        <Badge className={getStatusColor(response.status)}>
          {response.status} {response.statusText}
        </Badge>
        <span className="text-sm text-muted-foreground">
          Tiempo: <span className="text-primary font-semibold">{response.time}ms</span>
        </span>
      </div>

      {/* Response Headers */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Headers de Respuesta</h3>
        <div className="bg-secondary rounded-lg p-4 space-y-1">
          {Object.entries(response.headers).map(([key, value]) => (
            <div key={key} className="text-xs font-mono">
              <span className="text-primary">{key}:</span>{' '}
              <span className="text-foreground">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Response Body */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Body</h3>
        <pre className="bg-secondary rounded-lg p-4 overflow-x-auto">
          <code className="text-xs font-mono text-foreground leading-relaxed">
            {formatBody()}
          </code>
        </pre>
      </div>
    </div>
  )
}
