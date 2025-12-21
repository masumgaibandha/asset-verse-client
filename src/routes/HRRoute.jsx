import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const HRRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (!user) {
    return <Navigate to="/login" state={location.pathname} replace />;
  }

  if (role !== "hr") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default HRRoute;
