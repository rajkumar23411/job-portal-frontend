import { Button } from "@/components/ui/button";
import { multiFormatDateString } from "@/utils";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { MdOutlineNotStarted } from "react-icons/md";
import { useDispatch } from "react-redux";
import { handleBookmarkRequest } from "@/redux/actions/bookmark.action";
import getJobIcon from "@/utils/getJobIcon.jsx";
import { Link } from "react-router-dom";
import JobInfoBox from "./JobInfoBox";

const UserJobCard = ({ job, isJobExisitsInBookmark, isAlreadyApplied }) => {
    const dispatch = useDispatch();

    return (
        <div key={job._id} className="w-full bg-dark-3 rounded-lg p-4">
            <div className="pb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="h4-medium text-light-1">{job?.title}</h1>
                        <h2 className="base-semibold text-light-3">
                            {job?.company?.name}
                        </h2>
                    </div>
                    <div className="h-12 w-12 overflow-hidden">
                        <img
                            src={job?.company?.logo?.url}
                            alt="logo"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 py-4">
                    {getJobIcon(job?.workMode)}
                    <p className="small-regular text-gray-300 capitalize">
                        {job?.workMode}
                    </p>
                </div>
                <div className="flex items-center gap-2 py-4">
                    <IoLocationOutline className="text-xl text-light-3" />
                    <p className="small-regular text-gray-300 capitalize">
                        {job?.locations?.map((loc) => loc).join(", ")}
                    </p>
                </div>
            </div>
            <div className="py-4">
                <div className="flex items-center gap-x-14">
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
                        value={`${job?.experience}`}
                    />
                </div>
            </div>
            <div className="py-4 flex items-center gap-4">
                <div className="tiny-medium capitalize bg-primary-600/10 text-primary-600 w-max py-1 px-2 rounded-sm flex items-center gap-1">
                    <IoTimeOutline className="text-lg" />
                    <span>{multiFormatDateString(job?.createdAt)}</span>
                </div>
                {job?.experience === "fresher" ? (
                    <span className="tiny-medium capitalize bg-dark-3 w-max py-1 px-2 rounded-sm text-light-2">
                        Fresher job
                    </span>
                ) : (
                    <span className="tiny-medium capitalize bg-dark-3 w-max py-1 px-2 rounded-sm text-light-2">
                        {job?.experience} experience
                    </span>
                )}
                <span className="tiny-medium capitalize bg-dark-3 w-max py-1 px-2 rounded-sm text-light-2">
                    {job?.jobType}
                </span>
            </div>
            <div className="flex items-center justify-between border-t border-light-3/40 pt-4">
                <button
                    onClick={() => dispatch(handleBookmarkRequest(job?._id))}
                >
                    {isJobExisitsInBookmark(job?._id) ? (
                        <img
                            src="/assets/icons/saved.svg"
                            alt="save"
                            className="h-6"
                        />
                    ) : (
                        <img
                            src="/assets/icons/save.svg"
                            alt="save"
                            className="h-6"
                        />
                    )}
                </button>
                <div className="flex items-center justify-end gap-4 w-full">
                    <Link
                        to={`/job/${job?._id}`}
                        className="bg-transparent small-medium text-primary-500 hover:text-primary-600 hover:bg-transparent"
                    >
                        View details
                    </Link>
                    {isAlreadyApplied(job?._id) ? (
                        <Button className="shad-button_primary-disabled">
                            Already applied
                        </Button>
                    ) : (
                        <Button className="bg-primary-500 small-medium hover:bg-primary-600">
                            Apply now
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserJobCard;
