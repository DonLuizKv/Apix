import { useState } from "react";
import { useAlert } from "../contexts/AlertContext";

export default function useAPI() {
    const [response, setResponse] = useState<null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { showAlert } = useAlert();

    const Request = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setResponse(null);
        setError(null);

        setTimeout(() => {
            setIsLoading(false);
            showAlert('success', 'Request successful');
        }, 2000);

        setTimeout(() => {
            showAlert('error', 'Request failed');
        }, 4000);

        setTimeout(() => {
            showAlert('warning', 'Request warning');
        }, 6000);

        setTimeout(() => {
            showAlert('info', 'Request info');
        }, 8000);
    }

    return {
        Request,
        response,
        isLoading,
        error
    }
}