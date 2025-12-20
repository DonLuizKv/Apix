import { useAPIContext } from "../../contexts/ApiContext";

export default function Request() {

    const { request } = useAPIContext();

    const handleRequest = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const method = e.currentTarget.method;
        const url = e.currentTarget.url.value;

        request(
            method,
            url,
            {
                "Content-Type": "application/json"
            },
            ""
        );
    };

    return (
        <section className="w-[55%] max-sm:w-full h-full flex flex-col p-4">
            <form onSubmit={handleRequest}>
                <select name="method">
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
                <input type="text" name="url" className="border-input"/>
                <button type="submit">Send</button>
            </form>
        </section>
    );
}