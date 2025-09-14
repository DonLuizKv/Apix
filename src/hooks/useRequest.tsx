import { createContext, useContext, useState } from "react";

type Request = { url: string; method: string; route: string };
type RequestContextType = {
    request: Request | null;
    setRequest: (r: Request) => void;
};

const RequestContext = createContext<RequestContextType | null>(null);

export function RequestProvider({ children }: { children: React.ReactNode }) {
    const [request, setRequest] = useState<Request | null>(null);

    return (
        <RequestContext.Provider value={{ request, setRequest }}>
            {children}
        </RequestContext.Provider>
    );
}

// Hook para acceder
export const useRequest = () => useContext(RequestContext)!;
