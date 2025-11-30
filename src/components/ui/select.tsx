import * as React from "react"
import { ChevronDown } from "lucide-react"

const SelectContext = React.createContext<{
    value: string
    onValueChange: (value: string) => void
    open: boolean
    setOpen: (open: boolean) => void
} | null>(null)

export const Select = ({ value, onValueChange, children }: { value: string, onValueChange: (value: string) => void, children: React.ReactNode }) => {
    const [open, setOpen] = React.useState(false)
    return (
        <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
            <div className="relative">{children}</div>
        </SelectContext.Provider>
    )
}

export const SelectTrigger = ({ className = "", children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const context = React.useContext(SelectContext)
    if (!context) throw new Error("SelectTrigger must be used within Select")
    const { open, setOpen } = context

    return (
        <button
            type="button"
            onClick={() => setOpen(!open)}
            className={`flex gap-2 h-9 w-28.5 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
        >
            {children}
            <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
    )
}

export const SelectValue = ({ placeholder, className }: { placeholder?: string, className?: string }) => {
    const context = React.useContext(SelectContext)
    if (!context) throw new Error("SelectValue must be used within Select")
    const { value } = context
    return <span className={className}>{value || placeholder}</span>
}

export const SelectContent = ({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    const context = React.useContext(SelectContext)
    if (!context) throw new Error("SelectContent must be used within Select")
    const { open, setOpen } = context

    if (!open) return null

    return (
        <>
            <div
                className="fixed inset-0 z-40"
                onClick={() => setOpen(false)}
            />
            <div
                className={`absolute top-full mt-2 z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-secondary text-popover-foreground shadow-md slide-in-from-top ${className}`}
                {...props}
            >
                <div className="p-1 bg-card">{children}</div>
            </div>
        </>
    )
}

export const SelectItem = ({ value, children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement> & { value: string }) => {
    const context = React.useContext(SelectContext)
    if (!context) throw new Error("SelectItem must be used within Select")
    const { onValueChange, setOpen } = context

    return (
        <div
            onClick={(e) => {
                e.stopPropagation()
                onValueChange(value)
                setOpen(false)
            }}
            className={`relative flex w-full select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm font-semibold outline-none hover:bg-border data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}
