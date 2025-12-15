import CollectionItem from "../ui/CollectionItem";
import { collection } from "../../types";

export default function Collections() {

    const collections: collection[] = [
        // {
        //     name: "Default",
        //     endpoints: [
        //         {
        //             name: "get",
        //             method: "GET"
        //         },
        //         {
        //             name: "post",
        //             method: "POST"
        //         },
        //         {
        //             name: "put",
        //             method: "PUT"
        //         },
        //         {
        //             name: "patch",
        //             method: "PATCH"
        //         },
        //         {
        //             name: "delete",
        //             method: "DELETE"
        //         },
        //         {
        //             name: "head",
        //             method: "HEAD"
        //         },
        //         {
        //             name: "options",
        //             method: "OPTIONS"
        //         }
        //     ]
        // },
        // {
        //     name: "Default 2 default default defaulr",
        //     endpoints: [
        //         {
        //             name: "get",
        //             method: "GET"
        //         },
        //         {
        //             name: "post",
        //             method: "POST"
        //         },
        //         {
        //             name: "put",
        //             method: "PUT"
        //         },
        //         {
        //             name: "patch",
        //             method: "PATCH"
        //         },
        //         {
        //             name: "delete",
        //             method: "DELETE"
        //         },
        //         {
        //             name: "head",
        //             method: "HEAD"
        //         },
        //         {
        //             name: "options",
        //             method: "OPTIONS"
        //         }
        //     ]
        // }
    ]

    return (
        <aside className="h-full w-64 flex flex-col gap-3 p-4 border-r border-border ">
            {
                collections.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-center text-gray">No collections found</p>
                    </div>
                ) : (
                    collections.map((collection, i) => (
                        <CollectionItem
                            key={i}
                            name={collection.name}
                            endpoints={collection.endpoints}
                        />
                    ))
                )
            }
        </aside>
    );
}