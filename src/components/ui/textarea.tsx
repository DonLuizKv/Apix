import Editor, { OnMount, BeforeMount } from "@monaco-editor/react"


export interface TextareaProps {
    value?: string
    onChange?: (value: string | undefined) => void
    className?: string
    language?: string
    onSubmit?: () => void
    placeholder?: string // Kept for compatibility but might not be used
}

const Textarea = ({ value, onChange, className, language = "json", onSubmit }: TextareaProps) => {
    const handleEditorWillMount: BeforeMount = (monaco) => {
        monaco.editor.defineTheme('apix-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#080c0f',
                "editor.lineHighlightBackground": "#1e1e1e",
            }
        });
    }

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        if (onSubmit) {
            editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
                onSubmit()
            })
        }
    }

    return (
        <div className={`overflow-hidden rounded-md border border-input ${className}`}>
            <Editor
                height="100%"
                defaultLanguage={language}
                theme="apix-dark"
                value={value}
                onChange={onChange}
                beforeMount={handleEditorWillMount}
                onMount={handleEditorDidMount}
                options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 13,
                    automaticLayout: true,
                    padding: { top: 8, bottom: 8, },
                    fontFamily: 'var(--font-mono)',
                    renderLineHighlight: 'none',
                    contextmenu: false,
                    lineNumbersMinChars: 3,
                    glyphMargin: false,
                    lineDecorationsWidth: 0,
                }}
            />
        </div>
    )
}

export { Textarea }
