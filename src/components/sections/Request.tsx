import { useAPIContext } from "../../contexts/ApiContext";

export default function Request() {

    const { request } = useAPIContext();

    return (
        <section className="w-[55%] max-sm:w-full h-full flex flex-col p-4 bg-amber-700">
            <button type="button" onClick={request}>Send</button>
        </section>
    );
}