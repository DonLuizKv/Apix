import { getCurrentWindow } from "@tauri-apps/api/window"
import { useState } from "react";
import Theme from "../ui/Theme";


export default function Header() {
    const [maximized, setMaximized] = useState<boolean>(false);

    const window = getCurrentWindow();

    const handleClose = () => window.close();

    const handleMinimize = () => window.minimize();

    const handleMaximize = async () => {
        setMaximized(!maximized);

        const isMaximized = await window.isMaximized();

        isMaximized ?? setMaximized(true);

        window.toggleMaximize();

    };

    return (
        <header className="max-h-[2.5rem] flex items-stretch justify-between gap-4 border-b-[1px] border-gray-500/20">
            <h1 data-tauri-drag-region className="flex items-center justify-start gap-1.5 w-full p-1 text-xl font-semibold cursor-default">
                <img src="/directions.png" alt="logo" className="h-8 w-8"/>
                Apix
            </h1>

            <nav className="flex items-center gap-1">
                <Theme/>
                <hr className="rotate-90 w-[1rem] border-[1px] border-gray-500/20"/>
                <div className="flex h-full">
                    <button type="button" className="px-2 cursor-pointer pointer-events-auto" onClick={handleMinimize}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /></svg>
                    </button>

                    <button type="button" className="px-2 cursor-pointer pointer-events-auto" onClick={handleMaximize}>
                        {
                            maximized ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-minimize"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 19v-2a2 2 0 0 1 2 -2h2" /><path d="M15 5v2a2 2 0 0 0 2 2h2" /><path d="M5 15h2a2 2 0 0 1 2 2v2" /><path d="M5 9h2a2 2 0 0 0 2 -2v-2" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-maximize"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 8v-2a2 2 0 0 1 2 -2h2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2a2 2 0 0 0 2 -2v-2" /></svg>
                            )
                        }
                    </button>

                    <button type="button" className="px-2 cursor-pointer pointer-events-auto hover:bg-[#B33A3A]" onClick={handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                    </button>
                </div>
            </nav>
        </header>
    );
}