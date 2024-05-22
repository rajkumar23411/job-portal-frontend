import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    loadJobApplicants,
    updateApplicationStatus,
} from "@/redux/actions/application.action";
import {
    RESET_APPLICATION_STATE,
    RESET_APPLICATION_STATE_ERROR,
} from "@/redux/constants/application.constants";
import { formatDateString } from "@/utils";
import { useEffect, useState } from "react";
import { GrDocumentText } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function getStatusColor(status) {
    switch (status) {
        case "applied":
            return "text-blue-500";
        case "shortlist":
            return "text-yellow-500";
        case "reject":
            return "text-red-500";
        case "hire":
            return "text-green-500";
        default:
            return "text-light-2";
    }
}
const Applications = () => {
    const { success, error, message, applicants } = useSelector(
        (state) => state.application
    );
    const dispatch = useDispatch();
    const { id } = useParams();

    const [applicationStatus, setApplicationStatus] = useState("");
    const [statusChanged, setStatusChanged] = useState(false);

    const handleStatusChange = (id, value) => {
        setStatusChanged(true);
        setApplicationStatus(value);
        dispatch(updateApplicationStatus(id, value));
    };

    useEffect(() => {
        if (success) {
            toast.success(message);
            setStatusChanged(false);
            dispatch({ type: RESET_APPLICATION_STATE });
        }
        if (error) {
            toast.error(error);
            dispatch({ type: RESET_APPLICATION_STATE_ERROR });
        }
    }, [
        applicationStatus,
        statusChanged,
        dispatch,
        message,
        error,
        success,
        id,
    ]);

    useEffect(() => {
        dispatch(loadJobApplicants(id));
    }, [dispatch, id]);
    return (
        <div className="w-full h-full gap-10">
            <div className="flex items-center justify-between px-6">
                <h1 className="h3-regular text-light-2">Applications</h1>
                <h1 className="h3-regular text-light-2">
                    Total applicants: {applicants?.length}
                </h1>
            </div>

            <div className="w-full h-full pt-6">
                {applicants?.length <= 0 ? (
                    <div className="flex-center h-full flex-col gap-6">
                        <div className=" text-light-2 h3-medium">
                            No applicants to this job yet
                        </div>
                        <Link className="shad-button_primary flex-center px-6 rounded-lg base-medium">
                            View job
                        </Link>
                    </div>
                ) : (
                    <Table className="w-[95%] rounded-xl mx-auto overflow-hidden mt-10">
                        <TableHeader className="uppercase bg-gray-950">
                            <TableRow className="border-light-3/50">
                                {[
                                    "Job profile",
                                    "Name",
                                    "email",
                                    "contact",
                                    "Applied on",
                                    "Profile",
                                    "Resume",
                                    "Status",
                                    "Update status",
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
                            {applicants?.map((app, indx) => {
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
                                            {app?.user?.contact}
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
                                                Profile
                                            </Link>
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
