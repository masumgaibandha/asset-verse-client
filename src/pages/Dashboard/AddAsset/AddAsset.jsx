import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AddAsset = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            const imgFile = data.productImage[0];
            const formData = new FormData();
            formData.append("image", imgFile);

            const imgURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
            const imgRes = await axios.post(imgURL, formData);
            const uploaded = imgRes?.data?.data?.url;

            const payload = {
                productName: data.productName,
                productImage: uploaded,
                productType: data.productType,
                productQuantity: Number(data.productQuantity),
                companyName: data.companyName,
            };

            const res = await axiosSecure.post("/assets", payload);

            if (res.data?.insertedId) {
                reset();
                Swal.fire({ icon: "success", title: "Asset Added", timer: 1200, showConfirmButton: false });
            }
        } catch (e) {
            Swal.fire({ icon: "error", title: "Failed", text: "Asset add failed" });
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-5">Add Asset</h2>

            <div className="max-w-xl bg-base-100 border rounded-xl p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div>
                        <label className="label">Product Name</label>
                        <input
                            className="input input-bordered w-full"
                            {...register("productName", { required: true })}
                            placeholder="e.g. Dell Laptop"
                        />
                        {errors.productName && <p className="text-red-500 text-sm">Required</p>}
                    </div>

                    <div>
                        <label className="label">Company Name</label>
                        <input
                            className="input input-bordered w-full"
                            {...register("companyName", { required: true })}
                            placeholder="Your company"
                        />
                        {errors.companyName && <p className="text-red-500 text-sm">Required</p>}
                    </div>

                    <div>
                        <label className="label">Product Type</label>
                        <select
                            className="select select-bordered w-full"
                            {...register("productType", { required: true })}
                            defaultValue=""
                        >
                            <option value="" disabled>Select type</option>
                            <option value="Returnable">Returnable</option>
                            <option value="Non-returnable">Non-returnable</option>
                        </select>
                        {errors.productType && <p className="text-red-500 text-sm">Required</p>}
                    </div>

                    <div>
                        <label className="label">Product Quantity</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            {...register("productQuantity", { required: true, min: 1 })}
                            placeholder="e.g. 10"
                        />
                        {errors.productQuantity && <p className="text-red-500 text-sm">Min 1</p>}
                    </div>

                    <div>
                        <label className="label">Product Image</label>
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full"
                            {...register("productImage", { required: true })}
                        />
                        {errors.productImage && <p className="text-red-500 text-sm">Required</p>}
                    </div>

                    <button disabled={isSubmitting || !user?.email} className="btn btn-accent text-white w-full mt-2">
                        {isSubmitting ? "Adding..." : "Add Asset"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAsset;
