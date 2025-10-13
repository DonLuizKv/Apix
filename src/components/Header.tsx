"use client"

interface HeaderProps {
  activeTab: "http" | "websocket"
  onTabChange: (tab: "http" | "websocket") => void
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <div className="h-14 border-b border-border flex items-center px-6">
      <div className="flex gap-1 rounded-lg p-1">
        <button
          onClick={() => onTabChange("http")}
          className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${
            activeTab === "http"
              ? "bg-primary text-background shadow-lg shadow-primary/20"
              : "text-foreground-muted hover:text-foreground hover:bg-border"
          }`}
        >
          HTTP
        </button>
        <button
          onClick={() => onTabChange("websocket")}
          className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${
            activeTab === "websocket"
              ? "bg-primary text-background shadow-lg shadow-primary/20"
              : "text-foreground-muted hover:text-foreground hover:bg-border"
          }`}
        >
          WebSocket
        </button>
      </div>
    </div>
  )
}
