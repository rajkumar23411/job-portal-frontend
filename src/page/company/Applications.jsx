import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    loadAlljobApplications,
    updateApplicationStatus,
} from "@/redux/actions/application.action";
import {
    RESET_APPLICATION_STATE,
    RESET_APPLICATION_STATE_ERROR,
} from "@/redux/constants/application.constants";
import { formatDateString, getStatusColor } from "@/utils";
import { useEffect, useState } from "react";
import { GrDocumentText } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Applications = () => {
    const dispatch = useDispatch();

    const [status, setStatus] = useState("");
    const [statusChanged, setStatusChanged] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState("");
    const { success, error, applications } = useSelector(
        (state) => state.application
    );
    const { exams } = useSelector((state) => state.exam);

    const handleStatusChange = (id, value) => {
        setStatusChanged(true);
        setApplicationStatus(value);
        dispatch(updateApplicationStatus(id, value));
    };

    useEffect(() => {
        if (success) {
            dispatch({ type: RESET_APPLICATION_STATE });
        }
        if (error) {
            dispatch({ type: RESET_APPLICATION_STATE_ERROR });
        }
    }, [success, error, dispatch]);

    useEffect(() => {
        dispatch(loadAlljobApplications(status));
    }, [dispatch, status]);
    return (
        <div className="h-max w-full">
            <div className="flex items-center justify-between">
                <h1 className="h3-medium text-light-2 flex gap-3">
                    Candidate Applications
                    {status !== "" ? (
                        <div>
                            <span>/</span> &nbsp;&nbsp;
                            <span>Status: </span>
                            <span>{status}</span>
                        </div>
                    ) : null}
                </h1>
                <div>
                    <form>
                        <select
                            className="shad-input w-48 text-light-2 px-3"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option defaultValue="" className="text-light-3">
                                Select status
                            </option>
                            <option value="">All</option>
                            <option value="applied">Applied</option>
                            <option value="shortlist">Shortlist</option>
                            <option value="reject">Reject</option>
                            <option value="hire">Hired</option>
                        </select>
                    </form>
                </div>
            </div>
            <div className="w-full h-full pt-6">
                {applications?.length <= 0 ? (
                    <div className="flex-center h-full flex-col gap-6 py-20">
                        <div className=" text-light-2 h3-medium">
                            No applicants found with status{" "}
                            <span className="text-light-3 italic">
                                {status}
                            </span>
                        </div>
                    </div>
                ) : (
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
                                    "Update status",
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
                                const examStatus =
                                    exams?.find(
                                        (exam) =>
                                            exam.job?._id === app?.job?._id
                                    )?.status || "N/A";
                                const color = getStatusColor(examStatus);
                                console.log(color);
                                return (
                                    <TableRow
                                        key={indx}
                                        className="odd:bg-dark-4 even:bg-dark-3 small-regular hover:bg-dark-4 border-light-3/50 text-gray-300"
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
                                            <select
                                                disabled={
                                                    app?.status === "reject" ||
                                                    app?.status === "hire"
                                                }
                                                value={
                                                    statusChanged
                                                        ? applicationStatus
                                                        : app?.status
                                                }
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        app?._id,
                                                        e.target.value
                                                    )
                                                }
                                                className="shad-input h-10 bg-dark-2 capitalize"
                                            >
                                                {
                                                    <option
                                                        defaultValue={""}
                                                        disabled
                                                        className="capitalize"
                                                    >
                                                        {app?.status}
                                                    </option>
                                                }
                                                {app?.status === "applied" && (
                                                    <>
                                                        <option value="shortlist">
                                                            Shortlist
                                                        </option>
                                                        <option value="reject">
                                                            Reject
                                                        </option>
                                                        <option value="hire">
                                                            Hire
                                                        </option>
                                                    </>
                                                )}
                                                {app?.status ===
                                                    "shortlist" && (
                                                    <>
                                                        <option value="reject">
                                                            Reject
                                                        </option>
                                                        <option value="hire">
                                                            Hire
                                                        </option>
                                                    </>
                                                )}
                                            </select>
                                        </TableCell>
                                        <TableCell
                                            className={`${color} small-medium capitalize`}
                                        >
                                            {examStatus}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
};

export default Applications;
