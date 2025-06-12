import React from 'react';
import { useLocation } from 'react-router-dom'; 
import './ResultPage.css';

// Mengimpor gambar
import jenisPlastikImg from '../images/jenisplastik.png'; 
import lamaTeruraiImg from '../images/teruraiplastik.png'; 
import kisaranHargaImg from '../images/kisaranplastik.png'; 
import faktaMenarikImg from '../images/faktaplastik.png'; 

export default function ResultPage() {
  const location = useLocation();
  const { result, file } = location.state || {}; 

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
            {/* Jenis Sampah Plastik */}
            <div className="info-box">
              <img src={jenisPlastikImg} alt="Jenis Sampah Plastik" />
              <div>
                <h4>Jenis Sampah Plastik</h4>
                <p>Sampah plastik adalah limbah yang berasal dari bahan polimer sintetis yang sulit terurai secara alami.</p>
              </div>
            </div>

            {/* Lama Terurai */}
            <div className="info-box">
              <img src={lamaTeruraiImg} alt="Lama Terurai" />
              <div>
                <h4>Lama Terurai</h4>
                <p>Plastik dapat terurai di alam ±10-450 tahun tergantung pada jenis plastiknya.</p>
              </div>
            </div>

            {/* Kisaran Harga Jual */}
            <div className="info-box">
              <img src={kisaranHargaImg} alt="Kisaran Harga Jual" />
              <div>
                <h4>Kisaran Harga Jual</h4>
                <p>Rp 1000 - Rp 2000/kg</p>
              </div>
            </div>

            {/* Fakta Menarik */}
            <div className="info-box">
              <img src={faktaMenarikImg} alt="Fakta Menarik" />
              <div>
                <h4>Fakta Menarik</h4>
                <p>Menghemat 16 kali lebih banyak energi listrik dengan mendaur ulang 1 kg plastik dibandingkan memproduksi plastik baru.</p>
              </div>
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
