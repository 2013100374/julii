import useUtility from "@/app/_hooks/useUtility";


export default function SubmitBtn({isSubmitting,title,...rest}) {
    const {trans} = useUtility();
    return (
        <>
            <button type="submit" className={` ${rest?.className || 'btn btn--base w-100'}`} {...rest} disabled={isSubmitting}>
                {isSubmitting ? <i className="las la-circle-notch la-spin"></i> : trans(title)}
            </button>
        </>
    )
}
