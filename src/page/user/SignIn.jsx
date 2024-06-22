import FormError from "@/components/shared/FormError";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/lib/validation/user/SignInValidation";
import { signIn } from "@/redux/actions/user.action";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError } from "@/redux/actions/error.action";
import { RESET_USER } from "@/redux/constants/user.constants";
import Logo from "@/components/shared/Logo";
const SignIn = () => {
    const {
        loading: isSigningIn,
        success,
        error,
        message,
    } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFormSubmit = (data) => {
        dispatch(signIn(data));
    };

    useEffect(() => {
        if (success) {
            toast.success(message);
            navigate("/");
            dispatch({ type: RESET_USER });
        }

        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [error, success, dispatch, message, navigate]);
    return (
        <div className="h-full w-full flex-center">
            <div className="sm:w-420 flex-center flex-col">
                <Logo />
                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                    Sign in to your account
                </h2>
                <p className="text-light-3 small-medium md:base-regular mt-2 text-center">
                    Welcome back! To continue please enter your details
                </p>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={signInSchema}
                    onSubmit={(values) => handleFormSubmit(values)}
                >
                    {() => {
                        return (
                            <Form className="w-full mt-10 flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="email"
                                        className="shad-form_label"
                                    >
                                        Email*
                                    </label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={`shad-input `}
                                    />
                                    <ErrorMessage
                                        name="email"
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

                                <Button
                                    type="submit"
                                    className="shad-button_primary mt-4"
                                >
                                    {isSigningIn ? (
                                        <div className="flex-center gap-2">
                                            <Loader />
                                            Loading...
                                        </div>
                                    ) : (
                                        "Sign in"
                                    )}
                                </Button>

                                <p className="text-small-regular text-light-2 text-center mt-2">
                                    {`Don't`} have any account?
                                    <Link
                                        to="/sign-up"
                                        className="text-primary-500 text-small-semibold ml-1"
                                    >
                                        Sign up
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

export default SignIn;
