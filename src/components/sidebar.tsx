import { useState } from 'react';
import { ChevronDown, ChevronRight, Trash2, FolderOpen } from 'lucide-react';
import { Button } from './ui/button';
import type { Collection, Request } from '../types';

interface SidebarProps {
    collections: Collection[];
    onLoadRequest: (request: Request, baseUrl: string) => void;
    onDeleteRequest: (collectionId: string, requestId: string) => void;
    onDeleteCollection: (collectionId: string) => void;
}

export function Sidebar({
    collections,
    onLoadRequest,
    onDeleteRequest,
    onDeleteCollection,
}: SidebarProps) {
    const [expandedCollections, setExpandedCollections] = useState<Set<string>>(new Set());

    const toggleCollection = (id: string) => {
        const newExpanded = new Set(expandedCollections);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedCollections(newExpanded);
    };

    const getMethodColor = (method: string) => {
        switch (method) {
            case 'GET':
                return 'text-accent';
            case 'POST':
                return 'text-primary';
            case 'PUT':
                return 'text-chart-3';
            case 'PATCH':
                return 'text-chart-4';
            case 'DELETE':
                return 'text-destructive';
            default:
                return 'text-muted-foreground';
        }
    };

    return (
        <aside className="w-72 border-r border-border bg-card overflow-y-auto max-lg:hidden">
            <div className="p-4">
                <div className="mb-4">
                    <h2 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <FolderOpen className="h-4 w-4 text-primary" />
                        Colecciones
                    </h2>
                </div>

                {collections.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                        No hay colecciones guardadas
                    </p>
                ) : (
                    <div className="space-y-1">
                        {collections.map((collection) => (
                            <div key={collection.id}>
                                <div className="flex items-center justify-between group">
                                    <button
                                        onClick={() => toggleCollection(collection.id)}
                                        className="flex items-center gap-2 flex-1 px-2 py-1.5 rounded hover:bg-muted text-left"
                                    >
                                        {expandedCollections.has(collection.id) ? (
                                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                        )}
                                        <span className="text-sm font-medium text-foreground truncate">
                                            {collection.name}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            ({collection.requests.length})
                                        </span>
                                    </button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => onDeleteCollection(collection.id)}
                                    >
                                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                                    </Button>
                                </div>

                                {expandedCollections.has(collection.id) && (
                                    <div className="ml-6 mt-1 space-y-0.5">
                                        {collection.requests.map((request) => (
                                            <div
                                                key={request.id}
                                                className="flex items-center justify-between group"
                                            >
                                                <button
                                                    onClick={() =>
                                                        onLoadRequest(request, collection.baseUrl)
                                                    }
                                                    className="flex items-center gap-2 flex-1 px-2 py-1.5 rounded hover:bg-muted text-left"
                                                >
                                                    <span
                                                        className={`text-xs font-mono font-semibold ${getMethodColor(request.method)}`}
                                                    >
                                                        {request.method}
                                                    </span>
                                                    <span className="text-sm text-foreground truncate">
                                                        {request.name}
                                                    </span>
                                                </button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() =>
                                                        onDeleteRequest(collection.id, request.id)
                                                    }
                                                >
                                                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
}
