// src/hooks/useTheme.ts
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        // Detectar tema inicial del sistema
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });

    useEffect(() => {
        const root = document.documentElement;

        if (theme === "dark") {
            root.style.setProperty("--background", "#1e1e1e");
            root.style.setProperty("--foreground", "#ededed");
        } else {
            root.style.setProperty("--background", "#ededed");
            root.style.setProperty("--foreground", "#131313");
        }
    }, [theme]);

    const toggleTheme = () =>
        setTheme((prev) => (prev === "light" ? "dark" : "light"));

    return { theme, toggleTheme };
}
