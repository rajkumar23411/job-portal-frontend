import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { loading, isAuthenticated } = useSelector((state) => state.auth);
    return !loading && isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/sign-in" />
    );
};

export default ProtectedRoute;
