import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import edukasiImage from '../images/edukasi.png';

export default function EducationSection() {
  const navigate = useNavigate(); // Inisialisasi navigate

  const handleMoreDetails = () => {
    navigate('/more-details'); // Mengarahkan ke halaman MoreDetailsPage
  };

  return (
    <section className="education-section">
      <div className="education-content">
        <div className="edu-title-svg">
          <svg viewBox="0 0 1000 150" xmlns="http://www.w3.org/2000/svg" className="edu-title-svg-text">
            <text x="240" y="110"
              fontFamily="Impact"
              fontSize="80"
              stroke="#102B22"
              strokeWidth="20"
              fill="#E1FEA4"
              paintOrder="stroke"
            >
              100 TIPS TO GET TO ZERO
            </text>
          </svg>
        </div>

        <p className="edu-description">
          Mulailah dengan langkah sederhana untuk mengurangi sampah di rumah dan tempat kerja.
          Ikuti prinsip 5R yang membantu Anda menjalani gaya hidup tanpa sampah:
          <strong> Tolak, Kurangi, Gunakan Kembali, Daur Ulang,</strong> dan <strong>Kompos</strong>.
          Temukan tips mudah untuk mengurangi dampak lingkungan Anda!
        </p>
        <button className="btn-edu" onClick={handleMoreDetails}>Lebih Lanjut</button>
      </div>
      <div className="education-image">
        <img src={edukasiImage} alt="Ilustrasi edukasi sampah" />
      </div>
    </section>
  );
}
