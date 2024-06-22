import FormError from "@/components/shared/FormError";
import Loader from "@/components/shared/Loader";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { RegistrationSchema } from "@/lib/validation/company/RegistrationValidation";
import { registerCompany } from "@/redux/actions/company.actions";
import { RESET_COMPANY } from "@/redux/constants/company.constants";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialValues = {
    name: "",
    email: "",
    RegdNo: "",
    website: "",
    totalEmployee: "",
    password: "",
    description: "",
};

function FormField({ label, type = "text", name, fieldType = "input" }) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor={label} className="shad-form_label">
                {label}*
            </label>
            <Field
                as={fieldType}
                type={type}
                name={name}
                className={`shad-input ${
                    fieldType === "textarea"
                        ? "h-32 resize-none custom-scrollbar"
                        : ""
                }`}
            />
            <ErrorMessage name={name} component={FormError} />
        </div>
    );
}

const Register = () => {
    const dispatch = useDispatch();
    const { loading, success, error, message } = useSelector(
        (state) => state.company
    );
    const navigate = useNavigate();

    const [image, setImage] = useState("");
    const [file, setFile] = useState("");

    const handleSubmit = (values) => {
        if (file === "") {
            toast.error("Please upload company logo");
            return;
        }
        const formData = {
            ...values,
            file,
        };
        dispatch(registerCompany(formData));
    };
    const onDrop = useCallback((acceptedFiles) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
        };
        setFile(acceptedFiles[0]);
        reader.readAsDataURL(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg"],
        },
    });

    useEffect(() => {
        if (success) {
            toast.success(message);
            dispatch({ type: RESET_COMPANY });
            navigate("/company/login");
        }
        if (error) {
            toast.error(error);
            dispatch({ type: RESET_COMPANY });
        }
    }, [success, error, message, navigate, dispatch]);
    return (
        <div className="h-max py-20 w-full flex-center">
            <div className="sm:w-500 w-full h-full flex-center flex-col">
                <Logo />
                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                    Register Your Organization
                </h2>
                <p className="text-light-3 small-medium md:base-regular mt-2 text-center">
                    To continue using the platform please enter your
                    organization details carefully!
                </p>
                <div className="flex-center flex-col gap-1 mt-10">
                    <div
                        {...getRootProps()}
                        className="h-40 w-40 rounded-full group overflow-hidden bg-light-4 relative"
                    >
                        <input type="text" {...getInputProps()} />
                        <img
                            src={
                                image ||
                                "/assets/images/profile-placeholder.png"
                            }
                            alt="logo"
                            className="w-full h-full object-top object-cover"
                        />
                        <div className="absolute opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-100 ease-in-out top-0 left-0 right-0 h-full w-full flex-center bg-dark-1/50">
                            <span className="h3-medium">
                                {image ? "Update" : "Upload"} logo
                            </span>
                        </div>
                    </div>
                    <label htmlFor="logo" className="shad-form_label">
                        Company Logo
                        <span className="text-light-3">(Required)</span>
                    </label>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={RegistrationSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik) => {
                        return (
                            <Form className="w-full pt-2 flex flex-col gap-4">
                                <FormField label={"Name"} name="name" />
                                <FormField
                                    label={"Email"}
                                    name="email"
                                    type="email"
                                />
                                <div className="flex gap-2">
                                    <FormField
                                        label={"Registration Number"}
                                        name="RegdNo"
                                    />
                                    <FormField
                                        label={"Website"}
                                        name="website"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <FormField
                                        label={"Total employee"}
                                        name="totalEmployee"
                                        type="number"
                                    />
                                    <FormField
                                        label={"Password"}
                                        name="password"
                                        type="password"
                                    />
                                </div>
                                <FormField
                                    label={"Description"}
                                    fieldType="textarea"
                                    name="description"
                                />
                                <Button
                                    type="submit"
                                    className="shad-button_primary"
                                >
                                    {loading ? (
                                        <div className="flex gap-2">
                                            <Loader />
                                            Registering...
                                        </div>
                                    ) : (
                                        "Register"
                                    )}
                                </Button>
                                <div className="flex-center gap-1">
                                    <p>Already have an account?</p>
                                    <Link
                                        to="/company/login"
                                        className="text-light-3 base-medium cursor-pointer hover:text-light-4"
                                    >
                                        Login
                                    </Link>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default Register;
