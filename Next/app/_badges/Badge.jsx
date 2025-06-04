import useUtility from '@/app/_hooks/useUtility';

export default function Badge({ text, variant = null, color = null }) {
    const {trans} = useUtility();
    return (
        <div>
            <span className={`badge badge--${variant}`} style={{ backgroundColor: color }}>{trans(text)}</span>
        </div>
    )
}
