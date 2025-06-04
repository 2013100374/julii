import { getMetaTitle } from "@/lib/helpers";
import ResetForm from "./_components/ResetForm";

export const metadata = getMetaTitle('Password Reset');

export default function PasswordReset() {
    return (
        <>
            <div className='page-wrapper py-100'>
                <ResetForm />
            </div>

        </>
    )
}
