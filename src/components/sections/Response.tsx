import { IconCopy, IconJson, IconTrashFilled } from "@tabler/icons-react";
import { useAlert } from "../../contexts/AlertContext";
// import { useAPIContext } from "../../contexts/ApiContext";

export default function Response() {

    // const { data } = useAPIContext();
    const { showAlert } = useAlert();

    const data = {
        headers: [
            { name: 'Content-Type', value: 'application/json' },
            { name: 'Content-Type', value: 'application/json' },
            { name: 'Content-Type', value: 'application/json' },
            { name: 'Content-Type', value: 'application/json' },
        ],
        body: "",
        status: "403 Forbidden",
        time: "100ms",
        size: "100KB",
    };

    const copyHeaders = () => {
        navigator.clipboard.writeText(JSON.stringify(data.headers));

        showAlert("success", "Headers copied to clipboard");
    };

    const copyBody = () => {
        navigator.clipboard.writeText(JSON.stringify(data.body));

        showAlert("success", "Body copied to clipboard");
    };

    const clearResponse = () => {
        return "gola"
    };

    if (!data) return (
        <section className="border-l border-border flex flex-col justify-center items-center h-full w-[45%]">
            <p className="text-gray">Response Panel</p>
        </section>
    );

    return (
        <section className={`h-full w-[45%] max-sm:w-full border-l max-md:border-t border-border flex flex-col gap-2 overflow-y-auto ${data ? "slide-in-from-bottom" : ""}`}>
            <header className="py-2 px-3 flex items-center justify-between gap-2 border-b border-border">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-xs px-2.5 py-1 bg-warning rounded-full text-white">{data.status}</span>
                    <span className="font-bold text-xs text-white px-2.5 py-1">{data.time}</span>
                    <span className="font-bold text-xs text-white px-2.5 py-1">{data.size}</span>
                </div>

                <button title="Clear response" type="button" className="transition-all hover:text-primary" onClick={clearResponse}>
                    <IconTrashFilled size={20} />
                </button>
            </header>

            <article className="flex flex-col gap-2 px-4 py-2">
                <div className="flex items-center justify-between">
                    <h2>Body</h2>
                    <button type="button" className="transition-all hover:text-primary" onClick={copyBody}>
                        <IconCopy size={20} />
                    </button>
                </div>
                <div className="min-h-[200px] max-h-[300px] overflow-auto flex flex-col gap-2 p-3 rounded-lg bg-card">
                    {
                        data.body ? (
                            <span>{data.body}</span>
                        ) : (
                            <span className="flex items-center justify-center h-full w-full">
                                <p className="text-gray">No body</p>
                            </span>
                        )
                    }
                </div>
            </article>

            <article className="flex flex-col gap-2 px-4 py-2">
                <div className="flex items-center justify-between">
                    <h2>Headers</h2>
                    <button type="button" className="transition-all hover:text-primary" onClick={copyHeaders}>
                        <IconCopy size={20} />
                    </button>
                </div>
                <div className="min-h-[200px] max-h-[300px] overflow-auto flex flex-col gap-2 p-3 rounded-lg bg-card">
                    {
                        data.headers ? (
                            data.headers.map((header, index) => (
                                <span key={index} className="flex items-center gap-2">
                                    <p className="text-sm font-light text-primary ">{header.name}:</p>
                                    <p className="text-sm font-light ">{header.value}</p>
                                </span>
                            ))
                        ) : (
                            <span className="flex items-center justify-center h-full w-full">
                                <p className="text-gray">No headers</p>
                            </span>
                        )
                    }
                </div>
            </article>
        </section>
    );
}