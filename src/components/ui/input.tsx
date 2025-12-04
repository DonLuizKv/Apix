import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className = '', type, ...props }: InputProps) {
    return (
        <input
            type={type}
            className={`flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm outline-none ${className}`}
            {...props}
        />
    );
}