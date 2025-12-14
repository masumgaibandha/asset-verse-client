import React from "react";
import bookingIcon from "../../../assets/zapshift-assets/bookingicon.png";

const WorksCard = () => {
    return (
        <section className="px-5 pb-10 container mx-auto">
            <h1 className="font-extrabold text-3xl text-secondary py-7">
                How AssetVerse Works
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                <div className="px-5 pb-10 bg-base-100 shadow-sm h-full rounded-2xl">
                    <figure className="pt-5 pb-8">
                        <img src={bookingIcon} alt="Register" className="w-14" />
                    </figure>
                    <div>
                        <h2 className="font-bold text-xl text-left pb-3">
                            Register & Join a Company
                        </h2>
                        <p className="font-medium text-left">
                            HR registers a company. Employees sign up and get affiliated when
                            their first request is approved.
                        </p>
                    </div>
                </div>

                <div className="px-5 pb-10 bg-base-100 shadow-sm h-full rounded-2xl">
                    <figure className="pt-5 pb-8">
                        <img src={bookingIcon} alt="Add assets" className="w-14" />
                    </figure>
                    <div>
                        <h2 className="font-bold text-xl text-left pb-3">
                            Add Assets to Inventory
                        </h2>
                        <p className="font-medium text-left">
                            HR adds returnable/non-returnable items with quantity and keeps the
                            inventory organized.
                        </p>
                    </div>
                </div>

                <div className="px-5 pb-10 bg-base-100 shadow-sm h-full rounded-2xl">
                    <figure className="pt-5 pb-8">
                        <img src={bookingIcon} alt="Request & approve" className="w-14" />
                    </figure>
                    <div>
                        <h2 className="font-bold text-xl text-left pb-3">
                            Request → Approve / Reject
                        </h2>
                        <p className="font-medium text-left">
                            Employees request available assets. HR reviews requests and approval
                            updates stock and assignments.
                        </p>
                    </div>
                </div>

                <div className="px-5 pb-10 bg-base-100 shadow-sm h-full rounded-2xl">
                    <figure className="pt-5 pb-8">
                        <img src={bookingIcon} alt="Upgrade package" className="w-14" />
                    </figure>
                    <div>
                        <h2 className="font-bold text-xl text-left pb-3">
                            Upgrade Package Anytime
                        </h2>
                        <p className="font-medium text-left">
                            When employee limits are reached, HR upgrades via Stripe and the new
                            limit applies immediately.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorksCard;
