import { profile } from "@/utils";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updatePreference } from "@/redux/actions/user.action";
import { toast } from "react-toastify";
import { RESET_ACCOUNT } from "@/redux/constants/user.constants";
import { clearError } from "@/redux/actions/error.action";
import Loader from "@/components/shared/Loader";
import { useNavigate } from "react-router-dom";

function Fields({ value, isSelected = false, handleSelect, handleRemove }) {
    return (
        <div
            onClick={!isSelected ? () => handleSelect(value) : null}
            className={`px-6 py-2 flex-center gap-3 rounded-2xl  cursor-pointer capitalize ${
                isSelected ? "bg-primary-600" : "border border-primary-600/80"
            }`}
        >
            <p>{value}</p>
            {isSelected ? (
                <button onClick={handleRemove}>
                    <RxCross1 className="text-lg" />
                </button>
            ) : (
                <button>
                    <GoPlus className="text-lg" />
                </button>
            )}
        </div>
    );
}
const MyPreferences = () => {
    const { loading, success, error, message } = useSelector(
        (state) => state.account
    );
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [jobPreferences, setJobPreferences] = useState(
        user?.careerPreference || []
    );
    const [workMode, setWorkMode] = useState(user?.workPreference || []);
    const [keyword, setKeyword] = useState("");

    const handleSelectJobPreference = (val) => {
        setJobPreferences([...jobPreferences, val]);
    };
    const handleRemoveJobPreference = (val) => {
        setJobPreferences(jobPreferences.filter((item) => item !== val));
    };
    const handleSelectWorkMode = (val) => {
        setWorkMode([...workMode, val]);
    };
    const handleRemoveWorkMode = (val) => {
        setWorkMode(workMode.filter((item) => item !== val));
    };
    const handleClickSearchResult = (val) => {
        setKeyword("");
        setJobPreferences([...jobPreferences, val]);
    };
    const handleUpdatePreference = () => {
        dispatch(
            updatePreference({
                careerPreference: jobPreferences,
                workPreference: workMode,
            })
        );
    };

    useEffect(() => {
        if (success) {
            toast.success(message);
            navigate("/my/preferences");
            dispatch(loadUser());
            dispatch({ type: RESET_ACCOUNT });
        }
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [success, error, message, dispatch, navigate]);
    return (
        <div className="flex items-center py-6 gap-6 w-full h-max flex-col">
            <h1 className="h2-bold">Your Preferences</h1>
            <div className="w-1/2 h-max bg-dark-3 rounded-xl border border-gray-700/50 p-6 flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="pref" className="shad-form_label">
                            Area(s) of interest
                        </label>
                        <div className="relative h-12 w-full bg-dark-4 border-none pl-2 rounded-md flex items-center justify-center gap-2 hover:border hover:border-light-3">
                            <CiSearch className="text-3xl text-light-4" />
                            <input
                                type="text"
                                className="h-full w-full bg-transparent placeholder:text-light-4"
                                placeholder="Areas your want to work in or learn about"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            {keyword.length > 0 && (
                                <div className="w-full bg-dark-4 h-max p-6 flex flex-col gap-2 absolute top-14 left-0 right-0 rounded-md">
                                    {profile
                                        .filter((c) =>
                                            c
                                                .toLowerCase()
                                                .includes(keyword.toLowerCase())
                                        )
                                        .map((field, i) => (
                                            <button
                                                className="cursor-pointer hover:text-light-3 w-max"
                                                key={i}
                                                onClick={() =>
                                                    handleClickSearchResult(
                                                        field
                                                    )
                                                }
                                            >
                                                {field}
                                            </button>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {jobPreferences.length > 0 &&
                            jobPreferences.map((field) => (
                                <Fields
                                    key={field}
                                    value={field}
                                    isSelected={jobPreferences.includes(field)}
                                    handleRemove={() =>
                                        handleRemoveJobPreference(field)
                                    }
                                />
                            ))}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="careers" className="shad-form_label">
                            Popular career interests
                        </label>
                        <div className="flex flex-wrap gap-5">
                            {profile
                                .slice(0, 26)
                                .filter((c) =>
                                    jobPreferences.length > 0
                                        ? !jobPreferences.includes(c)
                                        : true
                                )
                                .map((field) => (
                                    <Fields
                                        key={field}
                                        value={field}
                                        handleSelect={() =>
                                            handleSelectJobPreference(field)
                                        }
                                    />
                                ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="workMode" className="shad-form_label">
                        Work Mode
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {["remote", "hybrid", "onsite"].map((mode) => (
                            <Fields
                                key={mode}
                                value={mode}
                                handleSelect={() => handleSelectWorkMode(mode)}
                                handleRemove={() => handleRemoveWorkMode(mode)}
                                isSelected={workMode.includes(mode)}
                            />
                        ))}
                    </div>
                </div>
                <Button
                    onClick={handleUpdatePreference}
                    className="shad-button_primary"
                >
                    {loading ? (
                        <div className="flex-center gap-2">
                            <Loader />
                            Updating...
                        </div>
                    ) : (
                        "Update"
                    )}
                </Button>
            </div>
        </div>
    );
};

export default MyPreferences;
