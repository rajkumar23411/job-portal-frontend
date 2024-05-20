import { HiOutlineStatusOnline } from "react-icons/hi";
import { MdOutlineMapsHomeWork, MdOutlineNotStarted } from "react-icons/md";
import { Link } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
export function JobTypeBox({ icon, value }) {
    return (
        <div className="flex-center gap-2">
            <div className="text-2xl text-light-3">{icon}</div>
            <p className="base-regular capitalize text-light-2">{value}</p>
        </div>
    );
}

export function JobInfoBox({ icon, name, value }) {
    return (
        <div className="flex items-start gap-2">
            <div className="text-2xl text-light-4">{icon}</div>
            <div className="flex flex-col gap-1">
                <p className="text-gray-400 small-regular">{name}</p>
                <p
                    className={`base-regular text-light-2 ${
                        value === "fresher" ? "capitalize" : ""
                    }`}
                >
                    {value}
                </p>
            </div>
        </div>
    );
}

const JobCard = ({ job }) => {
    return (
        <div className="rounded-2xl p-6 bg-dark-3">
            <div className="flex flex-col gap-8">
                <div>
                    <h1 className="h3-medium text-light-2">{job.title}</h1>
                    <h3 className="base-regular text-gray-400">
                        {job.description}
                    </h3>
                </div>
                <div className="flex items-center gap-10">
                    <JobTypeBox
                        icon={<MdOutlineMapsHomeWork />}
                        value={job.jobType}
                    />
                    <JobTypeBox
                        icon={<GrLocation />}
                        value={job.locations.map((loc) => loc).join(", ")}
                    />
                    <JobTypeBox
                        icon={<HiOutlineStatusOnline />}
                        value={job.status}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <JobInfoBox
                        icon={<MdOutlineNotStarted />}
                        name="Start date"
                        value="Immediately"
                    />
                    <JobInfoBox
                        icon={<MdOutlineNotStarted />}
                        name="CTC (Annual)"
                        value={`₹${job?.minSalary} - ₹${job?.maxSalary}`}
                    />
                    <JobInfoBox
                        icon={<MdOutlineNotStarted />}
                        name="Experience"
                        value={`${job?.experience} years`}
                    />
                </div>
            </div>
            <div className="flex items-center justify-end pt-10 gap-6">
                <Link
                    to={`/company/job/${job._id}`}
                    className="text-primary-500 base-medium cursor-pointer hover:text-primary-600"
                >
                    View details
                </Link>
                <button className="text-red-500 base-medium hover:text-red-600">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default JobCard;
