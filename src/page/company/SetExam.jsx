import { loadJobs } from "@/redux/actions/company.actions";
import { getQuestionSets } from "@/redux/actions/question.action";
import { RESET_JOB_STATE } from "@/redux/constants/jobs.constants";
import {
    RESET_QUESTION_ERRORS,
    RESET_QUESTION_STATE,
} from "@/redux/constants/question.constants";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
    CLEAR_EXAM_ERRORS,
    RESET_EXAM_STATE,
} from "@/redux/constants/exam.constants";
import { assignExam } from "@/redux/actions/exam.actions";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/shared/Loader";

const SetExam = () => {
    const {
        success: qsnSucces,
        error: qsnError,
        questionSets,
    } = useSelector((state) => state.question);
    const {
        success: jobSucces,
        error: jobError,
        jobs,
    } = useSelector((state) => state.company);
    const { loading, success, error, message } = useSelector(
        (state) => state.exam
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        candidate_id: "",
        duration: "",
        jobPost: "",
        questionSets: [],
    });

    const handleAddQuestionSets = (value) => {
        // check already added or not
        if (formData.questionSets.includes(value)) {
            return;
        }
        setFormData({
            ...formData,
            questionSets: [...formData.questionSets, value],
        });
    };
    const handleRemoveQuestionSets = (index) => {
        const newQuestionSets = [...formData.questionSets];
        newQuestionSets.splice(index, 1);
        setFormData({
            ...formData,
            questionSets: newQuestionSets,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(assignExam(formData));
    };

    useEffect(() => {
        if (success) {
            toast.success(message);
            navigate("/company/exam-hub");
            dispatch({ type: RESET_EXAM_STATE });
        }
        if (error) {
            toast.error(error);
            dispatch({ type: CLEAR_EXAM_ERRORS });
        }
    }, [success, error, message, dispatch, navigate]);

    useEffect(() => {
        if (qsnSucces) {
            dispatch({ type: RESET_QUESTION_STATE });
        }
        if (jobSucces || jobError) {
            dispatch({ type: RESET_JOB_STATE });
        }
        if (qsnError) {
            dispatch({ type: RESET_QUESTION_ERRORS });
        }
    }, [qsnSucces, jobSucces, qsnError, jobError, dispatch]);

    useEffect(() => {
        dispatch(loadJobs());
        dispatch(getQuestionSets());
    }, []);
    return (
        <div className="h-max w-full">
            <h1 className="h3-medium text-light-2">Assign exam </h1>
            <div className="w-full flex-center flex-col">
                <form
                    className="w-500 p-4 flex flex-col gap-6 bg-dark-3 rounded-lg"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-1">
                        <label htmlFor="candidate" className="shad-form_label">
                            Candidate email
                        </label>
                        <input
                            type="email"
                            placeholder="Type candidate email here"
                            className="shad-input"
                            value={formData.candidate_id}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    candidate_id: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="duration" className="shad-form_label">
                            Add exam duration
                        </label>
                        <input
                            type="number"
                            className="shad-input remove-arrow"
                            placeholder="e.g, 10, 20, 25, 60, 90 .... (in minutes)"
                            value={formData.duration}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    duration: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="duration" className="shad-form_label">
                            Select job post
                        </label>
                        <select
                            value={formData.jobPost}
                            className={`shad-input ${
                                formData.jobPost === ""
                                    ? "text-light-3"
                                    : "text-light-2"
                            }`}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    jobPost: e.target.value,
                                })
                            }
                        >
                            <option value="">Select a job</option>
                            {jobs?.map((job) => (
                                <option
                                    key={job?._id}
                                    value={job?._id}
                                    className="text-light-2"
                                >
                                    {job?.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="duration" className="shad-form_label">
                            Assign question sets
                        </label>
                        {formData.questionSets.length > 0 && (
                            <div className="py-2 flex flex-wrap gap-3">
                                {formData.questionSets.map((q, index) => (
                                    <div
                                        key={index}
                                        className="tiny-medium bg-primary-500/20 text-light-2 px-2 py-1 flex items-center gap-2 w-max rounded-lg"
                                    >
                                        {q}
                                        <RxCross2
                                            className="text-lg"
                                            onClick={() =>
                                                handleRemoveQuestionSets(index)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        <select
                            onChange={(e) =>
                                handleAddQuestionSets(e.target.value)
                            }
                            className={`shad-input ${
                                formData.job_id === ""
                                    ? "text-light-3"
                                    : "text-light-2"
                            }`}
                        >
                            <option value="">Select question set</option>
                            {questionSets?.map((set) => (
                                <option
                                    key={set?._id}
                                    value={set?._id}
                                    className="text-light-2"
                                >
                                    {set?.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Button type="submit" className="shad-button_primary">
                        {loading ? (
                            <div className="flex gap-2">
                                <Loader />
                                Assigning...
                            </div>
                        ) : (
                            "Assign test"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SetExam;
