import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpgradePackage = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: packages = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const res = await axiosSecure.get("/packages");
            return res.data;
        },
    });

    const handleUpgrade = async(pkg) => {

        const paymentInfo = {
            price: pkg.price,
            packageId: pkg._id,
            packageName: pkg.name,
            employeeLimit: pkg.employeeLimit

        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        console.log(res.data)
        window.location.href = res.data.url;
        // console.log("Selected Package:", pkg);
        // toast.info(`Selected: ${pkg.name}. Stripe will be connected later.`);
    };



    if (isLoading) {
        return (
            <div className="p-6">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6">
                <p className="text-red-500 font-semibold">Failed to load packages.</p>
                <p className="text-sm opacity-70">{error?.message}</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold text-secondary mb-6">Upgrade Package</h2>

            {packages.length === 0 ? (
                <p className="text-gray-500">No packages found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                        <div key={pkg._id} className="card bg-base-100 shadow-md border">
                            <div className="card-body">
                                <h3 className="text-2xl font-bold text-primary">{pkg.name}</h3>

                                <p className="text-xl font-semibold mt-2">${pkg.price} / month</p>

                                <p className="mt-2 text-sm text-gray-500">
                                    Employee Limit: {pkg.employeeLimit}
                                </p>

                                <ul className="mt-4 space-y-1">
                                    {(pkg.features || []).map((feature, index) => (
                                        <li key={index} className="text-sm">
                                            • {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="card-actions mt-6">
                                    <button
                                        onClick={() => handleUpgrade(pkg)}
                                        className="btn btn-accent w-full text-white"
                                    >
                                        Upgrade
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UpgradePackage;
