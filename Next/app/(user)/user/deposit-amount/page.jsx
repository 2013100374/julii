import { Deposit } from '@/app/(user)/user/(deposit)/_components/Deposit';
import { getMetaTitle } from '@/lib/helpers';

export const metadata = getMetaTitle('Deposit');
export default function DepositAmount() {
    return (
        <div className="container">
            <div className="course-require__wrapper d-block">
                
                <div className="row justify-content-center m-0">
                    <div className="col-lg-12">
                        <div className="gateway-card">
                            <Deposit/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
