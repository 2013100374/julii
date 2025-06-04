import { getMetaTitle } from "@/lib/helpers";
import CookieContent from "./_components/CookieContent";

export const metadata = getMetaTitle('Cookie Policy');

export default function CookiePolicy() {
    return (
        <>
            <section className="page-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <CookieContent />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
