import { useState, useCallback } from 'react'
import { invoke } from '@tauri-apps/api/core'
import type { HttpMethod, ResponseData } from '../types'
import { useAlert } from '../contexts/AlertContext';
import { getCurrentWindow, PhysicalPosition } from "@tauri-apps/api/window";

interface UseApiReturn {
    response: ResponseData | null
    isLoading: boolean
    error: string | null
    sendRequest: (params: {
        method: HttpMethod
        url: string
        headers: Record<string, string>
        body: string
    }) => Promise<void>
    clearResponse: () => void
}

// ---------------------------
// ⭐ Animaciones Tauri 2.0
// ---------------------------

async function bounceWindow() {
    const win = getCurrentWindow();
    const start = await win.outerPosition();
    const duration = 80; // ms
    const height = 20;
    const steps = 15;

    // Up
    for (let i = 1; i <= steps; i++) {
        const progress = i / steps;
        // Ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const yOffset = height * ease;
        await win.setPosition(new PhysicalPosition(start.x, Math.round(start.y - yOffset)));
        await new Promise(r => setTimeout(r, duration / steps));
    }

    // Down
    for (let i = 1; i <= steps; i++) {
        const progress = i / steps;
        // Ease in cubic
        const ease = Math.pow(progress, 3);
        const yOffset = height * (1 - ease);
        await win.setPosition(new PhysicalPosition(start.x, Math.round(start.y - yOffset)));
        await new Promise(r => setTimeout(r, duration / steps));
    }
    // Ensure back to start
    await win.setPosition(new PhysicalPosition(start.x, start.y));
}

async function shakeWindow() {
    const win = getCurrentWindow();
    const start = await win.outerPosition();
    const duration = 400;
    const steps = 30;
    const magnitude = 10;

    for (let i = 0; i <= steps; i++) {
        const progress = i / steps;
        // Damped sine wave: sin(x) * (1-x)
        // 3 full cycles (6 * PI)
        const offset = Math.sin(progress * Math.PI * 6) * magnitude * (1 - progress);
        await win.setPosition(new PhysicalPosition(Math.round(start.x + offset), start.y));
        await new Promise(r => setTimeout(r, duration / steps));
    }
    await win.setPosition(new PhysicalPosition(start.x, start.y));
}

export function useApi(): UseApiReturn {
    const [response, setResponse] = useState<ResponseData | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { showAlert } = useAlert()

    const clearResponse = useCallback(() => {
        setResponse(null)
        setError(null)
    }, [])

    const sendRequest = useCallback(async ({
        method,
        url,
        headers,
        body
    }: {
        method: HttpMethod
        url: string
        headers: Record<string, string>
        body: string
    }) => {
        if (!url) {
            showAlert('error', 'Please enter a URL')
            return
        }

        setIsLoading(true)
        setResponse(null)
        setError(null)

        try {
            // Clean empty headers
            const cleanHeaders = Object.entries(headers).reduce((acc, [key, value]) => {
                if (key.trim()) {
                    acc[key] = value
                }
                return acc
            }, {} as Record<string, string>)

            let parsedBody = null
            if (['POST', 'PUT', 'PATCH'].includes(method) && body) {
                try {
                    parsedBody = JSON.parse(body)
                } catch (e) {
                    showAlert('error', 'The body must be a valid JSON')
                    setIsLoading(false)
                    return
                }
            }

            const res = await invoke<ResponseData>('send_request', {
                method,
                url,
                headers: cleanHeaders,
                body: parsedBody,
            })

            setResponse(res)

            showAlert('success', 'Request completed')

            // ✅ Animación de éxito
            await bounceWindow()

        } catch (err) {
            console.error('Error sending request:', err)
            const errorMessage = typeof err === 'string' ? err : (err as Error).message || 'Unknown error'

            setError(errorMessage)
            setResponse({
                status: 0,
                statusText: 'Error',
                time: 0,
                headers: {},
                body: { error: errorMessage }
            })

            showAlert('error', `Error sending request: ${errorMessage}`)

            // ❌ Animación de error
            await shakeWindow()

        } finally {
            setIsLoading(false)
        }
    }, [showAlert])

    return {
        response,
        isLoading,
        error,
        sendRequest,
        clearResponse
    }
}
