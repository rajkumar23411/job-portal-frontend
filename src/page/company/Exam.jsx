import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { loadAllAssignedExams } from "@/redux/actions/exam.actions";
import {
    CLEAR_EXAM_ERRORS,
    RESET_EXAM_STATE,
} from "@/redux/constants/exam.constants";
import { formatDateString, getStatusColor } from "@/utils";
import { useEffect, useState } from "react";
import { LuUserPlus } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Exam = () => {
    const dispatch = useDispatch();
    const { success, error, exams } = useSelector((state) => state.exam);

    const [status, setStatus] = useState("");
    const [jobTitle, setJobTitle] = useState("");

    useEffect(() => {
        if (success) dispatch({ type: RESET_EXAM_STATE });
        if (error) dispatch({ type: CLEAR_EXAM_ERRORS });
    }, [success, error, dispatch]);

    useEffect(() => {
        dispatch(loadAllAssignedExams(status));
    }, [dispatch, status]);
    return (
        <div className="h-max w-full flex flex-col gap-6">
            <h1 className="h3-medium">Candidate exam hub</h1>
            <Link
                to="/company/exam/user/assign"
                className="w-60 h-36 bg-dark-4 rounded-xl flex-center gap-1 flex-col cursor-pointer hover:border hover:border-light-3"
            >
                <LuUserPlus className="text-3xl text-light-3" />
                <p className="text-light-2">Assign exam</p>
            </Link>

            <div>
                <div className="flex items-center justify-between">
                    <h1 className="h3-medium">
                        Assigned exams{" "}
                        {status !== "" ? `/ Status: ${status}` : null}
                    </h1>
                    <form>
                        <select
                            className="shad-input w-48 text-light-2 px-3 capitalize"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option
                                defaultValue=""
                                selected
                                className="text-light-3"
                            >
                                Select status
                            </option>
                            <option value="">All</option>
                            {["assigned", "appeared", `didn't appeared`].map(
                                (status) => (
                                    <option
                                        key={status}
                                        value={status}
                                        className="capitalize"
                                    >
                                        {status}
                                    </option>
                                )
                            )}
                        </select>
                    </form>
                </div>
                <div className="w-full h-full pt-6">
                    {exams?.length <= 0 ? (
                        <div className="flex-center h-full flex-col gap-6 py-20">
                            <div className=" text-light-2 h3-medium">
                                No exam found with status{" "}
                                <span className="text-light-3 italic">
                                    {status}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <Table className="w-[95%] rounded-xl mx-auto overflow-hidden mt-10">
                            <TableHeader className="uppercase tiny-medium bg-gray-950">
                                <TableRow className="border-light-3/50">
                                    {[
                                        "Job profile",
                                        "Candidate email",
                                        "Assigned on",
                                        "Exam status",
                                        "Last updated",
                                        "Marks obtained",
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
                                            className="odd:bg-dark-4 even:bg-dark-3 small-regular hover:bg-dark-4 border-light-3/50 text-gray-300"
                                        >
                                            <TableCell className="font-medium text-light-1">
                                                {exam?.job?.title}
                                            </TableCell>
                                            <TableCell>
                                                {exam?.candidate}
                                            </TableCell>
                                            <TableCell>
                                                {formatDateString(
                                                    exam?.createdAt
                                                )}
                                            </TableCell>
                                            <TableCell
                                                className={`${getStatusColor(
                                                    exam?.status
                                                )} capitalize small-medium`}
                                            >
                                                {exam?.status}
                                            </TableCell>
                                            <TableCell>
                                                {formatDateString(
                                                    exam?.updatedAt
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {exam?.status === "assigned"
                                                    ? "N/A"
                                                    : exam?.marks}
                                            </TableCell>
                                            <TableCell className="small-medium text-primary-600 cursor-pointer">
                                                View
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Exam;
