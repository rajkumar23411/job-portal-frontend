import { Link } from "react-router-dom";
import { MdOutlineLocationOn } from "react-icons/md";
import ActiveHiringTag from "./ActiveHiringTag";
import { PiMoneyDuotone } from "react-icons/pi";

const JobCard = ({ job }) => {
    return (
        <div className="w-full bg-dark-4 h-max p-4 flex flex-col gap-4 rounded-lg">
            <ActiveHiringTag />
            <div className="flex items-center justify-between boder-b border-light-3/70">
                <div>
                    <h3 className="base-medium text-light-2">{job?.title}</h3>
                    <h4 className="small-medium text-light-3">
                        {job?.company?.name}
                    </h4>
                </div>
                <div>
                    <img
                        src={job?.company?.logo?.url}
                        alt="logo"
                        className="h-8 w-8 object-cover"
                    />
                </div>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
                <MdOutlineLocationOn className="text-base" />
                <span className="tiny-regular ">
                    {job?.locations?.map((loc) => loc).join(", ")}
                </span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
                <PiMoneyDuotone className="text-base" />
                <span className="tiny-medium ">
                    ₹ {job?.minSalary} - ₹ {job?.maxSalary} /year
                </span>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="tiny-regular bg-dark-2 text-light-3 p-1 rounded-sm">
                        Job
                    </span>
                    <span className="tiny-regular bg-dark-2 text-light-3 p-1 rounded-sm">
                        {job?.jobType}
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        to={`/company/applications/${job?._id}`}
                        className=" bg-transparent small-medium text-green-600 hover:bg-transparent"
                    >
                        View applications
                    </Link>
                    <Link
                        to={`/job/${job?._id}`}
                        className=" bg-transparent small-medium text-primary-600 hover:bg-transparent"
                    >
                        View details
                    </Link>
                    <Link
                        to={`/company/job/edit/${job?._id}`}
                        className="bg-transparent small-medium text-yellow-600 hover:bg-transparent"
                    >
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
