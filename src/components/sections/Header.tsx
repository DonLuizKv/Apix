import { getCurrentWindow } from '@tauri-apps/api/window';
import { APIX, IconMinus, IconX, IconMaximize, IconMinimize } from "../icons/Icons";
import { useState } from 'react';

export default function Header() {
    const [maximized, setMaximized] = useState<boolean>(false);
    const window = getCurrentWindow();

    const handleMaximize = async () => {
        const isMaximized = await window.isMaximized()
        if (isMaximized) {
            window.unmaximize()
            setMaximized(false)
        } else {
            window.maximize()
            setMaximized(true)
        }
    };

    const handleMinimize = () => {
        window.minimize();
    };

    const handleClose = () => {
        window.close();
    };

    return (
        <header
            data-tauri-drag-region
            className="flex items-center justify-between border-b border-border px-1.5 py-1.5"
        >
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center gap-1">
                    <APIX size={26} stroke={1} color="white" fill={true} />
                    <h1 className="font-bold text-white text-xl">APIX</h1>
                </div>
            </div>

            <div className="flex items-center gap-3">

                <hr className="h-5 border border-border" />

                <nav className="flex items-center gap-2 pr-2">
                    <button
                        type="button"
                        onClick={handleMinimize}
                        className="group flex items-center justify-center h-4 w-4 rounded-full bg-neutral shadow-sm transition-all duration-200 ease-out hover:scale-125 active:scale-95"
                    >
                        <IconMinus size={10} stroke={3} className="opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out" />
                    </button>

                    <button
                        type='button'
                        onClick={handleMaximize}
                        className="group flex items-center justify-center h-4 w-4 rounded-full bg-good shadow-sm transition-all duration-200 ease-out hover:scale-125 active:scale-95"
                    >
                        {
                            maximized ?
                                <IconMinimize size={10} stroke={3} className="opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out" />
                            :
                                <IconMaximize size={10} stroke={3} className="opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out" />
                        }
                    </button>

                    <button
                        type="button"
                        onClick={handleClose}
                        className="group flex items-center justify-center h-4 w-4 rounded-full bg-error shadow-sm transition-all duration-200 ease-out hover:scale-125 active:scale-95"
                    >
                        <IconX size={10} stroke={3} className="opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out" />
                    </button>
                </nav>
            </div>
        </header>
    );
}
