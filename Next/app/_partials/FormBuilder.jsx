import { Field } from "formik";
import Select from "../_forms/Select";
import Input from '@/app/_forms/Input';

export default function FormBuilder({ form, setFieldValue = null }) {
    return (
        <>
            <div className="row">
                {Object.entries(form).map(([key, formVal]) => (
                    <div key={key} className={`col-lg-${formVal.width ? formVal.width : '12'}`}>
                        <div className="form-group">
                            <label className={`form-label`} htmlFor={formVal.label}>
                                {formVal.name}
                                {formVal.is_required && <span className="text-danger">*</span>}
                            </label>
                            {formVal.type === 'text' || formVal.type === 'email' || formVal.type === 'number' || formVal.type === 'url' || formVal.type === 'date' || formVal.type === 'time' ? (
                                <Input
                                    className="form-control form--control"
                                    type={formVal.type || 'text'}
                                    id={formVal.label}
                                    name={formVal.label}
                                    required={formVal.is_required || false}
                                />
                            ) : null}

                            {formVal.type === 'datetime' ? (
                                <Input
                                    className="form-control form--control"
                                    type='datetime-local'
                                    id={formVal.label}
                                    name={formVal.label}
                                    required={formVal.is_required || false}
                                />
                            ) : null}

                            {formVal.type === 'textarea' ? (
                                <Input
                                    className="form-control form--control"
                                    type='textarea'
                                    id={formVal.label}
                                    name={formVal.label}
                                    required={formVal.is_required || false}
                                />
                            ) : null}

                            {formVal.type === 'select' ? (
                                <Select
                                    className="form-control form--control"
                                    id={formVal.label}
                                    name={formVal.label}
                                    required={formVal.is_required || false}
                                >
                                    <option value="">Select One</option>
                                    {formVal.options.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </Select>
                            ) : null}

                            {formVal.type === 'checkbox' ? (
                                <div className="d-flex gap-3 flex-wrap">
                                    {formVal.options.map((option, index) => (
                                        <label className="form-check-label" key={index}>
                                            <Field
                                                required={formVal.is_required || false}
                                                type="checkbox"
                                                name={formVal.label}
                                                value={option}
                                                id={`${formVal.label}_${option}`}
                                                className="form-check-input me-2"
                                            />
                                            {option}
                                        </label> 
                                    ))}
                                </div>
                            ) : null}


                            {formVal.type === 'radio' ? (
                                <div className="d-flex gap-3 flex-wrap">
                                    {formVal.options.map((option, index) => (
                                        <label className="form-check-label" key={index}>
                                            <Field
                                                required={formVal.is_required || false}
                                                type="radio"
                                                name={formVal.label}
                                                value={option}
                                                id={`${formVal.label}_${option}`}
                                                className="form-check-input me-2"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            ) : null}

                            {formVal.type === 'file' ? (
                                <input
                                    className="form-control form--control"
                                    type={formVal.type}
                                    id={formVal.label}
                                    name={formVal.label}
                                    required={formVal.is_required || false}
                                    onChange={(event) => {
                                        setFieldValue(formVal.label, event.target.files[0]);
                                    }}
                                    accept={formVal.extensions ? formVal.extensions.split(',').map(ext => `.${ext.trim()}`).join(',') : undefined}
                                />
                            ) : null}
                            {formVal.instruction &&
                                <small className="text-primary"><i className="las la-info-circle"></i> {formVal.instruction}</small>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
