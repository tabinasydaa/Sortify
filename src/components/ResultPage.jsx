import React, { useMemo, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./ResultPage.css";

// Mengimpor data kategori dari categoryData.js
import { categoryData } from "../categoryData.js";

export default function ResultPage() {
  const navigate = useNavigate();

  const location = useLocation();
  const { result, file } = location.state || {}; // Mendapatkan data yang dikirimkan melalui state
  const [isSaving, setIsSaving] = useState(false);
  const [savedStatus, setSavedStatus] = useState(null);

  // Cek jika result atau file tidak ada, tampilkan pesan error
  if (!result || !file) {
    return <p>Data deteksi tidak ditemukan</p>;
  }

  // Mapping untuk mencocokkan predicted_class dengan key di categoryData
  const classMapping = useMemo(
    () => ({
      paper: "Kertas",
      plastic: "Plastik",
      glass: "Kaca",
      metal: "Logam",
      organic: "Biologis",
      cardboard: "Kardus",
      battery: "B3",
      clothes: "Pakaian",
      shoes: "Sepatu",
      trash: "Sampah_Umum",
    }),
    []
  );

  // Memoize category calculation untuk mencegah re-calculation
  const finalCategory = useMemo(() => {
    const predictedClass = result.predicted_class || result.type;
    const categoryKey = classMapping[predictedClass] || predictedClass;
    let category = categoryData[categoryKey];

    // Jika category tidak ditemukan, coba dengan kapitalisasi pertama
    if (!category && predictedClass) {
      const capitalizedKey =
        predictedClass.charAt(0).toUpperCase() + predictedClass.slice(1);
      category = categoryData[capitalizedKey];
    }

    // Jika masih tidak ditemukan, gunakan data default
    if (!category) {
      category = {
        kategori: predictedClass
          ? predictedClass.charAt(0).toUpperCase() + predictedClass.slice(1)
          : "Tidak Diketahui",
        jenis: "Sampah yang terdeteksi",
        lamaTerurai: "Informasi tidak tersedia",
        hargaJual: "Informasi tidak tersedia",
        fakta: "Informasi detail untuk kategori ini sedang dalam pengembangan",
        jenisImg: "default-jenis.png",
        lamaTeruraiImg: "default-waktu.png",
        hargaJualImg: "default-harga.png",
        faktaImg: "default-fakta.png",
      };
    }

    // Console.log hanya untuk debugging (hapus di production)
    if (process.env.NODE_ENV === "development") {
      console.log("Final Category:", category);
    }

    return category;
  }, [result, classMapping]);

  // Fungsi untuk menyimpan histori ke database
  const saveToHistory = useCallback(
    async (isDisposed) => {
      setIsSaving(true);
      try {
        const userId =
          localStorage.getItem("userId") ||
          sessionStorage.getItem("userId") ||
          1;

        const historyData = {
          id_user: parseInt(userId),
          type: result.predicted_class || result.type,
          desc: `Deteksi sampah ${
            finalCategory.kategori
          } dengan tingkat kepercayaan ${Math.round(
            (result.confidence || 0) * 100
          )}%`,
          status: isDisposed ? "dibuang" : "tidak_dibuang",
        };

        const response = await fetch("http://localhost:5000/api/history", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(historyData),
        });

        if (response.ok) {
          const responseData = await response.json();
          if (responseData.success) {
            setSavedStatus(isDisposed ? "dibuang" : "tidak_dibuang");
            console.log("Data berhasil disimpan:", responseData.data);

            alert(
              `Data berhasil disimpan dengan status: ${
                isDisposed ? "dibuang" : "tidak dibuang"
              }`
            );

            // Redirect ke dashboard
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
          } else {
            throw new Error(responseData.message || "Gagal menyimpan data");
          }
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal menyimpan data");
        }
      } catch (error) {
        console.error("Error saving history:", error);
        alert("Gagal menyimpan data. Silakan coba lagi.");
      } finally {
        setIsSaving(false);
      }
    },
    [result, finalCategory, navigate]
  );

  // Handler untuk tombol Ya (dibuang)
  const handleYesClick = useCallback(() => {
    saveToHistory(true);
  }, [saveToHistory]);

  // Handler untuk tombol Tidak (tidak dibuang)
  const handleNoClick = useCallback(() => {
    saveToHistory(false);
  }, [saveToHistory]);

  // Memoize image error handler
  const handleImageError = useCallback((e) => {
    e.target.src = "/images/default-icon.png";
  }, []);

  // Memoize confidence calculation
  const confidencePercentage = useMemo(() => {
    return result.confidence ? Math.round(result.confidence * 100) : null;
  }, [result.confidence]);

  return (
    <div className="result-page-container">
      <div className="result-container">
        <div className="result-left">
          <h3>{finalCategory.kategori}</h3>
          <p>
            <strong>
              Foto Kamu Terdeteksi sebagai: {finalCategory.kategori}
            </strong>
          </p>
          {confidencePercentage && (
            <p>
              <strong>Tingkat Kepercayaan: {confidencePercentage}%</strong>
            </p>
          )}
          <img src={file} alt="Detected" className="result-image" />
          <button className="find-recycling-location">
            Cari Lokasi Daur Ulang Terdekat
          </button>
        </div>

        <div className="result-right">
          {/* Jenis Sampah */}
          <div className="info-box">
            <div>
              <h4>Jenis Sampah</h4>
              <p>{finalCategory.jenis}</p>
            </div>
          </div>

          {/* Lama Terurai */}
          <div className="info-box">
            <div>
              <h4>Lama Terurai</h4>
              <p>{finalCategory.lamaTerurai}</p>
            </div>
          </div>

          {/* Harga Jual */}
          <div className="info-box">
            <div>
              <h4>Kisaran Harga Jual</h4>
              <p>{finalCategory.hargaJual}</p>
            </div>
          </div>

          {/* Fakta Menarik */}
          <div className="info-box">
            <div>
              <h4>Fakta Menarik</h4>
              <p>{finalCategory.fakta}</p>
            </div>
          </div>

          <div>
            <p>
              <strong>Apakah Anda Buang?</strong>
            </p>
            {savedStatus && (
              <p
                style={{
                  color: "green",
                  fontSize: "14px",
                  marginBottom: "10px",
                }}
              >
                Status tersimpan: {savedStatus}
              </p>
            )}
            <button
              className="yes-no-btn"
              onClick={handleYesClick}
              disabled={isSaving || savedStatus}
            >
              {isSaving ? "Menyimpan..." : "Ya"}
            </button>
            <button
              className="yes-no-btn"
              onClick={handleNoClick}
              disabled={isSaving || savedStatus}
            >
              {isSaving ? "Menyimpan..." : "Tidak"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
