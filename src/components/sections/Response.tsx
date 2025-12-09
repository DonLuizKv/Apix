
export default function Response() {

    return (
        <section className={`w-full h-full flex flex-col gap-4 p-2`}>
            <header className="flex items-center justify-between rounded-sm p-2">
                <h2>Response</h2>
                <span className="rounded-full px-3 py-0.5 text-sm">200</span>
            </header>

            <article className="flex flex-col gap-2 rounded-sm p-2">
                <header>
                    <h2>Headers</h2>
                </header>
            </article>
            <article className="flex flex-col gap-2 rounded-sm p-2">
                <header>
                    <h2>Body</h2>
                </header>
            </article>
        </section>
    );
}