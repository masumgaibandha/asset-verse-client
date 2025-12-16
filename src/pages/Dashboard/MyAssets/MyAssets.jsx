import React, { useMemo, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";

const MyAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState("all"); // all | Returnable | Non-returnable

  const printRef = useRef(null);

  const { data: requests = [], refetch, isLoading } = useQuery({
    queryKey: ["my-assets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests?email=${user.email}`);
      return res.data;
    },
  });

  // ✅ print only this table area
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "My Assets - AssetVerse",
  });

  const safeDate = (d) => {
    if (!d) return "N/A";
    const date = new Date(d);
    if (Number.isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString();
  };

  const normalizeType = (t) => {
    if (!t) return "";
    const lower = String(t).toLowerCase();
    if (lower.includes("returnable") && !lower.includes("non")) return "Returnable";
    if (lower.includes("non")) return "Non-returnable";
    return t;
  };

  const filtered = useMemo(() => {
    const text = searchText.trim().toLowerCase();

    return requests.filter((r) => {
      const name = (r.assetName || "").toLowerCase();
      const type = normalizeType(r.assetType || r.productType || r.assetTypeName || "");

      const matchText = text ? name.includes(text) : true;
      const matchType = typeFilter === "all" ? true : type === typeFilter;

      return matchText && matchType;
    });
  }, [requests, searchText, typeFilter]);

  // ✅ Employee shouldn't "approve/reject" assets.
  // Optional: allow deleting a pending request (like "cancel request")
  const handleCancelRequest = (id) => {
    Swal.fire({
      title: "Cancel this request?",
      text: "This will remove your pending request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/requests/${id}`).then((res) => {
          if (res.data?.deletedCount) {
            refetch();
            Swal.fire({
              title: "Cancelled!",
              text: "Your request has been cancelled.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // Optional feature: Return button (requires server PATCH endpoint later)
  const handleReturn = (request) => {
    Swal.fire({
      title: "Return this asset?",
      text: "This will mark the item as returned (if your server supports it).",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, return",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/requests/${request._id}/return`, { status: "returned" })
          .then((res) => {
            if (res.data?.modifiedCount) {
              refetch();
              Swal.fire({
                title: "Returned!",
                text: "Asset return submitted successfully.",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Not Implemented",
                text: "Return API is not implemented yet on server.",
                icon: "info",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Not Implemented",
              text: "Return API is not implemented yet on server.",
              icon: "info",
            });
          });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-secondary">
            My Assets ({filtered.length})
          </h2>
          <p className="text-sm text-gray-500">
            Search, filter, print, and manage your assigned assets.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search by asset name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </label>

          {/* Filter */}
          <select
            className="select select-bordered"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>

          {/* Print */}
          <button onClick={handlePrint} className="btn btn-accent text-white">
            Print
          </button>
        </div>
      </div>

      {/* Printable area */}
      <div ref={printRef} className="bg-base-100 rounded-xl p-4 shadow-sm border">
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
                <th className="text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((r, index) => {
                const assetType = normalizeType(r.assetType || r.productType);
                const status = r.requestStatus || "pending";

                const canReturn =
                  status === "approved" &&
                  assetType === "Returnable";

                const canCancel = status === "pending";

                return (
                  <tr key={r._id}>
                    <th>{index + 1}</th>

                    {/* Asset (image + name) */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-10 w-10">
                            <img
                              src={
                                r.assetImage ||
                                r.productImage ||
                                "https://i.ibb.co/8LRrxWQR/Masum2.png"
                              }
                              alt="asset"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold">{r.assetName || "N/A"}</div>
                          <div className="text-xs text-gray-500">
                            Qty: {r.assetQTY ?? "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>{assetType || "N/A"}</td>
                    <td>{r.companyName || "N/A"}</td>
                    <td>{safeDate(r.requestDate || r.createdAt)}</td>
                    <td>{safeDate(r.approvalDate)}</td>

                    <td>
                      <span
                        className={`badge ${
                          status === "approved"
                            ? "badge-success"
                            : status === "rejected"
                            ? "badge-error"
                            : status === "returned"
                            ? "badge-info"
                            : "badge-warning"
                        }`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="text-right">
                      {canReturn && (
                        <button
                          onClick={() => handleReturn(r)}
                          className="btn btn-sm btn-primary text-white"
                        >
                          Return
                        </button>
                      )}

                      {canCancel && (
                        <button
                          onClick={() => handleCancelRequest(r._id)}
                          className="btn btn-sm btn-outline ml-2"
                        >
                          Cancel
                        </button>
                      )}

                      {!canReturn && !canCancel && (
                        <span className="text-xs text-gray-500">No action</span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                    No assets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* NOTE for you */}
      <p className="text-xs text-gray-500 mt-3">
        Note: The “Return” action needs a server endpoint like <span className="font-mono">PATCH /requests/:id/return</span>.
        If you haven’t created it yet, the page will show “Not Implemented”.
      </p>
    </div>
  );
};

export default MyAssets;
