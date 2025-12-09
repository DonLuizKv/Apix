import { IconCopy, IconCopyCheck } from "@tabler/icons-react";
import { useState } from "react";
import { useAlert } from "../../contexts/AlertContext";

export default function Response() {
    const [copied, setCopied] = useState<boolean>(false);
    const { showAlert } = useAlert();

    const headers = [
        { name: 'Content-Type', value: 'application/json' },
        { name: 'Content-Type', value: 'application/json' },
        { name: 'Content-Type', value: 'application/json' },
        { name: 'Content-Type', value: 'application/json' },
    ];

    const copyHeaders = () => {
        navigator.clipboard.writeText(JSON.stringify(headers));
        setCopied(true);

        showAlert("success", "Headers copied to clipboard");

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    const copyBody = () => {
        navigator.clipboard.writeText(JSON.stringify({}));
        setCopied(true);

        showAlert("success", "Body copied to clipboard");

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    return (
        <section className="border-l border-border flex flex-col gap-2 w-full overflow-y-auto">
            <header className="p-3 flex items-center justify-around gap-2 rounded-sm border-b border-border">
                <span className="font-bold text-sm text-good">200 OK</span>
                <span className="font-bold text-sm text-good">100 ms</span>
                <span className="font-bold text-sm text-good">100 kb</span>
            </header>

            <article className="flex flex-col gap-2 px-4 py-2">
                <div className="flex items-center justify-between">
                    <h2>Headers</h2>
                    <button type="button" className="transition-all hover:text-primary" onClick={copyHeaders}>
                        {
                            copied ? (
                                <IconCopyCheck size={20} />
                            ) : (
                                <IconCopy size={20} />
                            )
                        }
                    </button>
                </div>
                <div className="flex flex-col gap-2 p-3 rounded-lg bg-card">
                    {
                        headers.map((header, index) => (
                            <span key={index} className="flex items-center gap-2">
                                <p className="text-sm font-light text-primary ">{header.name}:</p>
                                <p className="text-sm font-light ">{header.value}</p>
                            </span>
                        ))
                    }
                </div>
            </article>
            <article className="flex flex-col gap-2 px-4 py-2">
                <div className="flex items-center justify-between">
                    <h2>Body</h2>
                    <button type="button" className="transition-all hover:text-primary" onClick={copyBody}>
                        {
                            copied ? (
                                <IconCopyCheck size={20} />
                            ) : (
                                <IconCopy size={20} />
                            )
                        }
                    </button>
                </div>
                <div className="rounded-lg p-3 bg-card">

                </div>
            </article>
        </section>
    );
}