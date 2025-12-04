import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './globals.css';
import App from './App.tsx';
import { AlertProvider } from '../contexts/AlertContext';
import WindowProvider from '../contexts/useWindow.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <WindowProvider>
            <AlertProvider>
                <App />
            </AlertProvider>
        </WindowProvider>
    </StrictMode>
);
