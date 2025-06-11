import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation untuk mengambil state dari URL
import './ResultPage.css';

export default function ResultPage() {
  const location = useLocation();
  const { result, file } = location.state || {}; // Ambil hasil deteksi dan gambar

  return (
    <div className="result-page-container">
      {result ? (
        <div className="result-container">
          <div className="result-left">
            <h3>{result.type}</h3>
            <p><strong>Foto Kamu Terdeteksi sebagai: {result.type}</strong></p>
            <img src={file} alt="Detected" className="result-image" />
            <button className="find-recycling-location">Cari Lokasi Daur Ulang Terdekat</button>
          </div>

          <div className="result-right">
            <div className="info-box">
              <h4>Jenis Sampah Plastik</h4>
              <p>Sampah plastik adalah limbah yang berasal dari bahan polimer sintetis yang sulit terurai secara alami.</p>
            </div>

            <div className="info-box">
              <h4>Lama Terurai</h4>
              <p>Plastik dapat terurai di alam ±10-450 tahun tergantung pada jenis plastiknya.</p>
            </div>

            <div className="info-box">
              <h4>Kisaran Harga Jual</h4>
              <p>Rp 1000 - Rp 2000/kg</p>
            </div>

            <div className="info-box">
              <h4>Fakta Menarik</h4>
              <p>Menghemat 16 kali lebih banyak energi listrik dengan mendaur ulang 1 kg plastik dibandingkan memproduksi plastik baru.</p>
            </div>

            <div>
              <p><strong>Apakah Anda Buang?</strong></p>
              <button className="yes-no-btn">Ya</button>
              <button className="yes-no-btn">Tidak</button>
            </div>
          </div>
        </div>
      ) : (
        <p>Data deteksi tidak ditemukan</p>
      )}
    </div>
  );
}
