import { IconMinus, IconX, IconTopologyStarRing2, IconPinFilled, IconPin, IconSettings2, IconArrowsDiagonal, IconArrowsDiagonalMinimize2 } from '@tabler/icons-react';
import { useWindow } from '../../contexts/useWindow';

export default function Header() {

    const { Minimize, Maximize, AlwaysOnTop, isMaximized, isAlwaysOnTop, Close } = useWindow();

    return (
        <header
            data-tauri-drag-region
            className="flex items-center justify-between border-b border-border px-1.5 py-1.5"
        >
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center gap-1">
                    <IconTopologyStarRing2 size={26} stroke={1.5} color="white" />
                    <h1 className="font-semibold text-white text-xl">APIX</h1>
                </div>
            </div>

            <nav className="flex items-center gap-2">

                <div className="flex items-center gap-2">
                    <button type="button" onClick={AlwaysOnTop} className={`group relative flex items-center justify-center h-4 w-4 rounded-full bg-secondary shadow-sm transition-all duration-200 ease-out hover:scale-125 active:scale-95 ${isAlwaysOnTop ? 'scale-125' : 'scale-95'}`}>
                        {
                            isAlwaysOnTop ?
                                <IconPinFilled size={10} stroke={3} />
                                :
                                <IconPin size={10} stroke={3} className='opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out' />
                        }
                    </button>

                    <button type="button" onClick={() => { }} className="group relative flex items-center justify-center h-4 w-4 rounded-full bg-primary shadow-sm transition-all duration-200 ease-out hover:scale-125 active:scale-95">
                        <IconSettings2 size={10} stroke={3} className="opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out" />
                    </button>
                </div>

                <hr className="h-5 border border-border" />

                <div className="flex items-center gap-2 pr-2">
                    <button type="button" onClick={Minimize} className="group relative flex items-center justify-center h-4 w-4 rounded-full bg-neutral shadow-sm transition-all duration-200 ease-out hover:scale-125 active:scale-95">
                        <IconMinus size={10} stroke={3} className="opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out" />
                    </button>

                    <button type='button' onClick={Maximize} className="group relative flex items-center justify-center h-4 w-4 rounded-full bg-good shadow-sm transition-all duration-200 ease-out hover:scale-125 active:scale-95">
                        {
                            isMaximized ?
                                <IconArrowsDiagonalMinimize2 size={10} stroke={3} className="opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out" />
                                :
                                <IconArrowsDiagonal size={10} stroke={3} className="opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out" />
                        }
                    </button>

                    <button type="button" onClick={Close} className="group relative flex items-center justify-center h-4 w-4 rounded-full bg-error shadow-sm transition-all duration-200 ease-out hover:scale-125 active:scale-95">
                        <IconX size={10} stroke={3} className="opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out" />
                    </button>
                </div>
            </nav>
        </header>
    );
}
