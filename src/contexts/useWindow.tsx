"use client";

import { getCurrentWindow, Window } from "@tauri-apps/api/window";
import { createContext, useContext, useEffect, useState } from "react";

interface WindowContextProps {
    window: Window | null;
    Close: () => void;
    Minimize: () => void;
    Maximize: () => void;
    AlwaysOnTop: () => void;

    isMaximized: boolean;
    isAlwaysOnTop: boolean;
}

const windowContext = createContext<WindowContextProps | null>(null);

export const useWindow = () => {
    const context = useContext(windowContext);
    if (!context) {
        throw new Error("useWindow must be used within a WindowProvider");
    }
    return context;
};

export default function WindowProvider({ children }: { children: React.ReactNode }) {
    const [window, setWindow] = useState<Window | null>(null);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isAlwaysOnTop, setIsAlwaysOnTop] = useState(false);

    const Close = () => window?.close();
    const Minimize = () => window?.minimize();

    const Maximize = async () => {
        if (!window) return;
        const maximized = await window.isMaximized();
        if (maximized) {
            await window.unmaximize();
            setIsMaximized(false);
        } else {
            await window.maximize();
            setIsMaximized(true);
        }
    };

    const AlwaysOnTop = async () => {
        if (!window) return;
        const onTop = await window.isAlwaysOnTop();
        if (onTop) {
            await window.setAlwaysOnTop(false);
            setIsAlwaysOnTop(false);
        } else {
            await window.setAlwaysOnTop(true);
            setIsAlwaysOnTop(true);
        }
    };

    useEffect(() => {
        const init = async () => {
            const currentWindow = getCurrentWindow();
            setWindow(currentWindow);

            const maximized = await currentWindow.isMaximized();
            setIsMaximized(maximized);

            const onTop = await currentWindow.isAlwaysOnTop();
            setIsAlwaysOnTop(onTop);
        };

        init();
    }, []);

    return (
        <windowContext.Provider
            value={{
                window,
                Close,
                Minimize,
                Maximize,
                AlwaysOnTop,
                isMaximized,
                isAlwaysOnTop,
            }}>
            {children}
        </windowContext.Provider>
    );
}
