

import { Plus, Save, X } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import type { HttpMethod } from '../types'

interface RequestPanelProps {
  method: HttpMethod
  baseUrl: string
  endpoint: string
  headers: Record<string, string>
  body: string
  isLoading: boolean
  onMethodChange: (method: HttpMethod) => void
  onBaseUrlChange: (url: string) => void
  onEndpointChange: (endpoint: string) => void
  onHeadersChange: (headers: Record<string, string>) => void
  onBodyChange: (body: string) => void
  onSend: () => void
  onSave: () => void
}

export function RequestPanel({
  method,
  baseUrl,
  endpoint,
  headers,
  body,
  isLoading,
  onMethodChange,
  onBaseUrlChange,
  onEndpointChange,
  onHeadersChange,
  onBodyChange,
  onSend,
  onSave,
}: RequestPanelProps) {
  const headerEntries = Object.entries(headers);
  const httpRequest = [
    {
      method: "GET",
      color: "text-primary"
    },
    {
      method: "POST",
      color: "text-secondary"
    },
    {
      method: "PUT",
      color: "text-success"
    },
    {
      method: "DELETE",
      color: "text-destructive"
    },
    {
      method: "PATCH",
      color: "text-warning"
    },
    {
      method: "HEAD",
      color: "text-primary"
    },
    {
      method: "OPTIONS",
      color: "text-secondary"
    }
  ];

  const addHeader = () => {
    onHeadersChange({ ...headers, '': '' })
  }

  const updateHeader = (oldKey: string, newKey: string, value: string) => {
    const newHeaders = { ...headers }
    if (oldKey !== newKey) {
      delete newHeaders[oldKey]
    }
    if (newKey) {
      newHeaders[newKey] = value
    }
    onHeadersChange(newHeaders)
  }

  const removeHeader = (key: string) => {
    const newHeaders = { ...headers }
    delete newHeaders[key]
    onHeadersChange(newHeaders)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onSend()
    }
  }

  return (
    <div className="flex-1 overflow-y-auto border-b border-border">
      <div className="p-6 space-y-6">
        {/* URL Section */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <Select value={method} onValueChange={(v: string) => onMethodChange(v as HttpMethod)}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue className={httpRequest.find((item) => item.method === method)?.color} />
              </SelectTrigger>
              <SelectContent>
                {httpRequest.map((item) => (
                  <SelectItem key={item.method} className={item.color} value={item.method}>
                    {item.method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Base URL (ej: https://api.ejemplo.com)"
              value={baseUrl}
              onChange={(e) => onBaseUrlChange(e.target.value)}
              className="flex-1 bg-secondary border-border"
              onKeyDown={handleKeyDown}
            />
            <Input
              placeholder="Endpoint (ej: /users)"
              value={endpoint}
              onChange={(e) => onEndpointChange(e.target.value)}
              className="flex-1 bg-secondary border-border"
              onKeyDown={handleKeyDown}
            />

            <Button
              onClick={onSend}
              disabled={isLoading}
              className=" font-semibold bg-primary hover:bg-primary/90 text-[#1e1e1e]"
            >
              {isLoading ? 'Enviando...' : 'Enviar'}
            </Button>
            <Button
              onClick={onSave}
              variant="outline"
              className="group border-primary text-primary hover:bg-primary hover:text-[#1e1e1e]"
            >
              <Save />
            </Button>
          </div>
        </div>

        {/* Headers Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">Headers</h3>
            <Button
              onClick={addHeader}
              variant="ghost"
              size="sm"
              className="h-8 text-primary hover:text-primary/90"
            >
              <Plus className="h-4 w-4 mr-1" />
              Agregar
            </Button>
          </div>
          <div className="space-y-2">
            {headerEntries.map(([key, value], index) => (
              <div key={index} className="flex flex-wrap gap-2">
                <Input
                  placeholder="Key"
                  value={key}
                  onChange={(e) => updateHeader(key, e.target.value, value)}
                  className="flex-1 bg-secondary border-border text-sm"
                />
                <Input
                  placeholder="Value"
                  value={value}
                  onChange={(e) => updateHeader(key, key, e.target.value)}
                  className="flex-1 bg-secondary border-border text-sm"
                />
                <Button
                  onClick={() => removeHeader(key)}
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Body Section */}
        {method !== 'GET' && method !== 'HEAD' && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Body (JSON)</h3>
            <Textarea
              placeholder='{\n  "key": "value"\n}'
              value={body}
              onChange={(e) => onBodyChange(e.target.value)}
              className="min-h-[200px] bg-secondary border-border font-mono text-sm"
              onKeyDown={handleKeyDown}
            />
          </div>
        )}

        {/* <p className="text-xs text-muted-foreground">
          Presiona <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-foreground">Ctrl/Cmd + Enter</kbd> para enviar
        </p> */}
      </div>
    </div>
  )
}
