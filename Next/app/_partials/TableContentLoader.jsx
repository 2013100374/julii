import { Spinner } from "./Spinner";

export default function TableContentLoader() {
    return (
        <tr>
            <td colSpan={6} style={{ borderBottom: 0, padding: '70px' }}>
                <Spinner />
            </td>
        </tr>
    )
}
