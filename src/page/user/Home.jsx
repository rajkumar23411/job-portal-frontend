import UserHomeSideBar from "@/components/shared/UserHomeSideBar";
import UserJobCard from "@/components/shared/UserJobCard";
import { loadBookmarks } from "@/redux/actions/bookmark.action";
import { getAllJobs } from "@/redux/actions/job.actions";
import {
    CLEAR_BOOKMARK_ERRORS,
    RESET_BOOKMARK_STATE,
} from "@/redux/constants/bookmark.constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Home = () => {
    const { jobs } = useSelector((state) => state.jobs);
    const {
        loading,
        success: bookmarkSuccess,
        error: bookmarkError,
        bookmarks,
        message,
    } = useSelector((state) => state.bookmark);
    const dispatch = useDispatch();

    const isJobExisitsInBookmark = (job_id) =>
        bookmarks?.jobs?.some((b) => b._id === job_id);

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
        dispatch(getAllJobs());
        dispatch(loadBookmarks());
    }, []);
    return (
        <div className="flex-center w-full">
            <div className="w-2/3 flex gap-6">
                <UserHomeSideBar />
                <div className=" flex-1 flex flex-col gap-4 h-max overflow-y-auto">
                    {jobs?.map((job) => (
                        <UserJobCard
                            key={job._id}
                            job={job}
                            isJobExisitsInBookmark={isJobExisitsInBookmark}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
