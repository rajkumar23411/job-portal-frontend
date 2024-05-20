import BookmarkCard from "@/components/shared/BookmarkCard";
import { loadBookmarks } from "@/redux/actions/bookmark.action";
import {
    CLEAR_BOOKMARK_ERRORS,
    RESET_BOOKMARK_STATE,
} from "@/redux/constants/bookmark.constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Bookmarks = () => {
    const { success, error, message, bookmarks } = useSelector(
        (state) => state.bookmark
    );
    const dispatch = useDispatch();
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

    return (
        <div className="flex w-full items-center justify-center flex-col h-max py-20">
            <div className="w-1/2 flex flex-col gap-10 flex-center">
                <h1 className="h2-medium">My Bookmarks</h1>
                {bookmarks?.jobs?.length > 0 ? (
                    <div className="w-full flex flex-col gap-4">
                        {bookmarks?.jobs?.map((job) => (
                            <BookmarkCard key={job._id} job={job} />
                        ))}
                    </div>
                ) : (
                    <div className="w-full flex flex-col gap-10 flex-center">
                        <img
                            src={
                                "https://internshala.com/static/images/bookmarks/no_bookmark_image.svg"
                            }
                            alt="bookmark"
                            className="h-72"
                            draggable="false"
                        />
                        <div className="flex-center flex-col gap-2">
                            <h1 className="h3-medium text-light-2">
                                No bookmarks
                            </h1>
                            <p className="base-regular text-light-3">
                                You have no active bookmarked jobs
                            </p>
                        </div>
                        <Link
                            to="/"
                            className="shad-button_primary flex-center px-4 rounded-lg"
                        >
                            Browse jobs
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bookmarks;
