import SearchBar from "@/components/shared/SearchBar";
import { GoPlus } from "react-icons/go";
import { MdOutlineMapsHomeWork, MdOutlineNotStarted } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import JobCard from "@/layouts/_comapny/JobCard";
import { useEffect } from "react";
import { loadJobs } from "@/redux/actions/company.actions";
import { RESET_COMPANY } from "@/redux/constants/company.constants";
function Box({ heading, value = 0 }) {
    return (
        <div className="w-60 h-36 bg-dark-4 rounded-xl flex justify-center flex-col p-6">
            <h4 className="base-medium text-light-3">{heading}</h4>
            <h1 className="h1-semibold text-light-2">{value}</h1>
        </div>
    );
}

const Jobs = () => {
    const dispatch = useDispatch();
    const { jobs, success, error } = useSelector((state) => state.company);

    useEffect(() => {
        if (success || error) {
            dispatch({ type: RESET_COMPANY });
        }
    }, [success, error, dispatch]);

    useEffect(() => {
        dispatch(loadJobs());
    }, [dispatch]);
    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="h3-medium">Jobs ({jobs?.length})</h1>
                <SearchBar />
            </div>
            <div className="flex gap-x-4 pt-6">
                <Box heading={"Total jobs"} value={jobs?.length} />
                <Box
                    heading={"Active jobs"}
                    value={jobs?.filter((j) => j.status === "Open").length}
                />
                <Box
                    heading={"Suspended jobs"}
                    value={jobs?.filter((j) => j.status === "Closed").length}
                />
                <Link
                    to="/company/new-job"
                    className="w-60 h-36 bg-dark-4 rounded-xl flex-center gap-1 flex-col cursor-pointer hover:border hover:border-light-3"
                >
                    <GoPlus className="text-5xl text-light-3" />
                    <p className="text-light-2">Create a new job</p>
                </Link>
            </div>
            <div className="pt-6">
                <h1 className="h3-medium">Active jobs</h1>

                <div className="grid grid-cols-2 gap-6 pt-6">
                    {jobs?.map((job) => (
                        <JobCard job={job} key={job._id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
