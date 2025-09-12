interface HTTP_props {
    url: string,
}

export default function HTTP({ url }: HTTP_props) {
    return (
        <section className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
            <div className="flex items-center text-gray-500">
                <select name="" id="">
                    <option value="GET">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-http-get">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 8h-2a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2v-4h-1" />
                            <path d="M14 8h-4v8h4" /><path d="M10 12h2.5" /><path d="M17 8h4" />
                            <path d="M19 8v8" />
                        </svg>
                    </option>

                    <option value="POST">
                        <svg xmlns="http://www.w3.org/2000/svg" width={36} height={24} viewBox="0 0 24 24" fill="none" stroke="blue" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-http-post">
                            <path stroke="none" d="M0 0h36v24H0z" fill="none" />
                            <path d="M3 12h2a2 2 0 1 0 0 -4h-2v8" />
                            <path d="M12 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2" />
                            <path d="M17 15a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-2a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1" />
                            <path d="M24.3 8h4.6" />
                            <path d="M26.6 8v8" />
                        </svg>
                    </option>

                    <option value="PUT">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="purple" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-http-put">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 12h2a2 2 0 1 0 0 -4h-2v8" /><path d="M17 8h4" />
                            <path d="M19 8v8" /><path d="M10 8v6a2 2 0 1 0 4 0v-6" />
                        </svg>
                    </option>

                    <option value="DELETE">
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="24" viewBox="0 0 45 24" fill="none" stroke="#b33a3a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-http-delete">
                            <path stroke="none" d="M0 0h45v24H0z" fill="none" />
                            <path d="M2 8v8h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2z" />
                            <path d="M10 8v8" />
                            <path d="M10.5 8h2" />
                            <path d="M10.5 12h1.5" />
                            <path d="M10.5 16h2" />
                            <path d="M16 8v8h2.5" />
                            <path d="M22 8v8" />
                            <path d="M22 8h2" />
                            <path d="M22 12h1.5" />
                            <path d="M22 16h2" />
                            <path d="M28 8h3" />
                            <path d="M29.5 8v8" />
                            <path d="M35 8v8" />
                            <path d="M35 8h2" />
                            <path d="M35 12h1.5" />
                            <path d="M35 16h2" />
                        </svg>
                    </option>
                </select>
                
                <input type="text" placeholder="ruta" />
            </div>
        </section>
    );
}