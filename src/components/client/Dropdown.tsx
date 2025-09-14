import { useState } from "react";
import { HTTPMethods } from "./Config";

const methods = [
    {
        value: "GET",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#3AB354" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-http-get"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 8h-2a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2v-4h-1" /> <path d="M14 8h-4v8h4" /><path d="M10 12h2.5" /><path d="M17 8h4" /> <path d="M19 8v8" /> </svg>
        ),
    },
    {
        value: "POST",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={32} height={24} viewBox="0 0 32 24" fill="none" stroke="#4670B4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-http-post"> <path stroke="none" d="M0 0h36v24H0z" fill="none" /> <path d="M3 12h2a2 2 0 1 0 0 -4h-2v8" /> <path d="M12 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2" /> <path d="M17 15a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-2a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1" /> <path d="M24.3 8h4.6" /> <path d="M26.6 8v8" /> </svg>
        ),
    },
    {
        value: "PUT",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#AD46B4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-http-put"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 12h2a2 2 0 1 0 0 -4h-2v8" /><path d="M17 8h4" /> <path d="M19 8v8" /><path d="M10 8v6a2 2 0 1 0 4 0v-6" /> </svg>
        ),
    },
    {
        value: "DELETE",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="24" viewBox="0 0 46 24" fill="none" stroke="#B33A3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-http-delete"> <path stroke="none" d="M0 0h45v24H0z" fill="none" /> <path d="M2 8v8h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2z" /> <path d="M10 8v8" /> <path d="M10.5 8h2" /> <path d="M10.5 12h1.5" /> <path d="M10.5 16h2" /> <path d="M16 8v8h2.5" /> <path d="M22 8v8" /> <path d="M23 8h2" /> <path d="M23 12h1.5" /> <path d="M23 16h2" /> <path d="M28 8h3" /> <path d="M29.5 8v8" /> <path d="M34.5 8v8" /> <path d="M36 8h2" /> <path d="M36 12h1.5" /> <path d="M36 16h2" /> </svg>
        ),
    },
];


type DropdownProps = {
    onSelect: (value: HTTPMethods) => void;
};

export default function Dropdown({ onSelect }: DropdownProps) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(methods[0]);

    return (
        <div className="flex items-center gap-4 ">
            {/* Dropdown */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="w-[6rem] flex items-center gap-2 justify-between px-3 py-2 rounded-lg bg-white/10 transition"
                >
                    {selected.icon}
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>

                {open && (
                    <div className="absolute mt-2 w-24 border rounded-lg shadow-lg z-50">
                        {methods.map((m) => (
                            <button
                                key={m.value}
                                onClick={() => {
                                    setSelected(m);
                                    setOpen(false);
                                    onSelect(m.value as HTTPMethods);
                                }}
                                className="flex items-center justify-start gap-2 w-full px-4 py-2 transition "
                            >
                                {m.icon}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
