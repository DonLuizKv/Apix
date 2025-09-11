interface HTTP_props {
    url: string,
}

export default function HTTP({ url }: HTTP_props) {
    return (
        <section className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
            <div className="flex items-center text-gray-500">
                <select name="" id="">
                    <option value="">POST</option>
                </select>
                <input type="text" placeholder="ruta"/>
            </div>
        </section>
    );
}