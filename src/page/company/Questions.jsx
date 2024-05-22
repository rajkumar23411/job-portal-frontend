import { getQuestionSets } from "@/redux/actions/question.action";
import { useEffect } from "react";
import { GoPlus, GoTrash } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box } from "./Jobs";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
    RESET_QUESTION_ERRORS,
    RESET_QUESTION_STATE,
} from "@/redux/constants/question.constants";

const Questions = () => {
    const dispatch = useDispatch();
    const { success, error, questionSets } = useSelector(
        (state) => state.question
    );
    useEffect(() => {
        if (success) {
            dispatch({ type: RESET_QUESTION_STATE });
        }
        if (error) {
            dispatch({ type: RESET_QUESTION_ERRORS });
        }
    }, [success, error, dispatch]);
    useEffect(() => {
        dispatch(getQuestionSets());
    }, [dispatch]);
    return (
        <div className="w-full h-max flex flex-col gap-4">
            <h1 className="h3-medium text-light-2">Question hub</h1>
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
                    {questionSets?.map((q) => (
                        <Link
                            to={`/company/questions/set/${q._id}`}
                            className="w-60 h-36 bg-dark-4 rounded-xl flex-center gap-4 flex-col cursor-pointer hover:border hover:border-light-3 relative"
                            key={q._id}
                        >
                            <button
                                title="Delete set"
                                className="absolute top-4 right-4 text-lg text-red-500 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <GoTrash />
                            </button>
                            <IoDocumentTextOutline className="text-3xl text-light-3" />
                            <p className="text-light-2 w-fit base-regular text-center">
                                {q?.title}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Questions;
