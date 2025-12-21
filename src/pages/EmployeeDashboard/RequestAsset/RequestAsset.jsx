import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const RequestAsset = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const modalRef = useRef(null);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [qty, setQty] = useState(1);
    const [note, setNote] = useState("");

    const { data: assets = [], isLoading, refetch } = useQuery({
        queryKey: ["assets-available"],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get("/assets/available");
            return res.data;
        },
    });

    const openModal = (asset) => {
        setSelectedAsset(asset);
        setQty(1);
        setNote("");
        modalRef.current?.showModal();
    };

    const handleSubmitRequest = async () => {
        if (!selectedAsset?._id) return;

        const maxQty = Number(selectedAsset.availableQuantity || 0);
        const reqQty = Number(qty);

        if (!reqQty || reqQty < 1) {
            return Swal.fire("Invalid", "Quantity must be at least 1", "info");
        }

        if (reqQty > maxQty) {
            return Swal.fire("Invalid", `Max available quantity is ${maxQty}`, "info");
        }

        const payload = {
            assetId: selectedAsset._id,
            assetName: selectedAsset.productName || selectedAsset.assetName,
            assetImage: selectedAsset.productImage || selectedAsset.assetImage || "",
            assetType: selectedAsset.productType || selectedAsset.assetType,
            assetQTY: reqQty,

            requesterName: user?.displayName || "Employee",
            requesterEmail: user?.email,

            hrEmail: selectedAsset.hrEmail,
            companyName: selectedAsset.companyName,
            companyLogo: selectedAsset.companyLogo || "",

            note,
        };

        try {
            const res = await axiosSecure.post("/requests/employee", payload);

            if (res.data?.insertedId) {
                modalRef.current?.close();
                setSelectedAsset(null);
                refetch();

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Request submitted",
                    showConfirmButton: false,
                    timer: 1200,
                });
            }
        } catch (err) {
            Swal.fire("Error", err.response?.data?.message || "Request failed", "error");
        }
    };

    if (isLoading) return <span className="loading loading-spinner loading-lg"></span>;

    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold mb-6">Request an Asset</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {assets.map((a) => {
                    const name = a.productName || a.assetName;
                    const img = a.productImage || a.assetImage;
                    const type = a.productType || a.assetType;

                    return (
                        <div key={a._id} className="card bg-base-100 border shadow-sm">
                            <figure className="p-4">
                                <img className="h-44 w-full object-cover rounded-xl" src={img} alt={name} />
                            </figure>
                            <div className="card-body">
                                <h3 className="text-xl font-bold">{name}</h3>

                                <div className="flex justify-between text-sm text-gray-500">
                                    <p>{type}</p>
                                    <p>Qty: {a.availableQuantity}</p>
                                </div>

                                <div className="card-actions mt-4">
                                    <button
                                        onClick={() => openModal(a)}
                                        className="btn btn-accent w-full text-white"
                                    >
                                        Request
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {assets.length === 0 && (
                    <div className="text-gray-500">No assets available right now.</div>
                )}
            </div>

            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-3">Request Asset</h3>

                    <p className="mb-1">
                        <b>Asset:</b> {selectedAsset?.productName || selectedAsset?.assetName}
                    </p>
                    <p className="mb-4 text-sm text-gray-500">
                        Available: {selectedAsset?.availableQuantity || 0}
                    </p>

                    <div className="space-y-3">
                        <div>
                            <label className="label font-semibold">Quantity</label>
                            <input
                                type="number"
                                min="1"
                                className="input input-bordered w-full"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="label font-semibold">Note (optional)</label>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                rows={3}
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    <div className="modal-action flex justify-between">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>

                        <button onClick={handleSubmitRequest} className="btn btn-accent text-white">
                            Submit Request
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default RequestAsset;
