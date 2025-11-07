"use client";

import { useState } from "react";
import type { Contractor } from "@/type/contractor";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Image from "next/image";
import MapPlaceHolder from "@/images/placeholder/Location_Map_Coming_Soon-1.png";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const toNumber = (val: unknown, fallback: number) => {
  const num = typeof val === "number" ? val : parseInt(val as string, 10);
  return isNaN(num) ? fallback : num;
};

const ContractorMap = ({ painter }: { painter: Contractor }) => {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

  // Use useLoadScript hook instead of LoadScript component
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  // Default center if contractor doesn't have coordinates
  const center = {
    lat: toNumber(painter.location_latitude, 40),
    lng: toNumber(painter.location_longitude, -74.006),
  };

  const onMarkerClick = () => {
    setIsInfoWindowOpen(!isInfoWindowOpen);
  };

  // Handle loading error
  if (loadError) {
    return (
      <div>
        <h3 className="heading-contractor">Map</h3>
        <div className="w-[350px] h-[350px] rounded-lg overflow-hidden shadow-md flex items-center justify-center bg-gray-100">
          <p className="text-red-500">
            Error loading map. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Show loading state
  if (!isLoaded) {
    return (
      <div>
        <h3 className="heading-contractor">Map</h3>
        <div className="w-[350px] h-[350px] rounded-lg overflow-hidden shadow-md flex items-center justify-center bg-gray-100">
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="heading-contractor">Map</h3>
      {painter.claimed || painter.not_claimed ? (
        <div className="w-[350px] h-[350px] rounded-lg overflow-hidden shadow-md">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={9}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: true,
            }}>
            <Marker
              position={center}
              onClick={onMarkerClick}
              title={painter.title || "Contractor location"}
              aria-label={painter.title || "Contractor location"}>
              {isInfoWindowOpen && (
                <InfoWindow
                  position={center}
                  onCloseClick={() => setIsInfoWindowOpen(false)}>
                  <div className="p-2">
                    <h3 className="font-semibold">{painter.title}</h3>
                    {painter.address && (
                      <p className="text-sm">{painter.address}</p>
                    )}
                    {painter.company_phone && (
                      <p className="text-sm">{painter.company_phone}</p>
                    )}
                    {painter.google_bp && (
                      <a
                        href={painter.google_bp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-700 hover:underline">
                        View Large Map
                      </a>
                    )}
                  </div>
                </InfoWindow>
              )}
            </Marker>
          </GoogleMap>
        </div>
      ) : (
        <Image
          src={MapPlaceHolder}
          alt="location map coming soon illustrated map"
          width={350}
          height={350}
          priority
          className="w-[350px] h-[350px] rounded-lg overflow-hidden shadow-md"
        />
      )}
    </div>
  );
};

export default ContractorMap;
