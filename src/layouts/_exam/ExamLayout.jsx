import Logo from "@/components/shared/Logo";
import { getCandidateDetails } from "@/redux/actions/exam.actions";
import {
    CLEAR_EXAM_ERRORS,
    RESET_EXAM_STATE,
} from "@/redux/constants/exam.constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ExamLayout = () => {
    const { success, error, details } = useSelector((state) => state.exam);
    const dispatch = useDispatch();

    useEffect(() => {
        if (success) {
            dispatch({ type: RESET_EXAM_STATE });
        }
        if (error) {
            dispatch({ type: CLEAR_EXAM_ERRORS });
        }
    }, [success, error, dispatch]);
    useEffect(() => {
        dispatch(getCandidateDetails());
    }, [dispatch]);
    return details ? (
        <>
            <nav className="h-16 bg-dark-4 flex items-center justify-between px-4 w-full">
                <Logo />
            </nav>
            <Outlet />
        </>
    ) : (
        <Navigate to="/exam/candidate/validate" />
    );
};

export default ExamLayout;
