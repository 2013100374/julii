
import { getMetaTitle } from "@/lib/helpers";
import ConfirmationCard from "../../payment/confirmation/_components/ConfirmationCard";


export const metadata = getMetaTitle('Deposit Confirmation');

export default function Confirmation() {

    return (
        <>
            <div className="dashboard-body">
                <div className="row justify-content-center m-0">
                    <div className="col-lg-12">
                        <div className="gateway-card">
                            <ConfirmationCard />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
