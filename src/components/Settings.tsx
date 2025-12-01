// import { useState } from 'react'
import { X } from 'lucide-react'
// import { Button } from './ui/button'
// import { Input } from './ui/input'
// import { Label } from './ui/label'
// import { Switch } from './ui/switch'
// import { useAlert } from '../contexts/AlertContext'
// import type { Settings } from '../types'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  // const { showAlert } = useAlert()
  // const [settings, setSettings] = useState<Settings>(() => {
  //   if (typeof window !== 'undefined') {
  //     const saved = localStorage.getItem('apix-settings')
  //     return saved
  //       ? JSON.parse(saved)
  //       : {
  //         theme: 'dark',
  //         timeout: 30000,
  //         enableLogs: false,
  //         enableProxy: false,
  //         globalHeaders: {},
  //       }
  //   }
  //   return {
  //     theme: 'dark',
  //     timeout: 30000,
  //     enableLogs: false,
  //     enableProxy: false,
  //     globalHeaders: {},
  //   }
  // })

  // const handleSave = () => {
  //   localStorage.setItem('apix-settings', JSON.stringify(settings))
  //   showAlert('success', 'Configuraciones guardadas correctamente')
  //   onClose()
  // }

  // const handleClearCache = () => {
  //   localStorage.removeItem('apix-collections')
  //   showAlert('success', 'Cache limpiado correctamente')
  // }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-2xl flex items-center justify-center z-50 slide-in-from-top">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-[25rem] mx-4">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Configuraciones</h2>
          <button type='button' onClick={onClose} className="group relative flex h-4 w-4 items-center justify-center rounded-full bg-error shadow-sm transition-all duration-200 ease-out hover:scale-125 active:scale-95">
            <X size={10} strokeWidth={3} className="text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </button>
        </div>

        {/* <div className="px-6 py-4 space-y-6">
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

          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Limpieza de datos
              </Label>
              <Button
                onClick={handleClearCache}
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                Limpiar colecciones guardadas
              </Button>
            </div>
          </div>
        </div> */}

        <p className="text-center text-muted-foreground py-6">Coming soon...</p>

        {/* <div className="flex justify-end gap-3 p-6 border-t border-border">
          <Button className="bg-primary hover:bg-primary/90">
            ok
          </Button>
        </div> */}
      </div>
    </div>
  )
}
