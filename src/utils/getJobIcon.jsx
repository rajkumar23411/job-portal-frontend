import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdOutlineHomeWork } from "react-icons/md";

function getJobIcon(type) {
    switch (type) {
        case "remote":
            return <AiOutlineHome className="text-light-3 text-xl" />;
        case "onsite":
            return (
                <HiOutlineBuildingOffice2 className="text-light-3 text-xl" />
            );
        case "hybrid":
            return <MdOutlineHomeWork className="text-light-3 text-xl" />;
    }
}

export default getJobIcon;
