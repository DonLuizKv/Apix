import { ChangeEvent, useRef, useState } from "react";
import DropdownHttpMethod from "./Dropdown";
import { useRequest } from "../../hooks/useRequest";

export type HTTPMethods = "GET" | "POST" | "PUT" | "DELETE";

export default function Config() {

    const [blockURL, setBlockURL] = useState<boolean>(false);
    const [httpMethod, setHttpMethod] = useState<HTTPMethods>("GET");

    const { setRequest } = useRequest();

    const inputURLRef = useRef<HTMLInputElement>(null);
    const inputRouteRef = useRef<HTMLInputElement>(null);

    const handleBlockURL = () => {
        setBlockURL((prev) => {
            const newValue = !prev;
            if (inputURLRef.current) {
                inputURLRef.current.disabled = newValue;
            }
            return newValue;
        });
    };

    const onsubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const routeValue = inputRouteRef.current;
        const urlValue = inputURLRef.current;
        setRequest({
            url: urlValue ? urlValue.value : "",
            method: httpMethod,
            route: routeValue ? `/${routeValue.value}` : "",
        });
    }

    return (
        <form onSubmit={onsubmit} className="h-full flex flex-col items-start justify-between bg-[#dcdcdc]/10 rounded-xl p-4">
            <div className="flex flex-col gap-6 h-full w-full">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold">URL</h1>
                    <span className="flex gap-2 items-center h-full w-full">
                        <input
                            ref={inputURLRef}
                            type="text"
                            placeholder="http://mydomain.example"
                            className="font-sans w-full p-2 border border-white/30 rounded-md focus:outline-2 outline-[#E6AF25]"
                        />

                        <button
                            onClick={handleBlockURL}
                            type="button"
                            className={`group flex items-center justify-center p-1 rounded-lg cursor-pointer ${blockURL ? "bg-[#E6AF25]" : "hover:bg-[#E6AF25]"} transition-all `}>
                            {
                                blockURL ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={blockURL ? "stroke-[#1e1e1e] " : "group-hover:stroke-[#1e1e1e]"}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" /></svg>

                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#1e1e1e]"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 11m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" /><path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M8 11v-5a4 4 0 0 1 8 0" /></svg>
                                )
                            }
                        </button>
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold">Routes</h2>
                    <span className="flex items-center gap-2">
                        <DropdownHttpMethod onSelect={setHttpMethod} />
                        <div className="ml-4 flex items-center gap-2">
                            <p className="text-3xl font-light">/</p>
                            <input
                                ref={inputRouteRef}
                                type="text"
                                placeholder="Route"
                                className="w-full p-2 border border-white/30 rounded-md focus:outline-2 outline-[#E6AF25]"
                            />
                        </div>
                    </span>
                </div>
            </div>
            <button
                type="submit"
                className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#E6AF25] text-[#1e1e1e] cursor-pointer">
                <p className="font-semibold">Send</p>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-telegram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></svg>
            </button>
        </form>
    );
}