import React from 'react';
import deteksiImage from '../images/deteksi.png'; // Impor gambar

export default function WasteDetectionSection() {
  return (
    <section className="detection-section">
      <div className="content-container">
        {/* Gambar di sebelah kiri */}
        <div className="image-container">
          <img src={deteksiImage} alt="Ilustrasi Deteksi Sampah" />
        </div>

        {/* Teks di sebelah kanan */}
        <div className="text-container">
          <svg viewBox="0 0 1600 300" xmlns="http://www.w3.org/2000/svg" className="edu-title-svg-text">
            <text x="50%" y="50%" textAnchor="middle" alignmentBaseline="middle"
              fontFamily="Impact"
              fontSize="72" /* Memperbesar ukuran font untuk "DETEKSI SAMPAH ANDA SEKARANG!!" */
              stroke="#102B22"
              strokeWidth="24"
              fill="#E1FEA4"
              paintOrder="stroke"
            >
              DETEKSI SAMPAH ANDA SEKARANG!!
            </text>
          </svg>
          <h2>Bebas Polusi</h2>
          <h2>Hidup Bersih</h2>
          <button className="btn-continue">Lebih Lanjut</button>
        </div>
      </div>
    </section>
  );
}
