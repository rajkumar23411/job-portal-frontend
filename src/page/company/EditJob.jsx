import FormError from "@/components/shared/FormError";
import Loader from "@/components/shared/Loader";
import { DropDownMenu } from "@/components/shared/UserHomeSideBar";
import { Button } from "@/components/ui/button";
import { newJobSchema } from "@/lib/validation/company/NewJobValidation";
import { loadSingleJob, updateJob } from "@/redux/actions/company.actions";
import { RESET_COMPANY } from "@/redux/constants/company.constants";
import { location, profile } from "@/utils";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ShowSkills({ data, handleClick }) {
    return data?.map((d, i) => (
        <div
            key={i}
            className="w-max p-2 flex-center gap-2 bg-dark-4 rounded-xl"
        >
            <div className="small-medium">{d}</div>
            <button
                type="button"
                onClick={() => handleClick(i)}
                className="text-xl text-gray-600 hover:text-primary-600"
            >
                <MdOutlineClose />
            </button>
        </div>
    ));
}

const EditJob = () => {
    const { loading, job, success, error, message } = useSelector(
        (state) => state.company
    );

    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const [showSkillsDropDown, setShowSkillsDropDown] = useState(false);
    const [skill, setSkill] = useState("");
    const [selectedSkills, setSelectedSkills] = useState(job?.skills || []);

    const [showLocationDropDown, setShowLocationDropDown] = useState(false);
    const [locationValue, setLocationValue] = useState("");
    const [selectedLocations, setSelectedLocations] = useState(
        job?.locations || []
    );

    const initialValues = {
        title: job?.title || "",
        description: job?.description || "",
        experience: job?.experience || "",
        totalOpenings: job?.totalOpenings || "",
        minSalary: job?.minSalary || "",
        maxSalary: job?.maxSalary || "",
        jobType: job?.jobType || "",
        status: job?.status || "",
    };

    const getProperData = (value1, value2) =>
        value1 === ""
            ? value2
            : value2.filter((val) =>
                  val.toLowerCase().startsWith(value1.toLowerCase())
              );

    const handleAddSkill = (val) => {
        setSelectedSkills([...selectedSkills, val]);
    };
    const handleRemoveSkill = useCallback(
        (index) => {
            setSelectedSkills(selectedSkills.filter((item, i) => i !== index));
        },
        [selectedSkills]
    );

    const handleAddLocation = (val) => {
        setSelectedLocations([...selectedLocations, val]);
    };
    const handleRemoveLocation = useCallback(
        (index) => {
            setSelectedLocations(
                selectedLocations.filter((item, i) => i !== index)
            );
        },
        [selectedLocations]
    );

    const handleSubmit = (values) => {
        const data = {
            ...values,
            skills: selectedSkills,
            locations: selectedLocations,
        };
        dispatch(updateJob(id, data));
    };

    useEffect(() => {
        if (message) {
            toast.success(message);
            navigate(`/company/job/${id}`);
            dispatch({ type: RESET_COMPANY });
        }
        if (error) {
            toast.error(error);
            dispatch({ type: RESET_COMPANY });
        }
    }, [success, error, dispatch, message, navigate, id]);

    useEffect(() => {
        dispatch(loadSingleJob(id));
    }, [dispatch, id]);

    return (
        <div className="pb-8">
            <p className="text-gray-300 h3-medium">
                <span>Job / Edit / {job?.title}</span>
            </p>
            <div className="flex-center flex-col py-10">
                <div className="sm:w-565">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={newJobSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="title"
                                    className="shad-form_label"
                                >
                                    Title*
                                </label>
                                <Field
                                    type="text"
                                    id="title"
                                    name="title"
                                    className={`shad-input`}
                                    placeholder="E.g. Web developer"
                                />
                                <ErrorMessage
                                    name="title"
                                    component={FormError}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="description"
                                    className="shad-form_label"
                                >
                                    Description*
                                </label>
                                <Field
                                    as="textarea"
                                    placeholder="Write a brief description of the job here"
                                    id="description"
                                    name="description"
                                    className={`shad-input h-32 resize-none custom-scrollbar`}
                                />
                                <ErrorMessage
                                    name="description"
                                    component={FormError}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex flex-col gap-1 w-full">
                                    <label
                                        htmlFor="description"
                                        className="shad-form_label"
                                    >
                                        Experience*
                                    </label>
                                    <Field
                                        type="text"
                                        id="experience"
                                        name="experience"
                                        className={`shad-input`}
                                    />
                                    <ErrorMessage
                                        name="experience"
                                        component={FormError}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <label
                                        htmlFor="description"
                                        className="shad-form_label"
                                    >
                                        Job type*
                                    </label>
                                    <Field
                                        as="select"
                                        type="text"
                                        id="jobType"
                                        name="jobType"
                                        className={`shad-input`}
                                    >
                                        <option defaultValue={""}>
                                            Select
                                        </option>
                                        <option value="full time">
                                            Full Time
                                        </option>
                                        <option value="part time">
                                            Part Time
                                        </option>
                                        <option value="contractual">
                                            Contractual
                                        </option>
                                    </Field>
                                    <ErrorMessage
                                        name="jobType"
                                        component={FormError}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label
                                    htmlFor="description"
                                    className="shad-form_label"
                                >
                                    Total Openings*
                                </label>
                                <Field
                                    type="text"
                                    id="totalOpenings"
                                    name="totalOpenings"
                                    className={`shad-input`}
                                />
                                <ErrorMessage
                                    name="totalOpenings"
                                    component={FormError}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex flex-col gap-1 w-full">
                                    <label
                                        htmlFor="description"
                                        className="shad-form_label"
                                    >
                                        Minimum Salary (INR)*
                                    </label>
                                    <Field
                                        type="number"
                                        id="minSalary"
                                        name="minSalary"
                                        className={`shad-input remove-arrow`}
                                        placeholder="e.g. 3500000"
                                    />
                                    <ErrorMessage
                                        name="salary"
                                        component={FormError}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <label
                                        htmlFor="description"
                                        className="shad-form_label"
                                    >
                                        Maximum Salary (INR)*
                                    </label>
                                    <Field
                                        type="number"
                                        id="maxSalary"
                                        name="maxSalary"
                                        className={`shad-input remove-arrow`}
                                        placeholder="e.g. 4000000"
                                    />
                                    <ErrorMessage
                                        name="salary"
                                        component={FormError}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="description"
                                    className="shad-form_label"
                                >
                                    Location*
                                </label>
                                {selectedLocations.length > 0 && (
                                    <div className="w-full flex flex-wrap gap-3 py-2">
                                        <ShowSkills
                                            data={selectedLocations}
                                            handleClick={handleRemoveLocation}
                                        />
                                    </div>
                                )}
                                <div className="h-full w-full relative">
                                    <input
                                        type="text"
                                        className="shad-input"
                                        placeholder="e.g. Marketing, Desinger"
                                        value={locationValue}
                                        onChange={(e) =>
                                            setLocationValue(e.target.value)
                                        }
                                        onFocus={() =>
                                            setShowLocationDropDown(true)
                                        }
                                        onBlur={() =>
                                            setShowLocationDropDown(false)
                                        }
                                    />
                                    {showLocationDropDown && (
                                        <DropDownMenu
                                            data={() =>
                                                getProperData(
                                                    locationValue,
                                                    location
                                                )
                                            }
                                            values={selectedLocations}
                                            handleClick={handleAddLocation}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="description"
                                    className="shad-form_label"
                                >
                                    Skills*
                                </label>
                                {selectedSkills.length > 0 && (
                                    <div className="w-full flex flex-wrap gap-3 py-2">
                                        <ShowSkills
                                            data={selectedSkills}
                                            handleClick={handleRemoveSkill}
                                        />
                                    </div>
                                )}
                                <div className="h-full w-full relative">
                                    <input
                                        type="text"
                                        className="shad-input"
                                        placeholder="e.g. Marketing, Desinger"
                                        value={skill}
                                        onChange={(e) =>
                                            setSkill(e.target.value)
                                        }
                                        onFocus={() =>
                                            setShowSkillsDropDown(true)
                                        }
                                        onBlur={() =>
                                            setShowSkillsDropDown(false)
                                        }
                                    />
                                    {showSkillsDropDown && (
                                        <DropDownMenu
                                            data={() =>
                                                getProperData(skill, profile)
                                            }
                                            values={selectedSkills}
                                            handleClick={handleAddSkill}
                                        />
                                    )}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="shad-button_primary"
                            >
                                {loading ? (
                                    <div className="flex gap-2">
                                        <Loader />
                                        updating...
                                    </div>
                                ) : (
                                    "Update"
                                )}
                            </Button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default EditJob;
