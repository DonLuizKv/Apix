
interface Props {
    size?: number;
    stroke?: number;
    color?: string;
    fill?: boolean;
    className?: string;
}

const defaultValues = {
    size: 20,
    stroke: 2,
    color: "white",
    fill: false,
    className: ""
}

export const APIX = ({ size = defaultValues.size, stroke = defaultValues.stroke, color = defaultValues.color, fill = defaultValues.fill, className = defaultValues.className }: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" stroke={fill ? 'none' : color} strokeWidth={stroke} fill={fill ? color : 'none'} className={className}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18.5 3a2.5 2.5 0 1 1 -.912 4.828l-4.556 4.555a5.475 5.475 0 0 1 .936 3.714l2.624 .787a2.5 2.5 0 1 1 -.575 1.916l-2.623 -.788a5.5 5.5 0 0 1 -10.39 -2.29l-.004 -.222l.004 -.221a5.5 5.5 0 0 1 2.984 -4.673l-.788 -2.624a2.498 2.498 0 0 1 -2.194 -2.304l-.006 -.178l.005 -.164a2.5 2.5 0 1 1 4.111 2.071l.787 2.625a5.475 5.475 0 0 1 3.714 .936l4.555 -4.556a2.487 2.487 0 0 1 -.167 -.748l-.005 -.164l.005 -.164a2.5 2.5 0 0 1 2.495 -2.336z" />
        </svg>
    );
}

export const IconMinus = ({ size = defaultValues.size, stroke = defaultValues.stroke, color = defaultValues.color, fill = defaultValues.fill, className = defaultValues.className }: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" stroke={fill ? 'none' : color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /></svg>
    );
}

export const IconX = ({ size = defaultValues.size, stroke = defaultValues.stroke, color = defaultValues.color, fill = defaultValues.fill, className = defaultValues.className }: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" stroke={fill ? 'none' : color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
    );
}

export const IconCompactFilled = ({ size = defaultValues.size, stroke = defaultValues.stroke, color = defaultValues.color, fill = defaultValues.fill, className = defaultValues.className }: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            stroke={color}
            strokeWidth={stroke}
            fill={fill ? color : 'none'}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 4m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
        </svg>
    );
}

export const IconMaximize = ({ size = defaultValues.size, stroke = defaultValues.stroke, color = defaultValues.color, fill = defaultValues.fill, className = defaultValues.className }: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 4l4 0l0 4" /><path d="M14 10l6 -6" /><path d="M8 20l-4 0l0 -4" /><path d="M4 20l6 -6" /></svg>
    );
}

export const IconMinimize = ({ size = defaultValues.size, stroke = defaultValues.stroke, color = defaultValues.color, fill = defaultValues.fill, className = defaultValues.className }: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 10h-4v-4" /><path d="M20 4l-6 6" /><path d="M6 14h4v4" /><path d="M10 14l-6 6" /></svg>
    );
}
