import React from 'react';
import { useLocation } from 'react-router-dom'; 
import './ResultPage.css';

// Mengimpor data kategori dari categoryData.js
import { categoryData } from '../categoryData.js';

export default function ResultPage() {
  const location = useLocation();
  const { result, file } = location.state || {}; // Mendapatkan data yang dikirimkan melalui state

  // Cek jika result atau file tidak ada, tampilkan pesan error
  if (!result || !file) {
    return <p>Data deteksi tidak ditemukan</p>;
  }

  // Periksa apakah type dari result ada di categoryData
  const category = categoryData[result.type];

  // Jika category tidak ditemukan, tampilkan pesan error
  if (!category) {
    return <p>Kategori tidak ditemukan untuk jenis sampah: {result.type}</p>;
  }

  return (
    <div className="result-page-container">
      <div className="result-container">
        <div className="result-left">
          <h3>{category.kategori}</h3>
          <p><strong>Foto Kamu Terdeteksi sebagai: {category.kategori}</strong></p>
          <img src={file} alt="Detected" className="result-image" />
          <button className="find-recycling-location">Cari Lokasi Daur Ulang Terdekat</button>
        </div>

        <div className="result-right">
          {/* Jenis Sampah */}
          <div className="info-box">
            <img src={require(`../images/${category.jenisImg}`)} alt="Jenis Sampah" />
            <div>
              <h4>Jenis Sampah</h4>
              <p>{category.jenis}</p>
            </div>
          </div>

          {/* Lama Terurai */}
          <div className="info-box">
            <img src={require(`../images/${category.lamaTeruraiImg}`)} alt="Lama Terurai" />
            <div>
              <h4>Lama Terurai</h4>
              <p>{category.lamaTerurai}</p>
            </div>
          </div>

          {/* Harga Jual */}
          <div className="info-box">
            <img src={require(`../images/${category.hargaJualImg}`)} alt="Harga Jual" />
            <div>
              <h4>Kisaran Harga Jual</h4>
              <p>{category.hargaJual}</p>
            </div>
          </div>

          {/* Fakta Menarik */}
          <div className="info-box">
            <img src={require(`../images/${category.faktaImg}`)} alt="Fakta Menarik" />
            <div>
              <h4>Fakta Menarik</h4>
              <p>{category.fakta}</p>
            </div>
          </div>

          <div>
            <p><strong>Apakah Anda Buang?</strong></p>
            <button className="yes-no-btn">Ya</button>
            <button className="yes-no-btn">Tidak</button>
          </div>
        </div>
      </div>
    </div>
  );
}
