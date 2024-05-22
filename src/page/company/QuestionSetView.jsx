import { getSingleQuestionSet } from "@/redux/actions/question.action";
import {
    RESET_QUESTION_ERRORS,
    RESET_QUESTION_STATE,
} from "@/redux/constants/question.constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const QuestionSetView = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { questionSet, success, error } = useSelector(
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
        dispatch(getSingleQuestionSet(id));
    }, [id, dispatch]);
    return (
        <div className="h-max w-full">
            <div className="h4-medium w-full flex justify-between">
                <h1>Question set / {questionSet.title}</h1>
                <h1>Total questions: {questionSet?.questions?.length}</h1>
            </div>
            <ul className="list-inside flex flex-col gap-8 pt-8">
                {questionSet?.questions?.map((q) => (
                    <div
                        key={q._id}
                        className="flex flex-col gap-3 bg-dark-3 w-full p-3 rounded"
                    >
                        <li className="list-decimal base-medium text-light-2">
                            {q.question}
                        </li>
                        <div className="flex flex-col gap-2">
                            <label className="shad-form_label text-gray-400">
                                Given options
                            </label>
                            <ul className="list-inside flex gap-10 pl-10">
                                {q.options.map((o) => (
                                    <li
                                        key={o._id}
                                        className="list-decimal base-medium text-light-2"
                                    >
                                        {o}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-light-3 base-medium">
                                Correct option:{" "}
                            </span>
                            <span>
                                {q.correctAnswer}. &nbsp;
                                {q.options[q.correctAnswer - 1]}
                            </span>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default QuestionSetView;
