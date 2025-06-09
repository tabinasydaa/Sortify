import React from 'react';

export default function MoreDetailsPage() {
  return (
    <div className="more-details-container">
      <h1>100 Tips to Get to Zero</h1>
      <p>Zero Waste adalah gaya hidup yang bertujuan untuk mengurangi produk sampah hingga mendekati nol.</p>
      
      <div className="tip-category">
        <div>Rumah</div>
        <div>Kamar Mandi</div>
        <div>Dapur</div>
        <div>Sekolah</div>
        <div>Kebun</div>
      </div>

      <div className="tip-section">
        <h2>Rumah</h2>
        <div className="tip-item">
          <h3>1. Botol Plastik + Botol Isi Ulang</h3>
          <p>Botol sekali pakai memberikan sampah plastik. Gunakan botol minum yang bisa diisi ulang agar lebih ramah lingkungan dan hemat.</p>
          <div className="icons-container">
            <div className="checkmark"></div>
            <img src="icon_check.png" alt="Checkmark" />
          </div>
        </div>

        <div className="tip-item">
          <h3>2. Gunakan Kantong Belanja Kain</h3>
          <p>Saat berbelanja, bawa tas kain sendiri agar tidak menggunakan kantong plastik sekali pakai yang sulit terurai dan berbahaya bagi lingkungan.</p>
          <div className="icons-container">
            <div className="crossmark"></div>
            <img src="icon_cross.png" alt="Crossmark" />
          </div>
        </div>

        {/* Tambahkan lebih banyak tips sesuai kebutuhan */}
      </div>
    </div>
  );
}
