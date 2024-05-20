import * as y from "yup";

export const newJobSchema = y.object({
    title: y.string().required("Job title is required"),
    description: y.string().required("Job description is required"),
    experience: y.string().required("Experience is required"),
    totalOpenings: y.string().required("Total openings are required"),
    minSalary: y.string().required("Minimium salary amount is required"),
    maxSalary: y.string().required("Maximum salary amount is required"),
    jobType: y.string().required("Job type is required"),
    workMode: y.string().required("Work mode is required"),
});
