import React, { useEffect, useState } from 'react';
import './Dashboard.css';

export default function Dashboard() {
  const userName = "Alifia"; // Ganti dengan nama dinamis jika sudah ada sistem login
  const [history, setHistory] = useState([]);
  
  const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('detectionHistory')) || [];
    setHistory(savedHistory);
  }, []);

  return (
    <section className="dashboard-section">
      <div className="dashboard-container">
        {/* Header */}
        <h2>Halo!!</h2>
        <p>Selamat datang kembali di Sortify.</p>

        {/* Ringkasan */}
        <div className="dashboard-cards">
          <div className="card">
            <h3>Riwayat Deteksi</h3>
            <p>{history.length} total deteksi</p>
          </div>
        </div>

        {/* Aksi */}
        <div className="dashboard-actions">
          <button onClick={() => window.location.href = '/detection'}>Mulai Deteksi Baru</button>
          <button onClick={() => scrollToSection('education')}>Lanjutkan Edukasi</button>
          <button onClick={() => scrollToSection('map')}>Buka Peta Sampah</button>
        </div>

        {/* Histori */}
        <div className="dashboard-history">
          <h3>📜 Histori Deteksi</h3>
          {history.length === 0 ? (
            <p>Belum ada deteksi yang tersimpan.</p>
          ) : (
            <ul>
              {history.map((item) => (
                <li key={item.id}>
                  <strong>{item.tanggal}</strong> — {item.jenis} ({item.hasil})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
