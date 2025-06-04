import { getMetaTitle } from "@/lib/helpers";
import { Tickets } from "./_components/Tickets";

export const metadata = getMetaTitle('Support Tickets');

export default function page() {
    return (
        <>
            <Tickets />
        </>
    )
}
