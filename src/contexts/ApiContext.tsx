import { createContext, useContext, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

interface Props {
    request: () => Promise<void>;
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

    const request = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await invoke<any>("get_api");

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
