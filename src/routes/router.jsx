import React from 'react'
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AssetOverview from "../pages/AssetsOverview/AssetsOverview";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import PrivateRoute from './PrivateRoute';
import Employee from '../pages/EmployeeDashboard/Employee';
import AssetRequest from '../pages/AssetRequest/AssetRequest';
import DashboardLayout from '../layouts/DashboardLayout';
import MyAssets from '../pages/Dashboard/MyAssets/MyAssets';
import EmployeeRegister from '../pages/Auth/Register/EmployeeRegister';
import HRRegister from '../pages/Auth/Register/HRRegister';
import UpgradePackage from '../pages/Dashboard/UpgradePackage/UpgradePackage';
import UpgradeSuccess from '../pages/Dashboard/UpgradePackage/UpgradeSuccess';
import UpgradeCancelled from '../pages/Dashboard/UpgradePackage/UpgradeCancelled';
import PaymentHistory from '../pages/Dashboard/PaymentHistory/PaymentHistory';
import ApproveEmployees from '../pages/Dashboard/ApproveEmployees/ApproveEmployees';
import UsersManagement from '../pages/Dashboard/UsersManagement/UsersManagement';
import HRRoute from './HRRoute';
import AssignAssets from '../pages/Dashboard/AssignAssets/AssignAssets';
import EmployeeRoutes from './EmployeeRoutes';
import DashboardHome from '../pages/Dashboard/DashboardHome/DashboardHome';
import AssetList from '../pages/Dashboard/AssetList/AssetList';
import AddAsset from '../pages/Dashboard/AddAsset/AddAsset';
import AllRequests from '../pages/Dashboard/AllRequests/AllRequests';
import RequestAsset from '../pages/EmployeeDashboard/RequestAsset/RequestAsset';
import MyTeam from '../pages/Dashboard/MyTeam/MyTeam';
import Profile from '../pages/Dashboard/Profile/Profile';
import EmployeeList from '../pages/Dashboard/EmployeeList/EmployeeList';
import About from '../pages/Shared/About/About';
import NotFound from "../pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", element: <About /> },

      {
        path: "employee",
        element: <PrivateRoute><Employee /></PrivateRoute>
      },
      {
        path: "asset-request",
        element: <PrivateRoute><AssetRequest /></PrivateRoute>
      },
      {
        path: "asset-overview",
        Component: AssetOverview,
        loader: () => fetch('/companyLocations.json').then(res => res.json())
      },

      // ✅ Public 404
      { path: "*", element: <NotFound /> }
    ]
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "employee-register", Component: EmployeeRegister },
      { path: "hr-register", Component: HRRegister }
    ]
  },

  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { index: true, Component: DashboardHome },
      { path: "profile", Component: Profile },

      // Employee
      { path: "my-assets", element: <EmployeeRoutes><MyAssets /></EmployeeRoutes> },
      { path: "request-asset", element: <EmployeeRoutes><RequestAsset /></EmployeeRoutes> },
      { path: "my-team", element: <EmployeeRoutes><MyTeam /></EmployeeRoutes> },

      // HR
      { path: "upgrade-package", element: <HRRoute><UpgradePackage /></HRRoute> },
      { path: "upgrade-success", element: <HRRoute><UpgradeSuccess /></HRRoute> },
      { path: "upgrade-cancelled", element: <HRRoute><UpgradeCancelled /></HRRoute> },
      { path: "payment-history", element: <HRRoute><PaymentHistory /></HRRoute> },
      { path: "approve-employees", element: <HRRoute><ApproveEmployees /></HRRoute> },
      { path: "assign-assets", element: <HRRoute><AssignAssets /></HRRoute> },
      { path: "users-management", element: <HRRoute><UsersManagement /></HRRoute> },
      { path: "asset-list", element: <HRRoute><AssetList /></HRRoute> },
      { path: "add-asset", element: <HRRoute><AddAsset /></HRRoute> },
      { path: "all-requests", element: <HRRoute><AllRequests /></HRRoute> },
      { path: "employee-list", element: <HRRoute><EmployeeList /></HRRoute> },

      // ✅ Dashboard 404
      { path: "*", element: <NotFound /> }
    ]
  }
]);

