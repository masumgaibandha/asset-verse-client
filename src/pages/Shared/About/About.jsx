// src/pages/Shared/About/About.jsx
import { Link } from "react-router";
import { FaBoxesStacked, FaShieldHalved, FaUsersGear, FaChartLine } from "react-icons/fa6";

const About = () => {
    const features = [
        {
            icon: <FaBoxesStacked className="text-2xl text-primary" />,
            title: "Asset Visibility",
            desc: "Track inventory, availability, and assignments in one place—no spreadsheets.",
        },
        {
            icon: <FaUsersGear className="text-2xl text-primary" />,
            title: "HR-Friendly Workflows",
            desc: "Approve requests, assign assets, and manage teams with clear status tracking.",
        },
        {
            icon: <FaShieldHalved className="text-2xl text-primary" />,
            title: "Accountability",
            desc: "Know who has what, when it was assigned, and when returnable items come back.",
        },
        {
            icon: <FaChartLine className="text-2xl text-primary" />,
            title: "Insights",
            desc: "See asset type distribution and most requested items to plan purchases better.",
        },
    ];

    return (
        <div className="min-h-screen bg-base-100">
            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="badge badge-outline">About AssetVerse</p>
                        <h1 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
                            Corporate Asset Management, made simple.
                        </h1>
                        <p className="mt-4 text-base md:text-lg text-gray-500">
                            AssetVerse helps HR teams manage physical assets—laptops, accessories, furniture—
                            and track assignments across employees and companies with clean workflows.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link to="/employee-register" className="btn btn-outline">
                                Join as Employee
                            </Link>
                            <Link to="/hr-register" className="btn btn-accent text-white">
                                Join as HR Manager
                            </Link>
                        </div>

                        <div className="mt-8 stats stats-vertical sm:stats-horizontal shadow bg-base-200">
                            <div className="stat">
                                <div className="stat-title">Goal</div>
                                <div className="stat-value text-2xl">Zero Asset Loss</div>
                                <div className="stat-desc">Clear tracking + accountability</div>
                            </div>
                            <div className="stat">
                                <div className="stat-title">Focus</div>
                                <div className="stat-value text-2xl">B2B HR</div>
                                <div className="stat-desc">Designed for companies</div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-200 border">
                        <div className="card-body">
                            <h3 className="text-xl font-bold">What problem do we solve?</h3>
                            <ul className="mt-2 space-y-2 text-sm text-gray-600">
                                <li>✅ Prevents asset loss and reduces manual tracking</li>
                                <li>✅ Improves visibility of inventory and assignments</li>
                                <li>✅ Streamlines request → approval → assignment workflows</li>
                                <li>✅ Supports returnable & non-returnable asset tracking</li>
                                <li>✅ Supports employees affiliated with multiple companies</li>
                            </ul>

                            <div className="divider" />

                            <h4 className="font-semibold">Built for your assignment requirements</h4>
                            <p className="text-sm text-gray-600">
                                Role-based dashboards, HR analytics, package upgrades, employee request flow, and
                                return workflow—aligned with AssetVerse spec.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="bg-base-200">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                    <h2 className="text-3xl font-bold">Why teams choose AssetVerse</h2>
                    <p className="text-gray-500 mt-2">
                        A clean and practical system that feels corporate and easy to use.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                        {features.map((f) => (
                            <div key={f.title} className="card bg-base-100 border">
                                <div className="card-body">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        {f.icon}
                                    </div>
                                    <h3 className="font-bold mt-3">{f.title}</h3>
                                    <p className="text-sm text-gray-500">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="card bg-base-100 border">
                    <div className="card-body flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-2xl font-bold">Ready to manage assets smarter?</h3>
                            <p className="text-gray-500 mt-1">
                                Register as HR to start adding assets, approve requests, and manage your team.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link to="/login" className="btn btn-outline">
                                Login
                            </Link>
                            <Link to="/hr-register" className="btn btn-accent text-white">
                                Join as HR Manager
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
