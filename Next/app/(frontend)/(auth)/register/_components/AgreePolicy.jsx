import Link from "next/link";
import usePolicyPages from "@/app/_partials/_hooks/usePolicyPages";
import Input from "@/app/_forms/Input";
import useUtility from "@/app/_hooks/useUtility";
export default function AgreePolicy() {
    const { policyPages } = usePolicyPages();
    const { trans } = useUtility();
    return (
        <>
            <div className="form-group">
                <div className="form--check align-items-start">
                    <Input name={'agree'} type='checkbox' className="form-check-input" id="agree" required />
                    <label className="form-check-label" htmlFor="agree">{trans('I agree with')}

                        <span className="d-inline">
                            {policyPages?.data?.policies?.map((policy, index) => (
                                <span key={index} className="ms-1">
                                    <Link target="_blank" href={`/policy/${policy.slug}`}>{trans(policy.data_values.title)}</Link>
                                    {index < policyPages?.data?.policies?.length - 1 && ','}
                                </span>
                            ))}
                        </span>
                    </label>
                </div>
            </div>
        </>
    )
}
