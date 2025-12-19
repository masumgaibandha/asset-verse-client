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



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'employee',
        element: <PrivateRoute><Employee></Employee></PrivateRoute>

      },
      {
        path: 'asset-request',
        element: <PrivateRoute><AssetRequest></AssetRequest></PrivateRoute>
      },
      
      {
    path: 'asset-overview',
    Component: AssetOverview,
    loader: () => fetch('/companyLocations.json').then(res => res.json())
  }
]
  },
{
  path: '/',
    Component: AuthLayout,
      children: [
        {
          path: 'login',
          Component: Login
        },
        {
          path: 'employee-register',
          Component: EmployeeRegister
        },
        {
          path: 'hr-register',
          Component: HRRegister
        }
      ]
},
{
  path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
      children: [
        {
          path: 'my-assets',
          Component: MyAssets
        },
        {
        path: 'upgrade-package',
        Component: UpgradePackage
      },
      {
        path: 'upgrade-success',
        Component: UpgradeSuccess
      },
      {
        path: 'upgrade-cancelled',
        Component: UpgradeCancelled
      },
      {
        path: 'payment-history',
        Component: PaymentHistory
      },
      {
        path: 'approve-employees',
        element: <HRRoute><ApproveEmployees></ApproveEmployees></HRRoute>
      },
      {
        path: 'users-management',
        // Component: UsersManagement
        element: <HRRoute><UsersManagement></UsersManagement></HRRoute>
      }
      ]
}
]);


