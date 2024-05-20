import FormError from "@/components/shared/FormError";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSchema } from "@/lib/validation/company/LoginValidation";
import { loginCompany } from "@/redux/actions/company.actions";
import { RESET_COMPANY } from "@/redux/constants/company.constants";
const Login = () => {
    const { loading, success, error, message } = useSelector(
        (state) => state.company
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [rememberMe, setRememberMe] = useState(false);

    const handleFormSubmit = (data) => {
        dispatch(
            loginCompany({
                ...data,
                rememberMe,
            })
        );
    };

    useEffect(() => {
        if (success) {
            toast.success(message);
            dispatch({ type: RESET_COMPANY });
            navigate("/company/dashboard");
        }

        if (error) {
            toast.error(error);
            dispatch({ type: RESET_COMPANY });
        }
    }, [error, success, dispatch, message, navigate]);
    return (
        <div className="h-full w-full flex-center">
            <div className="sm:w-500 flex-center flex-col">
                <img src="/assets/images/logo.svg" alt="logo" />
                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                    Sign in to your organization account
                </h2>
                <p className="text-light-3 small-medium md:base-regular mt-2 text-center">
                    Welcome back! To continue please enter your organization
                    details
                </p>
                <Formik
                    initialValues={{
                        RegdNo: "",
                        password: "",
                    }}
                    validationSchema={loginSchema}
                    onSubmit={(values) => handleFormSubmit(values)}
                >
                    {() => {
                        return (
                            <Form className="w-full mt-10 flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="regdNo"
                                        className="shad-form_label"
                                    >
                                        Registration Number*
                                    </label>
                                    <Field
                                        type="text"
                                        id="regdNo"
                                        name="RegdNo"
                                        className={`shad-input`}
                                        placeholder="Company registration number"
                                    />
                                    <ErrorMessage
                                        name="RegdNo"
                                        component={FormError}
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="password"
                                        className="shad-form_label"
                                    >
                                        Password*
                                    </label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        className={`shad-input`}
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component={FormError}
                                    />
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-x-2">
                                        <input
                                            id="rememberMe-checkbox"
                                            type="checkbox"
                                            checked={rememberMe}
                                            value={rememberMe}
                                            onChange={() =>
                                                setRememberMe(!rememberMe)
                                            }
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="rememberMe-checkbox"
                                            className="small-medium text-gray-400 "
                                        >
                                            Keep me logged in for next 2 days
                                        </label>
                                    </div>
                                    <Link
                                        to="/forgot/password"
                                        className="text-primary-500 hover:text-primary-600 cursor-pointer small-medium"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <Button
                                    type="submit"
                                    className="shad-button_primary mt-4"
                                >
                                    {loading ? (
                                        <div className="flex-center gap-2">
                                            <Loader />
                                            Logging in...
                                        </div>
                                    ) : (
                                        "Login"
                                    )}
                                </Button>

                                <p className="text-small-regular text-light-2 text-center mt-2">
                                    {`Don't`} have any account?
                                    <Link
                                        to="/company/register"
                                        className="text-primary-500 text-small-semibold ml-1"
                                    >
                                        Register now!
                                    </Link>
                                </p>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
