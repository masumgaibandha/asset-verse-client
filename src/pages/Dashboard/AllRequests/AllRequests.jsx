import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllRequests = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: requests = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["hr-all-requests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/requests/hr");
            return res.data;
        },
    });

    const handleDecision = async (reqItem, decision) => {
        const confirm = await Swal.fire({
            icon: "warning",
            title: `${decision === "approved" ? "Approve" : "Reject"} this request?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.patch(`/requests/${reqItem._id}/decision`, { decision });
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Request ${decision}`,
                showConfirmButton: false,
                timer: 1200,
            });
        } catch (err) {
            if (err.response?.status === 403) {
                return Swal.fire({
                    icon: "warning",
                    title: "No Credit Left",
                    text: "Please upgrade your package",
                    confirmButtonText: "Go to Upgrade",
                }).then(() => {
                    window.location.href = "/dashboard/upgrade-package";
                });
            }

            Swal.fire("Error", err.response?.data?.message || "Failed", "error");
        }
    };

    if (isLoading) return <span className="loading loading-spinner loading-lg"></span>;

    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold mb-6">All Requests: {requests.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Employee</th>
                            <th>Asset</th>
                            <th>Qty</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.map((r, idx) => (
                            <tr key={r._id}>
                                <th>{idx + 1}</th>
                                <td>
                                    <div className="font-semibold">{r.employeeName}</div>
                                    <div className="text-xs text-gray-500">{r.employeeEmail}</div>
                                </td>
                                <td>{r.assetName}</td>
                                <td>{r.assetQTY || 1}</td>
                                <td>{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "N/A"}</td>
                                <td>
                                    <span
                                        className={`badge ${r.requestStatus === "pending"
                                                ? "badge-warning"
                                                : r.requestStatus === "approved"
                                                    ? "badge-success"
                                                    : "badge-error"
                                            }`}
                                    >
                                        {r.requestStatus}
                                    </span>
                                </td>

                                <td className="text-right space-x-2">
                                    {r.requestStatus === "pending" ? (
                                        <>
                                            <button
                                                onClick={() => handleDecision(r, "approved")}
                                                className="btn btn-success btn-sm text-white"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleDecision(r, "rejected")}
                                                className="btn btn-error btn-sm text-white"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-xs text-gray-500">No action</span>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {requests.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center text-gray-500 py-8">
                                    No requests found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllRequests;
