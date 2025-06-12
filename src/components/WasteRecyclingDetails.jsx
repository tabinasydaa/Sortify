import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WasteRecyclingDetails.css';

export default function WasteRecyclingDetails() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="waste-recycling-details">
      <div className="details-content">
        <button className="btn-back" onClick={handleBack}>← Kembali</button>
        <h1>Olahan Sampah Menjadi Barang Berguna</h1>

        <p>
          Sampah yang kita anggap tidak berguna ternyata memiliki potensi besar untuk diubah menjadi barang yang bermanfaat. Mari mulai dengan mengolah sampah di sekitar kita untuk menciptakan produk yang ramah lingkungan dan mengurangi dampak negatif terhadap bumi.
        </p>

        {/* === 1. CELELANG (text kiri, video kanan) === */}
        <div className="content-layout">
          <div className="text-side">
            <h4>Celengan</h4>
            <p>
              Botol bekas bisa disulap menjadi celengan lucu dan fungsional. Cukup siapkan satu botol plastik ukuran sedang, potong lubang untuk memasukkan uang, lalu hias bagian luarnya menggunakan kertas warna, cat, atau bahan daur ulang lainnya. Celengan ini cocok untuk anak-anak belajar menabung sekaligus mengenal daur ulang.
            </p>
          </div>
          <div className="video-side">
            <iframe
              src="https://www.youtube.com/embed/9LovD6VCa40"
              title="Tutorial Membuat Celengan dari Botol Bekas"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* === 2. TEMPAT SAMPAH (video kiri, text kanan) === */}
        <div className="content-layout">
          <div className="video-side">
            <iframe
              src="https://www.youtube.com/embed/1ee2jKR7oy0"
              title="Tutorial Tempat Sampah dari Kardus"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="text-side">
            <h4>Tempat Sampah</h4>
            <p>
              Kardus bekas bisa dijadikan tempat sampah ramah lingkungan. Cukup siapkan kardus bekas ukuran sedang, perkuat bagian bawahnya, dan lapisi permukaan dengan kertas daur ulang atau cat agar tampil menarik. Tempat sampah ini cocok digunakan di rumah atau ruang belajar anak.
            </p>
          </div>
        </div>
        {/* === 3. TEMPAT PENSIL (text kiri, video kanan) === */}
        <div className="content-layout">
          <div className="text-side">
            <h4>Tempat Pensil</h4>
            <p>
              Dengan menggabungkan sedotan bekas dan botol plastik, kamu bisa membuat tempat pensil yang fungsional dan menarik. Prosesnya mudah dan cocok dijadikan kerajinan tangan anak-anak atau remaja.
            </p>
          </div>
          <div className="video-side">
            <iframe
              src="https://www.youtube.com/embed/JtX2jKS7SHw"
              title="Tutorial Tempat Pensil dari Sedotan dan Botol"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* === 4. TAS ANYAMAN (video kiri, text kanan) === */}
        <div className="content-layout">
          <div className="video-side">
            <iframe
              src="https://www.youtube.com/embed/KDuX9siPT6U"
              title="Tutorial Tas Anyaman dari Sedotan Plastik"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="text-side">
            <h4>Tas Anyaman</h4>
            <p>
              Sedotan plastik yang biasanya dibuang bisa dijadikan bahan dasar untuk membuat tas anyaman yang kuat dan artistik. Proyek ini cocok untuk kamu yang ingin belajar teknik anyam sederhana sekaligus mendaur ulang limbah plastik.
            </p>
          </div>
        </div>

        {/* === 5. KOTAK PENSIL (text kiri, video kanan) === */}
        <div className="content-layout">
          <div className="text-side">
            <h4>Kotak Pensil</h4>
            <p>
              Bungkus snack seperti wafer dan biskuit dapat disulap menjadi kotak pensil unik. Hasilnya tidak hanya ramah lingkungan, tapi juga estetik dan penuh karakter!
            </p>
          </div>
          <div className="video-side">
            <iframe
              src="https://www.youtube.com/embed/MJd3bo_XRaU"
              title="Tutorial Kotak Pensil dari Bungkus Snack"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
