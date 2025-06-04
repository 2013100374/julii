import { ErrorMessage } from "formik";
import Input from "../_forms/Input";
import FormGroup from "./FormGroup";
import FormLabel from "./FormLabel";
import Select from "./Select";
import useUtility from "../_hooks/useUtility";

export default function FormField({
    name,
    label,
    type = 'text',
    readOnly = false,
    hideLabel = false,
    required = false,
    inputGroup = false,
    fromGroup = true,
    inputGroupText = '',
    inputGroupTextPosition = 'left',
    ...rest
}) {
    const { trans } = useUtility();

    const formField = () => {
        if (type === 'select') {
            return (
                <Select
                    name={name}
                    {...rest}
                />
            );
        }

        if (type == 'textarea') {
            return (
                <Input
                    as="textarea"
                    name={name}
                    type={type}
                    readOnly={readOnly}
                    required={required}
                    autoComplete="on"
                    placeholder={rest.placeholder ? trans(rest.placeholder) : ''}
                    {...rest}
                />
            );
        }

        return (
            <Input
                name={name}
                type={type}
                readOnly={readOnly}
                required={required}
                autoComplete="off"
                placeholder={rest.placeholder ? trans(rest.placeholder) : ''}
                {...rest}
            />
        );
    }

    const formGroup = (
        <div className="input-group">
            {inputGroupTextPosition === 'left' && <span className="input-group-text">{inputGroupText}</span>}
            {formField()}
            {inputGroupTextPosition === 'right' && <span className="input-group-text">{inputGroupText}</span>}
        </div>
    );


    const withOutFromGroup = (
        <div>
            {formField()}
        </div>
    )

    return (
        <>
            {!fromGroup ? withOutFromGroup :

                <FormGroup>
                    <div>
                        {!hideLabel && <FormLabel name={name} label={label} required={required} />}
                        {inputGroup ? formGroup : formField()}
                    </div>
                    <ErrorMessage name={name} component="p" className="text-danger d-block" />
                </FormGroup>
            }
        </>
    )


}
