import { BsArrowsFullscreen, BsQuestionSquare } from "react-icons/bs";
import { IoBagHandleOutline, IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { RESET_COMPANY } from "@/redux/constants/company.constants";
import { logout } from "@/redux/actions/company.actions";

function Tag({ to, label, icon }) {
    const { pathname } = useLocation();
    const isActive = pathname === to;
    return (
        <Link
            to={to}
            className={`flex items-center gap-4 group py-4 px-6 ${
                isActive ? "bg-primary-500" : ""
            } hover:bg-primary-500`}
        >
            <div
                className={`w-6 text-xl  group-hover:text-light-1 ${
                    isActive ? "text-light-2" : "text-light-3"
                }`}
            >
                {icon}
            </div>
            <p className={`base-regular text-light-2`}>{label}</p>
        </Link>
    );
}
const DashboardSideNavbar = () => {
    const { error, message } = useSelector((state) => state.company);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        dispatch(logout());
    };

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch({ type: RESET_COMPANY });
            navigate("/company/login");
        }

        if (error) {
            toast.error(message);
            dispatch({ type: RESET_COMPANY });
        }
    }, [dispatch, error, message, navigate]);

    return (
        <div className="flex justify-between flex-col h-full">
            <div>
                <div className="p-4 flex-center">
                    <Logo />
                </div>
                <Tag
                    to={"/company/dashboard"}
                    label={"Dashboard"}
                    icon={<MdOutlineDashboard />}
                />
                <Tag
                    to={"/company/jobs"}
                    label={"Jobs"}
                    icon={<IoBagHandleOutline />}
                />
                <Tag
                    to={"/company/applications"}
                    label={"Applications"}
                    icon={<IoNewspaperOutline />}
                />
                <Tag
                    to={"/company/questions"}
                    label={"Questions"}
                    icon={<BsQuestionSquare />}
                />
                <Tag
                    to={"/company/exam-hub"}
                    label={"Exam hub"}
                    icon={<BsArrowsFullscreen />}
                />
            </div>
            <button
                type="button"
                className={`flex items-center gap-4 group py-4 px-6 hover:bg-red-500`}
                onClick={handleLogoutClick}
            >
                <div className={`w-6 text-xl  group-hover:text-light-1`}>
                    <RiLogoutCircleLine />
                </div>
                <p className={`base-regular text-light-2`}>Logout</p>
            </button>
        </div>
    );
};

export default DashboardSideNavbar;
