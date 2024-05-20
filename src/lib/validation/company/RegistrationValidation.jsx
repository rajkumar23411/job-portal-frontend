import * as y from "yup";

export const RegistrationSchema = y.object({
    name: y.string().required("Company name is required"),
    email: y
        .string()
        .email("Invalid email id")
        .required("Compnay email is required"),
    RegdNo: y.string().required("Registration number is required"),
    website: y.string().required("Company official website URL is required"),
    totalEmployee: y.string().required("Total number of employee is required"),
    password: y
        .string()
        .required("Password is required")
        .min(6, "Password must contain at least 6 characters")
        .min(8, "Password must contain at least 8 characters")
        .max(20, "Password must not exceed 20 characters"),
    description: y
        .string()
        .required("Company description is required")
        .max(600, "Company description must not exceed 600 characters"),
});
