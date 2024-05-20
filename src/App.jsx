import { Routes, Route } from "react-router-dom";
import Home from "./page/user/Home";
import AuthLayout from "./layouts/_auth/AuthLayout";
import SignIn from "./page/user/SignIn";
import SignUp from "./page/user/SignUp";
import VerifyAccount from "./page/user/VerifyAccount";
import Profile from "./page/user/Profile";
import RootLayout from "./layouts/_root/RootLayout";
import UpdateEmail from "./page/user/UpdateEmail";
import MyPreferences from "./page/user/MyPreferences";
import ProfileView from "./page/user/ProfileView";
import Register from "./page/company/Register";
import Login from "./page/company/Login";
import CompanyLayout from "./layouts/_comapny/CompanyLayout";
import Dashboard from "./page/company/DashboardHome";
import Jobs from "./page/company/Jobs";
import CreateJob from "./page/company/CreateJob";
import SingleJobDetails from "./page/company/SingleJobDetails";
import EditJob from "./page/company/EditJob";
import Bookmarks from "./page/user/Bookmarks";
import JobDetails from "./page/user/JobDetails";

function App() {
    return (
        <main className="h-screen w-full custom-scrollbar">
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    {/* company routes */}
                    <Route path="/company/register" element={<Register />} />
                    <Route path="/company/login" element={<Login />} />
                </Route>

                <Route element={<RootLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/view" element={<ProfileView />} />
                    <Route path="/update-email" element={<UpdateEmail />} />
                    <Route path="/my/preferences" element={<MyPreferences />} />
                    <Route path="/my/bookmarks" element={<Bookmarks />} />
                    <Route path="/job/:id" element={<JobDetails />} />
                </Route>
                <Route path="/verify/account" element={<VerifyAccount />} />

                <Route element={<CompanyLayout />}>
                    <Route path="/company/dashboard" element={<Dashboard />} />
                    <Route path="/company/jobs" element={<Jobs />} />
                    <Route path="/company/new-job" element={<CreateJob />} />
                    <Route
                        path="/company/job/:id"
                        element={<SingleJobDetails />}
                    />
                    <Route path="/company/job/edit/:id" element={<EditJob />} />
                </Route>
            </Routes>
        </main>
    );
}

export default App;
