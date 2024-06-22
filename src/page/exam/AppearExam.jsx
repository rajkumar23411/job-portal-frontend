import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
    getCandidateDetails,
    leaveExam,
    submitExam,
} from "@/redux/actions/exam.actions";
import CustomCheckBox from "@/components/shared/CustomCheckBox";
import { useNavigate } from "react-router-dom";
import {
    CLEAR_EXAM_ERRORS,
    RESET_EXAM_STATE,
} from "@/redux/constants/exam.constants";
import { toast } from "react-toastify";
import Timer from "../company/Timer";

const AppearExam = () => {
    const { loading, submitSuccess, leftSuccess, error, details } = useSelector(
        (state) => state.exam
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [questionSets, setQuestionSets] = useState([]);
    const [currentSetIndex, setCurrentSetIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        if (details && details.questionSets) {
            setQuestionSets(details.questionSets);
        }
    }, [details]);

    useEffect(() => {
        dispatch(getCandidateDetails());
    }, [dispatch]);

    const handleOptionChange = (option) => {
        const updatedAnswers = { ...answers };
        const questionId = `${currentSetIndex}-${currentQuestionIndex}`;
        updatedAnswers[questionId] = option;
        setAnswers(updatedAnswers);
    };

    const handleSubmitAnswers = async () => {
        const data = {
            examId: details._id,
            answers: Object.keys(answers).map((key) => {
                const [setIndex, questionIndex] = key.split("-").map(Number);
                return {
                    setId: questionSets[setIndex]._id,
                    questionId:
                        questionSets[setIndex].questions[questionIndex]._id,
                    answer: answers[key] + 1, // Assuming answers[key] is 0-based index, and you need to send 1-based index
                };
            }),
        };
        console.log(data);
        dispatch(submitExam(data));
    };

    const handleNextQuestion = () => {
        const currentSet = questionSets[currentSetIndex];
        if (currentQuestionIndex < currentSet.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (currentSetIndex < questionSets.length - 1) {
            setCurrentSetIndex(currentSetIndex + 1);
            setCurrentQuestionIndex(0);
        } else {
            handleSubmitAnswers();
        }
    };

    // const handlePreviousQuestion = () => {
    //     if (currentQuestionIndex > 0) {
    //         setCurrentQuestionIndex(currentQuestionIndex - 1);
    //     } else if (currentSetIndex > 0) {
    //         setCurrentSetIndex(currentSetIndex - 1);
    //         setCurrentQuestionIndex(
    //             questionSets[currentSetIndex - 1].questions.length - 1
    //         );
    //     }
    // };

    const clearResponse = () => {
        const updatedAnswers = { ...answers };
        const questionId = `${currentSetIndex}-${currentQuestionIndex}`;
        delete updatedAnswers[questionId];
        setAnswers(updatedAnswers);
    };

    const currentSet = questionSets[currentSetIndex];
    const currentQuestion = currentSet?.questions?.[currentQuestionIndex];

    const totalQuestions = questionSets.reduce(
        (acc, set) => acc + set.questions.length,
        0
    );

    const globalQuestionIndex =
        questionSets
            .slice(0, currentSetIndex)
            .reduce((acc, set) => acc + set.questions.length, 0) +
        currentQuestionIndex +
        1;

    // here handle tab close and handle page referesh
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            // Show confirmation dialog
            const confirmationMessage =
                "Are you sure you want to leave? Your progress will be lost.";
            event.returnValue = confirmationMessage; // Standard way to trigger confirmation dialog
            return confirmationMessage;
        };

        const handleUnload = (event) => {
            // Handle the custom confirmation dialog
            if (
                !window.confirm(
                    "Are you sure you want to leave the exam? Your progress will be lost."
                )
            ) {
                event.preventDefault();
                event.returnValue = ""; // Ensure the beforeunload event is cancelled
            } else {
                // Trigger the leave exam action if the user confirms leaving
                console.log("Leaving exam ....");
                dispatch(leaveExam());
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("unload", handleUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("unload", handleUnload);
        };
    }, [dispatch, details]);

    useEffect(() => {
        if (leftSuccess) {
            navigate("/exam/candidate/appear/success");
            dispatch({ type: RESET_EXAM_STATE });
        }
        if (submitSuccess) {
            navigate("/exam/candidate/appear/success", {
                state: { success: true },
            });
            dispatch({ type: RESET_EXAM_STATE });
        }
        if (error) {
            toast.error(error);
            dispatch({ type: CLEAR_EXAM_ERRORS });
        }
    }, [submitSuccess, error, dispatch, navigate, loading, leftSuccess]);

    return (
        <div className="h-screen w-screen flex gap-2 p-2">
            <aside className="flex-[0.3] h-full bg-dark-3 py-10 flex flex-col justify-between gap-10">
                <div>
                    <Timer duration={details?.duration} />
                    <div className="border-y border-primary-600/30 p-4 flex flex-col gap-6 mt-6">
                        <h1 className="h4-medium text-light-3">Instructions</h1>
                        <ul className="list-inside flex flex-col gap-2 text-light-2">
                            <li className="list-decimal text-sm font-light">
                                Once a question is answered, it cannot be
                                undone.
                            </li>
                            <li className="list-decimal text-sm font-light">
                                You will be automatically logged out after the
                                complition of the alloted duration.
                            </li>
                            <li className="list-decimal text-sm font-light">
                                Once you leave the exam, you cannot resume it.
                            </li>
                            <li className="list-decimal text-sm font-light">
                                You can quit the exam at any time.
                            </li>
                            <li className="list-decimal text-sm font-light">
                                After closing the tab during the exam, you will
                                be considered as failed.
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full px-10">
                    <Button
                        className="shad-button_danger-outlined w-full"
                        type="button"
                        onClick={() => dispatch(leaveExam())}
                    >
                        Leave exam
                    </Button>
                </div>
            </aside>
            <div className="flex-1 h-full bg-dark-3 p-4 flex flex-col gap-10">
                <div className="flex items-center justify-between">
                    <h1 className="h3-semibold text-light-2">
                        Questions: {currentSet?.category}
                    </h1>
                    <h1 className="h4-medium text-light-3">
                        Total Questions: {totalQuestions}
                    </h1>
                </div>
                {currentQuestion && (
                    <div className="flex flex-col gap-6">
                        <div className="text-lg">
                            {globalQuestionIndex}. {currentQuestion.question}
                        </div>
                        <div>
                            <p className="base-regular text-light-3">
                                Choose the correct option:
                            </p>
                            <ul className="list-inside pt-4 flex flex-col gap-2">
                                {currentQuestion.options.map(
                                    (option, index) => (
                                        <li
                                            key={index}
                                            className="list-decimal flex items-center gap-4"
                                        >
                                            <p className="text-gray-300 w-5">
                                                {index + 1}.{" "}
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <CustomCheckBox
                                                    value={option}
                                                    checked={
                                                        answers[
                                                            `${currentSetIndex}-${currentQuestionIndex}`
                                                        ] === index
                                                    }
                                                    handleClick={() =>
                                                        handleOptionChange(
                                                            index
                                                        )
                                                    }
                                                />
                                                <label htmlFor={option}>
                                                    {option}
                                                </label>
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div className="flex items-center justify-between mt-20">
                            <div className="flex items-center gap-4">
                                <Button
                                    className="shad-button_primary-outlined"
                                    onClick={clearResponse}
                                >
                                    Clear response
                                </Button>
                                <Button
                                    className="shad-button_primary"
                                    onClick={handleNextQuestion}
                                >
                                    {currentSetIndex <
                                        questionSets.length - 1 ||
                                    currentQuestionIndex <
                                        currentSet.questions.length - 1
                                        ? "Submit and next"
                                        : "Confirm submissions"}
                                </Button>
                            </div>
                        </div>
                        {/* {(currentQuestionIndex > 0 || currentSetIndex > 0) && (
                            <Button
                                className="shad-button_primary-outlined mt-4"
                                onClick={handlePreviousQuestion}
                            >
                                Previous
                            </Button>
                        )} */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppearExam;
