import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyTeam = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedHrEmail, setSelectedHrEmail] = useState("");

    const { data: affiliations = [], isLoading: affLoading } = useQuery({
        queryKey: ["affiliations-me"],
        queryFn: async () => {
            const res = await axiosSecure.get("/affiliations/me");
            return res.data;
        },
    });

    const options = useMemo(() => {
        return affiliations.map((a) => ({
            hrEmail: a.hrEmail,
            companyName: a.companyName,
            companyLogo: a.companyLogo,
        }));
    }, [affiliations]);

    const activeHrEmail = selectedHrEmail || options?.[0]?.hrEmail || "";

    const { data: team = [], isLoading: teamLoading } = useQuery({
        queryKey: ["team", activeHrEmail],
        enabled: !!activeHrEmail,
        queryFn: async () => {
            const res = await axiosSecure.get(`/team?hrEmail=${activeHrEmail}`);
            return res.data;
        },
    });

    const upcomingBirthdays = useMemo(() => {
        const now = new Date();
        const month = now.getMonth();

        return team
            .filter((m) => {
                if (!m?.dateOfBirth) return false;
                const d = new Date(m.dateOfBirth);
                return d.getMonth() === month;
            })
            .sort((a, b) => {
                const da = new Date(a.dateOfBirth).getDate();
                const db = new Date(b.dateOfBirth).getDate();
                return da - db;
            })
            .slice(0, 6);
    }, [team]);

    if (affLoading) return <span className="loading loading-spinner loading-lg"></span>;

    if (options.length === 0) {
        return (
            <div className="p-6">
                <h2 className="text-3xl font-bold mb-2">My Team</h2>
                <p className="text-gray-500">No company affiliation found.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-3xl font-bold">My Team</h2>

                <select
                    className="select select-bordered max-w-md"
                    value={activeHrEmail}
                    onChange={(e) => setSelectedHrEmail(e.target.value)}
                >
                    {options.map((o) => (
                        <option key={o.hrEmail} value={o.hrEmail}>
                            {o.companyName}
                        </option>
                    ))}
                </select>
            </div>

            {teamLoading ? (
                <span className="loading loading-spinner loading-lg"></span>
            ) : (
                <>
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-3">Upcoming Birthdays (This Month)</h3>

                        {upcomingBirthdays.length === 0 ? (
                            <p className="text-gray-500">No birthdays this month.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {upcomingBirthdays.map((m) => (
                                    <div key={m._id} className="card bg-base-100 border">
                                        <div className="card-body">
                                            <h4 className="font-bold">{m.employeeName}</h4>
                                            <p className="text-sm text-gray-600">{m.employeeEmail}</p>
                                            <p className="text-sm">
                                                DOB: {m.dateOfBirth ? new Date(m.dateOfBirth).toLocaleDateString() : "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <h3 className="text-xl font-semibold mb-3">Team Members</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {team.map((m) => (
                            <div key={m._id} className="card bg-base-100 border">
                                <div className="card-body">
                                    <h4 className="font-bold">{m.employeeName}</h4>
                                    <p className="text-sm text-gray-600">{m.employeeEmail}</p>
                                    <p className="text-sm text-gray-500">
                                        Joined: {m.affiliationDate ? new Date(m.affiliationDate).toLocaleDateString() : "N/A"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default MyTeam;
