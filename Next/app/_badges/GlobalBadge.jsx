import Badge from "./Badge";

export default function GlobalBadge({ status }) {
    return (
        <>
            <Badge text={status == 1 ? 'Enabled' : 'Disabled'} variant="light" color={status == 1 ? 'success' : 'danger'} />
        </>
    )
}
