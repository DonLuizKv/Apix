import { createContext, useContext, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

interface Props {
    request: (method: string, url: string, headers?: Record<string, string>, body?: string) => Promise<void>;
    data: any;
    loading: boolean;
    error: string | null;
}

const APIContext = createContext<Props | null>(null);

export const useAPIContext = () => {
    const context = useContext(APIContext);
    if (!context) {
        throw new Error("useAPI must be used within a APIProvider");
    }
    return context;
};

export default function APIProvider({ children }: { children: React.ReactNode }) {

    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const request = async (method: string, url: string, headers?: Record<string, string>, body?: string) => {
        setLoading(true)
        setError(null)

        try {
            // Transform headers object to array of tuples for Rust backend
            const headersList = headers ? Object.entries(headers) : null;

            const response = await invoke<any>("request", {
                request: {
                    method,
                    url,
                    headers: headersList,
                    body
                }
            });

            console.log(response)

            setData(response)
        } catch (err: any) {
            setError(err?.toString() ?? "Error desconocido")
        } finally {
            setLoading(false)
        }
    }

    return (
        <APIContext.Provider value={{ request, data, loading, error }}>
            {children}
        </APIContext.Provider>
    );
}
