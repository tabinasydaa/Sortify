import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import deteksiImage from '../images/tipsedukasi.png';

export default function WasteDetectionSection() {
  const navigate = useNavigate();  // Initialize navigate hook

  // Function to handle the button click and redirect to the /detection page
  const handleNavigate = () => {
    navigate('/detection');  // Redirect to the DetectionSection page
  };

  return (
    <section className="detection-section">
      <div className="content-container">
        {/* Title */}
        <svg viewBox="0 0 600 80" xmlns="http://www.w3.org/2000/svg" className="edu-title-svg-text-custom">
          <text
            x="300"
            y="60"
            textAnchor="middle"
            fontFamily="Impact"
            fontSize="32"
            stroke="#102B22"
            strokeWidth="16"
            fill="#E1FEA4"
            paintOrder="stroke"
          >
            DETEKSI SAMPAH ANDA SEKARANG!!
          </text>
        </svg>

        <div className="image-container">
          <img src={deteksiImage} alt="Ilustrasi Deteksi Sampah" />
        </div>

        <button className="btn-continue" onClick={handleNavigate}>Lebih Lanjut</button>
      </div>
    </section>
  );
}
