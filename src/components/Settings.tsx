import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { useAlert } from '../contexts/AlertContext'
import type { Settings } from '../types'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { showAlert } = useAlert()
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('apix-settings')
      return saved
        ? JSON.parse(saved)
        : {
          theme: 'dark',
          timeout: 30000,
          enableLogs: false,
          enableProxy: false,
          globalHeaders: {},
        }
    }
    return {
      theme: 'dark',
      timeout: 30000,
      enableLogs: false,
      enableProxy: false,
      globalHeaders: {},
    }
  })

  const handleSave = () => {
    localStorage.setItem('apix-settings', JSON.stringify(settings))
    showAlert('success', 'Configuraciones guardadas correctamente')
    onClose()
  }

  const handleClearCache = () => {
    localStorage.removeItem('apix-collections')
    showAlert('success', 'Cache limpiado correctamente')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-2xl flex items-center justify-center z-50 slide-in-from-top">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-xl mx-4">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Configuraciones</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Timeout */}
          <div className="space-y-2">
            <Label htmlFor="timeout" className="text-sm font-medium text-foreground">
              Timeout de peticiones (ms)
            </Label>
            <Input
              id="timeout"
              type="number"
              value={settings.timeout}
              onChange={(e) =>
                setSettings({ ...settings, timeout: parseInt(e.target.value) })
              }
              className="bg-secondary border-border"
            />
          </div>

          {/* Enable Logs */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium text-foreground">
                Activar logs en consola
              </Label>
              <p className="text-xs text-muted-foreground">
                Muestra información de debug en la consola del navegador
              </p>
            </div>
            <Switch
              checked={settings.enableLogs}
              onCheckedChange={(checked: boolean) =>
                setSettings({ ...settings, enableLogs: checked })
              }
            />
          </div>

          {/* Enable Proxy */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium text-foreground">Habilitar proxy</Label>
              <p className="text-xs text-muted-foreground">
                Usar proxy para peticiones (requiere configuración adicional)
              </p>
            </div>
            <Switch
              checked={settings.enableProxy}
              onCheckedChange={(checked: boolean) =>
                setSettings({ ...settings, enableProxy: checked })
              }
            />
          </div>

          {/* Clear Cache */}
          <div className="pt-4 border-t border-border">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Limpieza de datos
              </Label>
              <Button
                onClick={handleClearCache}
                variant="outline"
                className="w-full border-destructive text-destructive hover:bg-destructive/10"
              >
                Limpiar colecciones guardadas
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            Guardar
          </Button>
        </div>
      </div>
    </div>
  )
}
