import * as y from "yup";

export const signInSchema = y.object({
    email: y
        .string()
        .email("Email id is invalid")
        .required("Email id is required"),
    password: y.string().required("Password is required"),
});
