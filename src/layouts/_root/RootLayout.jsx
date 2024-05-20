import Navbar from "@/components/shared/Navbar";
import { loadUser } from "@/redux/actions/user.action";
import { RESET_USER } from "@/redux/constants/user.constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RootLayout = () => {
    const dispatch = useDispatch();
    const { success, error, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (success || error) {
            dispatch({ type: RESET_USER });
        }
    }, [success, error, dispatch]);

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return isAuthenticated ? (
        <>
            <Navbar />
            <section className="h-full w-full flex">
                <Outlet />
            </section>
        </>
    ) : (
        <Navigate to="/sign-in" />
    );
};

export default RootLayout;
