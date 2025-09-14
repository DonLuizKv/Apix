import { useRequest } from "../../hooks/useRequest";

export default function Ouput() {

    const { request } = useRequest();

    if (!request) return <p>No data</p>

    return (
        <section className="bg-green-800 w-[50%] p-4">
            <p>URL: {request.url}</p>
            <p>Método: {request.method}</p>
            <p>Ruta: {request.route}</p>
        </section>
    );
}