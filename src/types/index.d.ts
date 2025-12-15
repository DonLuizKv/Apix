

// collections
export type collection = {
    name: string;
    endpoints: {
        name: string;
        method: HttpMethod;
    }[];
}

// API
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export type Request = {
    id: string;
    name: string;
    method: HttpMethod;
    endpoint: string;
    headers?: Record<string, string>;
    body?: any;
    createdAt: string;
}

export type Response = {
    status: number;
    statusText: string;
    time: number;
    headers: Record<string, string>[];
    body: any;
}