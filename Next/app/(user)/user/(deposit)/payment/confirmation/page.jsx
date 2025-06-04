import ConfirmationCard from "./_components/ConfirmationCard";
import { getMetaTitle } from "@/lib/helpers";

export const metadata = getMetaTitle('Payment Confirmation');

export default function Confirmation() {

    return (
        <>
            <div className="dashboard-body py-50">
                <div className="row justify-content-center m-0">
                    <div className="container">
                        <div className="gateway-card">
                            <ConfirmationCard />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
