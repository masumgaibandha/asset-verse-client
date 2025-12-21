import { useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const printRef = useRef(null);

  const { data: items = [], isLoading, refetch } = useQuery({
    queryKey: ["my-assets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/assigned-assets?email=${user.email}`);
      return res.data;
    },
  });

  const filtered = useMemo(() => {
    return items.filter((a) => {
      const nameOk = (a.assetName || "").toLowerCase().includes(search.toLowerCase());
      const typeOk = type ? a.assetType === type : true;
      return nameOk && typeOk;
    });
  }, [items, search, type]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "My Assets",
  });

  const handleReturn = async (id) => {
    const ok = await Swal.fire({
      icon: "warning",
      title: "Return this asset?",
      showCancelButton: true,
      confirmButtonText: "Yes, return",
    });

    if (!ok.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/assigned-assets/${id}/return`);
      if (res.data?.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Returned",
          showConfirmButton: false,
          timer: 1200,
        });
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Return failed", "error");
    }
  };

  if (isLoading) return <span className="loading loading-spinner loading-lg"></span>;

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-4xl font-bold">My Assets</h2>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            className="input input-bordered"
            placeholder="Search by asset name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select select-bordered"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>

          <button onClick={handlePrint} className="btn btn-accent text-white">
            Print
          </button>
        </div>
      </div>

      <div ref={printRef}>
        <div className="mb-4 hidden print:block">
          <h3 className="text-2xl font-bold">AssetVerse - Employee Asset Report</h3>
          <p className="text-sm">Employee: {user?.email}</p>
          <p className="text-sm">Generated: {new Date().toLocaleString()}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Asset</th>
                <th>Type</th>
                <th>Company</th>
                <th>Request Date</th>
                <th>Approval Date</th>
                <th>Status</th>
                <th className="print:hidden">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((a, idx) => {
                const canReturn = a.assetType === "Returnable" && a.status === "assigned";

                return (
                  <tr key={a._id}>
                    <th>{idx + 1}</th>
                    <td className="flex items-center gap-3">
                      <img
                        src={a.assetImage}
                        alt={a.assetName}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold">{a.assetName}</p>
                        <p className="text-xs text-gray-500">QTY: {a.assetQTY || 1}</p>
                      </div>
                    </td>
                    <td>{a.assetType}</td>
                    <td>{a.companyName}</td>
                    <td>{a.requestDate ? new Date(a.requestDate).toLocaleDateString() : "-"}</td>
                    <td>{a.approvalDate ? new Date(a.approvalDate).toLocaleDateString() : "-"}</td>
                    <td>
                      <span className={`badge ${a.status === "returned" ? "badge-neutral" : "badge-success"}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="print:hidden">
                      {canReturn ? (
                        <button
                          onClick={() => handleReturn(a._id)}
                          className="btn btn-warning btn-sm text-white"
                        >
                          Return
                        </button>
                      ) : (
                        <span className="text-xs text-gray-500">N/A</span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center text-gray-500">
                    No assets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAssets;
