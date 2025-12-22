import { Link, NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const linkClass = ({ isActive }) =>
    isActive ? "active font-semibold" : "";

const DashboardLayout = () => {
    const { user } = useAuth();
    const { role, roleLoading } = useRole();

    if (roleLoading) return <span className="loading loading-spinner loading-lg"></span>;

    const employeeLinks = (
        <>
            <li><NavLink className={linkClass} to="/dashboard/my-assets">My Assets</NavLink></li>
            <li><NavLink className={linkClass} to="/dashboard/request-asset">Request Asset</NavLink></li>
            <li><NavLink className={linkClass} to="/dashboard/my-team">My Team</NavLink></li>
            <li><NavLink className={linkClass} to="/dashboard/profile">Profile</NavLink></li>
        </>
    );

    const hrLinks = (
        <>
            <li><NavLink className={linkClass} to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink className={linkClass} to="/dashboard/asset-list">Asset List</NavLink></li>
            <li><NavLink className={linkClass} to="/dashboard/add-asset">Add Asset</NavLink></li>
            <li><NavLink className={linkClass} to="/dashboard/all-requests">All Requests</NavLink></li>
            <li><NavLink className={linkClass} to="/dashboard/approve-employees">Approve Employees</NavLink></li>
            <li><NavLink className={linkClass} to="/dashboard/assign-assets">Assign Assets</NavLink></li>
            <li><NavLink className={linkClass} to="/dashboard/employee-list">My Employee List</NavLink></li>
            <li><NavLink className={linkClass} to="/dashboard/users-management">Users Management</NavLink></li>
            <li><NavLink className={linkClass} to="/dashboard/upgrade-package">Upgrade Package</NavLink></li>
            <li><NavLink className={linkClass} to="/dashboard/payment-history">Payment History</NavLink></li>
            <li><NavLink className={linkClass} to="/dashboard/profile">Profile</NavLink></li>
        </>
    );

    return (
        <div className="min-h-screen bg-base-200">
            <div className="drawer lg:drawer-open">
                <input id="dash-drawer" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content flex flex-col">
                    <div className="navbar bg-base-100 border-b lg:hidden">
                        <div className="flex-none">
                            <label htmlFor="dash-drawer" className="btn btn-square btn-ghost">
                                ☰
                            </label>
                        </div>
                        <div className="flex-1 font-semibold">AssetVerse Dashboard</div>
                    </div>

                    <div className="p-4 md:p-6">
                        <Outlet />
                    </div>
                </div>

                <div className="drawer-side">
                    <label htmlFor="dash-drawer" className="drawer-overlay"></label>

                    <aside className="w-72 bg-base-100 border-r min-h-full">
                        <div className="p-4 border-b">
                            <Link to="/" className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <span className="text-primary font-bold text-lg">AV</span>
                                </div>
                                <p className="font-bold text-lg">AssetVerse</p>
                            </Link>
                            <p className="text-xs opacity-70 mt-1">{user?.email}</p>
                        </div>

                        <ul className="menu p-4 gap-1">
                            {role === "hr" ? hrLinks : employeeLinks}
                        </ul>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
