import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate dari React Router
import './DetectionPage.css';

export default function DetectionPage() {
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null); // State untuk hasil deteksi
  const navigate = useNavigate(); // Hook untuk navigasi ke halaman lain

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile)); // Menampilkan gambar yang diunggah
      setIsUploaded(true); // Mengubah state setelah file diunggah
      setDetectionResult(null); // Reset hasil deteksi ketika gambar baru diunggah
    }
  };

  const handleDetection = () => {
    console.log('Deteksi...');

    // Simulasi hasil deteksi (ganti dengan logika deteksi yang sebenarnya)
    const result = {
      type: 'Sampah Plastik',
      details: {
        jenis: 'Jenis Sampah Plastik',
        lamaTerurai: 'Plastik dapat terurai di alam ±10-450 tahun tergantung pada jenis plastiknya.',
        hargaJual: 'Rp 1000 - Rp 2000/kg',
        fakta: 'Menghemat 16 kali lebih banyak energi listrik dengan mendaur ulang 1 kg plastik dibandingkan memproduksi plastik baru',
      }
    };

    setDetectionResult(result);

    // Navigasi ke halaman hasil deteksi dan kirimkan hasilnya melalui state
    navigate('/result', { state: { result, file } });
  };

  return (
    <div className="detection-container">
      <h2>Deteksi Foto</h2>
      <h3>Unggah Foto</h3>

      {/* Area unggah gambar */}
      <div className="upload-container">
        <label htmlFor="file-upload" className="file-upload-label">
          <div className="upload-box">
            {file ? (
              <img src={file} alt="Uploaded" className="uploaded-image" />
            ) : (
              <p>Klik untuk mengunggah foto</p>
            )}
          </div>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {/* Tombol untuk deteksi */}
      <button 
        className="camera-btn" 
        onClick={isUploaded ? handleDetection : null}
      >
        {isUploaded ? 'Deteksi Sekarang' : '📸 Kamera'}
      </button>
    </div>
  );
}
