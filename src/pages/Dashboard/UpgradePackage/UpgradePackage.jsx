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

  const { data: hrUser = {}, isLoading: hrLoading } = useQuery({
    queryKey: ["hr-user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${user.email}`);
      return res.data?.[0] || {};
    },
  });

  const handleUpgrade = async (pkg) => {
    if (!user?.email) {
      toast.error("Please login as HR first");
      return;
    }

    const paymentInfo = {
      price: pkg.price,
      packageId: pkg._id,
      packageName: pkg.name,
      employeeLimit: pkg.employeeLimit,
      hrEmail: user.email,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.assign(res.data.url);
  };

  if (isLoading || hrLoading) {
    return (
      <div className="p-6">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // const limit = Number(hrUser?.packageLimit || 5);
  // const used = Number(hrUser?.employeesCount || 0);
  // const remaining = Number(hrUser?.packageLimit ?? 0);
  // const remaining = Math.max(limit - used, 0);

  const limit = Number(hrUser?.packageLimit ?? 0);
  const used = Number(hrUser?.employeesCount ?? 0);
  const remaining = Math.max(limit - used, 0);

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-secondary mb-6">Upgrade Package</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card bg-base-100 border shadow-sm">
          <div className="card-body">
            <p className="text-sm text-gray-500">Current Plan</p>
            <h3 className="text-2xl font-bold capitalize">{hrUser?.subscription || "basic"}</h3>
          </div>
        </div>

        <div className="card bg-base-100 border shadow-sm">
          <div className="card-body">
            <p className="text-sm text-gray-500">Employee Limit</p>
            <h3 className="text-2xl font-bold">{limit}</h3>
          </div>
        </div>

        <div className="card bg-base-100 border shadow-sm">
          <div className="card-body">
            <p className="text-sm text-gray-500">Remaining Credit</p>
            <h3 className="text-2xl font-bold">{remaining}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg._id} className="card bg-base-100 shadow-md border">
            <div className="card-body">
              <h3 className="text-2xl font-bold text-primary">{pkg.name}</h3>
              <p className="text-xl font-semibold mt-2">${pkg.price} / month</p>
              <p className="mt-2 text-sm text-gray-500">Employee Limit: {pkg.employeeLimit}</p>

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
