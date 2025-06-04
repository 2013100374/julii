import useUtility from "@/app/_hooks/useUtility";

export default function FormLabel({ name, label, required = false }) {
    const {trans} = useUtility();
    return (
        <>
            <label className="form-label form--label" htmlFor={name}>{trans(label)} {required && <span className="text-danger">*</span>}</label>
        </>
    )
}
