import React from 'react'

const Others = () => {
    return (
        <div>
            <form onSubmit={handleSearch}>
                <div className="w-full max-w-2xl pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        {/* Search */}
                        <div className="flex items-center bg-[#F4F6F8] rounded-full pl-4 h-10 gap-3 flex-1">
                            <IoIosSearch />
                            <input
                                type="search"
                                name="location"
                                placeholder="Search by district (e.g., Dhaka)"
                                className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
                            />
                            <button
                                type="submit"
                                className="rounded-full px-6 py-2 font-semibold bg-[#C8E24A] text-[#1F1F1F] cursor-pointer"
                            >
                                Search
                            </button>
                        </div>

                        {/* Company filter */}
                        <select
                            className="select select-bordered rounded-full h-10"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        >
                            {companies.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="divider my-8" />

                    <h2 className="text-[30px] font-extrabold">
                        Company coverage & asset service points
                    </h2>
                    <p className="text-base-content/70 mt-2">
                        Pick a company and search a district to zoom in and view details.
                    </p>
                </div>
            </form>

            <div className="w-full h-[800px] border-2 rounded-xl overflow-hidden">
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className="h-[800px]"
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {filteredCenters.map((center, index) => (
                        <Marker key={index} position={[center.latitude, center.longitude]}>
                            <Popup>
                                <div className="space-y-1">
                                    <p className="font-bold">{center.companyName || "Company"}</p>
                                    <p>
                                        <span className="font-semibold">District:</span> {center.district}
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-semibold">Service Area:</span>{" "}
                                        {center.covered_area?.join(", ") || "N/A"}
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>


        </div>
    )
}

export default Others