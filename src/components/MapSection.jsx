import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import locations from "../dummy/daur_ulang.json"; // sesuaikan path jika beda
import React from 'react';

export default function MapSection() {
  console.log(locations);
  return (
    <section className="map-section">
      <div className="edu-title-svg">
        <svg
          viewBox="0 0 1200 150"
          xmlns="http://www.w3.org/2000/svg"
          className="edu-title-svg-text"
        >
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontFamily="Impact"
            fontSize="60"
            stroke="#102B22"
            strokeWidth="24"
            fill="#E1FEA4"
            paintOrder="stroke"
          >
            PETA SEBARAN SAMPAH DI INDONESIA
          </text>
        </svg>
      </div>

      <div className="map-container">
        <div style={{ height: "50vh", width: "100%" }}>
          <MapContainer
            center={[-2.5489, 118.0149]}
            zoom={5}
            style={{ height: "50vh", width: "100%", borderRadius: "10px" }}
          >
            <TileLayer
              attribution="Tiles &copy; Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((item, index) => {
              // Akses langsung dari struktur data
              const lat = item.location?.lat;
              const lng = item.location?.lng;
              const title = item.title || "Tanpa Nama";

              // Validasi minimal agar tidak error jika lat/lng undefined
              if (typeof lat !== "number" || typeof lng !== "number")
                return null;

              return (
                <Marker key={index} position={[lat, lng]}>
                  <Popup>
                    <strong>{title}</strong>
                    <br />
                    {item.address}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
