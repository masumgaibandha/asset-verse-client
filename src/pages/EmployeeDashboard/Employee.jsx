import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Employee = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    // formState: { errors }
  } = useForm();

  const handleEmployeeProfile = (data) => {
    // ensure basic defaults
    data.email = user?.email || data.email;
    data.createdAt = new Date();

    axiosSecure.post("/employees", data)
      .then((res) => {
        if (res.data?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Employee profile submitted",
            showConfirmButton: false,
            timer: 2000,
          });
        } 
        else {
          Swal.fire({
            icon: "info",
            title: "Submitted",
            text: "Profile saved (no insertedId returned).",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Submit failed",
          text: "Please try again.",
        });
      });
  };

  return (
    <div className="bg-base-100 rounded-2xl shadow-sm p-6 md:p-10 my-6">
      <h2 className="text-3xl md:text-5xl font-extrabold text-secondary">
        Employee Profile
      </h2>
      <p className="mt-2 text-gray-600">
        Fill this once. HR will use this info for employee listing & approvals.
      </p>

      <form onSubmit={handleSubmit(handleEmployeeProfile)} className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Employee Details */}
          <fieldset className="fieldset space-y-2">
            <h3 className="text-2xl font-bold">Employee Details</h3>

            <label className="label">Full Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              defaultValue={user?.displayName || ""}
              className="input w-full"
              placeholder="Employee Name"
            />

            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              defaultValue={user?.email || ""}
              className="input w-full"
              placeholder="Employee Email"
              readOnly={!!user?.email}
            />

            <label className="label">Designation</label>
            <input
              type="text"
              {...register("designation", { required: true })}
              className="input w-full"
              placeholder="e.g. Frontend Developer"
            />

            <label className="label">Department</label>
            <input
              type="text"
              {...register("department")}
              className="input w-full"
              placeholder="e.g. Engineering (optional)"
            />

            <label className="label">Phone Number</label>
            <input
              type="text"
              {...register("phone")}
              className="input w-full"
              placeholder="Phone (optional)"
            />

            <label className="label">Address</label>
            <input
              type="text"
              {...register("address")}
              className="input w-full"
              placeholder="Address (optional)"
            />
          </fieldset>

          {/* Company / HR Details */}
          <fieldset className="fieldset space-y-2">
            <h3 className="text-2xl font-bold">Company / HR Details</h3>

            <label className="label">Company Name</label>
            <input
              type="text"
              {...register("companyName", { required: true })}
              className="input w-full"
              placeholder="Company Name"
            />

            <label className="label">HR Name</label>
            <input
              type="text"
              {...register("hrName")}
              className="input w-full"
              placeholder="HR Name (optional)"
            />

            <label className="label">HR Email</label>
            <input
              type="email"
              {...register("hrEmail")}
              className="input w-full"
              placeholder="HR Email (optional)"
            />

            <label className="label">Employee ID</label>
            <input
              type="text"
              {...register("employeeId")}
              className="input w-full"
              placeholder="Employee ID (optional)"
            />

            <label className="label">Notes</label>
            <textarea
              {...register("notes")}
              className="input w-full min-h-[120px]"
              placeholder="Any notes (optional)"
            ></textarea>
          </fieldset>
        </div>

        <button type="submit" className="btn btn-accent text-white mt-8">
          Save Employee Profile
        </button>
      </form>
    </div>
  );
};

export default Employee;
