import { getAllJobs, getJobAsPerPreference } from "@/redux/actions/job.actions";
import { experiences, location, profile } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CustomCheckBox from "./CustomCheckBox";
import { Button } from "../ui/button";

export function ShowData({ data = [], handleClick }) {
    return (
        <div className="flex flex-wrap gap-2 pb-2">
            {data.map((val) => (
                <div
                    key={val}
                    className="flex items-center gap-2 tiny-medium  bg-primary-600/50 text-light-1 px-2 py-1 rounded-lg"
                >
                    <span>{val}</span>
                    <RxCross1
                        className="cursor-pointer"
                        onClick={() => handleClick(val)}
                    />
                </div>
            ))}
        </div>
    );
}
export function DropDownMenu({ data, values = [], handleClick }) {
    return (
        <div className="absolute top-14 left-0 w-full z-10 bg-dark-3 p-2 max-h-40 min-h-max overflow-y-auto custom-scrollbar shadow-md shadow-dark-2 rounded-lg">
            {data().length === 0 ? (
                <div className="text-light-3">No results found</div>
            ) : (
                data().map((val, i) => (
                    <button
                        key={i}
                        className={`cursor-pointer py-1 px-4 w-full text-left ${
                            values?.includes(val)
                                ? "text-gray-500"
                                : "text-light-2 hover:text-primary-500 "
                        }`}
                        disabled={values?.includes(val)}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            handleClick(val);
                        }}
                    >
                        {val}
                    </button>
                ))
            )}
        </div>
    );
}
const UserHomeSideBar = () => {
    // refs
    const locationRef = useRef(null);
    const dispatch = useDispatch();

    // states
    const [showLocations, setShowLocations] = useState(false);
    const [locationValue, setLocationValue] = useState("");
    const [selectedLocations, setSelectedLocations] = useState([]);

    const [showProfiles, setShowProfiles] = useState(false);
    const [profileValue, setProfileValue] = useState("");
    const [selectedProfiles, setSelectedProfiles] = useState([]);

    const [jobType, setJobType] = useState("");
    const [jobMode, setJobMode] = useState("");

    const [showExperienceDropDown, setShowExperienceDropDown] = useState(false);
    const [experience, setExperience] = useState("");

    const [jobsAsPerPreference, setJobsAsPerPreference] = useState(true);

    const getProperData = (value1, value2) =>
        value1 === ""
            ? value2
            : value2.filter((val) =>
                  val.toLowerCase().startsWith(value1.toLowerCase())
              );

    const handleLocationClick = (loc) => {
        locationRef.current.focus();
        setSelectedLocations([...selectedLocations, loc]);
        setLocationValue("");
        setShowLocations(false);
    };

    const handleProfileClick = (prof) => {
        setSelectedProfiles([...selectedProfiles, prof]);
        setProfileValue("");
        setShowProfiles(false);
    };

    const handleRemoveLocation = (loc) => {
        setSelectedLocations(selectedLocations.filter((l) => l !== loc));
    };

    const handleRemoveProfile = (prof) => {
        setSelectedProfiles(selectedProfiles.filter((p) => p !== prof));
    };

    const handleClearAll = () => {
        setSelectedLocations([]);
        setSelectedProfiles([]);
        setJobType("");
        setJobMode("");
        setExperience("");
    };
    const handleJobModeClick = (e) => {
        if (e.target.checked) {
            setJobMode(e.target.value);
        } else {
            setJobMode("");
        }
    };
    const handleJobTypeClick = (e) => {
        if (e.target.checked) {
            setJobType(e.target.value);
        } else {
            setJobType("");
        }
    };
    useEffect(() => {
        if (jobsAsPerPreference) {
            dispatch(getJobAsPerPreference());
        } else {
            dispatch(
                getAllJobs(
                    selectedProfiles,
                    selectedLocations,
                    jobType,
                    jobMode,
                    experience
                )
            );
        }
    }, [
        dispatch,
        selectedLocations,
        selectedProfiles,
        experience,
        jobType,
        jobMode,
        jobsAsPerPreference,
    ]);
    return (
        <div className="flex-[0.4] p-4 bg-dark-4 flex flex-col gap-6 h-fit rounded-lg">
            <div className="flex-center gap-2">
                <CiFilter className="text-2xl" />
                <h1 className="h3-medium">Filter</h1>
            </div>
            <div className="flex gap-4 items-center">
                <CustomCheckBox
                    checked={jobsAsPerPreference}
                    value="preference"
                    handleClick={() =>
                        setJobsAsPerPreference(!jobsAsPerPreference)
                    }
                />
                <label
                    htmlFor="preference"
                    className="text-light-2 select-none"
                >
                    As per my{" "}
                    <Link
                        to="/my/preferences"
                        className="text-primary-500 base-medium cursor-pointer hover:text-primary-600"
                    >
                        preferences
                    </Link>
                </label>
            </div>

            <div
                className={`flex flex-col gap-6 relative ${
                    jobsAsPerPreference
                        ? "before:absolute before:content-[''] before:top-0 before:left-0 before:right-0 before:h-full before:w-full before:bg-dark-4 before:opacity-50"
                        : ""
                }`}
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="profile" className="shad-form_label">
                        Profile
                    </label>
                    {selectedProfiles.length > 0 && (
                        <ShowData
                            data={selectedProfiles}
                            handleClick={handleRemoveProfile}
                        />
                    )}
                    <div
                        className={`h-max w-full  ${
                            jobsAsPerPreference ? "cursor-none " : "relative"
                        } `}
                    >
                        <input
                            type="text"
                            className={`shad-input bg-dark-3`}
                            placeholder="e.g. Designer"
                            value={profileValue}
                            onChange={(e) => setProfileValue(e.target.value)}
                            onFocus={() => setShowProfiles(true)}
                            onBlur={() => setShowProfiles(false)}
                        />
                        {showProfiles && (
                            <DropDownMenu
                                data={() =>
                                    getProperData(profileValue, profile)
                                }
                                values={selectedProfiles}
                                handleClick={handleProfileClick}
                            />
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-1 ">
                    <label htmlFor="profile" className="shad-form_label">
                        Location
                    </label>

                    {selectedLocations.length > 0 && (
                        <ShowData
                            data={selectedLocations}
                            handleClick={handleRemoveLocation}
                        />
                    )}
                    <div
                        className={`h-max w-full  ${
                            jobsAsPerPreference ? "cursor-none" : "relative"
                        } `}
                    >
                        <input
                            type="text"
                            className="shad-input bg-dark-3"
                            placeholder="e.g. Assam"
                            value={locationValue}
                            onChange={(e) => setLocationValue(e.target.value)}
                            onFocus={() => setShowLocations(true)}
                            onBlur={() => setShowLocations(false)}
                            ref={locationRef}
                        />
                        {showLocations && (
                            <DropDownMenu
                                data={() =>
                                    getProperData(locationValue, location)
                                }
                                handleClick={handleLocationClick}
                                values={selectedLocations}
                            />
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="work type" className="shad-form_label">
                        Job type
                    </label>
                    <div className="flex flex-col gap-3">
                        {["full time", "part time", "contractual"].map(
                            (type, i) => (
                                <div
                                    className="flex items-center gap-4"
                                    key={type}
                                >
                                    <CustomCheckBox
                                        checked={type === jobType}
                                        value={type}
                                        handleClick={handleJobTypeClick}
                                    />
                                    <label
                                        htmlFor={type}
                                        className="text-light-2 capitalize"
                                    >
                                        {type}
                                    </label>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="work type" className="shad-form_label">
                        Job Mode
                    </label>
                    <div className="flex flex-col gap-3">
                        {["remote", "onsite", "hybrid"].map((mode) => (
                            <div className="flex items-center gap-4" key={mode}>
                                <CustomCheckBox
                                    checked={mode === jobMode}
                                    value={mode}
                                    handleClick={handleJobModeClick}
                                />
                                <label
                                    htmlFor={mode}
                                    className="text-light-2 capitalize"
                                >
                                    {mode}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="experience" className="shad-form_label">
                        Years of experience
                    </label>
                    <div
                        className={`h-max w-full  ${
                            jobsAsPerPreference ? "cursor-none" : "relative"
                        } `}
                    >
                        <input
                            type="text"
                            className="shad-input bg-dark-3"
                            placeholder="Select years of experience"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            onFocus={() => setShowExperienceDropDown(true)}
                            onBlur={() => setShowExperienceDropDown(false)}
                        />
                        {showExperienceDropDown && (
                            <DropDownMenu
                                data={() =>
                                    getProperData(experience, experiences)
                                }
                                handleClick={(val) => {
                                    setExperience(val);
                                    setShowExperienceDropDown(false);
                                }}
                                values={experience}
                            />
                        )}
                    </div>
                </div>
            </div>
            {!jobsAsPerPreference && (
                <Button
                    onClick={handleClearAll}
                    className="bg-transparent hover:text-primary-600 text-primary-500 cursor-pointer w-max ml-auto"
                >
                    Clear all
                </Button>
            )}
        </div>
    );
};

export default UserHomeSideBar;
