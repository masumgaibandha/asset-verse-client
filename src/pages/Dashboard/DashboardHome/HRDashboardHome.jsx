import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const HRDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: hrUser = {}, isLoading } = useQuery({
    queryKey: ["hr-me", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/users/me");
      return res.data;
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  const remaining = Number(hrUser?.packageLimit ?? 0);

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-6">HR Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-100 border">
          <div className="card-body">
            <p className="text-sm text-gray-500">Plan</p>
            <h3 className="text-2xl font-bold capitalize">
              {hrUser?.subscription || "free"}
            </h3>
          </div>
        </div>

        <div className="card bg-base-100 border">
          <div className="card-body">
            <p className="text-sm text-gray-500">Remaining Credit</p>
            <h3 className="text-2xl font-bold">{remaining}</h3>

            {remaining === 0 && (
              <div className="mt-4">
                <Link
                  to="/dashboard/upgrade-package"
                  className="btn btn-accent text-white"
                >
                  Upgrade Package
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboardHome;
