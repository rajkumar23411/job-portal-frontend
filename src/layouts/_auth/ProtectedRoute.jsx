import { loadUser } from "@/redux/actions/user.action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { loading, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return !loading && isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/sign-in" />
    );
};

export default ProtectedRoute;
