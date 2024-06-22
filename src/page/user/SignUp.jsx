import FormError from "@/components/shared/FormError";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { signUpSchema } from "@/lib/validation/user/SignUpValidation";
import { signUp } from "@/redux/actions/user.action";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError } from "@/redux/actions/error.action";
import { RESET_USER } from "@/redux/constants/user.constants";
import Logo from "@/components/shared/Logo";

const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};
const SignUp = () => {
    const {
        loading: isCreatingUser,
        error,
        success,
    } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        dispatch(signUp(values));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }

        if (success) {
            toast.success(success);
            dispatch({ type: RESET_USER });
            navigate("/verify/account?new-account=true");
        }
    }, [error, success, navigate, dispatch]);
    return (
        <div className="h-full w-full flex-center">
            <div className="sm:w-420 flex-center flex-col">
                <Logo />
                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                    Create a new account
                </h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">
                    To use Snapgram, please enter your account details
                </p>
                <Formik
                    initialValues={initialValues}
                    validationSchema={signUpSchema}
                    onSubmit={handleSubmit}
                >
                    {() => {
                        return (
                            <Form className="w-full mt-10 flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="name"
                                        className="shad-form_label"
                                    >
                                        Full name*
                                    </label>
                                    <Field
                                        type="text"
                                        id="name"
                                        name="name"
                                        className={`shad-input`}
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component={FormError}
                                    />
                                </div>
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
                                <div className="w-full flex gap-2">
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
                                    <div className="flex flex-col gap-1">
                                        <label
                                            htmlFor="confirmPassword"
                                            className="shad-form_label"
                                        >
                                            Confirm password*
                                        </label>
                                        <Field
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            className={`shad-input`}
                                        />
                                        <ErrorMessage
                                            name="confirmPassword"
                                            component={FormError}
                                        />
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="shad-button_primary mt-4"
                                >
                                    {isCreatingUser ? (
                                        <div className="flex-center gap-2">
                                            <Loader />
                                            Loading...
                                        </div>
                                    ) : (
                                        "Next"
                                    )}
                                </Button>

                                <p className="text-small-regular text-light-2 text-center mt-2">
                                    Already have an account?
                                    <Link
                                        to="/sign-in"
                                        className="text-primary-500 text-small-semibold ml-1"
                                    >
                                        Sign in
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

export default SignUp;
