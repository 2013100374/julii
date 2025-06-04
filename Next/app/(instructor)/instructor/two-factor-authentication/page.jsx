import { getMetaTitle } from "@/lib/helpers";
import TwoFaContent from './_components/TwoFaContent';

export const metadata = getMetaTitle('Two Factor Authentication');
export default function page() {
    return (
        <>
            <div className="dashboard-body">
                <div className="dashboard-body-wrapper">
                    <div className="container">
                        <div className="row gy-4">
                            <TwoFaContent />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
