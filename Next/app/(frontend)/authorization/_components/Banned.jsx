import useUtility from "@/app/_hooks/useUtility";
import useLoginHandler from "../../(auth)/login/_hooks/useLoginHandler";


export default function Banned({ user }) {
    const { trans, pageTitle } = useUtility();
    const { logout } = useLoginHandler();

 

    return (
        <section className="account py-50">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className=" custom--card">
                            <div className="card-body">
                                    <h4 className="text-center text-danger mb-3">{trans('You are banned')}</h4>
                                    <a href="#" onClick={logout}>{trans('Logout')}</a>
                                <p className="fw-bold mb-1 mt-2">{trans('Reason')}:</p>
                                <p>{trans(user?.ban_reason)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}