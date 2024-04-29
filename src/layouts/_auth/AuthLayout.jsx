import { Outlet } from "react-router-dom";
const AuthLayout = () => {
    return (
        <section className="w-full h-full flex">
            <section className="flex flex-1 justify-center items-center flex-col py-10">
                <Outlet />
            </section>
            <img
                src="/assets/images/auth-bg-1.jpg"
                alt="logo"
                className="hidden xl:block w-1/2 h-screen object-cover bg-no-repeat"
            />
        </section>
    );
};

export default AuthLayout;
