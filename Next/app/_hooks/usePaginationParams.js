import { useSearchParams } from "next/navigation";
import {  useEffect, useState } from "react";

export default function usePaginationParams() {
    const params = useSearchParams();

    const getPageNumber = () => {
        const page = params.get('page') || 1;
        return Number(page);
    };

    const [pageNumber, setPageNumber] = useState(() => getPageNumber());

    useEffect(() => {
        setPageNumber(getPageNumber());
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return {
        pageNumber,
        setPageNumber
    };
}
