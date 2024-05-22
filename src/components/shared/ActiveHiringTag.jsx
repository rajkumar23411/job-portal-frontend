import { FaArrowTrendUp } from "react-icons/fa6";

const ActiveHiringTag = () => {
    return (
        <div className="flex items-center gap-2 tiny-regular border border-light-3 w-max rounded py-1 px-2">
            <FaArrowTrendUp className="text-primary-600" />
            <span className="text-gray-300">Actively hiring</span>
        </div>
    );
};

export default ActiveHiringTag;
