import React, { useState } from "react";
import "./MoreDetailsPage.css";

// Mengimpor gambar
import bekal from "../images/bekal.png";
import isiulang from "../images/isiulang.png";
import pensilkayu from "../images/pensilkayu.png";
import banksampah from "../images/banksampah.png";
import botolminum from "../images/botolminum.png";
import kegiatan from "../images/kegiatan.png";
import kerajinan from "../images/kerajinan.png";  
import lomba from "../images/lomba.png";
import bekaldua from "../images/bekaldua.png";
import totebag from "../images/totebag.png";
import kresek from "../images/kresek.png";
import mineral from "../images/mineral.png";
import sedotan from "../images/sedotan.png";
import sedotan2 from "../images/sedotan2.png";
import brgrusak from "../images/brgrusak.png";
import tanamanhias from "../images/tanamanhias.png";
import sabun from "../images/sabun.png";
import sikatkayu from "../images/sikatkayu.png";
import deo from "../images/deo.png";
import deo1 from "../images/deo1.png";
import isiulang1 from "../images/isiulang1.png";
import lapmuka from "../images/lapmuka.png";
import tisumuka from "../images/tisumuka.png";
import mencup from "../images/mencup.png";
import alat1 from "../images/alat1.png";
import alat2 from "../images/alat2.png";
import produk from "../images/produk.png";
import wadahkaca from "../images/wadahkaca.png";
import buahbanya from "../images/buahbanya.png";
import kompos from "../images/kompos.png";
import minyak from "../images/minyak.png";
import sayurbuah from "../images/sayurbuah.png";
import daunkering from "../images/daunkering.png";
import alami from "../images/alami.png";
import alami2 from "../images/alami2.png";
import kimia from "../images/kimia.png";
import tanam from "../images/tanam.png";
import airhujan from "../images/airhujan.png";
import lampu from "../images/lampu.png";
import pestisida from "../images/pestisida.png";
import benar from "../images/benar.png";
import salah from "../images/salah.png";                                          

export default function MoreDetailsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Sekolah");

  const tipsData = {
    Sekolah: [
      {
        title: "Membiasakan Bawa Alat Makan Sendiri",
        description:
          "Mengajarkan siswa untuk membawa kotak makan dan alat makan sendiri akan mengurangi sampah plastik sekali pakai.",
        images: [bekal],
      },
      {
        title: "Menyediakan Stasiun Isi Ulang Air Minum",
        description:
          "Sekolah bisa menyediakan tempat untuk mengisi ulang air minum, mengurangi sampah botol plastik sekali pakai.",
        images: [isiulang],
      },
      {
        title: "Beralih Menggunakan Pensil Kayu",
        description:
          "Menggunakan pensil kayu, yang dapat terurai secara alami, sebagai pengganti pensil berbahan plastik.",
        images: [pensilkayu],
      },
      {
        title: "Membuat Bank Sampah Plastik",
        description:
          "Membuat bank sampah plastik di sekolah agar siswa bisa mendaur ulang sampah plastik secara terpisah dan efektif.",
        images: [banksampah],
      },
      {
        title: "Rutinitas Jumat Bersih",
        description:
          "Mengadakan rutinitas Jumat Bersih untuk membersihkan sampah plastik di sekitar sekolah.",
        images: [kegiatan],
      },
      {
        title: "Gunakan Barang Bekas untuk Kerajinan",
        description:
          "Gunakan sampah plastik untuk membuat kerajinan tangan di sekolah.",
        images: [kerajinan],
      },
      {
        title: "Lomba Daur Ulang Sampah",
        description:
          "Mengadakan lomba untuk kreativitas siswa dalam mendaur ulang sampah.",
        images: [lomba],
      },
    ],
    Rumah: [
      {
        title: "Membiasakan untuk Tidak Membeli Makanan dengan Kemasan Plastik",
        description:
          "Siswa bisa membeli makanan tanpa kemasan plastik dengan meminta makanan langsung dimasukkan ke dalam wadah pribadi.",
        images: [bekaldua],
      },
      {
        title: "Ganti Lampu dengan LED Hemat Energi",
        description:
          "Gantilah lampu biasa dengan lampu LED hemat energi yang lebih ramah lingkungan dan tahan lama.",
        images: [lampu],
      },      
      {
        title: "Pilih Produk Pembersih Alami",
        description:
          "Gunakan bahan alami seperti cuka dan lemon untuk membersihkan rumah, daripada memilih produk pembersih kimia yang merusak lingkungan.",
        images: [alami],
      },    
      {
        title: "Bawa Tas Belanja Sendiri",
        description:
          "Menggunakan tas kain atau totebag pribadi untuk berbelanja, mengurangi penggunaan kantong plastik.",
        images: [kresek, totebag, salah, benar],
      },
      {
        title: "Gunakan Botol Air Kekinian",
        description:
          "Gantilah botol plastik sekali pakai dengan botol air minum reusable untuk mengurangi sampah plastik.",
        images: [mineral, botolminum, salah, benar],
      },
      {
        title: "Hindari Sedotan Plastik",
        description:
          "Gunakan sedotan stainless steel, bambu, atau lebih baik lagi, hindari sedotan jika tidak diperlukan.",
        images: [sedotan, sedotan2, salah, benar],
      },
      {
        title: "Perbaiki Barang yang Rusak",
        description: "Sebelum membuang, coba perbaiki barang-barang yang rusak agar lebih awet.",
        images: [brgrusak],
      },
      {
        title: "Gunakan Tanaman Hias untuk Dekorasi",
        description:
          "Tanaman hias tidak hanya mempercantik rumah, tetapi juga membantu kualitas udara.",
        images: [tanamanhias],
      },
    ],
    KamarMandi: [
      {
        title: "Gunakan Sabun Batangan",
        description:
          "Alihkan penggunaan sabun cair dalam botol plastik dengan sabun batangan yang lebih ramah lingkungan.",
        images: [sabun],
      },
      {
        title: "Sikat Gigi dengan Sikat Gigi Bambu",
        description:
          "Pilih sikat gigi bambu yang ramah lingkungan dan bisa didaur ulang.",
        images: [sikatkayu],
      },
      {
        title: "Gunakan Deodorant Alami",
        description:
          "Pilih deodorant alami berbahan dasar batu alum atau baking soda.",
        images: [deo, deo1, salah, benar],
      },
      {
        title: "Pakai Sampo dan Conditioner Isi Ulang",
        description:
          "Pilih sampo dan conditioner yang dapat diisi ulang untuk mengurangi kemasan plastik.",
        images: [isiulang1],
      },
      {
        title: "Hindari Penggunaan Tisu Wajah",
        description:
          "Gantilah tisu wajah dengan kain lap yang bisa dicuci dan digunakan kembali.",
        images: [lapmuka, tisumuka, salah, benar],
      },
      {
        title: "Pakai Pembalut Kain atau Menstrual Cup",
        description:
          "Gunakan pembalut kain atau menstrual cup yang dapat dipakai berulang kali.",
        images: [mencup],
      },
    ],
    Dapur: [
      {
        title: "Gunakan Alat Dapur yang Bisa Digunakan Kembali",
        description:
          "Pilih alat dapur yang dapat digunakan kembali, seperti kain lap dapur dan tas belanja kain.",
        images: [alat1, alat2],
      },
      {
        title: "Dari Sisa Makanan ke Kompos",
        description:
          "Sisa makanan organik bisa dijadikan kompos untuk kebun atau tanaman.",
        images: [kompos],
      },     
      {
        title: "Beli Sayuran dan Buah Tanpa Plastik",
        description:
          "Pilih bahan makanan segar yang tidak dibungkus plastik, seperti membeli sayuran dan buah dari pasar tanpa kantong plastik.",
        images: [sayurbuah],
      },        
      {
        title: "Gunakan Minyak Goreng yang Bisa Digunakan Ulang",
        description:
          "Pilih minyak goreng yang bisa dipakai lebih dari satu kali untuk mengurangi sampah dan meminimalkan pemborosan.",
        images: [minyak],
      },   
      {
        title: "Beli Produk Daur Ulang",
        description:
          "Pilih produk yang menggunakan kemasan daur ulang.",
        images: [produk],
      },
      {
        title: "Gunakan Wadah Kaca atau Logam",
        description:
          "Gunakan wadah kaca atau logam untuk penyimpanan makanan.",
        images: [wadahkaca],
      },
      {
        title: "Beli dalam Jumlah Besar",
        description:
          "Belanja bahan makanan dalam jumlah besar untuk mengurangi penggunaan plastik kemasan.",
        images: [buahbanya],
      },
    ],
    Kebun: [
      {
        title: "Gunakan Pupuk Organik",
        description:
          "Gantilah penggunaan pupuk kimia dengan pupuk organik yang lebih ramah lingkungan dan mendukung kesehatan tanah.",
        images: [kimia, alami2, salah, benar],
      },
       {
        title: "Manfaatkan Kompos dari Sisa Tanaman",
        description:
          "Gunakan sisa-sisa tanaman seperti daun kering dan rumput untuk membuat kompos yang dapat digunakan kembali di kebun.",
        images: [daunkering],
      },   
       {
        title: "Gunakan Air Hujan untuk Penyiraman",
        description:
          "Kumpulkan air hujan dengan menggunakan wadah atau penampung untuk menyiram tanaman, mengurangi ketergantungan pada air tanah.",
        images: [airhujan],
      },      
       {
        title: "Gunakan Pestisida Alami",
        description:
          "Pilih pestisida alami seperti neem oil atau sabun insektisida berbahan dasar alami untuk menghindari bahan kimia yang merusak lingkungan.",
        images: [pestisida],
      },   
       {
        title: "Tanam Pohon untuk Mengurangi Karbon",
        description:
          "Tanam pohon di kebun untuk membantu menyerap karbon dioksida dan meningkatkan kualitas udara.",
        images: [tanam],
      },         
    ],
  };

  return (
    <div className="more-details-container">
      <svg viewBox="0 0 600 80" xmlns="http://www.w3.org/2000/svg" className="edu-title-svg-text-custom">
        <text
          x="300"
          y="60"
          textAnchor="middle"
          fontFamily="Impact"
          fontSize="32"
          stroke="#102B22"
          strokeWidth="16"
          fill="#E1FEA4"
          paintOrder="stroke"
        >
          100 TIPS TO GET ZERO
        </text>
      </svg>

      <p>
        Zero Waste adalah gaya hidup yang bertujuan untuk mengurangi produksi sampah hingga mendekati nol.
      </p>

      <div className="tip-category">
        <div
          onClick={() => setSelectedCategory("Sekolah")}
          className={selectedCategory === "Sekolah" ? "active" : ""}
        >
          Sekolah
        </div>
        <div
          onClick={() => setSelectedCategory("Rumah")}
          className={selectedCategory === "Rumah" ? "active" : ""}
        >
          Rumah
        </div>
        <div
          onClick={() => setSelectedCategory("KamarMandi")}
          className={selectedCategory === "KamarMandi" ? "active" : ""}
        >
          Kamar Mandi
        </div>
        <div
          onClick={() => setSelectedCategory("Dapur")}
          className={selectedCategory === "Dapur" ? "active" : ""}
        >
          Dapur
        </div>
        <div
          onClick={() => setSelectedCategory("Kebun")}
          className={selectedCategory === "Kebun" ? "active" : ""}
        >
          Kebun
        </div>
      </div>

      <div className="scroll-wrapper">
        <div className="tip-section">
          {tipsData[selectedCategory] && tipsData[selectedCategory].length > 0 ? (
            tipsData[selectedCategory].map((tip, index) => (
              <div key={index} className="tip-card">
                <h3>{tip.title}</h3>
                <p>{tip.description}</p>
                <div className="visual-comparison">
                  {/* Hanya menampilkan gambar jika ada */}
                  {tip.images[0] && (
                    <div>
                      <img src={tip.images[0]} alt="Visual 1" />
                      {tip.images[2] && <img className="icon" src={tip.images[2]} alt="Salah" />}
                    </div>
                  )}
                  {tip.images[1] && (
                    <div>
                      <img src={tip.images[1]} alt="Visual 2" />
                      {tip.images[3] && <img className="icon" src={tip.images[3]} alt="Benar" />}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Tidak ada data untuk kategori ini</p>
          )}
        </div>
      </div>
    </div>
  );
}