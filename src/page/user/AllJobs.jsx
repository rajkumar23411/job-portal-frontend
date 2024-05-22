import UserHomeSideBar from "@/components/shared/UserHomeSideBar";
import UserJobCard from "@/components/shared/UserJobCard";
import { loadUserApplications } from "@/redux/actions/application.action";
import { loadBookmarks } from "@/redux/actions/bookmark.action";
import {
    CLEAR_BOOKMARK_ERRORS,
    RESET_BOOKMARK_STATE,
} from "@/redux/constants/bookmark.constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllJobs = () => {
    const { jobs } = useSelector((state) => state.jobs);
    const { applications } = useSelector((state) => state.application);
    const {
        loading,
        success: bookmarkSuccess,
        error: bookmarkError,
        message,
        bookmarks,
    } = useSelector((state) => state.bookmark);
    const dispatch = useDispatch();

    const isJobExisitsInBookmark = (job_id) =>
        bookmarks?.jobs?.some((b) => b._id === job_id);
    const isAlreadyApplied = (job_id) => {
        return applications?.some((app) => app?.job?._id === job_id);
    };

    useEffect(() => {
        if (bookmarkSuccess && !loading) {
            toast.success(message);
            dispatch(loadBookmarks());
            dispatch({ type: RESET_BOOKMARK_STATE });
        }
        if (bookmarkError) {
            toast.error(bookmarkError);
            dispatch({ type: CLEAR_BOOKMARK_ERRORS });
        }
    }, [bookmarkSuccess, bookmarkError, message, dispatch, loading]);

    useEffect(() => {
        dispatch(loadBookmarks());
        dispatch(loadUserApplications());
    }, [dispatch]);
    return (
        <div className="flex-center w-full h-max py-10">
            <div className="w-2/3 flex gap-4 h-[900px] overflow-y-auto">
                <UserHomeSideBar />

                <div className="flex-1 flex flex-col gap-4 h-full overflow-y-auto no-scrollbar">
                    {jobs?.length <= 0 ? (
                        <div className="w-full h-full flex-center bg-dark-3 rounded-lg">
                            <h1 className="h2-semibold">No jobs found</h1>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col gap-3">
                            {jobs?.map((job) => (
                                <UserJobCard
                                    key={job._id}
                                    job={job}
                                    isJobExisitsInBookmark={
                                        isJobExisitsInBookmark
                                    }
                                    isAlreadyApplied={isAlreadyApplied}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllJobs;
