import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignAssets = () => {
    const axiosSecure = useAxiosSecure();

    // 1) Load all requests 
    const {data: requests = [], refetch: refetchRequests, isLoading: reqLoading, } = useQuery({
        queryKey: ["asset-requests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/requests");
            return res.data;
        },
    });

    // 2) Load approved employees
    const { data: employees = [], isLoading: empLoading } = useQuery({
        queryKey: ["approved-employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/employees?status=approved");
            return res.data;
        },
    });

    // only pending requests show 
    const pendingRequests = requests.filter(
        (r) => r.requestStatus === "pending"
    );

    const handleAssign = async (request) => {
        const optionsHtml = employees
            .map(
                (e) =>
                    `<option value="${e.email}">${e.name || e.displayName || e.email}</option>`
            )
            .join("");

        const result = await Swal.fire({
            title: "Assign Asset",
            html: `
        <div style="text-align:left">
          <p><b>Asset:</b> ${request.assetName || "N/A"}</p>
          <p><b>Qty:</b> ${request.assetQty || request.quantity || "N/A"}</p>
          <p style="margin-top:10px"><b>Select Employee</b></p>
          <select id="employeeEmail" class="swal2-select" style="width:100%">
            <option value="">-- select employee --</option>
            ${optionsHtml}
          </select>
        </div>
      `,
            showCancelButton: true,
            confirmButtonText: "Assign",
            preConfirm: () => {
                const employeeEmail = document.getElementById("employeeEmail").value;
                if (!employeeEmail) {
                    Swal.showValidationMessage("Please select an employee");
                    return false;
                }
                return { employeeEmail };
            },
        });

        if (!result.isConfirmed) return;

        const employeeEmail = result.value.employeeEmail;
        const selectedEmployee = employees.find((e) => e.email === employeeEmail);

        // IMPORTANT:
        // This API must exist in server:
        // PATCH /requests/:id  { requestStatus:'approved', assignedToEmail, assignedToName, approvalDate }
        const payload = {
            requestStatus: "approved",
            assignedToEmail: employeeEmail,
            assignedToName:
                selectedEmployee?.name ||
                selectedEmployee?.displayName ||
                employeeEmail,
            approvalDate: new Date(),
        };

        const res = await axiosSecure.patch(`/requests/${request._id}`, payload);

        if (res.data.modifiedCount) {
            refetchRequests();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Asset assigned successfully",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    if (reqLoading || empLoading) {
        return <span className="loading loading-infinity loading-lg"></span>;
    }

    return (
        <div>
            <h2 className="text-4xl font-bold mb-6">
                Assign Assets (Pending): {pendingRequests.length}
            </h2>

            {employees.length === 0 && (
                <div className="alert alert-warning mb-6">
                    <span>
                        No approved employees found. Approve employees first, then assign.
                    </span>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Asset</th>
                            <th>Qty</th>
                            <th>Employee</th>
                            <th>Employee Email</th>
                            <th>Company</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pendingRequests.map((req, index) => (
                            <tr key={req._id}>
                                <th>{index + 1}</th>
                                <td>{req.assetName}</td>
                                <td>{req.assetQty || req.quantity || "-"}</td>
                                <td>{req.employeeName}</td>
                                <td>{req.employeeEmail}</td>
                                <td>{req.companyName}</td>
                                <td>
                                    <span className="badge badge-warning">
                                        {req.requestStatus}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        disabled={employees.length === 0}
                                        onClick={() => handleAssign(req)}
                                        className="btn btn-xs btn-accent text-white"
                                    >
                                        Assign
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {pendingRequests.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center text-gray-500">
                                    No pending requests 🎉
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignAssets;
