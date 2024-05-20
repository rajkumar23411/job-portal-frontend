import FormError from "@/components/shared/FormError";
import { Button } from "@/components/ui/button";
import { newJobSchema } from "@/lib/validation/company/NewJobValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RESET_ACCOUNT } from "@/redux/constants/user.constants";
import { toast } from "react-toastify";
import Loader from "@/components/shared/Loader";
import { createJob } from "@/redux/actions/company.actions";
import { DropDownMenu, ShowData } from "@/components/shared/UserHomeSideBar";
import { location, profile } from "@/utils";
import { skills } from "./../../utils/data/skills";

const initialValues = {
    title: "",
    description: "",
    experience: "",
    location: "",
    totalOpenings: "",
    minSalary: "",
    maxSalary: "",
    jobType: "",
    workMode: "",
};

function ShowResponsibilities({ data, handleClick }) {
    return (
        <ul className="list-outside">
            {data?.map((d, i) => (
                <li
                    key={i}
                    className="flex w-full items-center justify-between list-disc bg-dark-1 p-2 rounded-xl"
                >
                    <div>{d}</div>
                    <button
                        type="button"
                        onClick={() => handleClick(i)}
                        className="bg-dark-4 h-4 w-4 flex-center rounded-full text-light-2 small-medium"
                    >
                        <MdOutlineClose />
                    </button>
                </li>
            ))}
        </ul>
    );
}

const CreateJob = () => {
    const { loading, success, error, message } = useSelector(
        (state) => state.company
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [responsibility, setResponsibility] = useState("");
    const [responsibilities, setResponsibilities] = useState([]);

    const [showSkillsDropDown, setShowSkillsDropDown] = useState(false);
    const [skill, setSkill] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);

    const [profileValue, setProfileValue] = useState("");
    const [selectedProfiles, setSelectedProfiles] = useState([]);
    const [showProfiles, setShowProfiles] = useState(false);

    const [showLocationDropDown, setShowLocationDropDown] = useState(false);
    const [locationValue, setLocationValue] = useState("");
    const [selectedLocations, setSelectedLocations] = useState([]);

    function getMatchingSkills(selectedProfiles) {
        const matchingSkills = [];

        selectedProfiles.forEach((profile) => {
            const skill = skills.find(
                (s) => s.name.toLowerCase() === profile.toLowerCase()
            );

            if (skill) {
                matchingSkills.push(...skill.skill);
            }
        });
        return matchingSkills;
    }

    const getProperData = (value1, value2) =>
        value1 === ""
            ? value2
            : value2.filter((val) =>
                  val.toLowerCase().startsWith(value1.toLowerCase())
              );

    const handleAddResponsibility = () => {
        setResponsibilities([...responsibilities, responsibility]);
        setResponsibility("");
    };
    const handleRemoveResponsibility = useCallback(
        (index) => {
            setResponsibilities(
                responsibilities.filter((item, i) => i !== index)
            );
        },
        [responsibilities]
    );

    const handleAddLocation = (val) => {
        setSelectedLocations([...selectedLocations, val]);
    };
    const handleRemoveLocation = useCallback(
        (loc) => {
            setSelectedLocations(
                selectedLocations.filter(
                    (item) => item.toLowerCase() !== loc.toLowerCase()
                )
            );
        },
        [selectedLocations]
    );
    const handleRemoveSkill = useCallback(
        (skill) => {
            setSelectedSkills(
                selectedSkills.filter(
                    (item) => item.toLowerCase() !== skill.toLowerCase()
                )
            );
        },
        [selectedSkills]
    );

    const handleAddSkill = (val) => {
        setSelectedSkills([...selectedSkills, val]);
    };
    const handleAddProfile = (val) => {
        setSelectedProfiles([...selectedProfiles, val]);
    };

    const handleRemoveProfile = useCallback(
        (prof) => {
            setSelectedProfiles(
                selectedProfiles.filter(
                    (item) => item.toLowerCase() !== prof.toLowerCase()
                )
            );
        },
        [selectedProfiles]
    );

    const handleFormSubmit = (values) => {
        const data = {
            ...values,
            responsibilities,
            skills: selectedSkills,
            locations: selectedLocations,
            profile: selectedProfiles,
        };
        dispatch(createJob(data));
    };

    useEffect(() => {
        if (success) {
            toast.success(message);
            navigate("/company/jobs");
            dispatch({ type: RESET_ACCOUNT });
        }
        if (error) {
            toast.error(error);
            dispatch({ type: RESET_ACCOUNT });
        }
    }, [success, error, dispatch, navigate, message]);

    return (
        <div className="h-full flex flex-col">
            <div>
                <h1 className="h3-medium text-light-2">Create job</h1>
            </div>
            <div className="h-max py-10 flex-center flex-col sm:w-500 mx-auto">
                <p className="text-light-3 base-medium">
                    To create a new job enter below details carefully!
                </p>
                <Formik
                    initialValues={initialValues}
                    validationSchema={newJobSchema}
                    onSubmit={handleFormSubmit}
                >
                    {() => {
                        return (
                            <Form className="w-full mt-10 flex flex-col gap-4">
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
                                {/* profile */}
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="profile"
                                        className="shad-form_label"
                                    >
                                        Profile
                                    </label>
                                    {selectedProfiles.length > 0 && (
                                        <ShowData
                                            data={selectedProfiles}
                                            handleClick={handleRemoveProfile}
                                        />
                                    )}
                                    <div className="h-max w-full relative">
                                        <input
                                            type="text"
                                            className="shad-input bg-dark-3"
                                            placeholder="e.g. Designer"
                                            value={profileValue}
                                            onChange={(e) =>
                                                setProfileValue(e.target.value)
                                            }
                                            onFocus={() =>
                                                setShowProfiles(true)
                                            }
                                            onBlur={() =>
                                                setShowProfiles(false)
                                            }
                                        />
                                        {showProfiles && (
                                            <DropDownMenu
                                                data={() =>
                                                    getProperData(
                                                        profileValue,
                                                        profile
                                                    )
                                                }
                                                values={selectedProfiles}
                                                handleClick={handleAddProfile}
                                            />
                                        )}
                                    </div>
                                </div>
                                {/* skills */}
                                {selectedProfiles.length > 0 && (
                                    <div className="flex flex-col gap-1">
                                        <label
                                            htmlFor="description"
                                            className="shad-form_label"
                                        >
                                            Skills*
                                        </label>
                                        {selectedSkills.length > 0 && (
                                            <div className="w-full flex flex-wrap gap-3 py-2">
                                                <ShowData
                                                    data={selectedSkills}
                                                    handleClick={
                                                        handleRemoveSkill
                                                    }
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
                                                        getMatchingSkills(
                                                            selectedProfiles
                                                        )
                                                    }
                                                    values={selectedSkills}
                                                    handleClick={handleAddSkill}
                                                />
                                            )}
                                        </div>
                                    </div>
                                )}
                                {/* experience */}
                                <div className="flex items-center gap-2">
                                    <div className="flex flex-col gap-1 w-full">
                                        <label
                                            htmlFor="description"
                                            className="shad-form_label"
                                        >
                                            Experience*
                                        </label>
                                        <Field
                                            as="select"
                                            id="experience"
                                            name="experience"
                                            className={`shad-input`}
                                        >
                                            <option value="" disabled>
                                                Select years of experience
                                            </option>
                                            <option value="fresher">
                                                Fresher
                                            </option>
                                            {Array.from(
                                                { length: 10 },
                                                (_, i) => i + 1
                                            ).map((i) => (
                                                <option
                                                    key={i}
                                                    value={`${i} years`}
                                                    className="py-2"
                                                >
                                                    {i} years
                                                </option>
                                            ))}
                                        </Field>
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
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="description"
                                        className="shad-form_label"
                                    >
                                        Responsibilties*
                                    </label>
                                    <div className="h-max w-full relative">
                                        <input
                                            type="text"
                                            className="shad-input"
                                            name="responsibilties"
                                            value={responsibility}
                                            onChange={(e) =>
                                                setResponsibility(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <ErrorMessage
                                            name="responsibilties"
                                            component={FormError}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddResponsibility}
                                            className="text-light-3 base-medium font-medium cursor-pointer hover:text-light-4 absolute top-1/2 right-2 transform -translate-y-1/2"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>

                                {responsibilities.length > 0 && (
                                    <ShowResponsibilities
                                        data={responsibilities}
                                        handleClick={handleRemoveResponsibility}
                                    />
                                )}
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
                                {/* salary */}
                                <div className="flex items-center gap-2">
                                    {/* minimum salary */}
                                    <div className="flex flex-col gap-1 w-full">
                                        <label
                                            htmlFor="description"
                                            className="shad-form_label"
                                        >
                                            Minimum Salary*
                                        </label>
                                        <Field
                                            type="number"
                                            id="minSalary"
                                            name="minSalary"
                                            className={`shad-input remove-arrow`}
                                            placeholder="e.g. 350000"
                                        />
                                        <ErrorMessage
                                            name="minSalary"
                                            component={FormError}
                                        />
                                    </div>
                                    {/* maximum salary */}
                                    <div className="flex flex-col gap-1 w-full">
                                        <label
                                            htmlFor="description"
                                            className="shad-form_label"
                                        >
                                            Maximum Salary*
                                        </label>
                                        <Field
                                            type="number"
                                            id="maxSalary"
                                            name="maxSalary"
                                            className={`shad-input remove-arrow`}
                                            placeholder="e.g. 10000000"
                                        />
                                        <ErrorMessage
                                            name="maxSalary"
                                            component={FormError}
                                        />
                                    </div>
                                </div>

                                {/* location */}
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="description"
                                        className="shad-form_label"
                                    >
                                        Location*
                                    </label>
                                    {selectedLocations.length > 0 && (
                                        <div className="w-full flex flex-wrap gap-3 py-2">
                                            <ShowData
                                                data={selectedLocations}
                                                handleClick={
                                                    handleRemoveLocation
                                                }
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
                                <div className="flex flex-col gap-1 w-full">
                                    <label
                                        htmlFor="description"
                                        className="shad-form_label"
                                    >
                                        Work Mode*
                                    </label>
                                    <Field
                                        as="select"
                                        id="workMode"
                                        name="workMode"
                                        className={`shad-input`}
                                    >
                                        <option
                                            defaultChecked
                                            value={""}
                                            className="text-light-3"
                                        >
                                            Select work mode
                                        </option>
                                        <option value="remote">Remote</option>
                                        <option value="onsite">Onsite</option>
                                        <option value="hybrid">Hybrid</option>
                                    </Field>
                                    <ErrorMessage
                                        name="workMode"
                                        component={FormError}
                                    />
                                </div>

                                <Button
                                    disabled={loading}
                                    type="submit"
                                    className="shad-button_primary py-2 disabled:bg-gray-600 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <div className="flex gap-2">
                                            <Loader /> Creating...
                                        </div>
                                    ) : (
                                        "Create job"
                                    )}
                                </Button>

                                <p className="text-small-regular text-light-2 text-center mt-2">
                                    {`Don't`} have any account?
                                    <Link
                                        to="/sign-up"
                                        className="text-primary-500 text-small-semibold ml-1"
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default CreateJob;
