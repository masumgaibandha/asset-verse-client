import React from "react";
import serviceIcon from "../../../assets/zapshift-assets/service.png";

const OurServices = () => {
  return (
    <div className="px-5 container mx-auto">
      <div className="text-white pt-13 pb-5 space-y-5 bg-secondary rounded-2xl h-full">
        <h1 className="text-[40px] font-extrabold text-center">
          Our Services
        </h1>
        <p className="font-medium max-w-170 text-center mx-auto px-5">
          AssetVerse helps companies manage assets, employees, and subscriptions
          with full visibility and control — all in one platform.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 py-10 px-5">
        {/* 1 */}
        <div className="px-5 pb-10 bg-base-100 shadow-sm h-full rounded-2xl">
          <figure className="pt-5 pb-10 justify-center flex">
            <img
              src={serviceIcon}
              alt="Asset Inventory"
              className="bg-amber-100 border-none w-18 p-2 rounded-full"
            />
          </figure>
          <div>
            <h2 className="font-bold text-2xl text-center pb-3">
              Asset Inventory Management
            </h2>
            <p className="font-medium text-center">
              Track all company assets like laptops, chairs, and accessories
              with quantity, availability, and asset type clearly organized.
            </p>
          </div>
        </div>

        {/* 2 */}
        <div className="px-5 pb-10 bg-base-100 shadow-sm h-full rounded-2xl">
          <figure className="pt-5 pb-10 justify-center flex">
            <img
              src={serviceIcon}
              alt="Asset Requests"
              className="bg-amber-100 border-none w-18 p-2 rounded-full"
            />
          </figure>
          <div>
            <h2 className="font-bold text-2xl text-center pb-3">
              Smart Requests & Approvals
            </h2>
            <p className="font-medium text-center">
              Employees request assets with notes. HR approves or rejects
              requests while inventory and assignments update automatically.
            </p>
          </div>
        </div>

        {/* 3 */}
        <div className="px-5 pb-10 bg-base-100 shadow-sm h-full rounded-2xl">
          <figure className="pt-5 pb-10 justify-center flex">
            <img
              src={serviceIcon}
              alt="Employee Management"
              className="bg-amber-100 border-none w-18 p-2 rounded-full"
            />
          </figure>
          <div>
            <h2 className="font-bold text-2xl text-center pb-3">
              Employee & Team Management
            </h2>
            <p className="font-medium text-center">
              View affiliated employees per company, track asset usage, and
              manage team limits with a clean dashboard.
            </p>
          </div>
        </div>

        {/* 4 */}
        <div className="px-5 pb-10 bg-base-100 shadow-sm h-full rounded-2xl">
          <figure className="pt-5 pb-10 justify-center flex">
            <img
              src={serviceIcon}
              alt="Return Tracking"
              className="bg-amber-100 border-none w-18 p-2 rounded-full"
            />
          </figure>
          <div>
            <h2 className="font-bold text-2xl text-center pb-3">
              Return Tracking System
            </h2>
            <p className="font-medium text-center">
              Track returnable assets with return dates and status updates to
              ensure accountability and reduce asset loss.
            </p>
          </div>
        </div>

        {/* 5 */}
        <div className="px-5 pb-10 bg-base-100 shadow-sm h-full rounded-2xl">
          <figure className="pt-5 pb-10 justify-center flex">
            <img
              src={serviceIcon}
              alt="Reports"
              className="bg-amber-100 border-none w-18 p-2 rounded-full"
            />
          </figure>
          <div>
            <h2 className="font-bold text-2xl text-center pb-3">
              Reports & Analytics
            </h2>
            <p className="font-medium text-center">
              Generate printable employee asset reports and view analytics like
              most requested assets and asset type distribution.
            </p>
          </div>
        </div>

        {/* 6 */}
        <div className="px-5 pb-10 bg-base-100 shadow-sm h-full rounded-2xl">
          <figure className="pt-5 pb-10 justify-center flex">
            <img
              src={serviceIcon}
              alt="Subscription"
              className="bg-amber-100 border-none w-18 p-2 rounded-full"
            />
          </figure>
          <div>
            <h2 className="font-bold text-2xl text-center pb-3">
              Subscription & Payments
            </h2>
            <p className="font-medium text-center">
              Upgrade packages anytime using Stripe. Employee limits update
              instantly and all payment history is securely stored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
