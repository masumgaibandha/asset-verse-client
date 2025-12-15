import React from 'react'

const Others = () => {
    return (
        <div className="bg-base-100 rounded-2xl shadow-sm p-6 md:p-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-secondary">
                Request an Asset
            </h2>

            <p className="mt-3 text-base-content/70 max-w-2xl">
                Submit a request for an available company asset. HR will review and
                approve or reject your request.
            </p>

            <div className="divider my-8" />

            <form className="space-y-6">
                {/* Asset Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Asset Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., MacBook Pro 14”"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Asset ID</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., AV-2025-0012"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Asset Type</span>
                        </label>
                        <select className="select select-bordered w-full">
                            <option value="">Select type</option>
                            <option>Returnable</option>
                            <option>Non-returnable</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Company</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., TestCompany Ltd."
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Request Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Request Date</span>
                        </label>
                        <input type="date" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Priority</span>
                        </label>
                        <select className="select select-bordered w-full">
                            <option value="">Select priority</option>
                            <option>Normal</option>
                            <option>High</option>
                            <option>Urgent</option>
                        </select>
                    </div>

                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text font-semibold">Note (Optional)</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered min-h-28"
                            placeholder="Write a short note for HR (why you need this asset, duration, etc.)"
                        ></textarea>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button type="button" className="btn btn-primary rounded-xl px-8">
                        Submit Request
                    </button>
                    <button type="button" className="btn btn-outline rounded-xl px-8">
                        Reset
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Others