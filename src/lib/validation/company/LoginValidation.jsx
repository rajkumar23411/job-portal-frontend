import * as y from "yup";

export const loginSchema = y.object({
    RegdNo: y.string().required("Organization registration number is required"),
    password: y.string().required("Password is required"),
});
