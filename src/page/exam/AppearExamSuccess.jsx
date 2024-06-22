import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AppearExamSuccess = () => {
    const state = useLocation().state;
    const navigate = useNavigate();

    useEffect(() => {
        if (state === null || state === undefined || !state.success)
            navigate("/exam/candidate/validate");
    });
    return (
        <div className="h-screen w-screen flex-center flex-col">
            <div className="h-64 w-64 sm:h-96 sm:w-96">
                <img
                    src="/assets/images/animation-check.gif"
                    alt="order success"
                    className="h-full w-full object-cover mix-blend-screen"
                />
            </div>
            <h1 className="h4-medium text-light-2 text-center">
                Congratualtions, you have successfully appeared the exam. <br />{" "}
                Your response has been sent to respective orginization.
            </h1>
            <h2 className="base-medium text-light-3 mt-6">
                Now you can close this window.
            </h2>
        </div>
    );
};

export default AppearExamSuccess;
