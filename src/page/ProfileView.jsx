import { useDispatch, useSelector } from "react-redux";
import {
    MdLocationPin,
    MdMonochromePhotos,
    MdMarkEmailUnread,
} from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { RiUserSearchFill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiMiniLanguage } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { CiTrash } from "react-icons/ci";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RESET_ACCOUNT } from "@/redux/constants/user.constants";
import { clearError } from "@/redux/actions/error.action";
import { loadUser, uploadResume } from "@/redux/actions/user.action";
import Loader from "@/components/shared/Loader";
import { BsDownload } from "react-icons/bs";
function InfoBox({ icon, value }) {
    return (
        <div className="flex items-center gap-2">
            <div className="text-xl text-light-3">{icon}</div>
            <p className="text-gray-200">{value}</p>
        </div>
    );
}

function Container({ children }) {
    return (
        <div className="bg-dark-4 rounded-xl flex p-8 gap-10">{children}</div>
    );
}
const ProfileView = () => {
    const { user } = useSelector((s) => s.auth);
    const { loading, success, error, message } = useSelector(
        (state) => state.account
    );
    const [fileName, setFileName] = useState(null || user?.resume?.orgFileName);
    const dispatch = useDispatch();
    const onDrop = useCallback(
        (acceptedFiles) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFileName(
                    acceptedFiles[0].name.split(".").slice(0, -1).join(".")
                );
            };
            reader.readAsDataURL(acceptedFiles[0]);
            dispatch(uploadResume(acceptedFiles[0]));
        },
        [dispatch]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "application/msword": [".doc", ".docx"],
        },
    });

    const downloadResume = () => {
        const anchorEl = document.createElement("a");
        // anchorEl.href = user?.resume?.url;
        anchorEl.download = user?.resume?.url;
        anchorEl.click();
    };

    useEffect(() => {
        if (success) {
            toast.success(message);
            dispatch(loadUser());
            dispatch({ type: RESET_ACCOUNT });
        }
        if (error) {
            toast.error(message);
            dispatch(clearError());
        }
    }, [success, error, message, dispatch]);

    return (
        <div className="h-full w-full flex-center">
            <div className="w-4/5 h-full p-6 flex flex-col gap-4">
                <Container>
                    <div className="h-44 w-44 rounded-full overflow-hidden relative">
                        <img
                            src={
                                user?.avatar?.url ||
                                `https://placehold.co/150x150`
                            }
                            alt="profile"
                            className="h-full w-full object-cover"
                        />
                        <div className="h-full w-full absolute top-0 left-0 bg-dark-1/50 flex-center flex-col gap-2 opacity-0 hover:opacity-100 transition-all ease-linear">
                            <MdMonochromePhotos className="text-3xl text-light-2" />
                            <h1 className="base-medium">
                                {user?.avatar ? "Add" : "Update"} photo
                            </h1>
                        </div>
                    </div>
                    <div className="w-full flex-1">
                        <div className="border-b border-light-4/50 pb-4">
                            <div className="flex items-center gap-6">
                                <h1 className="h3-medium capitalize">
                                    {user?.name}
                                </h1>
                                <Link to={"/profile"}>
                                    <CiEdit className="text-2xl text-light-3" />
                                </Link>
                            </div>
                            <p className="text-light-3 small-regular">
                                Profile last updated -{" "}
                                <span className=" text-light-2">Today</span>
                            </p>
                        </div>
                        <div className="flex pt-6">
                            <div className="flex flex-col gap-3 border-r border-light-4/50 pr-20">
                                <InfoBox
                                    icon={<MdLocationPin />}
                                    value={user?.city}
                                />
                                <InfoBox
                                    icon={<RiUserSearchFill />}
                                    value={user?.gender}
                                />
                            </div>
                            <div className="flex flex-col gap-3 pl-20">
                                <InfoBox
                                    icon={<FaPhoneAlt />}
                                    value={user?.contact}
                                />
                                <InfoBox
                                    icon={<MdMarkEmailUnread />}
                                    value={user?.email}
                                />
                                <InfoBox
                                    icon={<HiMiniLanguage />}
                                    value={user?.languageKnown
                                        ?.map((lang) => lang)
                                        .join(", ")}
                                />
                            </div>
                        </div>
                    </div>
                </Container>
                <Container>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-6">
                            <h1 className="h3-medium">Preferences</h1>
                            <Link to={"/my/preferences"}>
                                <CiEdit className="text-2xl text-light-3" />
                            </Link>
                        </div>
                        <div className="flex items-center gap-10">
                            <div className="pt-8 flex gap-2">
                                <p className="base-medium text-light-3">Job:</p>
                                <p>
                                    {user?.workPreference
                                        ?.map((p) => p)
                                        .join(", ")}
                                </p>
                            </div>
                            <div className="pt-8 flex gap-2">
                                <p className="base-medium text-light-3">
                                    Career:
                                </p>
                                <p>
                                    {user?.careerPreference
                                        ?.map((c) => c)
                                        .join(", ")}
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
                <Container>
                    <div className="w-full flex flex-col gap-6">
                        <h1 className="h3-medium">Resume</h1>
                        <div className="flex flex-col gap-2">
                            {user?.resume?.url && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <span>{fileName}</span>
                                        <Link
                                            to={user?.resume?.url}
                                            target="_blank"
                                            className="text-primary-600 font-medium"
                                        >
                                            View
                                        </Link>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button
                                            title="Download resume"
                                            onClick={downloadResume}
                                            className="h-8 w-8 flex-center text-lg text-primary-600 bg-light-3/10 rounded-full ml-auto cursor-pointer hover:bg-light-3/20"
                                        >
                                            <BsDownload />
                                        </button>
                                        <button
                                            title="Delete"
                                            className="h-8 w-8 flex-center text-lg text-primary-600 bg-light-3/10 rounded-full ml-auto cursor-pointer hover:bg-light-3/20"
                                        >
                                            <CiTrash />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {user?.resume?.url ? (
                                <div
                                    {...getRootProps()}
                                    className="border border-dashed border-gray-300 h-40 rounded-xl flex-center flex-col gap-2"
                                >
                                    <input
                                        {...getInputProps()}
                                        className="cursor-pointer w-max"
                                    />
                                    {loading ? (
                                        <Button
                                            disabled={loading}
                                            className="flex items-center gap-2"
                                        >
                                            <Loader />
                                            Uploading..
                                        </Button>
                                    ) : (
                                        <Button className="border border-light-3 text-light-3 px-4 py-3 bg-transparent">
                                            Update resume
                                        </Button>
                                    )}
                                    <p className="base-regular text-light-3">
                                        Supported formats: .pdf, .doc, .docx
                                    </p>
                                </div>
                            ) : (
                                <div className="border border-dashed border-gray-300 h-40 rounded-xl flex-center flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <p className="text-gray-200">
                                            Already have a resume?
                                        </p>
                                        <button className="base-medium text-primary-600">
                                            Upload resume
                                        </button>
                                    </div>
                                    <p className="base-regular text-light-3">
                                        Supported formats: .pdf, .doc, .docx, up
                                        to 5MB
                                    </p>
                                </div>
                            )}
                            <div></div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default ProfileView;
