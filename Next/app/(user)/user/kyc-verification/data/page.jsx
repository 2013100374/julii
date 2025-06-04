import { getMetaTitle } from "@/lib/helpers";
import KYCData from "./_components/KYCData";

export const metadata = getMetaTitle('KYC Data');

export default function KycData() {
    return (
        <>
        <div className="container py-50">
            <div className="row justify-content-center ">
                <KYCData />
            </div>
        </div>
            
        </>
    )
}
