// src/components/EducationSection.jsx
import React from 'react';
import edukasiImage from '../images/edukasi.png'; // ganti sesuai path file gambar kamu

export default function EducationSection() {
  return (
    <section className="education-section">
      <div className="education-content">
        <h2><span>100 TIPS TO GET TO ZERO</span></h2>
        <p>
          Mulailah dengan langkah sederhana untuk mengurangi sampah di rumah dan tempat kerja.
          Ikuti prinsip 5R yang membantu Anda menjalani gaya hidup tanpa sampah:
          <strong> Tolak, Kurangi, Gunakan Kembali, Daur Ulang,</strong> dan <strong>Kompos</strong>.
          Temukan tips mudah untuk mengurangi dampak lingkungan Anda!
        </p>
        <button className="btn-edu">
          LEBIH LANJUT <span>»</span>
        </button>
      </div>
      <div className="education-image">
        <img src={edukasiImage} alt="Ilustrasi edukasi sampah" />
      </div>
    </section>
  );
}
