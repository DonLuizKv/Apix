import { useState, useEffect } from 'react';
import { X, Plus, Trash2, FolderPlus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { Collection, HttpMethod } from '../types';

interface SaveRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (collectionName: string, requestName: string, method?: HttpMethod) => void;
    onSaveMultiple: (
        collectionName: string,
        requests: Array<{ name: string; method: HttpMethod }>
    ) => void;
    currentUrl: string;
    currentMethod: HttpMethod;
    currentHeaders: Record<string, string>;
    currentBody: string;
    collections: Collection[];
}

type MultipleRequest = {
    id: string;
    name: string;
    method: HttpMethod;
};

const HTTP_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export function SaveRequestModal({
    isOpen,
    onClose,
    onSave,
    onSaveMultiple,
    currentUrl,
    currentMethod,
    currentHeaders,
    currentBody,
    collections,
}: SaveRequestModalProps) {
    const [collectionName, setCollectionName] = useState('');
    const [requestName, setRequestName] = useState('');
    const [useExisting, setUseExisting] = useState(false);
    const [mode, setMode] = useState<'single' | 'multiple'>('single');
    const [multipleRequests, setMultipleRequests] = useState<MultipleRequest[]>([
        { id: '1', name: '', method: 'GET' },
    ]);

    useEffect(() => {
        if (collections.length > 0 && !useExisting) {
            setUseExisting(true);
            setCollectionName(collections[0].name);
        }
    }, [collections, useExisting]);

    const addRequest = () => {
        setMultipleRequests([
            ...multipleRequests,
            { id: Date.now().toString(), name: '', method: 'GET' },
        ]);
    };

    const removeRequest = (id: string) => {
        if (multipleRequests.length > 1) {
            setMultipleRequests(multipleRequests.filter((req) => req.id !== id));
        }
    };

    const updateRequest = (id: string, field: 'name' | 'method', value: string) => {
        setMultipleRequests(
            multipleRequests.map((req) => (req.id === id ? { ...req, [field]: value } : req))
        );
    };

    const handleSave = () => {
        if (!collectionName.trim()) {
            alert('Por favor ingresa el nombre de la colección');
            return;
        }

        if (mode === 'multiple') {
            const validRequests = multipleRequests.filter((req) => req.name.trim());
            if (validRequests.length === 0) {
                alert('Por favor ingresa al menos un nombre de petición');
                return;
            }
            // Guardar múltiples peticiones con sus métodos
            onSaveMultiple(collectionName, validRequests);
        } else {
            if (!requestName.trim()) {
                alert('Por favor ingresa el nombre de la petición');
                return;
            }
            // Guardar petición individual
            onSave(collectionName, requestName);
            onClose();
        }

        // Reset form
        setCollectionName('');
        setRequestName('');
        setMultipleRequests([{ id: '1', name: '', method: 'GET' }]);
        setMode('single');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a] bg-gradient-to-r from-[#1a1a1a] to-[#1f1f1f]">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FolderPlus className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">
                                Guardar Petición
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Organiza tus requests en colecciones
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                    <div className="flex gap-2 p-1 bg-[#0d0d0d] rounded-lg border border-[#2a2a2a]">
                        <button
                            onClick={() => setMode('single')}
                            className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                                mode === 'single'
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
                            }`}
                        >
                            Petición Individual
                        </button>
                        <button
                            onClick={() => setMode('multiple')}
                            className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                                mode === 'multiple'
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
                            }`}
                        >
                            Múltiples Peticiones
                        </button>
                    </div>

                    {mode === 'single' && (
                        <div className="space-y-2 p-4 bg-[#0d0d0d] rounded-lg border border-[#2a2a2a]">
                            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Petición Actual
                            </Label>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`px-2 py-0.5 text-xs font-semibold rounded ${
                                            currentMethod === 'GET'
                                                ? 'bg-emerald-500/20 text-emerald-400'
                                                : currentMethod === 'POST'
                                                  ? 'bg-amber-500/20 text-amber-400'
                                                  : currentMethod === 'PUT'
                                                    ? 'bg-blue-500/20 text-blue-400'
                                                    : currentMethod === 'DELETE'
                                                      ? 'bg-red-500/20 text-red-400'
                                                      : 'bg-purple-500/20 text-purple-400'
                                        }`}
                                    >
                                        {currentMethod}
                                    </span>
                                    <span className="text-sm font-mono text-foreground/80 truncate flex-1">
                                        {currentUrl}
                                    </span>
                                </div>
                                <div className="flex gap-3 text-xs text-muted-foreground">
                                    <span>{Object.keys(currentHeaders).length} headers</span>
                                    {currentBody && <span>• Body incluido</span>}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                            Colección
                        </Label>

                        {collections.length > 0 && (
                            <div className="flex gap-2 p-1 bg-[#0d0d0d] rounded-lg border border-[#2a2a2a]">
                                <button
                                    onClick={() => setUseExisting(false)}
                                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                                        !useExisting
                                            ? 'bg-secondary text-foreground'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
                                    }`}
                                >
                                    Nueva
                                </button>
                                <button
                                    onClick={() => setUseExisting(true)}
                                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                                        useExisting
                                            ? 'bg-secondary text-foreground'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
                                    }`}
                                >
                                    Existente
                                </button>
                            </div>
                        )}

                        {useExisting && collections.length > 0 ? (
                            <Select value={collectionName} onValueChange={setCollectionName}>
                                <SelectTrigger className="bg-[#0d0d0d] border-[#2a2a2a] h-11 hover:border-primary/50 transition-colors">
                                    <SelectValue placeholder="Selecciona una colección" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                                    {collections.map((collection) => (
                                        <SelectItem
                                            key={collection.id}
                                            value={collection.name}
                                            className="hover:bg-secondary/50"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-primary"></span>
                                                {collection.name}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ) : (
                            <Input
                                placeholder="Nombre de la nueva colección"
                                value={collectionName}
                                onChange={(e) => setCollectionName(e.target.value)}
                                className="bg-[#0d0d0d] border-[#2a2a2a] h-11 placeholder:text-muted-foreground/50 hover:border-primary/50 focus:border-primary transition-colors"
                            />
                        )}
                    </div>

                    {mode === 'single' ? (
                        <div className="space-y-3">
                            <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                                Nombre de la Petición
                            </Label>
                            <Input
                                placeholder="ej: Login, Obtener Usuarios, Crear Producto..."
                                value={requestName}
                                onChange={(e) => setRequestName(e.target.value)}
                                className="bg-[#0d0d0d] border-[#2a2a2a] h-11 placeholder:text-muted-foreground/50 hover:border-primary/50 focus:border-primary transition-colors"
                            />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                                    Peticiones a Crear
                                </Label>
                                <Button
                                    type="button"
                                    onClick={addRequest}
                                    size="sm"
                                    className="h-8 gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    Agregar
                                </Button>
                            </div>

                            <div className="space-y-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                                {multipleRequests.map((req, index) => (
                                    <div
                                        key={req.id}
                                        className="flex gap-2 p-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg hover:border-primary/30 transition-colors group"
                                    >
                                        <div className="flex items-center justify-center w-8 h-10 text-sm font-medium text-muted-foreground">
                                            {index + 1}
                                        </div>
                                        <Select
                                            value={req.method}
                                            onValueChange={(value: string) =>
                                                updateRequest(req.id, 'method', value)
                                            }
                                        >
                                            <SelectTrigger className="w-28 h-10 bg-secondary/30 border-[#2a2a2a] text-xs font-semibold">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                                                {HTTP_METHODS.map((method) => (
                                                    <SelectItem
                                                        key={method}
                                                        value={method}
                                                        className="text-xs font-semibold"
                                                    >
                                                        <span
                                                            className={`${
                                                                method === 'GET'
                                                                    ? 'text-emerald-400'
                                                                    : method === 'POST'
                                                                      ? 'text-amber-400'
                                                                      : method === 'PUT'
                                                                        ? 'text-blue-400'
                                                                        : method === 'DELETE'
                                                                          ? 'text-red-400'
                                                                          : 'text-purple-400'
                                                            }`}
                                                        >
                                                            {method}
                                                        </span>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Input
                                            placeholder="Nombre de la petición"
                                            value={req.name}
                                            onChange={(e) =>
                                                updateRequest(req.id, 'name', e.target.value)
                                            }
                                            className="flex-1 h-10 bg-secondary/30 border-[#2a2a2a] placeholder:text-muted-foreground/40"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeRequest(req.id)}
                                            disabled={multipleRequests.length === 1}
                                            className="h-10 w-10 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-0"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center gap-3 px-6 py-4 border-t border-[#2a2a2a] bg-gradient-to-r from-[#1a1a1a] to-[#1f1f1f]">
                    <p className="text-xs text-muted-foreground">
                        {mode === 'multiple'
                            ? `${multipleRequests.length} petición(es)`
                            : 'Petición individual'}
                    </p>
                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={onClose} className="hover:bg-secondary/50">
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSave}
                            className="bg-primary hover:bg-primary/90 shadow-sm min-w-24"
                        >
                            Guardar
                        </Button>
                    </div>
                </div>
            </div>

            {/* <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary) / 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary) / 0.5);
        }
      `}</style> */}
        </div>
    );
}
