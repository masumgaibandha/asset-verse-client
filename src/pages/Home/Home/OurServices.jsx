import React from "react";
import serviceIcon from "../../../assets/zapshift-assets/service.png";

const services = [
  {
    title: "Asset Inventory Management",
    desc: "Track all company assets like laptops, chairs, and accessories with quantity, availability, and asset type clearly organized.",
  },
  {
    title: "Smart Requests & Approvals",
    desc: "Employees request assets with notes. HR approves or rejects requests while inventory and assignments update automatically.",
  },
  {
    title: "Employee & Team Management",
    desc: "View affiliated employees per company, track asset usage, and manage team limits with a clean dashboard.",
  },
  {
    title: "Return Tracking System",
    desc: "Track returnable assets with return dates and status updates to ensure accountability and reduce asset loss.",
  },
  {
    title: "Reports & Analytics",
    desc: "Generate printable employee asset reports and view analytics like most requested assets and asset type distribution.",
  },
  {
    title: "Subscription & Payments",
    desc: "Upgrade packages anytime using Stripe. Employee limits update instantly and all payment history is securely stored.",
  },
];

const OurServices = () => {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-primary text-primary-content rounded-2xl px-6 py-10 text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold">Our Services</h1>
          <p className="max-w-2xl mx-auto opacity-90">
            AssetVerse helps companies manage assets, employees, and subscriptions
            with full visibility and control — all in one platform.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="bg-base-100 border border-base-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <img src={serviceIcon} alt="" className="w-8 h-8" />
                </div>
              </div>

              <h2 className="font-bold text-xl text-center mb-3">{s.title}</h2>
              <p className="text-center opacity-80 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
