import { getResumeIcon } from "@/utils/getResumeIcon";
import { IoMdClose } from "react-icons/io";
export const getResumeExtension = (fileName) => {
    if (fileName) {
        const extension = fileName?.split(".").pop();
        return extension;
    }
};
const UserResume = ({ resume }) => {
    return (
        <div className="bg-dark-4 px-2 py-3 rounded-sm flex items-center justify-between gap-4 w-80">
            <div className="flex items-center gap-2 text-gray-300">
                {getResumeIcon(getResumeExtension(resume?.orgFileName))}
                <div>
                    <p>
                        {resume?.orgFileName.length > 25
                            ? resume?.orgFileName.slice(0, 25) + "..."
                            : resume?.orgFileName}
                    </p>
                    <span className="tiny-medium text-light-3">108 KB</span>
                </div>
            </div>
            <IoMdClose className="text-2xl cursor-pointer" />
        </div>
    );
};

export default UserResume;
