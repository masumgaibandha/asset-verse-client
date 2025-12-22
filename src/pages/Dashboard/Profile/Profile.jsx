import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const Profile = () => {
    const axiosSecure = useAxiosSecure();
    const { user, updateUserProfile } = useAuth();

    const [name, setName] = useState("");
    const [photoFile, setPhotoFile] = useState(null);
    const [saving, setSaving] = useState(false);

    const { data: me = {}, isLoading, refetch } = useQuery({
        queryKey: ["me"],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get("/users/me");
            return res.data;
        },
    });

    const { data: affiliations = [], isLoading: affLoading } = useQuery({
        queryKey: ["affiliations-me"],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get("/affiliations/me");
            return res.data;
        },
    });

    const uploadToImgBB = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const key = import.meta.env.VITE_image_host_key;
        const url = `https://api.imgbb.com/1/upload?key=${key}`;

        const res = await axios.post(url, formData);
        return res?.data?.data?.url;
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!name && !photoFile) {
            toast.info("Nothing to update");
            return;
        }

        try {
            setSaving(true);

            let uploadedUrl = null;
            if (photoFile) {
                uploadedUrl = await uploadToImgBB(photoFile);
            }

            const payload = {};
            if (name) payload.displayName = name;
            if (uploadedUrl) payload.photoURL = uploadedUrl;

            const res = await axiosSecure.patch("/users/me", payload);

            const newDisplayName = payload.displayName || me.displayName || user?.displayName || "";
            const newPhotoURL = payload.photoURL || me.photoURL || user?.photoURL || "";

            await updateUserProfile({
                displayName: newDisplayName,
                photoURL: newPhotoURL,
            });

            setName("");
            setPhotoFile(null);
            await refetch();

            toast.success("Profile updated");
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error("Profile update failed");
        } finally {
            setSaving(false);
        }
    };

    if (isLoading) return <span className="loading loading-spinner loading-lg"></span>;

    const photo = me.photoURL || user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png";
    const role = me.role || "user";
    const email = me.email || user?.email || "";

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-3xl font-bold">Profile</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="card bg-base-100 border">
                    <div className="card-body items-center text-center">
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img src={photo} alt="profile" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mt-2">{me.displayName || user?.displayName || "User"}</h3>
                        <p className="text-sm opacity-70">{email}</p>
                        <div className="badge badge-outline mt-2">{role}</div>
                    </div>
                </div>

                <div className="card bg-base-100 border lg:col-span-2">
                    <div className="card-body">
                        <h3 className="text-xl font-bold">Update Information</h3>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="label font-semibold">Name</label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    defaultValue={me.displayName || user?.displayName || ""}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Update your name"
                                />
                            </div>

                            <div>
                                <label className="label font-semibold">Email (read only)</label>
                                <input
                                    type="email"
                                    className="input input-bordered w-full"
                                    value={email}
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="label font-semibold">Profile Photo</label>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full"
                                    onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                                />
                            </div>

                            <button disabled={saving} className="btn btn-accent text-white w-full">
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 border">
                <div className="card-body">
                    <h3 className="text-xl font-bold">Company Affiliations</h3>

                    {role === "hr" && (
                        <div className="mt-2">
                            <p className="text-sm opacity-70">
                                As HR, your primary company is:
                            </p>
                            <div className="mt-3 flex items-center gap-3">
                                <div className="avatar">
                                    <div className="w-10 rounded">
                                        <img src={me.companyLogo || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="logo" />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold">{me.companyName || "N/A"}</p>
                                    <p className="text-xs opacity-70">{me.subscription || "free"} plan</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {role === "employee" && (
                        <div className="mt-4">
                            {affLoading ? (
                                <span className="loading loading-spinner loading-md"></span>
                            ) : affiliations.length === 0 ? (
                                <p className="text-sm text-warning">
                                    No company affiliation yet. Request an asset to get affiliated.
                                </p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {affiliations.map((a) => (
                                        <div key={a._id} className="border rounded-lg p-4 flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="w-10 rounded">
                                                    <img src={a.companyLogo || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="logo" />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-semibold">{a.companyName}</p>
                                                <p className="text-xs opacity-70">HR: {a.hrEmail}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
