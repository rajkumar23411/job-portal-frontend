import { JobInfoBox } from "@/layouts/_comapny/JobCard";
import { applyJob, getJobDetials } from "@/redux/actions/job.actions";
import { multiFormatDateString } from "@/utils";
import getJobIcon from "@/utils/getJobIcon";
import { useEffect } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineMail, MdOutlineNotStarted } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { LiaEarlybirds } from "react-icons/lia";
import { FiUsers } from "react-icons/fi";
import { LuUserCheck } from "react-icons/lu";
import { IoMdGlobe } from "react-icons/io";
import { GrUserWorker } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import {
    handleBookmarkRequest,
    loadBookmarks,
} from "@/redux/actions/bookmark.action";
import { PiShoppingBagOpenDuotone } from "react-icons/pi";
import { toast } from "react-toastify";
import {
    CLEAR_BOOKMARK_ERRORS,
    RESET_BOOKMARK_STATE,
} from "@/redux/constants/bookmark.constants";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import UserResume from "@/components/shared/UserResume";
import { RESET_JOB_STATE } from "@/redux/constants/jobs.constants";
import Loader from "@/components/shared/Loader";
const JobDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const {
        loading,
        job,
        success: jobSuccess,
        error: jobError,
        message: jobMessage,
    } = useSelector((state) => state.jobs);
    const { user } = useSelector((state) => state.auth);
    const { bookmarks, success, error, message } = useSelector(
        (state) => state.bookmark
    );

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard");
    };
    const handleWebsiteLinkClick = () => {
        const properURL = job?.company?.website.replace("https://", "");
        window.open(`https://${properURL}`, "_blank");
    };
    const isJobExistsInBookmark = () =>
        bookmarks?.jobs?.some((b) => b._id === id);

    useEffect(() => {
        if (jobSuccess) {
            toast.success(jobMessage);
            dispatch({ type: RESET_JOB_STATE });
        }
        if (jobError) {
            toast.error(jobError);
            dispatch({ type: RESET_JOB_STATE });
        }
    }, [jobSuccess, jobError, jobMessage, dispatch]);

    useEffect(() => {
        if (success) {
            toast.success(message);
            dispatch(loadBookmarks());
            dispatch({ type: RESET_BOOKMARK_STATE });
        }
        if (error) {
            toast.error(error);
            dispatch({ type: CLEAR_BOOKMARK_ERRORS });
        }
    }, [success, error, message, dispatch]);

    useEffect(() => {
        dispatch(getJobDetials(id));
    }, [dispatch, id]);

    return (
        <div className="w-full flex-center flex-col h-max">
            <div className="w-[60%] flex-center flex-col py-20 gap-10">
                <h1 className="h2-semibold text-light-1">
                    {job?.title} Job{" "}
                    <span className="capitalize">({job?.workMode})</span>
                </h1>
                <div className="w-full border border-light-3/30 rounded-lg p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 tiny-regular border border-light-3 w-max rounded p-2">
                            <FaArrowTrendUp className="text-primary-600" />
                            <span className="text-gray-300">
                                Actively hiring
                            </span>
                        </div>
                        <div className="flex items-center gap-2 tiny-regular border border-yellow-500/60 w-max rounded p-2">
                            <LiaEarlybirds className="text-yellow-500 text-lg" />
                            <span className="text-gray-300">
                                Be an early applicant
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="h3-medium text-light-1">
                                {job?.title}
                            </h1>
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
                    <div className="flex items-center gap-2 py-4">
                        {getJobIcon(job?.workMode)}
                        <p className="small-regular text-gray-300 capitalize">
                            {job?.workMode}
                        </p>
                    </div>
                    <div className="py-4">
                        <div className="flex items-center gap-x-14">
                            <JobInfoBox
                                icon={<MdOutlineNotStarted />}
                                name="Start date"
                                value="Immediately"
                            />
                            <JobInfoBox
                                icon={<FaRegMoneyBillAlt />}
                                name="CTC (Annual)"
                                value={`₹${job?.minSalary} - ₹${job?.maxSalary}`}
                            />
                            <JobInfoBox
                                icon={<PiShoppingBagOpenDuotone />}
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
                            <span className="tiny-medium capitalize bg-dark-3 w-max py-1 px-2 rounded-sm text-gray-300">
                                Fresher job
                            </span>
                        ) : (
                            <span className="tiny-medium capitalize bg-dark-3 w-max py-1 px-2 rounded-sm text-gray-300">
                                {job?.experience} experience
                            </span>
                        )}
                        <span className="tiny-medium capitalize bg-dark-3 w-max py-1 px-2 rounded-sm text-gray-300">
                            {job?.jobType}
                        </span>
                    </div>
                    <div className="flex items-center justify-between pb-6">
                        <div className="text-light-3 flex items-center gap-2">
                            <FiUsers className="text-xl" />
                            <span>33 applicants</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() =>
                                    dispatch(handleBookmarkRequest(id))
                                }
                            >
                                {isJobExistsInBookmark() ? (
                                    <img
                                        src="/assets/icons/saved.svg"
                                        alt="bookmarked"
                                    />
                                ) : (
                                    <img
                                        src="/assets/icons/save.svg"
                                        alt="bookmark"
                                    />
                                )}
                            </button>
                            <button onClick={() => handleCopyToClipboard()}>
                                <img
                                    src="/assets/icons/share.svg"
                                    alt="bookmark"
                                />
                            </button>
                        </div>
                    </div>
                    <hr className="border-light-3/30" />
                    <div className="pt-6 flex flex-col gap-6">
                        <div className="flex flex-col">
                            <div className="flex flex-col gap-3">
                                <h1 className="base-medium text-light-3">
                                    About the job
                                </h1>
                                <span className="text-gray-300">
                                    Key responsibilities:{" "}
                                </span>
                            </div>
                            <ul className="list-inside pt-6">
                                {job?.responsibilities?.map((res, i) => (
                                    <li
                                        key={i}
                                        className="list-decimal text-gray-300"
                                    >
                                        {res}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="base-medium text-light-3">
                                Skill(s) required
                            </h1>
                            <div className="flex flex-wrap gap-4">
                                {job?.skills?.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="text-gray-300 small-regular bg-dark-4 py-1 px-2 rounded-md"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="base-medium text-light-3">
                                Who can apply
                            </h1>
                            <span className="text-gray-300 base-regular">
                                {job?.experience === "fresher"
                                    ? "Any fresher can apply"
                                    : `1. Candidates with minimum ${job?.experience} years of experience.`}
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="base-medium text-light-3">Salary</h1>
                            <div className="text-gray-300 base-regular">
                                Annual CTC: &nbsp; ₹{job?.minSalary}{" "}
                                &nbsp;&ndash;&nbsp; ₹{job?.maxSalary}/year
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="base-medium text-light-3">
                                Number of opening(s)
                            </h1>
                            <div className="text-gray-300 base-regular">
                                {job?.totalOpenings}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="base-medium text-light-3">
                                Job description
                            </h1>
                            <div className="text-gray-300 base-regular">
                                {job?.description}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="base-medium text-light-3">
                                About {job?.company?.name}
                            </h1>
                            <div className="text-gray-300 base-regular">
                                {job?.company?.description}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="base-medium text-light-3">
                                Other information
                            </h1>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-1">
                                    <IoMdGlobe className="text-blue-500 text-lg" />
                                    <button
                                        onClick={handleWebsiteLinkClick}
                                        className="text-blue-500 small-regular"
                                    >
                                        {job?.company?.website}
                                    </button>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MdOutlineMail className="text-light-3 text-lg" />
                                    <a
                                        href={`mailto:${job?.company?.email}`}
                                        className="text-gray-300 small-regular"
                                    >
                                        {job?.company?.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-1">
                                    <GrUserWorker className="text-light-3 text-lg" />
                                    <span className="text-gray-300 small-regular">
                                        Total employees:{" "}
                                        {job?.company?.totalEmployee}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <LuUserCheck className="text-light-3 text-lg" />
                                    <span className="text-gray-300 small-regular">
                                        64 candidates hired
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="shad-button_primary">
                            Apply now
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-dark-3 border-none sm:max-w-2xl p-0 rounded-lg overflow-hidden">
                        <DialogHeader className="bg-dark-4 p-6">
                            <DialogTitle className="h3-medium">
                                Apply for {job?.title} job
                            </DialogTitle>
                            <DialogTitle className="h3-regular text-light-3">
                                {job?.company?.name}
                            </DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="p-6 flex flex-col gap-10">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <h1 className="h4-medium text-light-2">
                                        Your resume
                                    </h1>
                                    &middot;
                                    <span className="text-light-3">
                                        updated on{" "}
                                        {multiFormatDateString(
                                            user?.resume?.uploadedOn
                                        )}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 base-regular">
                                    <p>
                                        Your current resume will be submitted
                                        along with this application.
                                    </p>
                                    <Link
                                        to="/profile/view"
                                        className="base-medium text-primary-600 cursor-pointer "
                                    >
                                        Edit resume
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-1">
                                    <h1 className="h4-medium text-light-2">
                                        Your availability
                                    </h1>
                                    <p className="base-regular">
                                        Confirm your availability for this role.
                                    </p>
                                </div>
                                <RadioGroup
                                    defaultValue="comfortable"
                                    className="flex flex-col gap-3 text-light-2"
                                >
                                    <div className="flex items-center space-x-4">
                                        <RadioGroupItem
                                            value="default"
                                            id="r1"
                                            className="w-5 h-5 border-2 text-primary-600 border-primary-600"
                                        />
                                        <Label
                                            htmlFor="r1"
                                            className="base-regular text-light-2"
                                        >
                                            Yes, I am available to join
                                            immediately.
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <RadioGroupItem
                                            value="comfortable"
                                            id="r2"
                                            className="w-5 h-5 border-2 text-primary-600 border-primary-600"
                                        />
                                        <Label
                                            htmlFor="r2"
                                            className="base-regular text-light-2"
                                        >
                                            No, I am currently on notice period
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <RadioGroupItem
                                            value="compact"
                                            id="r3"
                                            className="w-5 h-5 border-2 text-primary-600 border-primary-600"
                                        />
                                        <Label
                                            htmlFor="r3"
                                            className="base-regular text-light-2"
                                        >
                                            No, I will have to serve notice
                                            period
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <h1 className="h4-medium text-light-2">
                                            Custom resume
                                        </h1>
                                        <span className="base-regular">
                                            (optional)
                                        </span>
                                    </div>

                                    <p className="base-regular">
                                        Employer can download and view this
                                        resume.
                                    </p>
                                </div>
                                <UserResume resume={user?.resume} />
                            </div>
                        </DialogDescription>
                        <DialogFooter className="sm:justify-center pb-6">
                            <Button
                                className="shad-button_primary w-max mx-auto px-10"
                                onClick={dispatch(applyJob(job?._id))}
                            >
                                {loading ? (
                                    <div className="flex gap-2">
                                        <Loader />
                                        Submitting...
                                    </div>
                                ) : (
                                    "Submit application"
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default JobDetails;
