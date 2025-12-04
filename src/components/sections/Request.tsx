import { IconSend2 } from "@tabler/icons-react";
import useAPI from "../../hooks/useAPI";

export default function Request() {

    const { Request } = useAPI();

    return (
        <section className="w-full h-full flex flex-col p-2">
            <article>
                <form onSubmit={Request} className="flex flex-row flex-wrap gap-2">
                    
                    <button type="submit" className="py-2 px-5 bg-primary rounded-lg"><IconSend2 /></button>
                </form>
            </article>
            <article>

            </article>
        </section>
    );
}