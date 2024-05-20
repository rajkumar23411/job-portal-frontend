import { manageAccount, navlinks } from "@/utils";
import Logo from "./Logo";
import { IoMdNotificationsOutline, IoMdArrowDropdown } from "react-icons/io";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "@/redux/actions/user.action";
import { toast } from "react-toastify";
import { RESET_USER } from "@/redux/constants/user.constants";
import { clearError } from "@/redux/actions/error.action";
const Navbar = () => {
    const { user, success, error, message } = useSelector(
        (state) => state.auth
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showDropDown, setShowDropDown] = useState(false);
    const [showNestedDropDown, setShowNestedDropDown] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        if (success) {
            toast.success(message);
            navigate("/");
            dispatch({ type: RESET_USER });
        }
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [success, error, message, dispatch, navigate]);

    return (
        <nav className="w-full py-4 px-20 bg-dark-4 flex items-center justify-between">
            <Logo />
            <div>
                <ul className="flex-center gap-10">
                    <li>Home</li>
                    <li>Jobs</li>
                    <li>
                        <IoMdNotificationsOutline
                            className="text-2xl"
                            title="chats"
                        />
                    </li>
                    <li>
                        <IoChatbubblesOutline
                            className="text-2xl"
                            title="chats"
                        />
                    </li>
                    <li
                        id="dropDownMenuBtn"
                        className="relative"
                        onClick={() => setShowDropDown(!showDropDown)}
                    >
                        <div className="flex-center gap-1">
                            <img
                                src={
                                    user?.avatar?.url ||
                                    "/assets/images/profile-placeholder.png"
                                }
                                alt="profile"
                                className="h-8 w-8 rounded-full object-top object-cover"
                            />
                            <IoMdArrowDropdown
                                className={`text-xl ${
                                    showDropDown ? "rotate-180" : ""
                                } transition-all duration-150 ease-in-out`}
                            />
                        </div>

                        <div
                            id="dropDownMenu"
                            className={`w-64 h-max bg-dark-3 shadow-md shadow-dark-1 rounded absolute top-12 right-0 transform origin-top-right transition-all duration-150 ease-in-out ${
                                showDropDown ? "scale-100" : "scale-0"
                            }`}
                        >
                            <div className="p-6 border-b border-b-dark-4">
                                <h1 className="base-semibold">{user?.name}</h1>
                                <h2 className="small-regular text-light-2">
                                    {user?.email}
                                </h2>
                            </div>
                            <div className="w-full flex flex-col py-2 base-regular">
                                {navlinks.map((link) => (
                                    <Link
                                        to={link.path}
                                        key={link.name}
                                        className="w-full px-6 py-2 flex items-center justify-between capitalize hover:bg-primary-500"
                                    >
                                        <li>{link.name}</li>
                                    </Link>
                                ))}
                                <div>
                                    <div
                                        className="w-full flex items-center justify-between px-6 py-3 cursor-pointer select-none"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowNestedDropDown(
                                                !showNestedDropDown
                                            );
                                        }}
                                    >
                                        <li>Manage Account</li>
                                        <li>
                                            <IoMdArrowDropdown
                                                className={`text-xl ${
                                                    showNestedDropDown
                                                        ? "rotate-180"
                                                        : ""
                                                } transition-all duration-150 ease-in-out`}
                                            />
                                        </li>
                                    </div>
                                    <div
                                        className={`flex-col ${
                                            showNestedDropDown
                                                ? "flex"
                                                : "hidden"
                                        } transition-all duration-150 ease-linear`}
                                    >
                                        {manageAccount.map((link) => (
                                            <Link
                                                to={link.path}
                                                key={link.name}
                                                className="w-full pl-9 py-2 flex items-center justify-between capitalize hover:bg-primary-500"
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                        <li
                                            onClick={handleLogout}
                                            className="w-full pl-9 py-2 flex items-center justify-between capitalize hover:bg-red-500 cursor-pointer"
                                        >
                                            Logout
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
