import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import { toast } from "react-toastify";

const isLoggedIn = true; // change to false to preview public state

const Navbar = () => {
    const {user, logOut} = useAuth()

    const handleLogOut = () =>{
        logOut()
        .then(resutl =>{
            toast.success('Log Out Successful')
        })
        .catch(error=>{
            toast.error("Log Out Failed")
        })
    }
    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/asset-overview">Asset Overview</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 mb-12">
            <div className="w-full max-w-7xl mx-auto px-3 flex justify-between items-center">

                {/* Left: Logo */}
                <Link to={'/'}>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-bold text-lg">AV</span>
                        </div>
                        <span className="text-xl font-semibold tracking-tight">AssetVerse</span>
                    </div>
                </Link>

                {/* Center: Links */}
                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-[16px] gap-1">
                        {links}
                    </ul>
                </div>

                {/* Right: Auth Button / Profile */}
                <div className="flex items-center gap-3">
                    <div>
                        {
                            user? <a onClick={handleLogOut} className="btn btn-accent text-white w-25">Log Out</a>
                            : <Link className="btn btn-accent text-white w-25" to='/login'>Login</Link>
                        }
                        
                    </div>
                    {/* {!isLoggedIn ? (
                        <NavLink to="/login" className="btn btn-primary rounded-xl">
                            Login
                        </NavLink>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="profile"
                                        src="https://i.ibb.co/8LRrxWQR/Masum2.png"
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu dropdown-content mt-3 z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
                            >
                                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                                <li><button type="button">Logout</button></li>
                            </ul>
                        </div>
                    )} */}
                </div>

                {/* Mobile Menu */}
                <div className="dropdown dropdown-end lg:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] w-56 rounded-box bg-base-100 p-2 shadow">
                        {links}
                        <li className="mt-2">
                            {!isLoggedIn ? (
                                <NavLink to="/login" className="btn btn-primary w-full rounded-xl">
                                    Login
                                </NavLink>
                            ) : (
                                <NavLink to="/dashboard" className="btn btn-primary w-full rounded-xl">
                                    Dashboard
                                </NavLink>
                            )}
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Navbar;
