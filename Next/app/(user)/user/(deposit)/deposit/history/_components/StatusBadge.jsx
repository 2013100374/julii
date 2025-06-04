import Badge from "@/app/_badges/Badge";

export default function StatusBadge({ status, methodCode }) {
    let text, variant;

    if (status === 2) {
        text = 'Pending';
        variant = 'warning';
    } else if (status === 1 && methodCode >= 1000 && methodCode < 5000) {
        text = 'Approved';
        variant = 'success';
    } else if (status === 1 && (methodCode < 1000 || methodCode >= 5000)) {
        text = 'Succeed';
        variant = 'success';
    } else if (status === 3) {
        text = 'Rejected';
        variant = 'danger';
    }
    
    return (
        <Badge text={text} variant={variant} />
    )
}
