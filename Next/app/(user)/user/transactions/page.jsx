import { getMetaTitle } from "@/lib/helpers";

import Transactions from "./_components/Transactions";

export const metadata = getMetaTitle('Transactions');

export default function page() {
    return (
        
            <div className="row justify-content-center mt-2">
                <Transactions />
            </div>
        
    )
}

