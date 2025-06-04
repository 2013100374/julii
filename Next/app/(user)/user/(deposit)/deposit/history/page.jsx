import { getMetaTitle } from "@/lib/helpers";
import History from "./_components/History";

export const metadata = getMetaTitle('Deposit History');

export default function page() {
    return (
        <>
            <div className="row justify-content-center mt-2">
                <History />
            </div>
        </>
    )
}
