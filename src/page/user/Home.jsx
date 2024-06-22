import { getAllJobs, getJobAsPerPreference } from "@/redux/actions/job.actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SmallJobCard from "@/components/shared/SmallJobCard";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Home = () => {
    const { jobs } = useSelector((state) => state.jobs);
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getJobAsPerPreference());
    }, [dispatch]);
    return (
        <div className="h-max py-10 flex-center flex-col gap-20 overflow-hidden w-full">
            <div className="flex-center flex-col gap-2">
                <div className="flex-center gap-2">
                    <h1 className="h1-semibold text-light-1">
                        Hi, {user?.name?.split(" ")[0]}
                    </h1>
                    <img
                        src={
                            "https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif"
                        }
                        alt="wave"
                        className="h-8"
                    />
                </div>
                <p className="h3-regular text-light-3">
                    {`Let's`} help you land your dream career
                </p>
            </div>
            <div className="bg-light-3/10 w-full p-10 flex flex-col gap-10">
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="h3-semibold text-light-2">
                        Recommended jobs for you
                    </h1>
                    <p className="base-regular text-light-2">
                        As per your{" "}
                        <Link
                            to="/my/preferences"
                            className="base-medium text-light-3 cursor-pointer"
                        >
                            preferences
                        </Link>
                    </p>
                </div>
                <div className="flex-center gap-6">
                    {jobs?.map((job) => (
                        <SmallJobCard key={job._id} job={job} />
                    ))}
                </div>
            </div>
            <div className="w-full mx-auto flex-center">
                <Link
                    to="/job/all"
                    className="text-primary-600 group base-medium flex items-center gap-2 bg-light-3/20 px-4 py-2 rounded-md"
                >
                    <span>View all jobs</span>
                    <div className="group-hover:transform group-hover:translate-x-2 group-hover:transition-all group-hover:duration-100 group-hover:ease-in-out">
                        <FaArrowRightLong />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Home;
