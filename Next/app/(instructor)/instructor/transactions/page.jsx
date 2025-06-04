import { getMetaTitle } from "@/lib/helpers";

import Transactions from "./_components/Transactions";

export const metadata = getMetaTitle('Transactions');

export default function page() {
    return (

        <div className="dashboard-body">
            <div className="dashboard-body-wrapper">
                <div className="container">
                    <div className="flex-between">
                        <h4 className="mb-0">Transactions</h4>
                    </div>
                    <div className="row gy-4">
                        <div className="col-12">
                            <Transactions />

                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

