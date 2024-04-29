import { MdOutlineFileUpload } from "react-icons/md";

const UploadBtn = () => {
    return (
        <div className="bg-primary-500/50 flex items-center justify-center h-12 gap-2 w-full rounded-md ring-offset-muted-foreground">
            <MdOutlineFileUpload className="text-xl" />
            <p className="text-sm sm:text-base">Upload picture</p>
        </div>
    );
};

export default UploadBtn;
