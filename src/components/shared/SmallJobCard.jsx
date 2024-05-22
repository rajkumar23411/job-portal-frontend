import { MdArrowForwardIos, MdOutlineLocationOn } from "react-icons/md";
import ActiveHiringTag from "./ActiveHiringTag";
import { PiMoneyDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";

const SmallJobCard = ({ job }) => {
    return (
        <div className="w-96 bg-dark-4 h-max p-4 flex flex-col gap-4 rounded-lg">
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
                <Link
                    to={`/job/${job?._id}`}
                    className="flex items-center gap-1 bg-transparent small-medium text-primary-500 hover:text-primary-600 hover:bg-transparent"
                >
                    View details
                    <MdArrowForwardIos />
                </Link>
            </div>
        </div>
    );
};

export default SmallJobCard;
