import Logo from "@/components/shared/Logo";
import { introTexts } from "@/utils";
import { Outlet } from "react-router-dom";
const AuthLayout = () => {
    return (
        <section className="w-full h-screen flex">
            <section className=" h-full flex-1 justify-center items-center flex-col overflow-y-auto custom-scrollbar">
                <Outlet />
            </section>
            {/* <img
                src="/assets/images/auth-bg-1.jpg"
                alt="logo"
                className="hidden xl:block w-1/2 h-screen object-cover bg-no-repeat"
            /> */}
            <section className="bg-blue-800 hidden w-1/2 h-screen xl:flex xl:justify-center xl:flex-col px-10">
                <p className="h2-semibold text-fuchsia-400">
                    {introTexts[Math.floor(Math.random() * introTexts.length)]}
                </p>
            </section>
        </section>
    );
};

export default AuthLayout;
