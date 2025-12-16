import React from 'react'
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AssetOverview from "../pages/AssetsOverview/AssetsOverview";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from './PrivateRoute';
import Employee from '../pages/EmployeeDashboard/Employee';
import AssetRequest from '../pages/AssetRequest/AssetRequest';
import DashboardLayout from '../layouts/DashboardLayout';
import MyAssets from '../pages/Dashboard/MyAssets/MyAssets';


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
        path: 'register',
        Component: Register
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
      }
    ]
  }
]);


