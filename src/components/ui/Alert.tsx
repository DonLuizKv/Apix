import { memo } from 'react';
import { IconExclamationCircleFilled, IconInfoCircleFilled, IconMoodAngryFilled, IconMoodHappyFilled, IconX } from '@tabler/icons-react';
import { useAlert, AlertType, AlertData } from '../../contexts/AlertContext';

const ALERT_STYLES: Record<AlertType, { text: string; bg: string; border: string }> = {
    success: {
        text: 'text-[#3AB354]',
        bg: 'bg-[#3AB354]/10',
        border: 'border-[#3AB354]/30',
    },
    error: {
        text: 'text-[#B33A3A]',
        bg: 'bg-[#B33A3A]/10',
        border: 'border-[#B33A3A]/30',
    },
    warning: {
        text: 'text-[#C6971E]',
        bg: 'bg-[#C6971E]/10',
        border: 'border-[#C6971E]/30',
    },
    info: {
        text: 'text-[#4670B4]',
        bg: 'bg-[#4670B4]/10',
        border: 'border-[#4670B4]/30',
    },
};

const AlertIcon = memo(({ type }: { type: AlertType }) => {
    switch (type) {
        case 'success':
            return <IconMoodHappyFilled color='#3AB354' size={24} />;
        case 'error':
            return <IconMoodAngryFilled color='#B33A3A' size={24} />;
        case 'warning':
            return <IconExclamationCircleFilled color='#C6971E' size={24} />;
        case 'info':
            return <IconInfoCircleFilled color='#4670B4' size={24} />;
    }
});

const AlertItem = memo(({ alert, onClose }: { alert: AlertData; onClose: (id: string) => void }) => {
    const styles = ALERT_STYLES[alert.type];

    return (
        <div className="group relative inline-flex items-center justify-center rounded-full shadow-lg backdrop-blur-sm slide-in-from-right pointer-events-auto transition-transform hover:scale-[1.03]">
            <div className={`absolute inset-0 rounded-full border ${styles.border} opacity-30`} />
            <div
                className={`absolute inset-0 rounded-full border ${styles.border}`}
                style={{
                    transition: alert.duration > 0 ? `clip-path ${alert.duration}ms linear` : 'none',
                    clipPath: 'inset(0 0 0 0)',
                    animation: alert.duration > 0 ? `border-wipe ${alert.duration}ms linear forwards` : 'none',
                }}
            />

            <div className={`relative flex items-center gap-2 p-1 pe-2 ${styles.text} ${styles.bg} rounded-full`}>
                <AlertIcon type={alert.type} />
                <span className="text-sm font-medium whitespace-nowrap select-none">{alert.message}</span>
                <button
                    onClick={() => onClose(alert.id)}
                    className="p-0.5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors z-10 cursor-pointer"
                    aria-label="Close alert"
                >
                    <IconX size={15} />
                </button>
            </div>
        </div>
    );
});

export default function Alert() {
    const { alerts, removeAlert } = useAlert();

    if (alerts.length === 0) return null;

    return (
        <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 items-start pointer-events-none">
            {alerts.map((alert) => (
                <AlertItem key={alert.id} alert={alert} onClose={removeAlert} />
            ))}
        </div>
    );
}
