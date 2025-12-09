import { IconChevronRight, IconHttpGet, IconHttpPost, IconHttpPut, IconHttpDelete, IconHttpHead, IconHttpOptions, IconHttpPatch } from "@tabler/icons-react";
import { JSX, useState } from "react";
import { HttpMethod } from "../../types";

interface Props {
    name: string;
    endpoints: {
        name: string;
        method: HttpMethod;
    }[];
}

const icons: Record<HttpMethod, JSX.Element> = {
    GET: <IconHttpGet size={24} stroke={2} color="#51d66b" />,
    POST: <IconHttpPost size={24} stroke={2} color="#6ac2fd" />,
    PUT: <IconHttpPut size={24} stroke={2} color="#ad6eeb" />,
    PATCH: <IconHttpPatch size={24} stroke={2} color="#f1bd55" />,
    DELETE: <IconHttpDelete size={24} stroke={2} color="#d84848" />,
    HEAD: <IconHttpHead size={24} stroke={2} color="#e75c3a" />,
    OPTIONS: <IconHttpOptions size={24} stroke={2} color="#d242b8" />,
}

export default function CollectionItem({ name, endpoints }: Props) {

    const [open, setOpen] = useState<boolean>(false);

    const handleToggle = () => setOpen(!open);

    return (
        <div className="group">
            <button type="button" className="flex items-center gap-2.5 py-1 px-4 group" onClick={handleToggle}>
                <IconChevronRight size={22} stroke={1.5} color="#737373" className={`transition-all ${open ? "rotate-90" : "rotate-0"}`} />
                <span >{name}</span>
                <span className="text-center text-[#737373] text-xs">{endpoints.length}</span>
            </button>

            <article className={`flex flex-col transition-all ${open ? "flex" : "hidden"}`}>
                {
                    endpoints.map((endpoint, i) => (
                        <button type="button" key={i} className="flex items-center gap-2 pl-8 py-2 hover:bg-border">
                            {icons[endpoint.method]}
                            <span className="text-[#737373]">-</span>
                            <span>{endpoint.name}</span>
                        </button>
                    ))
                }
            </article>
        </div>
    );
}