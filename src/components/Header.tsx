
import { useState } from 'react'
import { Maximize2, Minimize2, Minus, Settings, X } from 'lucide-react'
import { SettingsModal } from './Settings'
import { getCurrentWindow } from '@tauri-apps/api/window'

export function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
  const window = getCurrentWindow();
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMinimize = () => {
    window.minimize()
  }

  const handleMaximize = async () => {
    const isMaximized = await window.isMaximized()
    if (isMaximized) {
      window.unmaximize()
      setIsMinimized(true)
    } else {
      window.maximize()
      setIsMinimized(false)
    }
  }

  const handleClose = () => {
    window.close()
  }

  return (
    <header data-tauri-drag-region className="flex items-center justify-between border-b border-border bg-card p-2">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="white" className="icon icon-tabler icons-tabler-filled icon-tabler-affiliate"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18.5 3a2.5 2.5 0 1 1 -.912 4.828l-4.556 4.555a5.475 5.475 0 0 1 .936 3.714l2.624 .787a2.5 2.5 0 1 1 -.575 1.916l-2.623 -.788a5.5 5.5 0 0 1 -10.39 -2.29l-.004 -.222l.004 -.221a5.5 5.5 0 0 1 2.984 -4.673l-.788 -2.624a2.498 2.498 0 0 1 -2.194 -2.304l-.006 -.178l.005 -.164a2.5 2.5 0 1 1 4.111 2.071l.787 2.625a5.475 5.475 0 0 1 3.714 .936l4.555 -4.556a2.487 2.487 0 0 1 -.167 -.748l-.005 -.164l.005 -.164a2.5 2.5 0 0 1 2.495 -2.336z" /></svg>
          <h1 className="font-bold text-white text-2xl">APIX</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type='button'
          onClick={() => setIsSettingsOpen(true)}
          className="group relative flex h-4 w-4 items-center justify-center rounded-full bg-primary shadow-sm transition-all duration-200 ease-out hover:scale-110 hover:bg-primary/80 active:scale-95"
        >
          <Settings size={10} strokeWidth={3} className="text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </button>

        <hr className="h-5 border border-border" />

        <nav className="flex items-center gap-2 pr-2">
          <button
            type='button'
            onClick={handleMinimize}
            className="group relative flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 shadow-sm transition-all duration-200 ease-out hover:scale-110 hover:bg-blue-600 active:scale-95"
          >
            <Minus size={10} strokeWidth={3} className="text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </button>

          <button
            type='button'
            onClick={handleMaximize}
            className="group relative flex h-4 w-4 items-center justify-center rounded-full bg-green-500 shadow-sm transition-all duration-200 ease-out hover:scale-110 hover:bg-green-600 active:scale-95"
          >
            {
              isMinimized ? (
                <Maximize2 size={10} strokeWidth={3} className="text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              ) : (
                <Minimize2 size={10} strokeWidth={3} className="text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              )
            }
          </button>

          <button
            type='button'
            onClick={handleClose}
            className="group relative flex h-4 w-4 items-center justify-center rounded-full bg-red-500 shadow-sm transition-all duration-200 ease-out hover:scale-110 hover:bg-red-600 active:scale-95"
          >
            <X size={10} strokeWidth={3} className="text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </button>

        </nav>
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </header>
  )
}
