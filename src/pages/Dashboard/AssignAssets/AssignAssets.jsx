import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignAssets = () => {
    const axiosSecure = useAxiosSecure();
    const modalRef = useRef(null);

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

    const {
        data: requests = [],
        refetch: refetchRequests,
        isLoading: reqLoading,
    } = useQuery({
        queryKey: ["requests", "pending"],
        queryFn: async () => {
            const res = await axiosSecure.get("/requests?requestStatus=pending");
            return res.data;
        },
    });

    const {
        data: employees = [],
        isLoading: empLoading,
        refetch: refetchEmployees,
    } = useQuery({
        queryKey: ["employees", "available"],
        enabled: false,
        queryFn: async () => {
            const res = await axiosSecure.get(
                "/employees?status=approved&workStatus=available"
            );
            return res.data;
        },
    });

    const openAssignModal = async (request) => {
        setSelectedRequest(request);
        setSelectedEmployeeId("");
        await refetchEmployees();
        modalRef.current?.showModal();
    };

    const handleAssign = async () => {
        if (!selectedRequest?._id) return;

        if (!selectedEmployeeId) {
            return Swal.fire("Select Employee", "Please select an employee.", "info");
        }

        const employee = employees.find((e) => String(e._id) === String(selectedEmployeeId));
        if (!employee) {
            return Swal.fire("Invalid", "Selected employee not found.", "error");
        }

        const payload = {
            employeeId: employee._id,
            employeeName: employee.name,
            employeeEmail: employee.email,
        };

        try {
            await axiosSecure.patch(`/requests/${selectedRequest._id}/assign`, payload);

            modalRef.current?.close();
            setSelectedRequest(null);
            setSelectedEmployeeId("");
            refetchRequests();

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Assigned successfully",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (err) {
            const status = err?.response?.status;

            if (status === 402) {
                modalRef.current?.close();

                Swal.fire({
                    icon: "warning",
                    title: "No Credit Left",
                    text: "Please upgrade your package",
                    confirmButtonText: "Upgrade",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.assign("/dashboard/upgrade-package");
                    }
                });

                return;
            }

            console.log(err);
            Swal.fire("Error", "Assign failed", "error");
        }
    };

    const handleUpdateStatus = async (request, newStatus) => {
        try {
            const res = await axiosSecure.patch(`/requests/${request._id}/status`, {
                requestStatus: newStatus,
            });

            if (res.data?.modifiedCount > 0) {
                refetchRequests();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Marked as ${newStatus}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire("Error", "Status update failed.", "error");
            }
        } catch (err) {
            console.log(err);
            Swal.fire("Error", "Status update failed. Check console.", "error");
        }
    };

    if (reqLoading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    const sorted = [...requests].sort((a, b) => {
        const aT = new Date(a.createdAt || 0).getTime();
        const bT = new Date(b.createdAt || 0).getTime();
        return bT - aT;
    });

    return (
        <div>
            <h2 className="text-4xl font-bold mb-6">Assign Assets: {sorted.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Asset</th>
                            <th>QTY</th>
                            <th>Requested By</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Status</th>
                            <th>Assigned To</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sorted.map((request, index) => {
                            const status = request.requestStatus || "pending";
                            const isPending = status === "pending";
                            const isAssigned = status === "assigned";

                            return (
                                <tr key={request._id}>
                                    <th>{index + 1}</th>
                                    <td>{request.assetName}</td>
                                    <td>{request.assetQTY || "-"}</td>
                                    <td>{request.employeeName}</td>
                                    <td>{request.employeeEmail}</td>
                                    <td>{request.companyName}</td>

                                    <td>
                                        <span
                                            className={`badge ${status === "pending"
                                                ? "badge-warning"
                                                : status === "assigned"
                                                    ? "badge-info"
                                                    : status === "completed"
                                                        ? "badge-success"
                                                        : status === "returned"
                                                            ? "badge-neutral"
                                                            : "badge-neutral"
                                                }`}
                                        >
                                            {status}
                                        </span>
                                    </td>

                                    <td>{request.assignedEmployeeName || "-"}</td>

                                    <td className="space-x-2">
                                        {isPending && (
                                            <button
                                                onClick={() => openAssignModal(request)}
                                                className="btn btn-accent text-white btn-sm"
                                            >
                                                Assign
                                            </button>
                                        )}

                                        {isAssigned && (
                                            <>
                                                <button
                                                    onClick={() => handleUpdateStatus(request, "completed")}
                                                    className="btn btn-success text-white btn-sm"
                                                >
                                                    Complete
                                                </button>

                                                <button
                                                    onClick={() => handleUpdateStatus(request, "returned")}
                                                    className="btn btn-warning text-white btn-sm"
                                                >
                                                    Return
                                                </button>
                                            </>
                                        )}

                                        {!isPending && !isAssigned && (
                                            <span className="text-xs text-gray-500">No action</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}

                        {sorted.length === 0 && (
                            <tr>
                                <td colSpan="9" className="text-center text-gray-500">
                                    No pending requests 🎉
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-2">Assign Asset</h3>

                    <div className="space-y-2">
                        <p>
                            <b>Asset:</b> {selectedRequest?.assetName} (QTY:{" "}
                            {selectedRequest?.assetQTY || "-"})
                        </p>
                        <p>
                            <b>Requested By:</b> {selectedRequest?.employeeName} (
                            {selectedRequest?.employeeEmail})
                        </p>
                        <p>
                            <b>Company:</b> {selectedRequest?.companyName}
                        </p>
                    </div>

                    <div className="mt-5">
                        <label className="label font-semibold">Select Employee</label>

                        {empLoading ? (
                            <span className="loading loading-spinner loading-md"></span>
                        ) : (
                            <select
                                className="select select-bordered w-full"
                                value={selectedEmployeeId}
                                onChange={(e) => setSelectedEmployeeId(String(e.target.value))}
                            >
                                <option value="" disabled hidden>
                                    -- Select an available employee --
                                </option>
                                {employees.map((emp) => (
                                    <option key={String(emp._id)} value={String(emp._id)}>
                                        {emp.name} ({emp.email})
                                    </option>
                                ))}
                            </select>
                        )}

                        {!empLoading && employees.length === 0 && (
                            <p className="text-sm text-red-500 mt-2">
                                No available employees found.
                            </p>
                        )}
                    </div>

                    <div className="modal-action flex justify-between">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>

                        <button
                            onClick={handleAssign}
                            disabled={!selectedEmployeeId || employees.length === 0}
                            className="btn btn-accent text-white"
                        >
                            Assign Now
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignAssets;
