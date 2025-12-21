import React from 'react'
import { Link, NavLink, Outlet } from 'react-router'
import { PiBuildingOfficeLight } from "react-icons/pi";
import { TbPackages } from "react-icons/tb";
import { FaBoxOpen, FaHandsHelping, FaRegCreditCard, FaUsers } from "react-icons/fa";
import { IoMdPeople } from 'react-icons/io';
import { FcApproval } from "react-icons/fc";
import useRole from '../hooks/useRole';
import { MdInventory } from "react-icons/md";








const DashboardLayout = () => {

    const { role, roleLoading } = useRole();

    if (roleLoading) {
        return <span className="loading loading-spinner loading-lg"></span>;
        // or: return <Loading />
    }

    return (
        <div className="drawer lg:drawer-open container mx-auto">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4">AssetVerse DashBoard</div>
                </nav>
                {/* Page content here */}
                <Outlet></Outlet>

            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <li>
                            <Link to={'/'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                {/* Home icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>

                        {/* Our DashBoard Link here */}

                        {/* <li>
                            <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right pl-2" data-tip="MyAssets" to={'/dashboard/my-assets'}>
                                <PiBuildingOfficeLight size={20} />
                                <span className="is-drawer-close:hidden">My Assets</span>
                            </NavLink>
                        </li> */}






                        {/* Employee route */}
                        {role === "employee" && (
                            <>
                                <li>
                                    {/* <NavLink to="/dashboard/my-assets"> My Assets</NavLink> */}

                                    <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right pt-3 pl-2" data-tip="My Assets" to={'/dashboard/my-assets'}>
                                        <MdInventory  size={25} />
                                        <span className="is-drawer-close:hidden">My Assets</span>
                                    </NavLink>
                                </li>
                            </>
                        )}



                        {/* hr only routes */}
                        {
                            role === 'hr' && <>
                                {/* Approve Employee */}
                                <li>

                                    <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right pt-3 pl-2" data-tip="Approve Employees" to={'/dashboard/approve-employees'}>
                                        <FcApproval size={25} />


                                        <span className="is-drawer-close:hidden">Approve Employees</span>
                                    </NavLink>
                                </li>
                                {/* Assign Assets */}
                                <li>

                                    <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right pt-3 pl-2" data-tip="Assign Assets" to={'/dashboard/assign-assets'}>
                                        <FaHandsHelping size={25} />


                                        <span className="is-drawer-close:hidden">Assign Assets</span>
                                    </NavLink>
                                </li>
                                {/* Users Management */}
                                <li>
                                    <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right pt-3 pl-2" data-tip="Users Management" to={'/dashboard/users-management'}>
                                        <IoMdPeople size={20} />
                                        {/* <FaUsers size={20}/> */}
                                        <span className="is-drawer-close:hidden">Users Management</span>
                                    </NavLink>
                                </li>

                                <li>
                                    {/* Upgrade package */}
                                    <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right pt-3 pl-2" data-tip="upgradePackage" to={'/dashboard/upgrade-package'}>
                                        <TbPackages size={20} />
                                        <span className="is-drawer-close:hidden">Upgrade Package</span>
                                    </NavLink>
                                </li>

                                <li>
                                    {/* Payment History */}
                                    <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right pt-3 pl-2" data-tip="paymentHistory" to={'/dashboard/payment-history'}>
                                        <FaRegCreditCard size={20} />
                                        <span className="is-drawer-close:hidden">Payment History</span>
                                    </NavLink>
                                </li>
                            </>
                        }






                        {/* List item */}
                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                {/* Settings icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout

