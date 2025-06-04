import History from "./_components/History";
import { getMetaTitle } from "@/lib/helpers";
export const metadata = getMetaTitle('Withdraw History');

export default function WithdrawHistory() {
    return (
        <>
            <div className="dashboard-body">
                <div className="dashboard-body-wrapper">
                    <div className="container">
                        <div className="row justify-content-center">
                            <History />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
