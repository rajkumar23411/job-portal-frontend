import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { createQuestionSet } from "@/redux/actions/question.action";
import {
    RESET_QUESTION_ERRORS,
    RESET_QUESTION_STATE,
} from "@/redux/constants/question.constants";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SetQuestions = () => {
    const [title, setTitle] = useState("");
    const [inputs, setInputs] = useState([
        {
            question: "",
            options: ["", "", "", ""],
            correctAnswer: "",
        },
    ]);

    const { loading, success, error, message } = useSelector(
        (state) => state.question
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleAddInput = () => {
        setInputs([
            ...inputs,
            { question: "", options: ["", "", "", ""], correctAnswer: "" },
        ]);
    };
    const handleRemoveInput = (index) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
    };

    const handleOptionChange = (inputIndex, optionIndex, value) => {
        const newInputs = inputs.map((input, i) => {
            if (i === inputIndex) {
                const newOptions = input.options.map((option, j) =>
                    j === optionIndex ? value : option
                );
                return { ...input, options: newOptions };
            }
            return input;
        });
        setInputs(newInputs);
    };
    const handleQuestionChange = (index, value) => {
        const newInputs = inputs.map((input, i) =>
            i === index ? { ...input, question: value } : input
        );
        setInputs(newInputs);
    };
    const handleCorrectAnswerChange = (inputIndex, optionIndex) => {
        const newInputs = inputs.map((input, i) =>
            i === inputIndex ? { ...input, correctAnswer: optionIndex } : input
        );
        setInputs(newInputs);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createQuestionSet({ title, questions: inputs }));
    };

    useEffect(() => {
        if (success) {
            toast.success(message);
            navigate("/company/questions");
            dispatch({ type: RESET_QUESTION_STATE });
        }
        if (error) {
            toast.error(error);
            dispatch({ type: RESET_QUESTION_ERRORS });
        }
    }, [success, error, message, dispatch, navigate]);
    return (
        <div className="h-max w-full flex flex-col gap-6">
            <h1 className="h3-medium text-light-2">Create new question set</h1>

            <div className="w-full flex-center flex-col">
                <form
                    className="w-565 h-max flex flex-col gap-3"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="shad-form_label">
                            Title
                        </label>
                        <input
                            type="text"
                            placeholder="Question set title"
                            className="shad-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    {inputs.map((input, index) => (
                        <div
                            className="flex flex-col gap-3 bg-dark-3 px-2 py-4 rounded-lg"
                            key={index}
                        >
                            <div className="flex flex-col gap-2">
                                <div className="w-full flex justify-between">
                                    <label
                                        htmlFor="question"
                                        className="shad-form_label"
                                    >
                                        Questions
                                    </label>
                                    <button
                                        className="text-red-500 tiny-medium cursor-pointer"
                                        onClick={() => handleRemoveInput(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                                <textarea
                                    type="text"
                                    placeholder="Type the question here"
                                    className="shad-textarea"
                                    value={input.question}
                                    onChange={(e) =>
                                        handleQuestionChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {input.options.map((option, optionIndex) => (
                                    <div className="w-full" key={optionIndex}>
                                        <label
                                            htmlFor={`option${optionIndex + 1}`}
                                            className="shad-form_label"
                                        >
                                            Option {optionIndex + 1}
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type the option here"
                                            className="shad-input"
                                            value={option}
                                            onChange={(e) =>
                                                handleOptionChange(
                                                    index,
                                                    optionIndex,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                            {input.options.some((option) => option !== "") && (
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="correctAnswer"
                                        className="shad-form_label"
                                    >
                                        Select correct option
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {input.options.map(
                                            (option, optionIndex) => (
                                                <div
                                                    key={optionIndex}
                                                    className="flex gap-2"
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`correctedAnswer${index}`}
                                                        id={`correctAnswer-${index}-${optionIndex}`}
                                                        checked={
                                                            input.correctAnswer ===
                                                            optionIndex + 1
                                                        }
                                                        onChange={() =>
                                                            handleCorrectAnswerChange(
                                                                index,
                                                                optionIndex + 1
                                                            )
                                                        }
                                                        className="peer h-5 w-5 border-2 border-light-3 rounded-full overflow-hidden appearance-none checked:after:content-['\2713'] checked:after:flex-center checked:after:h-full checked:after:w-full checked:after:base-regular checked:after:text-white hover:bg-light-3 checked:after:bg-primary-600 checked:border-primary-600"
                                                    />
                                                    <label
                                                        htmlFor={`correctAnswer-${index}-${optionIndex}`}
                                                        className="base-regular text-light-2"
                                                    >
                                                        Option {optionIndex + 1}
                                                    </label>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="w-full mt-4">
                        <button
                            className="shad-button_primary-outlined flex-center px-4 py-2 rounded-lg ml-auto tiny-medium"
                            type="button"
                            onClick={handleAddInput}
                        >
                            <GoPlus className="text-xl text-light-3" />
                            Add more questions
                        </button>
                    </div>
                    <Button className="shad-button_primary" type="submit">
                        {loading ? (
                            <div className="flex gap-2">
                                <Loader />
                                Creating...
                            </div>
                        ) : (
                            "Create"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SetQuestions;
