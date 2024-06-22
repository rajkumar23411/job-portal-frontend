import Loader from "@/components/shared/Loader";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { validateAccess } from "@/redux/actions/exam.actions";
import {
    CLEAR_EXAM_ERRORS,
    RESET_EXAM_STATE,
} from "@/redux/constants/exam.constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const AuthUser = () => {
    const { success, error, message, loading } = useSelector(
        (state) => state.exam
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");
    const auth = searchParams.get("auth");

    const handleVerifyURL = () => dispatch(validateAccess(token, auth));
    useEffect(() => {
        if (!loading && success) {
            toast.success(message);
            navigate("/exam/candidate/appear", { state: { auth: true } });
            dispatch({ type: RESET_EXAM_STATE });
        }
        if (error) {
            toast.error(error);
            dispatch({ type: CLEAR_EXAM_ERRORS });
        }
    }, [success, error, dispatch, message, navigate, loading]);
    return (
        <div className="h-full flex-center w-full">
            <div className="w-565 flex-center flex-col gap-10 bg-dark-3 px-8 py-4 rounded-lg">
                <Logo />
                <h1 className="h2-medium text-light-3">
                    Welcome to exam portal
                </h1>
                <div className="flex flex-col gap-6">
                    <h1 className="h3-medium text-red-600">
                        Important instructions for candidate:{" "}
                    </h1>
                    <ul className="list-inside flex flex-col gap-2 text-gray-300">
                        <li className="list-decimal">
                            Once the test is verified, the link will be
                            activated for the next alloted duration only.
                        </li>
                        <li className="list-decimal">
                            Once the test is started, the candidate has to
                            complete all the questions within the given time
                            frame.
                        </li>
                        <li className="list-decimal">
                            Once the test is completed, the link will be
                            deactivated.
                        </li>
                        <li className="list-decimal">
                            The candidate can only attempt the test once.
                        </li>
                        <li className="list-decimal">
                            Once a question answer is submitted, it cannot be
                            modified. So please answer carefully.
                        </li>
                    </ul>
                </div>
                <Button
                    className="shad-button_primary flex-center px-4 base-medium rounded-lg"
                    disabled={loading}
                    onClick={handleVerifyURL}
                >
                    {loading ? (
                        <div className="flex gap-2 cursor-not-allowed">
                            <Loader />
                            Verifying ...
                        </div>
                    ) : (
                        "Verify and start test"
                    )}
                </Button>
            </div>
        </div>
    );
};

export default AuthUser;
