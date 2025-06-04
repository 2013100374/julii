import useUtility from "@/app/_hooks/useUtility"

export const EmptyResource = ({ columns }) => {

    const {trans} = useUtility();

    return (
        <tbody>
            <tr>
                <td colSpan={columns.length ?? columns} className="text-center py-5">
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="120" height="120" rx="8" fill="#F5F5F5" />
                        <path d="M30 30H90M30 50H90M30 70H60" stroke="var(--bs-primary)" strokeWidth="4" strokeLinecap="round" />
                        <circle cx="85" cy="85" r="20" stroke="var(--bs-primary)" strokeWidth="4" />
                        <path d="M95 85L85 85L85 75" stroke="var(--bs-primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h4 className="mt-4 text-muted">{trans('No data available in table')}</h4>
                    <p className="text-primary">{trans('Try adjusting your search or filter to find what you are looking for.')}</p>
                </td>
            </tr>
        </tbody>
    )
}