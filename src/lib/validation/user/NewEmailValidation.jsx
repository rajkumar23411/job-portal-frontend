import * as y from "yup";
export const newEmailSchema = y.object({
    email: y
        .string()
        .email("Email id is invalid")
        .required("Email id is required"),
});
