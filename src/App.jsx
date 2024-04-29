import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import AuthLayout from "./layouts/_auth/AuthLayout";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import VerifyAccount from "./page/VerifyAccount";
import store from "./redux/store";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/user.action";
import Profile from "./page/Profile";
import RootLayout from "./layouts/_root/RootLayout";
import { useSelector } from "react-redux";
import { clearError } from "./redux/actions/error.action";
import UpdateEmail from "./page/UpdateEmail";
import ProtectedRoute from "./layouts/_auth/ProtectedRoute";
import MyPreferences from "./page/MyPreferences";

function App() {
    const { error } = useSelector((state) => state.auth);

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    useEffect(() => {
        if (error) {
            store.dispatch(clearError());
        }
    }, [error]);
    return (
        <main className="h-screen w-full custom-scrollbar">
            <Routes>
                <Route element={<RootLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Route>
                <Route path="/verify/account" element={<VerifyAccount />} />
                <Route element={<RootLayout />}>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/update-email" element={<UpdateEmail />} />
                        <Route
                            path="/my/preferences"
                            element={<MyPreferences />}
                        />
                    </Route>
                </Route>
            </Routes>
        </main>
    );
}

export default App;
