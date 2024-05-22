import { LiaEarlybirds } from "react-icons/lia";
const EarlyApplicantTag = () => {
    return (
        <div className="flex items-center gap-2 tiny-regular border border-yellow-500/60 w-max rounded p-2">
            <LiaEarlybirds className="text-yellow-500 text-lg" />
            <span className="text-gray-300">Be an early applicant</span>
        </div>
    );
};

export default EarlyApplicantTag;
