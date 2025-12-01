import { useAlert } from '../contexts/AlertContext';
import Alert from './ui/Alert';

export function AlertContainer() {
    const { alerts, removeAlert } = useAlert();

    if (alerts.length === 0) return null;

    return (
        <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 items-start pointer-events-none">
            {alerts.map((alert) => (
                <div key={alert.id} className="pointer-events-auto">
                    <Alert
                        type={alert.type}
                        title={alert.title}
                        message={alert.message}
                        onClose={() => removeAlert(alert.id)}
                    />
                </div>
            ))}
        </div>
    );
}
