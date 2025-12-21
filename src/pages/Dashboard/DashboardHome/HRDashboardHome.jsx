import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const HRDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: hrUser = {}, isLoading: userLoading } = useQuery({
    queryKey: ["hr-me"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/users/me");
      return res.data;
    },
  });

  const { data: pieData = [], isLoading: pieLoading } = useQuery({
    queryKey: ["hr-asset-types"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/hr/stats/asset-types");
      return res.data;
    },
  });

  const { data: barData = [], isLoading: barLoading } = useQuery({
    queryKey: ["hr-top-requested"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/hr/stats/top-requested");
      return res.data;
    },
  });

  if (userLoading || pieLoading || barLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  const remaining = Number(hrUser?.packageLimit ?? 0);
  const colors = ["#6366F1", "#22C55E", "#FACC15", "#FB923C", "#14B8A6"];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">HR Dashboard</h2>
        <Link to="/dashboard/upgrade-package" className="btn btn-accent text-white">
          Upgrade Package
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-100 border">
          <div className="card-body">
            <p className="text-sm text-gray-500">Plan</p>
            <h3 className="text-2xl font-bold capitalize">
              {hrUser.subscription || "free"}
            </h3>
          </div>
        </div>

        <div className="card bg-base-100 border">
          <div className="card-body">
            <p className="text-sm text-gray-500">Remaining Credit</p>
            <h3 className="text-2xl font-bold">{remaining}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 border">
          <div className="card-body">
            <h3 className="text-xl font-bold mb-3">
              Returnable vs Non-returnable
            </h3>

            <div className="w-full h-[320px] min-h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={110}
                    label
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={colors[i % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 border">
          <div className="card-body">
            <h3 className="text-xl font-bold mb-3">
              Top 5 Most Requested Assets
            </h3>

            <div className="w-full h-[320px] min-h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboardHome;
