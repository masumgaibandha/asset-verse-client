import React from "react";
import { FaUserPlus, FaBoxesStacked, FaClipboardCheck, FaCrown } from "react-icons/fa6";

const steps = [
    {
        title: "Create Account & Company Setup",
        desc: "HR creates the company workspace. Employees sign up and join the system with their profile.",
        icon: FaUserPlus,
    },
    {
        title: "Add Assets to Inventory",
        desc: "HR adds assets with type (Returnable / Non-returnable), quantity, and availability — all tracked automatically.",
        icon: FaBoxesStacked,
    },
    {
        title: "Request → Approve / Reject",
        desc: "Employees request assets with notes. HR approves or rejects, and inventory + assigned records update instantly.",
        icon: FaClipboardCheck,
    },
    {
        title: "Upgrade Package Anytime",
        desc: "When credits run out, HR upgrades via Stripe. New limits apply immediately and payment history is saved.",
        icon: FaCrown,
    },
];

const WorksCard = () => {
    return (
        <section className="py-10">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="font-extrabold text-3xl text-secondary mb-6">
                    How AssetVerse Works
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((s, idx) => {
                        const Icon = s.icon;
                        return (
                            <div
                                key={idx}
                                className="bg-base-100 border border-base-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                            >
                                <div className="mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Icon className="text-primary text-xl" />
                                    </div>
                                </div>

                                <h2 className="font-bold text-lg mb-2">{s.title}</h2>
                                <p className="opacity-80 leading-relaxed text-sm">{s.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WorksCard;
