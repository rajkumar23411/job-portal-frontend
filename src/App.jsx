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
import MyApplications from "./page/user/MyApplications";
import AllJobs from "./page/user/AllJobs";
import Exam from "./page/company/Exam";
import SetExam from "./page/company/SetExam";
import SetQuestions from "./page/company/SetQuestions";
import Questions from "./page/company/Questions";
import QuestionSetView from "./page/company/QuestionSetView";
import JobApplications from "./page/company/JobApplications";
import Applications from "./page/company/Applications";
import AuthUser from "./page/exam/AuthUser";
import ExamLayout from "./layouts/_exam/ExamLayout";
import AppearExam from "./page/exam/AppearExam";
import AppearExamSuccess from "./page/exam/AppearExamSuccess";
import LeftExam from "./page/exam/LeftExam";

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
                    <Route path="/job/all" element={<AllJobs />} />
                    <Route
                        path="/my/applications"
                        element={<MyApplications />}
                    />
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
                    <Route
                        path="/company/applications"
                        element={<Applications />}
                    />
                    <Route
                        path="/company/applications/:id"
                        element={<JobApplications />}
                    />
                    <Route path="/company/job/edit/:id" element={<EditJob />} />
                    <Route path="/company/questions" element={<Questions />} />
                    <Route
                        path="/company/questions/set/create"
                        element={<SetQuestions />}
                    />
                    <Route
                        path="/company/questions/set/:id"
                        element={<QuestionSetView />}
                    />
                    <Route path="/company/exam-hub" element={<Exam />} />
                    <Route
                        path="/company/exam/user/assign"
                        element={<SetExam />}
                    />
                </Route>

                {/* exam portal */}
                <Route path="/exam/candidate/validate" element={<AuthUser />} />
                <Route element={<ExamLayout />}>
                    <Route
                        path="/exam/candidate/appear"
                        element={<AppearExam />}
                    />
                </Route>
                <Route
                    path="/exam/candidate/appear/success"
                    element={<AppearExamSuccess />}
                />
                <Route
                    path="/exam/candidate/appear/left"
                    element={<LeftExam />}
                />
            </Routes>
        </main>
    );
}

export default App;
