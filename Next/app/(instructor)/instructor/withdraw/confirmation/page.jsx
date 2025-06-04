import { getMetaTitle } from "@/lib/helpers";
import ConfirmationCard from "./_components/ConfirmationCard";

export const metadata = getMetaTitle('Withdrawal Confirmation');

export default function Confirmation() {
    return (
        <>
            <div className="dashboard-body">
                <div className="dashboard-body-wrapper">
                    <div className="container">
                        <div className="flex-between mb-4">
                            <h4 className="mb-0">Withdraw Confirmation</h4>
                        </div>
                        <div className="row justify-content-center ">
                            <ConfirmationCard />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
