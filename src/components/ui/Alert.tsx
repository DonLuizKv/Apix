import { X } from "lucide-react";
import { useMemo } from "react";

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
    type: AlertType;
    message: string;
    title?: string;
    duration?: number; // Nueva prop
    onClose?: () => void;
}

export default function Alert({ type, message, title, duration = 3000, onClose }: AlertProps) {

    const styles = useMemo(() => {
        const baseColors = {
            success: { text: 'text-[#3AB354]', bg: 'bg-[#3AB354]/10', badge: 'bg-[#3AB354]/20 text-[#3AB354] dark:text-[#3AB354]', border: 'border-[#3AB354]/30' },
            error: { text: 'text-[#B33A3A]', bg: 'bg-[#B33A3A]/10', badge: 'bg-[#B33A3A]/20 text-[#B33A3A] dark:text-[#B33A3A]', border: 'border-[#B33A3A]/30' },
            warning: { text: 'text-[#C6971E]', bg: 'bg-[#C6971E]/10', badge: 'bg-[#C6971E]/20 text-[#C6971E] dark:text-[#C6971E]', border: 'border-[#C6971E]/30' },
            info: { text: 'text-[#4670B4]', bg: 'bg-[#4670B4]/10', badge: 'bg-[#4670B4]/20 text-[#4670B4] dark:text-[#4670B4]', border: 'border-[#4670B4]/30' },
        };
        return baseColors[type];
    }, [type]);

    const getLabel = () => {
        if (title) return title;
        switch (type) {
            case 'success': return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="#3AB354" className="icon icon-tabler icons-tabler-filled icon-tabler-mood-happy"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-2 9.66h-6a1 1 0 0 0 -1 1v.05a3.975 3.975 0 0 0 3.777 3.97l.227 .005a4.026 4.026 0 0 0 3.99 -3.79l.006 -.206a1 1 0 0 0 -1 -1.029zm-5.99 -5l-.127 .007a1 1 0 0 0 .117 1.993l.127 -.007a1 1 0 0 0 -.117 -1.993zm6 0l-.127 .007a1 1 0 0 0 .117 1.993l.127 -.007a1 1 0 0 0 -.117 -1.993z" /></svg>;
            case 'error': return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="#B33A3A" className="icon icon-tabler icons-tabler-filled icon-tabler-mood-angry"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10 -10 10a10 10 0 1 1 0 -20m0 12a4.5 4.5 0 0 0 -3.214 1.35a1 1 0 1 0 1.428 1.4a2.5 2.5 0 0 1 3.572 0a1 1 0 0 0 1.428 -1.4a4.5 4.5 0 0 0 -3.214 -1.35m-3.553 -5.895a1 1 0 0 0 -.894 1.788l2 1a1 1 0 0 0 .894 -1.788zm8.447 .447a1 1 0 0 0 -1.341 -.447l-2 1a1 1 0 0 0 .894 1.788l2 -1a1 1 0 0 0 .447 -1.341" /></svg>;
            case 'warning': return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="#C6971E" className="icon icon-tabler icons-tabler-filled icon-tabler-exclamation-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-5 11.66a1 1 0 0 0 -1 1v.01a1 1 0 0 0 2 0v-.01a1 1 0 0 0 -1 -1m0 -7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0 -1 -1" /></svg>;
            case 'info': return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="#4670B4" className="icon icon-tabler icons-tabler-filled icon-tabler-mood-neutral"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-7.99 5.66l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm6 0l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z" /></svg>;
        }
    };

    return (
        <div className="group relative inline-flex items-center justify-center rounded-full shadow-lg backdrop-blur-sm slide-in-from-right">
            <div className={`absolute inset-0 rounded-full border ${styles.border} opacity-30`} />
            <div
                className={`absolute inset-0 rounded-full border ${styles.border}`}
                style={{
                    transition: duration > 0 ? `clip-path ${duration}ms linear` : 'none',
                    clipPath: 'inset(0 0 0 0)',
                    animation: duration > 0 ? `border-wipe ${duration}ms linear forwards` : 'none'
                }}
            />
            <div className={`relative flex items-center gap-2 p-1 pe-2 ${styles.text} ${styles.bg} rounded-full`}>
                {getLabel()}
                <div className="text-sm font-medium whitespace-nowrap">
                    {message}
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="p-0.5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors z-10"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                )}
            </div>
        </div>
    );
};
