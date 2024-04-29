import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { newEmailSchema } from "@/lib/validation/NewEmailValidation";
import FormError from "@/components/shared/FormError";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { loadUser, updateEmail } from "@/redux/actions/user.action";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { clearError } from "@/redux/actions/error.action";
import { toast } from "react-toastify";
import { RESET_ACCOUNT } from "@/redux/constants/user.constants";
const UpdateEmail = () => {
    const { user } = useSelector((state) => state.auth);
    const { loading, success, error } = useSelector((state) => state.account);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isClicked, setIsclicked] = useState(false);
    const handleSubmit = (val) => {
        dispatch(updateEmail(val));
        setIsclicked(true);
    };

    useEffect(() => {
        if (isClicked && loading === false && success === false) {
            navigate("/verify/account");
            dispatch(loadUser());
        }
    }, [isClicked, loading, success, navigate, dispatch]);

    useEffect(() => {
        if (success) {
            toast.success("Verify your new email address");
            dispatch({ type: RESET_ACCOUNT });
        }
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [success, error, dispatch, navigate, loading]);

    return (
        <div className="h-full w-full flex-center">
            <div className="bg-dark-3 w-[600px] p-6 rounded-xl flex-center flex-col">
                <div className="flex flex-col gap-6">
                    <h1 className="h3-medium text-center">
                        Change email address
                    </h1>
                    <p className="text-light-3">
                        <span>Note:</span> Please note that all data associated
                        with your account will be{" "}
                        <span className="base-medium text-light-2">
                            ({user?.email})
                        </span>{" "}
                        will be linked to your new email address.
                    </p>
                </div>
                <Formik
                    initialValues={{
                        email: "",
                    }}
                    validationSchema={newEmailSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik) => {
                        return (
                            <Form className="w-full pt-10">
                                <div className="flex flex-col gap-1 ">
                                    <label
                                        htmlFor="email"
                                        className="shad-form_label"
                                    >
                                        New email id*
                                    </label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={`shad-input`}
                                        placeholder="example@gmail.com"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component={FormError}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="shad-button_primary mt-4"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex-center gap-2">
                                            <Loader />
                                            Loading...
                                        </div>
                                    ) : (
                                        "Update email"
                                    )}
                                </Button>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default UpdateEmail;
