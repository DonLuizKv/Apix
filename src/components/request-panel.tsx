

import { EllipsisIcon, Plus, Save, SendHorizonal, X } from 'lucide-react'
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
      color: "text-http-get",
      border: "border-http-get"
    },
    {
      method: "POST",
      color: "text-http-post",
      border: "border-http-post"
    },
    {
      method: "PUT",
      color: "text-http-put",
      border: "border-http-put"
    },
    {
      method: "DELETE",
      color: "text-http-delete",
      border: "border-http-delete"
    },
    {
      method: "PATCH",
      color: "text-http-patch",
      border: "border-http-patch"
    },
    {
      method: "HEAD",
      color: "text-http-head",
      border: "border-http-head"
    },
    {
      method: "OPTIONS",
      color: "text-http-options",
      border: "border-http-options"
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
              <SelectTrigger className={`bg-secondary ${httpRequest.find((item) => item.method === method)?.border}`}>
                <SelectValue className={`${httpRequest.find((item) => item.method === method)?.color} font-semibold`} />
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
              placeholder="https://api.example.com"
              value={baseUrl}
              onChange={(e) => onBaseUrlChange(e.target.value)}
              className="flex-1 bg-secondary border-border"
              onKeyDown={handleKeyDown}
            />
            <Input
              placeholder="/example"
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
              {isLoading ? <EllipsisIcon stroke='white' size={20} /> : <SendHorizonal stroke='white' size={20} />}
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
              <div key={index} className="flex flex-wrap max-sm:flex-nowrap gap-2">
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
              value={body}
              onChange={(value) => onBodyChange(value || '')}
              className="h-[200px] resize-y bg-secondary border-border font-mono text-sm"
              onSubmit={onSend}
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
