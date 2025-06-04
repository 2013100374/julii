import useUtility from "@/app/_hooks/useUtility";

export const TableHeader = ({ columns }) => {
    const { trans } = useUtility();

    return (
        <thead>
            <tr>
                {columns.map((column, index) => {
                    const className = index === 0 ? 'text-start' : index === columns.length - 1 ? 'text-end' : 'text-center';
                    return <th className={className}    key={index}>{trans(column.label)}</th>;
                })}
            </tr>
        </thead>
    );
};