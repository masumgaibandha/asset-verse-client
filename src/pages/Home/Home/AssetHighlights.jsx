import React from "react";
import start_people from '../../../assets/zapshift-assets/safe-delivery.png'


const AssetHighlights = () => {
  return (
    <div className="container mx-auto">
      {/* 1 */}
      <div className="flex gap-15 items-center px-8 mt-10 py-5 bg-base-100 shadow-sm h-full rounded-2xl">
        <div className="pt-5 pb-10">
          <img
            src={start_people}
            alt="Real-time Asset Visibility"
            className="rounded-xl items-start"
          />
        </div>

        <div className="h-30 border-1 border-dashed border-[#6B7280]"></div>

        <div>
          <h2 className="font-bold text-xl text-left pb-3">
            Real-time Asset Visibility
          </h2>
          <p className="font-medium text-left">
            Track assets across companies in real time. Instantly see availability,
            assignments, and usage without manual follow-ups.
          </p>
        </div>
      </div>

      {/* 2 */}
      <div className="flex gap-15 items-center px-8 mt-10 py-5 bg-base-100 shadow-sm h-full rounded-2xl">
        <div className="pt-5 pb-10">
          <img
            src={start_people}
            alt="Controlled Approval System"
            className="rounded-xl items-start"
          />
        </div>

        <div className="h-30 border-1 border-dashed border-[#6B7280]"></div>

        <div>
          <h2 className="font-bold text-xl text-left pb-3">
            Controlled Approval System
          </h2>
          <p className="font-medium text-left">
            HR maintains full control with a structured request–approval workflow
            that prevents misuse and asset loss.
          </p>
        </div>
      </div>

      {/* 3 */}
      <div className="flex gap-15 items-center px-8 mt-10 py-5 bg-base-100 shadow-sm h-full rounded-2xl">
        <div className="pt-5 pb-10">
          <img
            src={start_people}
            alt="Activity Updates"
            className="rounded-xl items-start"
          />
        </div>

        <div className="h-30 border-1 border-dashed border-[#6B7280]"></div>

        <div>
          <h2 className="font-bold text-xl text-left pb-3">
            Activity Updates & Alerts
          </h2>
          <p className="font-medium text-left">
            Stay informed with automatic updates on approvals, returns, and
            assignments—keeping everyone aligned.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssetHighlights;
