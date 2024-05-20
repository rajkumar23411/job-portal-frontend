import { Checkbox } from "@/components/ui/checkbox";
import { experiences, location, profile } from "@/utils";
import { useRef, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

export function ShowData({ data = [], handleClick }) {
    return (
        <div className="flex flex-wrap gap-2 pb-2">
            {data.map((val) => (
                <div
                    key={val}
                    className="flex items-center gap-2 small-medium  bg-primary-600 text-light-1 px-2 py-1 rounded-lg"
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

    // states
    const [showLocations, setShowLocations] = useState(false);
    const [locationValue, setLocationValue] = useState("");
    const [selectedLocations, setSelectedLocations] = useState([]);

    const [showProfiles, setShowProfiles] = useState(false);
    const [profileValue, setProfileValue] = useState("");
    const [selectedProfiles, setSelectedProfiles] = useState([]);

    const [showExperienceDropDown, setShowExperienceDropDown] = useState(false);
    const [experience, setExperience] = useState("");

    const getProperData = (value1, value2) =>
        value1 === ""
            ? value2
            : value2.filter((val) =>
                  val.toLowerCase().startsWith(value1.toLowerCase())
              );

    const handleLocationClick = (loc) => {
        locationRef.current.focus();
        setSelectedLocations([...selectedLocations, loc]);
    };

    const handleProfileClick = (prof) => {
        setSelectedProfiles([...selectedProfiles, prof]);
    };

    const handleRemoveLocation = (loc) => {
        setSelectedLocations(selectedLocations.filter((l) => l !== loc));
    };

    const handleRemoveProfile = (prof) => {
        setSelectedProfiles(selectedProfiles.filter((p) => p !== prof));
    };

    return (
        <div className="flex-[0.4] p-4 bg-dark-4 flex flex-col gap-6">
            <div className="flex-center gap-2">
                <CiFilter className="text-2xl" />
                <h1 className="h3-medium">Filter</h1>
            </div>
            <div className="flex gap-4 items-center">
                <Checkbox id="preference" className="border-2 border-light-2" />
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
                <div className="h-max w-full relative">
                    <input
                        type="text"
                        className="shad-input bg-dark-3"
                        placeholder="e.g. Designer"
                        value={profileValue}
                        onChange={(e) => setProfileValue(e.target.value)}
                        onFocus={() => setShowProfiles(true)}
                        onBlur={() => setShowProfiles(false)}
                    />
                    {showProfiles && (
                        <DropDownMenu
                            data={() => getProperData(profileValue, profile)}
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
                <div className="h-max w-full relative">
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
                            data={() => getProperData(locationValue, location)}
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
                    <div className="flex items-center gap-4">
                        <Checkbox
                            id="full-time"
                            className="border-2 border-light-2"
                            value="full time"
                        />
                        <label htmlFor="full-time" className="text-light-2">
                            Full time
                        </label>
                    </div>
                    <div className="flex items-center gap-4">
                        <Checkbox
                            id="part-time"
                            className="border-2 border-light-2"
                        />
                        <label htmlFor="part-time" className="text-light-2">
                            Part time
                        </label>
                    </div>
                    <div className="flex items-center gap-4">
                        <Checkbox
                            id="contractual"
                            className="border-2 border-light-2"
                        />
                        <label htmlFor="contractual" className="text-light-2">
                            Contractual
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <label htmlFor="work type" className="shad-form_label">
                    Job Mode
                </label>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                        <Checkbox
                            id="remote"
                            className="border-2 border-light-2"
                            value="remote"
                        />
                        <label htmlFor="full-time" className="text-light-2">
                            Remote
                        </label>
                    </div>
                    <div className="flex items-center gap-4">
                        <Checkbox
                            id="hybrid"
                            className="border-2 border-light-2"
                        />
                        <label htmlFor="hybrid" className="text-light-2">
                            Hybrid
                        </label>
                    </div>
                    <div className="flex items-center gap-4">
                        <Checkbox
                            id="onsite"
                            className="border-2 border-light-2"
                        />
                        <label htmlFor="onsite" className="text-light-2">
                            Onsite
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="experience" className="shad-form_label">
                    Years of experience
                </label>
                <div className="h-max w-full relative">
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
                            data={() => getProperData(experience, experiences)}
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
    );
};

export default UserHomeSideBar;
