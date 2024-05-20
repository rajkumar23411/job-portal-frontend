import DashboardSideNavbar from "@/components/shared/DashboardSideNavbar";
import { loadCompany } from "@/redux/actions/company.actions";
import { RESET_COMPANY } from "@/redux/constants/company.constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const CompanyLayout = () => {
    const { success, error, data } = useSelector((state) => state.company);
    const dispatch = useDispatch();

    useEffect(() => {
        if (success || error) {
            dispatch({ type: RESET_COMPANY });
        }
    }, [success, error, dispatch]);

    useEffect(() => {
        dispatch(loadCompany());
    }, [dispatch]);

    return data ? (
        <div className="flex h-screen w-full">
            <div className="flex-[0.23] h-screen bg-dark-4">
                <DashboardSideNavbar />
            </div>
            <div className="flex-1 bg-dark-2 box-border p-4 h-screen overflow-y-scroll custom-scrollbar">
                <Outlet />
            </div>
        </div>
    ) : (
        <Navigate to="/company/login" />
    );
};

export default CompanyLayout;
