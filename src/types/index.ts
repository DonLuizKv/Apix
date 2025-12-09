export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export interface Request {
    id: string;
    name: string;
    method: HttpMethod;
    endpoint: string;
    headers?: Record<string, string>;
    body?: any;
    createdAt: string;
}

export type collection = {
    name: string;
    endpoints: {
        name: string;
        method: HttpMethod;
    }[];
}

export interface ResponseData {
    status: number;
    statusText: string;
    time: number;
    headers: Record<string, string>;
    body: any;
}

export interface Settings {
    theme: 'dark' | 'light';
    timeout: number;
    enableLogs: boolean;
    enableProxy: boolean;
    globalHeaders: Record<string, string>;
}
