import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";

const EmployeeRegister = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile, logOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

        axios.post(image_API_URL, formData)
          .then((res) => {
            const uploadedUrl = res?.data?.data?.url;

            const userProfile = {
              displayName: data.name,
              photoURL: uploadedUrl,
            };

            updateUserProfile(userProfile)
              .then(() => {
                // ✅ Important: sign out after registration
                logOut()
                  .then(() => {
                    toast.success("Registration successful. Please login.");
                    navigate("/login", { state: location.state });
                  })
                  .catch((error) => {
                    console.log(error);
                    toast.error("Logout after register failed");
                    navigate("/login", { state: location.state });
                  });
              })
              .catch((error) => {
                console.log(error);
                toast.error("Profile update failed");
              });
          })
          .catch((error) => {
            console.log(error);
            toast.error("Image upload failed");
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Registration failed");
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center py-5">Join as Employee</h3>

      <form onSubmit={handleSubmit(handleRegistration)} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Please input your name</p>
          )}

          <label className="label">Date of Birth</label>
          <input
            type="date"
            {...register("dateOfBirth", { required: true })}
            className="input"
          />
          {errors.dateOfBirth?.type === "required" && (
            <p className="text-red-500">Please select your date of birth</p>
          )}

          <label className="label">Your Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-500">Photo is required</p>
          )}

          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Please input valid email</p>
          )}

          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
            })}
            className="input"
            placeholder="Password"
          />

          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">Password must be 6 or longer</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must contain lowercase, uppercase, and a number
            </p>
          )}

          <button className="btn btn-accent text-white mt-4">Register</button>
        </fieldset>

        <p>
          Already have account?{" "}
          <Link state={location.state} className="text-blue-500" to={"/login"}>
            Login
          </Link>
        </p>

        <p className="text-sm">
          Want to join as HR?{" "}
          <Link className="text-blue-500" to={"/hr-register"}>
            Join as HR Manager
          </Link>
        </p>
      </form>
    </div>
  );
};

export default EmployeeRegister;
