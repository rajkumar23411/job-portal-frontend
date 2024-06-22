import {
    deleteQuestionSet,
    getQuestionSets,
} from "@/redux/actions/question.action";
import { useEffect, useState } from "react";
import { GoPlus, GoTrash } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box } from "./Jobs";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
    RESET_QUESTION_ERRORS,
    RESET_QUESTION_STATE,
} from "@/redux/constants/question.constants";
import { toast } from "react-toastify";

const Questions = () => {
    const dispatch = useDispatch();
    const { success, error, questionSets, message } = useSelector(
        (state) => state.question
    );
    const [category, setCategory] = useState("");

    useEffect(() => {
        if (success) {
            toast.success(message);
            dispatch({ type: RESET_QUESTION_STATE });
        }
        if (error) {
            toast.error(error);
            dispatch({ type: RESET_QUESTION_ERRORS });
        }
    }, [success, error, dispatch, message]);

    useEffect(() => {
        dispatch(getQuestionSets(category));
    }, [dispatch, message, category]);
    return (
        <div className="w-full h-max flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="h3-medium text-light-2">
                    Question hub{" "}
                    {category !== "" ? <span>/ Category: {category}</span> : ""}
                </h1>
                <div>
                    <form>
                        <select
                            className="shad-input w-48 text-light-2 px-3"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option defaultValue="" className="text-light-3">
                                Select status
                            </option>
                            <option value="">All</option>
                            {[
                                "General knowledge",
                                "Aptitude",
                                "Reasoning",
                                "Technical",
                            ].map((cat, index) => (
                                <option value={cat} key={index}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </form>
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                <Box
                    heading={"Total question sets"}
                    value={questionSets?.length}
                />
                <Link
                    to="/company/questions/set/create"
                    className="w-60 h-36 bg-dark-4 rounded-xl flex-center gap-1 flex-col cursor-pointer hover:border hover:border-light-3"
                >
                    <GoPlus className="text-5xl text-light-3" />
                    <p className="text-light-2">Create new question set</p>
                </Link>
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="h3-medium text-light-2">Question sets</h1>
                <div className="flex flex-wrap gap-4">
                    {questionSets?.length <= 0 ? (
                        <div className="w-full text-center h4-medium text-light-3 py-20">
                            No question sets found
                        </div>
                    ) : (
                        questionSets?.map((q) => (
                            <Link
                                to={`/company/questions/set/${q._id}`}
                                className="w-60 h-36 bg-dark-4 rounded-xl flex-center gap-4 flex-col cursor-pointer hover:border hover:border-light-3 relative"
                                key={q._id}
                            >
                                <button
                                    title="Delete set"
                                    className="absolute top-4 right-4 text-lg text-red-500 cursor-pointer"
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        dispatch(deleteQuestionSet(q._id));
                                    }}
                                >
                                    <GoTrash />
                                </button>
                                <IoDocumentTextOutline className="text-3xl text-light-3" />
                                <div className="text-center">
                                    <p className="text-light-2 w-fit small-regular ">
                                        {q?.title}
                                    </p>
                                    <p className="small-medium text-light-3">
                                        {q.category}
                                    </p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Questions;
