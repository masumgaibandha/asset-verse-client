import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EmployeeList = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: employees = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["hr-employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/hr/employees");
            return res.data;
        },
    });

    const handleRemove = async (employeeEmail) => {
        const result = await Swal.fire({
            icon: "warning",
            title: "Remove employee?",
            text: "This will remove the employee from your team.",
            showCancelButton: true,
            confirmButtonText: "Yes, remove",
        });

        if (!result.isConfirmed) return;

        try {
            const res = await axiosSecure.patch("/hr/employees/remove", { employeeEmail });

            if (res.data?.modifiedCount > 0) {
                Swal.fire("Removed!", "Employee removed from team.", "success");
                refetch();
            } else {
                Swal.fire("Not removed", "Employee not found or already removed.", "info");
            }
        } catch (err) {
            console.log(err);
            Swal.fire("Error", "Remove failed.", "error");
        }
    };

    if (isLoading) return <span className="loading loading-spinner loading-lg"></span>;

    return (
        <div className="p-4 md:p-6">
            <h2 className="text-3xl font-bold mb-4">My Employee List: {employees.length}</h2>

            <div className="overflow-x-auto bg-base-100 border rounded-lg">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Join Date</th>
                            <th>Assets Count</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.map((m, idx) => {
                            const photo =
                                m.employeePhoto ||
                                m.profileImage ||
                                m.photoURL ||
                                "https://i.ibb.co/4pDNDk1/avatar.png";

                            const joinDate = m.affiliationDate
                                ? new Date(m.affiliationDate).toLocaleDateString()
                                : "-";

                            return (
                                <tr key={m._id}>
                                    <td>{idx + 1}</td>

                                    <td>
                                        <div className="avatar">
                                            <div className="w-10 rounded-full">
                                                <img src={photo} alt="employee" />
                                            </div>
                                        </div>
                                    </td>

                                    <td className="font-semibold">{m.employeeName || "N/A"}</td>
                                    <td>{m.employeeEmail}</td>
                                    <td>{joinDate}</td>
                                    <td>
                                        <span className="badge badge-neutral">{m.assetsCount || 0}</span>
                                    </td>

                                    <td>
                                        <button
                                            onClick={() => handleRemove(m.employeeEmail)}
                                            className="btn btn-sm btn-error text-white"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                        {employees.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center text-gray-500 py-8">
                                    No affiliated employees yet.
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
