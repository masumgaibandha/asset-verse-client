import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa6";
import { FiShieldOff } from "react-icons/fi";



const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch, isLoading, } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        },
    });

    const handleMakeHR = user => {
        const roleInfo = { role: 'hr' }
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} promoted as HR`,
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }
            })
    }

    const handleRemoveHR = user => {
        const roleInfo = { role: 'user' }
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} removed from HR`,
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }
            })

    }

    // const handleMakeEmployee = async (user) => {
    //     const result = await Swal.fire({
    //         title: "Make Employee?",
    //         text: `${user.email} will be promoted to Employee`,
    //         icon: "question",
    //         showCancelButton: true,
    //         confirmButtonText: "Yes, make employee",
    //     });

    //     if (!result.isConfirmed) return;

    //     const res = await axiosSecure.patch(`/users/${user._id}/role`, {
    //         role: "employee",
    //     });

    //     if (res.data.modifiedCount) {
    //         refetch();
    //         Swal.fire({
    //             position: "top-end",
    //             icon: "success",
    //             title: "User promoted to Employee",
    //             showConfirmButton: false,
    //             timer: 1500,
    //         });
    //     }
    // };

    // const handleMakeHR = async (user) => {
    //     const result = await 
    // Swal.fire({
    //         title: "Make HR Manager?",
    //         text: `${user.email} will be promoted to HR`,
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonText: "Yes, make HR",
    //     });

    //     if (!result.isConfirmed) return;

    //     const res = await axiosSecure.patch(`/users/${user._id}/role`, {
    //         role: "hr",
    //     });

    //     if (res.data.modifiedCount) {
    //         refetch();
    //         Swal.fire({
    //             position: "top-end",
    //             icon: "success",
    //             title: "User promoted to HR",
    //             showConfirmButton: false,
    //             timer: 1500,
    //         });
    //     }
    // };

    // if (isLoading) {
    //     return <span className="loading loading-infinity loading-lg"></span>;
    // }

    return (
        <div>
            <h2 className="text-4xl font-bold mb-6">
                Users Management: {users.length}
            </h2>

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
                                <td>{user.role}</td>

                                <td>
                                    {user.role === 'hr' ?
                                        <button 
                                        onClick={()=> handleRemoveHR(user)}
                                        className="btn bg-red-400">
                                            <FiShieldOff size={25} />
                                        </button> :
                                        <button
                                            onClick={() => handleMakeHR(user)}
                                            className="btn bg-green-400">
                                            <FaUserShield size={25} />
                                        </button>
                                    }
                                </td>


                                {/* <td>
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
                                </td> */}

                                {/* <td className="space-x-2">
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
                                </td> */}
                            </tr>
                        ))}

                        {/* {users.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )} */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;
