import AuthorizationHandler from "./_components/AuthorizationHandler";
import { getMetaTitle } from "@/lib/helpers";

export const metadata = getMetaTitle('Authorization');

export default function Authorization() {
    return (
        <>
            <div className="page-wrapper py-100">
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <AuthorizationHandler />
                    </div>
                </div>
            </div>
        </>
    )
}
