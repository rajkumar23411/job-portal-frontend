import * as y from "yup";

export const signUpSchema = y.object({
    name: y.string().required("Name is required"),
    email: y
        .string()
        .email("Email id is invalid")
        .required("Email id is required"),
    password: y
        .string()
        .required("Password is required")
        .min(6, "Password is too short")
        .max(30, "Password is too long"),
    confirmPassword: y
        .string()
        .oneOf([y.ref("password"), null], "Passwords must match"),
});
