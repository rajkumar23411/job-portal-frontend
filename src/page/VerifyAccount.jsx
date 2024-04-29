import FormError from "@/components/shared/FormError";
import { Button } from "@/components/ui/button";
import { accountSchema } from "@/lib/validation/AccountValidation";
import { clearError } from "@/redux/actions/error.action";
import { resendCode, verifyAccount } from "@/redux/actions/user.action";
import { RESET_ACCOUNT } from "@/redux/constants/user.constants";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const VerifyAccount = () => {
    const { user } = useSelector((state) => state.auth);
    const { isVerifying, isSending, success, error, message } = useSelector(
        (state) => state.account
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleFormSubmit = (values) => {
        dispatch(
            verifyAccount({
                ...values,
                email: user?.email,
            })
        );
    };

    const handleResendCode = () => {
        dispatch(resendCode(user?.email));
    };

    useEffect(() => {
        if (success) {
            toast.success(message);
            navigate("/profile");
            dispatch({ type: RESET_ACCOUNT });
        }
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [success, error, dispatch, message, navigate]);
    return (
        <>
            {user?.isAccountVerified ? (
                <Navigate to="/" />
            ) : (
                <div className="flex items-center justify-center w-full h-full">
                    <div className="sm:w-420 flex-center flex-col">
                        <img src="/assets/images/logo.svg" alt="logo" />
                        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                            Verify your email address
                        </h2>
                        <p className="text-light-3 small-medium md:base-regular mt-2 text-center px-6 sm:px-0">
                            Please enter the 6 digit code that has been sent to
                            your email id
                        </p>

                        <Formik
                            initialValues={{ code: "" }}
                            validationSchema={accountSchema}
                            onSubmit={handleFormSubmit}
                        >
                            <Form className="w-full mt-10 flex flex-col gap-1">
                                <Field
                                    type="text"
                                    id="code"
                                    name="code"
                                    className={`shad-input`}
                                    placeholder="Enter the verification code here (xxxxxxx)"
                                />
                                <ErrorMessage
                                    name="code"
                                    component={FormError}
                                />
                                <div>
                                    <Button
                                        type="submit"
                                        className="shad-button_primary mt-4"
                                    >
                                        {isVerifying ? (
                                            <div className="flex-center gap-2">
                                                <Loader />
                                                Verifying...
                                            </div>
                                        ) : (
                                            "Verify"
                                        )}
                                    </Button>
                                    <Button
                                        onClick={handleResendCode}
                                        type="button"
                                        className="shad-button_primary-outlined w-full mt-4"
                                    >
                                        {isSending ? (
                                            <div className="flex-center gap-2">
                                                <Loader />
                                                Sending...
                                            </div>
                                        ) : (
                                            "Resend code"
                                        )}
                                    </Button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            )}
        </>
    );
};

export default VerifyAccount;
