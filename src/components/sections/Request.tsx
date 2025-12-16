import { useAPIContext } from "../../contexts/ApiContext";

export default function Request() {

    const { request } = useAPIContext();

    const handleRequest = () => {
        console.log("Hello");
        
        request(
            "GET",
            "http://localhost:400",
            {
                "Content-Type": "application/json"
            },
            ""
        );
    };

    return (
        <section className="w-[55%] max-sm:w-full h-full flex flex-col p-4 bg-amber-700">
            <button type="button" onClick={handleRequest}>Send</button>
        </section>
    );
}