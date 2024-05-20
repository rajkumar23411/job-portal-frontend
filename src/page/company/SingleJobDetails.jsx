import FormError from "@/components/shared/FormError";
import { Button } from "@/components/ui/button";
import { newJobSchema } from "@/lib/validation/company/NewJobValidation";
import { loadSingleJob } from "@/redux/actions/company.actions";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

function JobDetailsDiv({ label, value }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="base-medium text-light-3">{label}</span>
            <p className="text-light-2 base-regular">{value}</p>
        </div>
    );
}

const SingleJobDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { job } = useSelector((state) => state.company);

    useEffect(() => {
        dispatch(loadSingleJob(id));
    }, [dispatch, id]);
    return (
        <div className="h-full w-full">
            <div className="pb-8">
                <p className="text-gray-300 h3-medium">
                    JOB / <span className="text-light-2">{job?.title}</span>
                </p>
            </div>
            <div className="flex flex-col gap-6 bg-dark-4 p-6 rounded-xl">
                <JobDetailsDiv label={"Title"} value={job?.title} />
                <JobDetailsDiv label={"Description"} value={job?.description} />

                <div className="flex items-center gap-10">
                    <JobDetailsDiv
                        label={"Experience"}
                        value={`${job?.experience} years`}
                    />
                    <JobDetailsDiv label={"Job Type"} value={job?.jobType} />
                    <JobDetailsDiv
                        label={"Location"}
                        value={job?.locations?.map((loc) => loc).join(", ")}
                    />
                </div>
                <div className="flex items-center gap-10">
                    <JobDetailsDiv
                        label={"Total Openings"}
                        value={job?.totalOpenings}
                    />
                    <JobDetailsDiv
                        label={"Salary"}
                        value={`₹${job?.minSalary} - ₹${job?.maxSalary}`}
                    />
                </div>

                <JobDetailsDiv label={"Status"} value={job?.status} />
                <div>
                    <span className="base-medium text-light-3">Skills</span>
                    <div className="flex items-center gap-4">
                        {job?.skills?.map((skill, i) => (
                            <span
                                key={i}
                                className="text-light-2 base-regular bg-dark-3 py-1 px-4 rounded-lg"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <span className="base-medium text-light-3">
                        Responsibilities
                    </span>
                    <ul className="list-inside">
                        {job?.responsibilities?.map((res, i) => (
                            <li
                                key={i}
                                className="text-light-2 base-regular list-disc"
                            >
                                {res}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex gap-2">
                    <Button
                        className="shad-button_primary-outlined w-60"
                        onClick={() =>
                            navigate(`/company/job/edit/${job?._id}`)
                        }
                    >
                        Edit job
                    </Button>
                    <Button className="shad-button_danger-outlined w-max">
                        Delete job
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SingleJobDetails;
