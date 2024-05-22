import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { loadUserApplications } from "@/redux/actions/application.action";
import { formatDateString } from "@/utils";
import { useEffect } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { GrDocumentText } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function getStatusColor(status) {
    switch (status) {
        case "applied":
            return "text-blue-500";
        case "shortlisted":
            return "text-yellow-500";
        case "rejected":
            return "text-red-500";
        case "hired":
            return "text-green-500";
        default:
            return "text-gray-500";
    }
}
const MyApplications = () => {
    const dispatch = useDispatch();
    const { applications } = useSelector((state) => state.application);
    const host = window.location.host;
    const protocol = window.location.protocol;
    const formUrl = `${protocol}://www.${host}.com/`;
    useEffect(() => {
        dispatch(loadUserApplications());
    }, [dispatch]);
    return (
        <div className="w-full h-max flex-center flex-col py-20 gap-10">
            <h1 className="h2-semibold text-light-2">My Applications</h1>

            <div className="w-full">
                <Table className="w-[80%] mx-auto rounded-xl overflow-hidden z-auto">
                    <TableHeader className="uppercase  bg-gray-950">
                        <TableRow className="border-light-3/50">
                            {[
                                "Company",
                                "Profile",
                                "Date",
                                "Total Applicants",
                                "Status",
                                "Resume",
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
                                    className="odd:bg-dark-4 even:bg-dark-3 hover:bg-transparent small-regular  border-light-3/50 text-gray-300"
                                >
                                    <TableCell className="font-medium text-light-1">
                                        {app?.job?.company?.name}
                                    </TableCell>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <span>{app?.job?.title} Job</span>
                                        <Link
                                            to={`${formUrl}/job/${app?.job?._id}`}
                                            target="_blank"
                                            className="text-lg text-blue-500 hover:text-blue-600"
                                        >
                                            <BsBoxArrowUpRight />
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {formatDateString(app?.appliedAt)}
                                    </TableCell>
                                    <TableCell>
                                        {app?.job?.totalApplicants}
                                    </TableCell>
                                    <TableCell
                                        className={`capitalize ${getStatusColor(
                                            app?.status
                                        )}`}
                                    >
                                        {app?.status}
                                    </TableCell>
                                    <TableCell className="text-blue-500 hover:text-blue-600 small-medium">
                                        <Link
                                            to={app?.user?.resume?.url}
                                            target="_blank"
                                        >
                                            <GrDocumentText />
                                        </Link>
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

export default MyApplications;
