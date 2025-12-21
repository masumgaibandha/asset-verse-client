import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssetList = () => {
    const axiosSecure = useAxiosSecure();

    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [type, setType] = useState("");
    const [search, setSearch] = useState("");

    const { data = {}, isLoading } = useQuery({
        queryKey: ["assets", page, limit, type, search],
        queryFn: async () => {
            const params = new URLSearchParams();
            params.set("page", page);
            params.set("limit", limit);
            if (type) params.set("type", type);
            if (search) params.set("search", search);

            const res = await axiosSecure.get(`/assets?${params.toString()}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    const assets = data.result || [];
    const totalPages = Number(data.totalPages || 1);

    const goPrev = () => setPage((p) => Math.max(p - 1, 1));
    const goNext = () => setPage((p) => Math.min(p + 1, totalPages));

    if (isLoading) return <span className="loading loading-spinner loading-lg"></span>;

    return (
        <div className="p-6 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <h2 className="text-3xl font-bold">Asset List</h2>

                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        className="input input-bordered w-full sm:w-64"
                        placeholder="Search asset name..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />

                    <select
                        className="select select-bordered w-full sm:w-56"
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value);
                            setPage(1);
                        }}
                    >
                        <option value="">All Types</option>
                        <option value="Returnable">Returnable</option>
                        <option value="Non-returnable">Non-returnable</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Asset</th>
                            <th>Type</th>
                            <th>Total Qty</th>
                            <th>Available</th>
                            <th>Date Added</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.map((a, idx) => (
                            <tr key={a._id}>
                                <td>{(page - 1) * limit + idx + 1}</td>
                                <td className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="w-10 rounded">
                                            <img src={a.productImage} alt={a.productName} />
                                        </div>
                                    </div>
                                    <div className="font-semibold">{a.productName}</div>
                                </td>
                                <td>
                                    <span className="badge badge-outline">{a.productType}</span>
                                </td>
                                <td>{a.productQuantity}</td>
                                <td>{a.availableQuantity ?? a.productQuantity}</td>
                                <td>{a.dateAdded ? new Date(a.dateAdded).toLocaleDateString() : "—"}</td>
                            </tr>
                        ))}

                        {assets.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500 py-8">
                                    No assets found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-sm text-gray-500">
                    Page <b>{page}</b> of <b>{totalPages}</b>
                </p>

                <div className="join">
                    <button className="btn join-item" onClick={goPrev} disabled={page <= 1}>
                        Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .slice(Math.max(0, page - 3), Math.max(0, page - 3) + 5)
                        .map((p) => (
                            <button
                                key={p}
                                className={`btn join-item ${p === page ? "btn-active" : ""}`}
                                onClick={() => setPage(p)}
                            >
                                {p}
                            </button>
                        ))}

                    <button className="btn join-item" onClick={goNext} disabled={page >= totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssetList;
