import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EmployeeList = () => {
    const axiosSecure = useAxiosSecure();

    const { data: team = [], isLoading, refetch } = useQuery({
        queryKey: ["hr-team"],
        queryFn: async () => {
            const res = await axiosSecure.get("/hr/employees");
            return res.data;
        },
    });

    const handleRemove = async (employeeEmail) => {
        const ok = await Swal.fire({
            title: "Remove employee?",
            text: "This will remove from your team list.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, remove",
        });

        if (!ok.isConfirmed) return;

        const res = await axiosSecure.patch("/hr/employees/remove", { employeeEmail });
        if (res.data?.modifiedCount > 0) {
            refetch();
            Swal.fire("Removed", "Employee removed from your team.", "success");
            return;
        }
        Swal.fire("Failed", "Could not remove. Try again.", "error");
    };

    if (isLoading) return <span className="loading loading-spinner loading-lg"></span>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">My Employee List</h2>
            <p className="text-sm opacity-70 mb-4">Total: {team.length}</p>

            <div className="overflow-x-auto bg-base-100 border rounded-lg">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Employee</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Join Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {team.map((m, idx) => (
                            <tr key={m._id}>
                                <td>{idx + 1}</td>

                                <td className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={m.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="employee" />
                                            
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold">{m.employeeName}</p>
                                    </div>
                                </td>

                                <td>{m.employeeEmail}</td>
                                <td>{m.companyName || "-"}</td>
                                <td>{m.affiliationDate ? new Date(m.affiliationDate).toLocaleDateString() : "-"}</td>
                                <td>
                                    <button
                                        onClick={() => handleRemove(m.employeeEmail)}
                                        className="btn btn-sm btn-outline btn-error"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {team.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center opacity-70 py-8">
                                    No employees affiliated yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
