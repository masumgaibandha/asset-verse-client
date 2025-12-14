import React, { useRef } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';
import { IoIosSearch } from 'react-icons/io';

const AssetOverview = () => {
  const position = [23.685, 90.3563];
  const companyLocations = useLoaderData();
  // console.log(companyLocations)

  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim();

    const district = companyLocations.find(c =>
      c.district?.toLowerCase().includes(location.toLowerCase())
    );

    if (district) {
      const coord = [district.latitude, district.longitude];
      mapRef.current?.flyTo(coord, 14);
    }
  };

  return (
    <div className="bg-base-100 rounded-2xl p-10 text-secondary container mx-auto">
      <h2 className="text-5xl font-extrabold">Asset Overview by Company Location</h2>

      <form onSubmit={handleSearch}>
        <div className='w-full max-w-2xl pt-6'>
          <div className='flex items-center bg-[#F4F6F8] rounded-full pl-4 -pr-1 h-10 gap-3'>
            <IoIosSearch />
            <input
              type="search"
              name='location'
              placeholder='search here'
              className='flex-1 bg-transparent outline-none text-gray-700 text-sm'
            />

            <button className='rounded-full px-6 py-2 font-semibold bg-[#C8E24A] text-[#1F1F1F] cursor-pointer'>
              Search
            </button>
          </div>

          <div className='divider my-8' />
          <h2 className="text-[30px] font-extrabold ">Company Offices / Locations</h2>
        </div>
      </form>

      <div className='w-full h-[800px]'>
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

          {companyLocations.map((office, index) => (
            <Marker
              key={index}
              position={[office.latitude, office.longitude]}
            >
              <Popup>
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">District:</span> {office.district}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Covered Area:</span>{" "}
                    {office.covered_area?.join(", ") || "N/A"}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default AssetOverview;
