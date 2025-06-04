import FormBuilder from "@/app/_partials/FormBuilder";
import SubmitBtn from "@/app/_partials/SubmitBtn";
import { Form, Formik } from "formik";
import { useManualConfirmation } from "../_hooks/useManualConfirmation";
import CourseDetailCard from "./CourseDetailCard";

export const Manual = ({ deposit, course }) => {
    const { form, handleSubmit, initialValues } = useManualConfirmation(deposit);

    if (!deposit) return null;

    return (

        <div className="row  gy-3">
            <div className={`col-md-12 ${course && 'col-lg-8'}`}>

                <div className="card custom--card">
                    <div className="card-header">
                        <h5 className="card-title mb-0">Confirm Information</h5>
                    </div>
                    <div className="card-body">
                        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                            {({ isSubmitting, setFieldValue }) => (
                                <Form>
                                    {form ?
                                        <div>
                                            <div className="mb-3" dangerouslySetInnerHTML={{ __html: deposit?.gateway?.description }}></div>

                                            <FormBuilder form={form} setFieldValue={setFieldValue} />
                                            <div className="form-group">
                                                <SubmitBtn isSubmitting={isSubmitting} title={'Submit'} />
                                            </div>
                                        </div> :
                                        'Loading...'
                                    }
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            {
                course &&
                <div className="col-md-12 col-lg-4">
                    <CourseDetailCard course={course} deposit={deposit} />
                </div>
            }
        </div>

    );
}
