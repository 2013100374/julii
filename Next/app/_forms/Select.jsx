import { Field, ErrorMessage } from "formik";

export default function Select({ name, errorHandler = false, ...rest }) {
    return (
        <>
            <Field
                as="select"
                id={name}
                name={name}
                {...rest}
            >
                {rest.children}
            </Field>
            {errorHandler ? <ErrorMessage name={name} component="p" className="text-danger d-block" /> : ''}
        </>
    )
}
