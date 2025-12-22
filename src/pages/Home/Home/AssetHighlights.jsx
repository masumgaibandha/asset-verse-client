import React from "react";
import safeDelivery from "../../../assets/zapshift-assets/safe-delivery.png";

const items = [
  {
    title: "Real-time Asset Visibility",
    desc: "Track assets across companies in real time. Instantly see availability, assignments, and usage without manual follow-ups.",
    img: safeDelivery,
  },
  {
    title: "Controlled Approval System",
    desc: "HR maintains full control with a structured request–approval workflow that prevents misuse and asset loss.",
    img: safeDelivery,
  },
  {
    title: "Activity Updates & Alerts",
    desc: "Stay informed with automatic updates on approvals, returns, and assignments—keeping everyone aligned.",
    img: safeDelivery,
  },
];

const AssetHighlights = () => {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Why AssetVerse
        </h2>

        <div className="grid gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-base-100 rounded-2xl shadow-sm border border-base-200 p-6"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Image */}
                <div className="w-full md:w-1/3">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-44 object-contain rounded-xl"
                  />
                </div>

                {/* Divider */}
                <div className="hidden md:block h-24 border-l border-dashed opacity-40" />

                {/* Content */}
                <div className="w-full md:w-2/3 text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="opacity-80 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AssetHighlights;
