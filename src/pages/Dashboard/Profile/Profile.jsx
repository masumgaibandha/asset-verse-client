import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
    const axiosSecure = useAxiosSecure();
    const [saving, setSaving] = useState(false);

    const { data: me = {}, isLoading, refetch } = useQuery({
        queryKey: ["me-profile"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users/me");
            return res.data;
        },
    });

    const [form, setForm] = useState({
        displayName: "",
        photoURL: "",
        dateOfBirth: "",
        companyName: "",
        companyLogo: "",
    });

    if (isLoading) return <span className="loading loading-spinner loading-lg"></span>;

    const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const fillDefault = () => {
        setForm({
            displayName: me.displayName || "",
            photoURL: me.photoURL || "",
            dateOfBirth: me.dateOfBirth ? String(me.dateOfBirth).slice(0, 10) : "",
            companyName: me.companyName || "",
            companyLogo: me.companyLogo || "",
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                displayName: form.displayName,
                photoURL: form.photoURL,
                dateOfBirth: form.dateOfBirth,
            };

            if (me.role === "hr") {
                payload.companyName = form.companyName;
                payload.companyLogo = form.companyLogo;
            }

            const res = await axiosSecure.patch("/users/me", payload);

            if (res.data?.modifiedCount > 0) {
                await refetch();
                Swal.fire("Saved", "Profile updated successfully.", "success");
            } else {
                Swal.fire("No change", "Nothing updated.", "info");
            }
        } catch (err) {
            console.log(err);
            Swal.fire("Error", "Update failed.", "error");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold">Profile</h2>
                <button onClick={fillDefault} className="btn btn-sm btn-outline">
                    Load Current
                </button>
            </div>

            <div className="card bg-base-100 border">
                <div className="card-body">
                    <form onSubmit={handleSave} className="space-y-3">
                        <div>
                            <label className="label font-semibold">Name</label>
                            <input
                                name="displayName"
                                value={form.displayName}
                                onChange={onChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div>
                            <label className="label font-semibold">Photo URL</label>
                            <input
                                name="photoURL"
                                value={form.photoURL}
                                onChange={onChange}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div>
                            <label className="label font-semibold">Email (readonly)</label>
                            <input value={me.email || ""} readOnly className="input input-bordered w-full" />
                        </div>

                        <div>
                            <label className="label font-semibold">Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={form.dateOfBirth}
                                onChange={onChange}
                                className="input input-bordered w-full"
                            />
                        </div>

                        {me.role === "hr" && (
                            <>
                                <div>
                                    <label className="label font-semibold">Company Name</label>
                                    <input
                                        name="companyName"
                                        value={form.companyName}
                                        onChange={onChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                <div>
                                    <label className="label font-semibold">Company Logo URL</label>
                                    <input
                                        name="companyLogo"
                                        value={form.companyLogo}
                                        onChange={onChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                            </>
                        )}

                        <button disabled={saving} className="btn btn-accent text-white w-full">
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
