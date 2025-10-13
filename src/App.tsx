"use client"

import { useState } from "react"
import { ThemeProvider } from "./contexts/ThemeContext"
import { AppProvider } from "./contexts/AppContext"
import WindowControls from "./components/WindowControls"
import Header from "./components/Header"
import HttpPanel from "./components/HttpPanel"
import WebSocketPanel from "./components/WebSocketPanel"
import SettingsModal from "./components/SettingsModal"

function App() {
  const [activeTab, setActiveTab] = useState<"http" | "websocket">("http")
  const [showSettings, setShowSettings] = useState(false)

  return (
    <ThemeProvider>
      <AppProvider>
        <div className="h-dvh flex flex-col">
          <WindowControls onSettingsClick={() => setShowSettings(true)} />
          <Header activeTab={activeTab} onTabChange={setActiveTab} />
          {/* <main className="flex-1 overflow-hidden">
            {
              activeTab === "http" ? 
                <HttpPanel /> : <WebSocketPanel />
            }
          </main> */}
          <HttpPanel />
          {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
        </div>
      </AppProvider>
    </ThemeProvider>
  )
}

export default App
