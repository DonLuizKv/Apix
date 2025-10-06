
import { Card, CardContent, CardHeader } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Badge } from "../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Play, Trash2, Plus, Minus, Settings, Loader2 } from "lucide-react"
import type { HttpRequest } from "../App"

interface HttpRequestPanelProps {
  request: HttpRequest
  onUpdate: (updates: Partial<HttpRequest>) => void
  onExecute: () => void
  onRemove: () => void
  isLoading: boolean
  canRemove: boolean
}

const methodColors = {
  GET: "bg-blue-500 hover:bg-blue-600",
  POST: "bg-green-500 hover:bg-green-600",
  PUT: "bg-yellow-500 hover:bg-yellow-600",
  DELETE: "bg-red-500 hover:bg-red-600",
  PATCH: "bg-purple-500 hover:bg-purple-600",
}

export function HttpRequestPanel({
  request,
  onUpdate,
  onExecute,
  onRemove,
  isLoading,
  canRemove,
}: HttpRequestPanelProps) {
  const addParam = () => {
    onUpdate({
      params: [...request.params, { key: "", value: "" }],
    })
  }

  const removeParam = (index: number) => {
    onUpdate({
      params: request.params.filter((_, i) => i !== index),
    })
  }

  const updateParam = (index: number, field: "key" | "value", value: string) => {
    const newParams = [...request.params]
    newParams[index][field] = value
    onUpdate({ params: newParams })
  }

  const addHeader = () => {
    onUpdate({
      headers: [...request.headers, { key: "", value: "" }],
    })
  }

  const removeHeader = (index: number) => {
    onUpdate({
      headers: request.headers.filter((_, i) => i !== index),
    })
  }

  const updateHeader = (index: number, field: "key" | "value", value: string) => {
    const newHeaders = [...request.headers]
    newHeaders[index][field] = value
    onUpdate({ headers: newHeaders })
  }

  const showJsonBody = ["POST", "PATCH"].includes(request.method)
  const showParams = request.method === "GET"
  const showBoth = request.method === "PUT"

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="space-y-4">
          {/* Method and URL Section */}
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Select value={request.method} onValueChange={(value: any) => onUpdate({ method: value })}>
                <SelectTrigger className="w-28 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(methodColors).map((method) => (
                    <SelectItem key={method} value={method}>
                      <Badge
                        className={`${methodColors[method as keyof typeof methodColors]} text-white text-xs px-2 py-1`}
                      >
                        {method}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 flex gap-2">
              <Input
                placeholder="https://api.ejemplo.com"
                value={request.baseUrl}
                onChange={(e) => onUpdate({ baseUrl: e.target.value })}
                className="flex-1 h-10"
              />
              <Input
                placeholder="/ruta"
                value={request.route}
                onChange={(e) => onUpdate({ route: e.target.value })}
                className="w-40 h-10"
              />
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 px-3 bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    Headers
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96 p-4">
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Configurar Headers</h4>
                    <div className="space-y-3">
                      {request.headers.map((header, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder="Clave"
                            value={header.key}
                            onChange={(e) => updateHeader(index, "key", e.target.value)}
                            className="flex-1 h-9"
                          />
                          <Input
                            placeholder="Valor"
                            value={header.value}
                            onChange={(e) => updateHeader(index, "value", e.target.value)}
                            className="flex-1 h-9"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeHeader(index)}
                            disabled={request.headers.length === 1}
                            className="h-9 w-9 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addHeader}
                      className="w-full h-9 bg-transparent border-dashed"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Header
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={onExecute}
                disabled={isLoading || !request.baseUrl}
                size="sm"
                className="bg-primary hover:bg-primary/90 h-9 px-4"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isLoading ? "Ejecutando..." : "Ejecutar"}
              </Button>

              {canRemove && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRemove}
                  className="text-destructive hover:text-destructive bg-transparent h-9 w-9 p-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {showParams && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Parámetros de consulta</Label>
              <Button variant="outline" size="sm" onClick={addParam} className="h-8 px-3 bg-transparent border-dashed">
                <Plus className="w-3 h-3 mr-1" />
                Agregar
              </Button>
            </div>
            <div className="space-y-3">
              {request.params.map((param, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    placeholder="Clave"
                    value={param.key}
                    onChange={(e) => updateParam(index, "key", e.target.value)}
                    className="flex-1 h-9"
                  />
                  <Input
                    placeholder="Valor"
                    value={param.value}
                    onChange={(e) => updateParam(index, "value", e.target.value)}
                    className="flex-1 h-9"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeParam(index)}
                    disabled={request.params.length === 1}
                    className="h-9 w-9 p-0 flex-shrink-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {showJsonBody && (
          <div className="space-y-4">
            <Label className="text-sm font-medium">Body JSON</Label>
            <Textarea
              placeholder='{\n  "key": "value",\n  "data": "example"\n}'
              value={request.body}
              onChange={(e) => onUpdate({ body: e.target.value })}
              className="min-h-32 font-mono text-sm resize-none"
            />
          </div>
        )}

        {showBoth && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Parámetros de consulta</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addParam}
                  className="h-8 px-3 bg-transparent border-dashed"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Agregar
                </Button>
              </div>
              <div className="space-y-3">
                {request.params.map((param, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      placeholder="Clave"
                      value={param.key}
                      onChange={(e) => updateParam(index, "key", e.target.value)}
                      className="flex-1 h-9"
                    />
                    <Input
                      placeholder="Valor"
                      value={param.value}
                      onChange={(e) => updateParam(index, "value", e.target.value)}
                      className="flex-1 h-9"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeParam(index)}
                      disabled={request.params.length === 1}
                      className="h-9 w-9 p-0 flex-shrink-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-medium">Body JSON</Label>
              <Textarea
                placeholder='{\n  "key": "value",\n  "data": "example"\n}'
                value={request.body}
                onChange={(e) => onUpdate({ body: e.target.value })}
                className="min-h-32 font-mono text-sm resize-none"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
