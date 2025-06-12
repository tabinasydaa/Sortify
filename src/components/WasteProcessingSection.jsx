import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import processingImage from '../images/banksampah.png'; // Sesuaikan dengan gambar yang sesuai

export default function WasteProcessingSection() {
  const navigate = useNavigate(); // Inisialisasi navigate

  const handleMoreDetails = () => {
    navigate('/waste-recycling-details'); // Mengarahkan ke halaman WasteRecyclingDetails
  };

  return (
    <section className="waste-processing-section">
      <div className="processing-image">
        <img src={processingImage} alt="Ilustrasi pengolahan sampah" />
      </div>

      <div className="processing-content">
        <div className="processing-title-svg">
          <svg viewBox="0 0 1000 150" xmlns="http://www.w3.org/2000/svg" className="processing-title-svg-text">
            <text x="8" y="110"
              fontFamily="Impact"
              fontSize="80"
              stroke="#102B22"
              strokeWidth="20"
              fill="#E1FEA4"
              paintOrder="stroke"
            >
              OLAH SAMPAH MENJADI APA?
            </text>
          </svg>
        </div>

        <p className="processing-description">
          Yuk, kita olah sampah menjadi barang berguna! Dari tas plastik hingga perabot rumah, setiap sampah punya potensi untuk menjadi sesuatu yang lebih bermanfaat.
        </p>

        <button className="btn-process" onClick={handleMoreDetails}>Tampilkan Olahan Sampah</button>
      </div>
    </section>
  );
}
