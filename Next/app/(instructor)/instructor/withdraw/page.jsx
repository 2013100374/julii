import { getMetaTitle } from "@/lib/helpers";
import '@/public/css/payment-card.css';
import { Withdraw } from "./_components/Withdraw";
import useUtility from "@/app/_hooks/useUtility";

export const metadata = getMetaTitle('Withdraw');

export default async function Page() {


    return (
        <>
            <div className="dashboard-body">
                <div className="dashboard-body-wrapper">
                    <div className="container">
                        <div className="flex-between mb-3">
                            <h4 className="mb-0">Withdraw</h4>
                        </div>
                        <div className="row gy-4">
                            <div className="col-12">
                                <Withdraw />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
