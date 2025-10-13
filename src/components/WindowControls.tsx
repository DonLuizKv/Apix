"use client"

import { Minus, X, Settings, Maximize, Minimize, Radio } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window"
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

interface WindowControlsProps {
  onSettingsClick: () => void
}

export default function WindowControls({ onSettingsClick }: WindowControlsProps) {
  const [maximized, setMaximized] = useState<boolean>(false);
  const { themeColor } = useTheme();
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
    <div data-tauri-drag-region className="flex items-center justify-between p-2">
      {/* Left side - Logo and Settings */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 pr-6 border-r border-white/10">
          <Radio size={30} color={themeColor} />
          <span className="text-lg font-semibold tracking-tight cursor-default">Apix</span>
        </div>

        <button
          onClick={onSettingsClick}
          className="p-2 hover:bg-surface-elevated rounded-md transition-colors"
          title="Settings"
        >
          <Settings className="w-5 h-5 text-foreground-muted hover:text-foreground transition-colors" />
        </button>
      </div>

      {/* Right side - Window Controls */}
      <div className="flex w-fit gap-1">
        <button
          onClick={handleMinimize}
          className="p-2 rounded-md hover:bg-surface-elevated  transition-colors group"
          title="Minimize"
        >
          <Minus className="w-5 h-5 text-foreground-muted group-hover:text-foreground transition-colors" />
        </button>
        <button
          onClick={handleMaximize}
          className="p-2 rounded-md hover:bg-surface-elevated  transition-colors group"
          title="Maximize"
        >
          {
            !maximized ?
              <Maximize className="w-5 h-5 text-foreground-muted group-hover:text-foreground transition-colors" />
              :
              <Minimize className="w-5 h-5 text-foreground-muted group-hover:text-foreground transition-colors" />
          }
        </button>
        <button
          onClick={handleClose}
          className="p-2 rounded-md hover:bg-error/20  transition-colors group"
          title="Close"
        >
          <X className="w-5 h-5 text-foreground-muted group-hover:text-error transition-colors" />
        </button>
      </div>
    </div>
  )
}
