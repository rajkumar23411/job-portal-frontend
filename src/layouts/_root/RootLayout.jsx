import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <>
            <Navbar />
            <section className="h-full w-full flex">
                <Outlet />
            </section>
        </>
    );
};

export default RootLayout;
