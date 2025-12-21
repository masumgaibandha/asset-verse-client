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

  const handleRegistration = async (data) => {
    try {
      const profileImg = data.photo[0];

      await registerUser(data.email, data.password);

      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
      const imgRes = await axios.post(image_API_URL, formData);

      const uploadedUrl = imgRes.data.data.url;

      const userProfile = {
        displayName: data.name,
        photoURL: uploadedUrl,
      };

      await updateUserProfile(userProfile);

      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL: uploadedUrl,
        role: "user",
        createdAt: new Date(),
      };

      await axios.post("http://localhost:3000/users", userInfo);

      const employeeInfo = {
        name: data.name,
        email: data.email,
        designation: "N/A",
        companyName: "N/A",
        photoURL: uploadedUrl,
        dateOfBirth: data.dateOfBirth,
      };
      await axios.post("http://localhost:3000/employees", employeeInfo);


      await logOut();
      toast.success("Registration successful. Please login.");
      navigate("/login", { state: location.state });
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    }
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
          {errors.name && <p className="text-red-500">Name is required</p>}

          <label className="label">Date of Birth</label>
          <input
            type="date"
            {...register("dateOfBirth", { required: true })}
            className="input"
          />
          {errors.dateOfBirth && <p className="text-red-500">Date of birth is required</p>}

          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
          />
          {errors.photo && <p className="text-red-500">Photo is required</p>}

          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

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
          {errors.password && (
            <p className="text-red-500">
              Password must be 6 chars with upper, lower, number
            </p>
          )}

          <button className="btn btn-accent text-white mt-4">Register</button>
        </fieldset>

        <p>
          Already have account?{" "}
          <Link to="/login" className="text-blue-500">Login</Link>
        </p>

        <p className="text-sm">
          Join as HR?{" "}
          <Link to="/hr-register" className="text-blue-500">HR Register</Link>
        </p>
      </form>
    </div>
  );
};

export default EmployeeRegister;
