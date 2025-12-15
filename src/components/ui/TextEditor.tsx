import Editor, { OnMount, BeforeMount } from '@monaco-editor/react';

export interface TextareaProps {
    defaultValue?: string;
    onChange?: (value: string | undefined) => void;
    className?: string;
    language?: string;
    onSubmit?: () => void;
    placeholder?: string; // Kept for compatibility but might not be used
    readOnly?: boolean;
}

const TextEditor = ({ defaultValue, onChange, className, language = 'json', onSubmit, readOnly }: TextareaProps) => {
    const handleEditorWillMount: BeforeMount = (monaco) => {
        monaco.editor.defineTheme('apix-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#2f2e2e',
                'editor.lineHighlightBackground': '#1e1e1e',
            },
        });
    };

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        if (onSubmit) {
            editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
                onSubmit();
            });
        }
    };

    return (
        <div className={`overflow-hidden rounded-md border border-input ${className}`}>
            <Editor
                height="100%"
                defaultLanguage={language}
                theme="apix-dark"
                defaultValue={defaultValue}
                onChange={onChange}
                beforeMount={handleEditorWillMount}
                onMount={handleEditorDidMount}
                options={{
                    formatOnPaste: true,
                    formatOnType: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 13,
                    automaticLayout: true,
                    padding: { top: 8, bottom: 8 },
                    fontFamily: 'var(--font-mono)',
                    renderLineHighlight: 'none',
                    contextmenu: false,
                    lineNumbersMinChars: 3,
                    glyphMargin: false,
                    lineDecorationsWidth: 0,
                    readOnly: readOnly,
                }}
            />
        </div>
    );
};

export { TextEditor };
