import { useDispatch, useSelector } from "react-redux";
import { Box } from "./Jobs";
import { useEffect } from "react";
import { getAllJobs } from "@/redux/actions/job.actions";
import { RESET_JOB_STATE } from "@/redux/constants/jobs.constants";
import { loadAlljobApplications } from "@/redux/actions/application.action";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatDateString, getStatusColor } from "@/utils";
import { Link } from "react-router-dom";
import { GrDocumentText } from "react-icons/gr";
import { loadAllAssignedExams } from "@/redux/actions/exam.actions";

const Dashboard = () => {
    const dispatch = useDispatch();

    const { data } = useSelector((state) => state.company);
    const {
        success: jobSuccess,
        error: jobError,
        jobs,
    } = useSelector((state) => state.jobs);
    const { applications } = useSelector((state) => state.application);
    const { exams } = useSelector((state) => state.exam);
    useEffect(() => {
        if (jobSuccess) dispatch({ type: RESET_JOB_STATE });
        if (jobError) dispatch({ type: RESET_JOB_STATE });
    }, [jobSuccess, jobError, dispatch]);

    useEffect(() => {
        dispatch(getAllJobs());
        dispatch(loadAlljobApplications());
        dispatch(loadAllAssignedExams());
    }, [dispatch]);
    return (
        <div className="w-full h-max flex flex-col gap-8">
            <h1 className="h3-medium">
                Dashboard / <span className="text-light-3">{data.name}</span>
            </h1>
            <div className="flex flex-wrap gap-4">
                <Box heading={"Total employees"} value={data?.totalEmployee} />
                <Box heading={"Total Jobs"} value={jobs?.length} />
                <Box
                    heading={"Total Applicants"}
                    value={applications?.length}
                />
                <Box heading={"Total Exam sets"} value={jobs?.length} />
            </div>
            <div>
                <h1 className="h3-medium text-light-3">Recent Applications</h1>
                <div className="w-full">
                    <Table className="w-[95%] rounded-xl mx-auto overflow-hidden mt-10">
                        <TableHeader className="uppercase bg-gray-950">
                            <TableRow className="border-light-3/50">
                                {[
                                    "Job profile",
                                    "Name",
                                    "email",
                                    "Applied on",
                                    "Resume",
                                    "Application status",
                                    "Exam status",
                                ].map((head) => (
                                    <TableHead
                                        key={head}
                                        className={`text-gray-300 uppercase small-regular`}
                                    >
                                        {head}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applications?.map((app, indx) => {
                                return (
                                    <TableRow
                                        key={indx}
                                        className="odd:bg-primary-600/10 even:bg-dark-3 small-regular hover:bg-dark-4 border-light-3/50 text-gray-300"
                                    >
                                        <TableCell className="font-medium text-light-1">
                                            {app?.job?.title}
                                        </TableCell>
                                        <TableCell>{app?.user?.name}</TableCell>
                                        <TableCell>
                                            {app?.user?.email}
                                        </TableCell>
                                        <TableCell>
                                            {formatDateString(
                                                app?.appliedAt
                                            ).substring(0, 12)}
                                        </TableCell>
                                        <TableCell className="text-blue-500 hover:text-blue-600 small-medium">
                                            <Link
                                                to={app?.user?.resume?.url}
                                                target="_blank"
                                            >
                                                <GrDocumentText />
                                            </Link>
                                        </TableCell>
                                        <TableCell
                                            className={`small-medium capitalize ${getStatusColor(
                                                app?.status
                                            )}`}
                                        >
                                            {app?.status}
                                        </TableCell>
                                        <TableCell>
                                            <Link>Assign</Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div>
                <h1 className="h3-medium text-light-3">Assigned Exams</h1>
                <Table className="w-[95%] rounded-xl mx-auto overflow-hidden mt-10">
                    <TableHeader className="uppercase bg-gray-950">
                        <TableRow className="border-light-3/50">
                            {[
                                "Job profile",
                                "Candidate email",
                                "Assigned on",
                                "Exam status",
                                "Last update time",
                                "Action",
                            ].map((head) => (
                                <TableHead
                                    key={head}
                                    className={`text-gray-300 uppercase small-regular`}
                                >
                                    {head}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {exams?.map((exam, indx) => {
                            return (
                                <TableRow
                                    key={indx}
                                    className="odd:bg-primary-600/10 even:bg-dark-3 small-regular hover:bg-dark-4 border-light-3/50 text-gray-300"
                                >
                                    <TableCell className="font-medium text-light-1">
                                        {exam?.job?.title}
                                    </TableCell>
                                    <TableCell>{exam?.candidate}</TableCell>
                                    <TableCell>
                                        {formatDateString(exam?.createdAt)}
                                    </TableCell>
                                    <TableCell>{exam?.status}</TableCell>
                                    <TableCell>
                                        {exam?.status === "assigned"
                                            ? "N/A"
                                            : formatDateString(exam?.updatedAt)}
                                    </TableCell>

                                    <TableCell className="text-blue-600 small-medium cursor-pointer">
                                        View
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Dashboard;
