// src/components/MapSection.jsx
import React from 'react';

export default function MapSection() {
  return (
    <section className="map-section">
      <div className="edu-title-svg">
        <svg viewBox="0 0 1200 150" xmlns="http://www.w3.org/2000/svg" className="edu-title-svg-text">
          <text x="50%" y="50%" textAnchor="middle" alignmentBaseline="middle"
            fontFamily="Impact"
            fontSize="60" /* Ukuran font lebih kecil untuk menyesuaikan */
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
        <div className="map-placeholder">
          <p>Peta sebaran sampah akan tampil di sini</p>
        </div>
      </div>
    </section>
  );
}
