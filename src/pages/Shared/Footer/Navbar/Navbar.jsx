import React from 'react'



    const isLoggedIn = true; // change to false to preview public state

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
                <div className="w-full max-w-7xl mx-auto px-3 flex justify-between items-center">

                    {/* Left: Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-bold text-lg">AV</span>
                        </div>
                        <span className="text-xl font-semibold tracking-tight">AssetVerse</span>
                    </div>

                    {/* Center: Public Links */}
                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 text-[16px] gap-1">
                            <li><a className="font-medium">Home</a></li>
                            <li><a className="font-medium">Join as Employee</a></li>
                            <li><a className="font-medium">Join as HR Manager</a></li>
                        </ul>
                    </div>

                    {/* Right: Auth area (UI only) */}
                    <div className="flex items-center gap-2">

                        {/* When NOT logged in */}
                        {!isLoggedIn && (
                            <>
                                <button className="btn btn-ghost rounded-xl">Login</button>
                                <button className="btn btn-primary rounded-xl">Register</button>
                            </>
                        )}

                        {/* When logged in: show Profile + two role dropdowns */}
                        {isLoggedIn && (
                            <div className="flex items-center gap-2">

                                {/* Employee Dropdown */}
                                <div className="dropdown dropdown-end">
                                    <button type="button" className="btn btn-ghost rounded-xl">
                                        Employee
                                        <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M5.25 7.5L10 12.25 14.75 7.5" />
                                        </svg>
                                    </button>
                                    <ul className="menu dropdown-content mt-3 w-52 rounded-box bg-base-100 shadow p-2 z-50">
                                        <li><a>My Assets</a></li>
                                        <li><a>My Team</a></li>
                                        <li><a>Request Asset</a></li>
                                        <li><a>Profile</a></li>
                                        <li><a>Logout</a></li>
                                    </ul>
                                </div>

                                {/* HR Manager Dropdown */}
                                <div className="dropdown dropdown-end">
                                    <button type="button" className="btn btn-ghost rounded-xl">
                                        HR Manager
                                        <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M5.25 7.5L10 12.25 14.75 7.5" />
                                        </svg>
                                    </button>
                                    <ul className="menu dropdown-content mt-3 w-56 rounded-box bg-base-100 shadow p-2 z-50">
                                        <li><a>Asset List</a></li>
                                        <li><a>Add Asset</a></li>
                                        <li><a>All Requests</a></li>
                                        <li><a>Employee List</a></li>
                                        <li><a>Upgrade Package</a></li>
                                        <li><a>Profile</a></li>
                                        <li><a>Logout</a></li>
                                    </ul>
                                </div>

                                {/* Profile Avatar Dropdown */}
                                <div className="dropdown dropdown-end">
                                    <button type="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="Profile"
                                                src="https://i.ibb.co/8LRrxWQR/Masum2.png"
                                            />
                                        </div>
                                    </button>
                                    <div className="dropdown-content mt-3 w-64 rounded-box bg-base-100 shadow p-3 z-50">
                                        <div className="text-center space-y-1">
                                            <h3 className="font-semibold text-base">John Employee</h3>
                                            <p className="text-sm opacity-70">john@email.com</p>
                                        </div>
                                        <div className="divider my-2" />
                                        <button className="btn btn-primary w-full rounded-xl">Profile</button>
                                        <button className="btn btn-ghost w-full rounded-xl">Logout</button>
                                    </div>
                                </div>

                            </div>
                        )}

                        {/* Mobile hamburger (UI only) */}
                        <div className="lg:hidden">
                            <div className="dropdown dropdown-end">
                                <button type="button" className="btn btn-ghost btn-circle">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>

                                <ul className="menu menu-sm dropdown-content mt-3 w-60 rounded-box bg-base-100 shadow p-2 z-50">
                                    <li><a>Home</a></li>
                                    <li><a>Join as Employee</a></li>
                                    <li><a>Join as HR Manager</a></li>
                                    <li className="menu-title"><span>Employee</span></li>
                                    <li><a>My Assets</a></li>
                                    <li><a>My Team</a></li>
                                    <li><a>Request Asset</a></li>
                                    <li><a>Profile</a></li>
                                    <li className="menu-title"><span>HR Manager</span></li>
                                    <li><a>Asset List</a></li>
                                    <li><a>Add Asset</a></li>
                                    <li><a>All Requests</a></li>
                                    <li><a>Employee List</a></li>
                                    <li><a>Upgrade Package</a></li>
                                    <li><a>Profile</a></li>
                                    <li><a>Logout</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar