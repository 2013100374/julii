import Badge from "@/app/_badges/Badge";

export default function StatusBadge({ status }) {
    let text, variant;

    if (status === 2) {
        text = 'Pending';
        variant = 'warning';
    } else if (status === 1) {
        text = 'Approved';
        variant = 'success';
    } else if (status === 3) {
        text = 'Rejected';
        variant = 'danger';
    }
    
    return (
        <Badge text={text} variant={variant} />
    )
}
