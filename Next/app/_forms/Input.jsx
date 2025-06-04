import useUtility from "@/app/_hooks/useUtility";
import { ErrorMessage, Field } from "formik";

export default function Input({ name, type = 'text', as = 'input',errorHandler = false, ...rest }) {
    const {trans} = useUtility();
    return (
        <>
            <Field
                as={as}
                id={name}
                type={type}
                name={name}
                className="form-control form--control"
                placeholder={rest.placeholder ? trans(rest.placeholder) : ''}
                {...rest}
            />
            {errorHandler ? <ErrorMessage name={name} component="p" className="text-danger d-block" /> : ''}
        </>
    )
}
