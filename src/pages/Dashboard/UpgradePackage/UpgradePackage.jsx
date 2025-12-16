import React from "react";
import { toast } from "react-toastify";

const packages = [
    {
        name: "Basic",
        employeeLimit: 5,
        price: 5,
        features: [
            "Asset Tracking",
            "Employee Management",
            "Basic Support",
        ],
    },
    {
        name: "Standard",
        employeeLimit: 10,
        price: 8,
        features: [
            "All Basic Features",
            "Advanced Analytics",
            "Priority Support",
        ],
    },
    {
        name: "Premium",
        employeeLimit: 20,
        price: 15,
        features: [
            "All Standard Features",
            "Custom Branding",
            "24/7 Support",
        ],
    },
];

const UpgradePackage = () => {
    const handleUpgrade = (pkg) => {
        console.log("Selected Package:", pkg);
        toast.info("Stripe payment will be connected later");
    };

    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold text-secondary mb-6">
                Upgrade Package
            </h2>

            <p className="mb-8 text-gray-600">
                Upgrade your subscription to increase employee limits and unlock
                advanced features.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                    <div
                        key={pkg.name}
                        className="card bg-base-100 shadow-md border"
                    >
                        <div className="card-body">
                            <h3 className="text-2xl font-bold text-primary">
                                {pkg.name}
                            </h3>

                            <p className="text-xl font-semibold mt-2">
                                ${pkg.price} / month
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                Employee Limit: {pkg.employeeLimit}
                            </p>

                            <ul className="mt-4 space-y-1">
                                {pkg.features.map((feature, index) => (
                                    <li key={index} className="text-sm">
                                        • {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="card-actions mt-6">
                                <button
                                    onClick={() => handleUpgrade(pkg)}
                                    className="btn btn-accent w-full text-white"
                                >
                                    Upgrade
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpgradePackage;
