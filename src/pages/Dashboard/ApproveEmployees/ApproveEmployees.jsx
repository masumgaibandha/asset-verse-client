import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApproveEmployees = () => {
    const axiosSecure = useAxiosSecure();

    const {data: employees = [], refetch, isLoading,} = useQuery({
        queryKey: ["employees", "pending"],
        queryFn: async () => {
            const res = await axiosSecure.get("/employees");
            return res.data;
        },
    });
                                        // id
    const updateEmployeeStatus = async (employee, status) => {
        // const update = {status: status, email: employee.email}
        const res = await axiosSecure.patch(`/employees/${employee._id}`, { 
            status, 
            email: employee.email, });
        return res.data;
    };

                                // id
    const handleApproval = async (employee) => {
        const result = await Swal.fire({
            title: "Approved employee?",
            text: "Employee will be marked as approved.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, approved",
        });

        if (!result.isConfirmed) return;

        try {           
                                                    // id
            const data = await updateEmployeeStatus(employee, "approved");
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
            Swal.fire("Error", "Failed to approved employee.", "error");
        }
    };
                                // id
    const handleReject = async (employee) => {
        const result = await Swal.fire({
            title: "Reject employee?",
            text: "Employee will be marked as rejected.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, reject",
        });

        if (!result.isConfirmed) return;

        try {
                                                    // id
            const data = await updateEmployeeStatus(employee, "rejected");
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
                            <th>Application Status</th>
                            <th>Work Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={employee._id}>
                                <th>{index + 1}</th>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.companyName}</td>
                                <td>{employee.designation}</td>
                               
                                <td>
                                     <p className={`${employee.status === 'approved' ? 'text-green-800 font-extrabold' : 'text-red-600'}`}>{employee.status}</p></td>

                                     <td>{employee.workStatus}</td>

                                  <td className="space-x-2">
                                    <button
                                        onClick={() => handleApproval(employee)}
                                        // employee._id
                                        className="btn btn-xs btn-success">
                                        Approved </button>

                                    <button
                                        onClick={() => handleReject(employee)}
                                        // employee._id
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
