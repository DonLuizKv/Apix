import React, { createContext, useContext, useState, useCallback } from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertData {
    id: string;
    type: AlertType;
    title?: string;
    message: string;
    duration: number;
}

interface AlertContextType {
    alerts: AlertData[];
    showAlert: (type: AlertType, message: string, title?: string, duration?: number) => void;
    removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
    const [alerts, setAlerts] = useState<AlertData[]>([]);

    const removeAlert = useCallback((id: string) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, []);

    const showAlert = useCallback(
        (type: AlertType, message: string, title?: string, duration = 5000) => {
            const id = Math.random().toString(36).substring(2, 9);
            const newAlert: AlertData = { id, type, title, message, duration };

            setAlerts((prev) => [...prev, newAlert]);

            if (duration > 0) {
                setTimeout(() => {
                    removeAlert(id);
                }, duration);
            }
        },
        [removeAlert]
    );

    return (
        <AlertContext.Provider value={{ alerts, showAlert, removeAlert }}>
            {children}
        </AlertContext.Provider>
    );
}

export function useAlert() {
    const context = useContext(AlertContext);
    if (context === undefined) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
}
