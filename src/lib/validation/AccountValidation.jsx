import * as y from "yup";
export const accountSchema = y.object({
    code: y
        .string()
        .required("Verification code is required")
        .min(6, "Verification code must be 6 digits"),
});
