import { Link, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { languages } from "@/utils";
import { RxCross2 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import UploadBtn from "@/components/shared/UploadBtn";
import { Label } from "@/components/ui/label";
import { resendCode, updateProfile } from "@/redux/actions/user.action";
import Loader from "@/components/shared/Loader";
import { RESET_ACCOUNT } from "@/redux/constants/user.constants";
import { toast } from "react-toastify";
import { clearError } from "@/redux/actions/error.action";
import { FaCircleExclamation } from "react-icons/fa6";

function Gender({ value, isSelected = false, handleGenderSelect }) {
    return (
        <div
            onClick={handleGenderSelect}
            className={`py-2 px-8 rounded-xl border border-primary-500/50 capitalize hover:text-white hover:bg-primary-600 hover:border-primary-600 cursor-pointer ${
                isSelected ? "bg-primary-600" : ""
            }`}
        >
            {value}
        </div>
    );
}

function Language({
    value,
    isSelected = false,
    handleLanguageSelect,
    handleLanguageRemove,
}) {
    const handleClick = (e) => {
        e.stopPropagation();
        if (isSelected) {
            handleLanguageRemove(value);
        } else {
            handleLanguageSelect(value);
        }
    };
    return (
        <div
            onClick={handleClick}
            className={`py-2 w-full rounded-xl border border-primary-500/50  flex items-center justify-center gap-2  hover:text-white hover:bg-primary-600 hover:border-primary-600 cursor-pointer ${
                isSelected ? "bg-primary-600" : ""
            }`}
        >
            <p>{value}</p>
            {isSelected && (
                <button onClick={handleClick}>
                    <RxCross2 className="text-xl" />
                </button>
            )}
        </div>
    );
}
const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const { loading, success, error, message } = useSelector(
        (state) => state.account
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const [verifyAccClicked, setIsVerifyAccClicked] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name || "",
        contact: user.contact || "",
        gender: user.gender || "",
        city: user.city || "",
        languageKnown: user.languageKnown || [],
    });
    const [isCodeSending, setIscodeSending] = useState(false);
    const onDrop = useCallback((acceptedFiles) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
        };
        setFormData((prev) => ({
            ...prev,
            file: acceptedFiles[0],
        }));
        reader.readAsDataURL(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg"],
        },
    });

    const handleSelectLangauage = (val) => {
        setFormData((prev) => ({
            ...prev,
            languageKnown: [...prev.languageKnown, val],
        }));
    };
    const handleRemoveLangugaeSelect = (val) => {
        setFormData((prev) => ({
            ...prev,
            languageKnown: prev.languageKnown.filter((item) => {
                return item !== val;
            }),
        }));
    };
    const toggleGenderSelect = (val) => {
        setFormData((prev) => ({
            ...prev,
            gender: val,
        }));
    };

    const sendVerificationCodeandRedirect = () => {
        setIscodeSending(true);
        dispatch(resendCode(user?.email));
        setIsVerifyAccClicked(true);
    };
    const handleSubmit = () => {
        dispatch(updateProfile(formData));
    };

    useEffect(() => {
        if (verifyAccClicked && loading === false && success === false) {
            navigate("/verify/account");
        }
    }, [verifyAccClicked, navigate, loading, success, dispatch]);

    useEffect(() => {
        if (success) {
            toast.success(message);
            dispatch({ type: RESET_ACCOUNT });
        }
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [success, error, message, dispatch, navigate]);

    return (
        <div
            className={`w-full h-max flex-center p-4 sm:p-6 ${
                isCodeSending && "relative"
            }`}
        >
            {isCodeSending && (
                <div className="h-full w-full absolute top-0 left-0 right-0 bg-dark-1/60 flex-center">
                    <img src="/assets/icons/loader.svg" alt="loading" />
                </div>
            )}
            <div className="flex-center flex-col md:bg-dark-3 md:p-6 md:rounded-xl">
                {!user?.isAccountVerified && (
                    <div className="h-12 w-full flex-center bg-yellow-500/10 border border-yellow-500 rounded-md gap-2 mb-10">
                        <FaCircleExclamation className="text-red-500 text-lg" />
                        <p className="base-regular">
                            Your account is not verified yet! To verify the
                            account
                        </p>
                        <button
                            onClick={sendVerificationCodeandRedirect}
                            className="text-primary-500 base-medium cursor-pointer hover:text-primary-600"
                        >
                            Click here
                        </button>
                    </div>
                )}
                <h1 className="h3-medium mx-auto">Profile Details</h1>
                <div className="flex flex-col lg:flex-row gap-10 pt-10">
                    {/* profile picture */}
                    <div className="w-max mx-auto flex items-center flex-col gap-2">
                        <Label>
                            Profile picture &nbsp;
                            <span className="small-medium text-light-3">
                                (Recommended)
                            </span>
                        </Label>
                        <div {...getRootProps()}>
                            <input
                                {...getInputProps()}
                                className="cursor-pointer w-max"
                            />
                            <div className="cursor-pointer flex flex-col gap-4">
                                <div className="h-40 w-40  md:h-52 md:w-52 rounded-xl overflow-hidden">
                                    <img
                                        src={
                                            image ||
                                            user?.avatar?.url ||
                                            "https://placehold.co/150x150"
                                        }
                                        alt="pizza"
                                        className="h-full w-full object-cover object-top"
                                    />
                                </div>
                                <UploadBtn />
                            </div>
                        </div>
                    </div>
                    {/* profile details */}
                    <div className="flex flex-col gap-4 h-full w-full sm:w-420 md:w-[600px]">
                        <div className="flex flex-col gap-2 ">
                            <Label className="shad-form_label">Name</Label>
                            <input
                                type="text"
                                value={formData.name}
                                className="shad-input"
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <Label className="shad-form_label">Email</Label>
                            <input
                                type="text"
                                value={user.email}
                                className={`shad-input ${
                                    user?.isAccountVerified
                                        ? "bg-primary-500/20"
                                        : "bg-yellow-500/20"
                                } `}
                                disabled
                                readOnly
                            />
                            {user?.isAccountVerified ? (
                                <Link
                                    to="/update-email"
                                    className="text-primary-500 text-sm w-full text-right"
                                >
                                    Change email
                                </Link>
                            ) : (
                                <button className="text-right w-full text-yellow-500 text-sm  hover:text-yellow-600 cursor-pointer">
                                    Verify email
                                </button>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <Label className="shad-form_label">Contact</Label>
                            <input
                                type="text"
                                value={formData.contact}
                                className="shad-input"
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        contact: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <Label className="shad-form_label">
                                Current city
                            </Label>
                            <span className=" text-gray-600 tracking-tight">
                                To connect to the oppurtunities near to you
                            </span>
                            <input
                                type="text"
                                value={formData.city}
                                className="shad-input"
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        city: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <Label className="shad-form_label">Gender</Label>
                            <div className="flex items-center gap-4">
                                {["Male", "Female", "Other"].map((gen) => (
                                    <Gender
                                        key={gen}
                                        value={gen}
                                        isSelected={formData.gender === gen}
                                        handleGenderSelect={() =>
                                            toggleGenderSelect(gen)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="shad-form_label">
                                Languages you know
                            </Label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {languages.map((lang) => (
                                    <Language
                                        key={lang}
                                        value={lang}
                                        isSelected={formData.languageKnown.includes(
                                            lang
                                        )}
                                        handleLanguageSelect={() =>
                                            handleSelectLangauage(lang)
                                        }
                                        handleLanguageRemove={() =>
                                            handleRemoveLangugaeSelect(lang)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                        <Button
                            onClick={handleSubmit}
                            className="shad-button_primary my-6"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <Loader />
                                    <span>Updating...</span>
                                </div>
                            ) : (
                                "Update profile"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Profile;
