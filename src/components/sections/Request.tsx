import { IconSend2 } from "@tabler/icons-react";
import useAPI from "../../hooks/useAPI";
import Input from "../ui/input";

export default function Request() {

    const { Request } = useAPI();

    return (
        <section className="w-full h-full flex flex-col p-2">
            <article className="">
                <form onSubmit={Request} className="flex flex-row flex-wrap gap-2">
                    <Input
                        type="text"
                        placeholder="https://api.example.com"
                        className="flex-1"
                    />
                    <Input
                        type="text"
                        placeholder="/example"
                        className="flex-1"
                    />

                    <button type="submit" className="h-9 py-1 px-5 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors">
                        <IconSend2 size={22} />
                    </button>
                </form>
            </article>
            <article>

            </article>
        </section>
    );
}