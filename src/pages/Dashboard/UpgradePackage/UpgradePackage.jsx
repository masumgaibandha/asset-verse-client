import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const UpgradePackage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  const handleUpgrade = async (pkg) => {
    if (!user?.email) {
      toast.error("Please login as HR first");
      return;
    }

    // ✅ This is what your server expects
    const paymentInfo = {
      price: pkg.price,
      packageId: pkg._id,
      packageName: pkg.name,
      employeeLimit: pkg.employeeLimit,
      hrEmail: user.email,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    // ✅ redirect to Stripe checkout page
    window.location.assign(res.data.url);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-secondary mb-6">Upgrade Package</h2>

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
                {(pkg.features || []).map((f, i) => (
                  <li key={i} className="text-sm">• {f}</li>
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
    </div>
  );
};

export default UpgradePackage;
