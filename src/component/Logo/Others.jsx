import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApproveEmployees = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: employees = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["employees", "pending"],
        queryFn: async () => {
            const res = await axiosSecure.get("/employees?status=pending");
            return res.data;
        },
    });

    const updateEmployeeStatus = async (id, status) => {
        const res = await axiosSecure.patch(`/employees/${id}`, { status });
        return res.data;
    };

    const handleApprove = async (id) => {
        const result = await Swal.fire({
            title: "Approve employee?",
            text: "Employee will be marked as approved.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, approve",
        });

        if (!result.isConfirmed) return;

        try {
            const data = await updateEmployeeStatus(id, "approved");
            if (data.modifiedCount) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Employee approved",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (err) {
            console.log(err);
            Swal.fire("Error", "Failed to approve employee.", "error");
        }
    };

    const handleReject = async (id) => {
        const result = await Swal.fire({
            title: "Reject employee?",
            text: "Employee will be marked as rejected.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, reject",
        });

        if (!result.isConfirmed) return;

        try {
            const data = await updateEmployeeStatus(id, "rejected");
            if (data.modifiedCount) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Employee rejected",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (err) {
            console.log(err);
            Swal.fire("Error", "Failed to reject employee.", "error");
        }
    };

    if (isLoading) {
        return <span className="loading loading-infinity loading-lg"></span>;
    }

    return (
        <div>
            <h2 className="text-4xl font-bold mb-6">
                Employees Pending Approval: {employees.length}
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Designation</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.map((emp, index) => (
                            <tr key={emp._id}>
                                <th>{index + 1}</th>
                                <td>{emp.name}</td>
                                <td>{emp.email}</td>
                                <td>{emp.companyName}</td>
                                <td>{emp.designation}</td>
                                <td>
                                    <span className="badge badge-warning">{emp.status}</span>
                                </td>
                                <td className="space-x-2">
                                    <button
                                        onClick={() => handleApprove(emp._id)}
                                        className="btn btn-xs btn-success"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(emp._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {employees.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center text-gray-500">
                                    No pending employees 🎉
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveEmployees;


// Users management dive

<div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-10 h-10">
                                                <img
                                                    src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                                    alt="avatar"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">
                                                {user.displayName || "User"}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td>{user.email}</td>

                                <td>
                                    <span
                                        className={`badge ${user.role === "hr"
                                                ? "badge-success"
                                                : user.role === "employee"
                                                    ? "badge-info"
                                                    : "badge-warning"
                                            }`}
                                    >
                                        {user.role || "user"}
                                    </span>
                                </td>

                                <td className="space-x-2">
                                    {user.role !== "employee" && (
                                        <button
                                            onClick={() => handleMakeEmployee(user)}
                                            className="btn btn-xs btn-info"
                                        >
                                            Make Employee
                                        </button>
                                    )}

                                    {user.role !== "hr" && (
                                        <button
                                            onClick={() => handleMakeHR(user)}
                                            className="btn btn-xs btn-success"
                                        >
                                            Make HR
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {users.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>