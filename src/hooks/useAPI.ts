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

        showAlert('info', 'Request sent');
    }

    return {
        Request,
        response,
        isLoading,
        error
    }
}