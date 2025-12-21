import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import useRole from "../../../../hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const {role, roleLoading} = useRole();

  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("Log Out Successful");
    } catch {
      toast.error("Log Out Failed");
    }
  };

  const navClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg ${isActive ? "bg-primary/10 text-primary font-semibold" : ""}`;

  const isEmployee = user && !roleLoading && role === "employee";
  const isHR = user && !roleLoading && role === "hr";

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold text-lg">AV</span>
          </div>
          <span className="text-xl font-semibold tracking-tight">AssetVerse</span>
        </Link>

        <ul className="menu menu-horizontal px-1 text-[16px] gap-1">
          <li>
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navClass}>
              About
            </NavLink>
          </li>

          {!user && (
            <>
              <li>
                <NavLink to="/employee-register" className={navClass}>
                  Join as Employee
                </NavLink>
              </li>
              <li>
                <NavLink to="/hr-register" className={navClass}>
                  Join as HR Manager
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div className="flex items-center gap-3">
          {!user ? (
            <Link className="btn btn-accent text-white" to="/login">
              Login
            </Link>
          ) : (
            <>
              <Link to="/dashboard" className="btn btn-accent text-white hidden md:inline-flex">
                Dashboard
              </Link>

              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="profile"
                      referrerPolicy="no-referrer"
                      src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-3 z-[1] w-60 rounded-box bg-base-100 p-2 shadow"
                >
                  <li className="px-2 py-2">
                    <p className="font-semibold leading-5">{user?.displayName || "User"}</p>
                    <p className="text-xs opacity-70">{user?.email}</p>
                    <p className="text-xs mt-1">
                      <span className="badge badge-outline">
                        {roleLoading ? "loading..." : role || "user"}
                      </span>
                    </p>
                  </li>

                  <div className="divider my-1" />

                  <li className="md:hidden">
                    <NavLink to="/dashboard" className={navClass}>
                      Dashboard
                    </NavLink>
                  </li>

                  {isEmployee && (
                    <>
                      <li>
                        <NavLink to="/dashboard/my-assets" className={navClass}>
                          My Assets
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/my-team" className={navClass}>
                          My Team
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/request-asset" className={navClass}>
                          Request Asset
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/profile" className={navClass}>
                          Profile
                        </NavLink>
                      </li>
                    </>
                  )}

                  {isHR && (
                    <>
                      <li>
                        <NavLink to="/dashboard/asset-list" className={navClass}>
                          Asset List
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/add-asset" className={navClass}>
                          Add Asset
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/all-requests" className={navClass}>
                          All Requests
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/employee-list" className={navClass}>
                          My Employee List
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/upgrade-package" className={navClass}>
                          Upgrade Package
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/profile" className={navClass}>
                          Profile
                        </NavLink>
                      </li>
                    </>
                  )}

                  <div className="divider my-1" />

                  <li>
                    <button onClick={handleLogOut} className="text-red-500">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
