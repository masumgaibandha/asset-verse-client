import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Log Out Successful"))
      .catch(() => toast.error("Log Out Failed"));
  };

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 mb-12">
      <div className="w-full max-w-7xl mx-auto px-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold text-lg">AV</span>
          </div>
          <span className="text-xl font-semibold tracking-tight">AssetVerse</span>
        </Link>

        {/* Center Menu */}
        <ul className="menu menu-horizontal px-1 text-[16px] gap-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {!user && (
            <>
              <li>
                <NavLink to="/employee-register">Join as Employee</NavLink>
              </li>
              <li>
                <NavLink to="/hr-register">Join as HR Manager</NavLink>
              </li>
            </>
          )}

          {user && (
            <>
              {/* Employee Page (like instructor rider page style) */}
              <li>
                <NavLink to="/employee">Employee</NavLink>
              </li>

              {/* Dashboard shortcut */}
              <li>
                <NavLink to="/dashboard/my-assets">Dashboard</NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {!user ? (
            <Link className="btn btn-accent text-white" to="/login">
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              {/* profile image button */}
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="profile"
                    src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  />
                </div>
              </div>

              {/* dropdown menu */}
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 z-[1] w-56 rounded-box bg-base-100 p-2 shadow"
              >
                <li className="px-2 py-1 text-sm opacity-70">
                  {user?.displayName || "User"} <br />
                  <span className="text-xs">{user?.email}</span>
                </li>

                <div className="divider my-1"></div>

                {/* Employee menu (temporary) */}
                <li><NavLink to="/dashboard/my-assets">My Assets</NavLink></li>
                <li><NavLink to="/dashboard/my-team">My Team</NavLink></li>
                <li><NavLink to="/asset-request">Request Asset</NavLink></li>
                <li><NavLink to="/dashboard/profile">Profile</NavLink></li>

                <div className="divider my-1"></div>

                {/* HR menu (temporary) */}
                <li><NavLink to="/dashboard/asset-list">Asset List</NavLink></li>
                <li><NavLink to="/dashboard/add-asset">Add Asset</NavLink></li>
                <li><NavLink to="/dashboard/all-requests">All Requests</NavLink></li>
                <li><NavLink to="/dashboard/employee-list">Employee List</NavLink></li>

                <div className="divider my-1"></div>

                <li>
                  <button onClick={handleLogOut} className="text-red-500">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
