import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AssetOverview from "../pages/AssetsOverview/AssetsOverview";

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
        path: 'asset-overview',
        Component: AssetOverview,
        loader: () => fetch('/companyLocations.json').then(res => res.json())
      }
    ]
  },
]);


