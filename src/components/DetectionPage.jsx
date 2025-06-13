import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/Config"; // Sesuaikan path
import "./DetectionPage.css";

export default function DetectionPage() {
  const [file, setFile] = useState(null); // URL preview (blob)
  const [fileBase64, setFileBase64] = useState(null); // Base64 string
  const [uploadedFile, setUploadedFile] = useState(null); // File asli untuk upload
  const [isUploaded, setIsUploaded] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Konvert file ke base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      try {
        // Buat blob URL untuk preview sementara
        const blobUrl = URL.createObjectURL(selectedFile);
        
        // Konvert ke base64 untuk storage yang lebih stabil
        const base64String = await convertToBase64(selectedFile);
        
        console.log("File selected:", selectedFile.name);
        console.log("Blob URL created:", blobUrl);
        console.log("Base64 created:", base64String ? "✓" : "✗");
        
        setFile(blobUrl); // Untuk preview langsung
        setFileBase64(base64String); // Untuk dikirim ke result page
        setUploadedFile(selectedFile); // File asli untuk upload ke API
        setIsUploaded(true);
        setDetectionResult(null);
      } catch (error) {
        console.error("Error processing file:", error);
        alert("Gagal memproses file. Silakan coba lagi.");
      }
    }
  };

  const handleDetection = async () => {
    if (!uploadedFile || !fileBase64) {
      alert("Silakan pilih file terlebih dahulu!");
      return;
    }

    setIsLoading(true);

    try {
      // Membuat FormData untuk mengirim file
      const formData = new FormData();
      formData.append("file", uploadedFile);

      console.log("Sending file to API:", uploadedFile.name);

      // Mengirim request ke API
      const response = await fetch(`http://localhost:8000/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);
      
      setDetectionResult(result);

      console.log("Navigating with base64 image data");

      // Navigasi ke halaman hasil dengan base64 data (lebih stabil)
      navigate("/result", {
        state: {
          result: result,
          file: fileBase64, // Gunakan base64 string instead of blob URL
          originalFileName: uploadedFile.name,
          fileSize: uploadedFile.size,
        },
      });
    } catch (error) {
      console.error("Error during detection:", error);
      alert("Terjadi kesalahan saat melakukan deteksi. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
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
              <div className="image-preview-container">
                <img 
                  src={file} 
                  alt="Preview gambar yang diupload" 
                  className="uploaded-image"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    objectFit: 'contain',
                    borderRadius: '8px'
                  }}
                  onError={(e) => {
                    console.error("Error loading preview image:", e);
                    // Fallback ke base64 jika blob URL gagal
                    if (fileBase64 && e.target.src !== fileBase64) {
                      e.target.src = fileBase64;
                    } else {
                      e.target.style.display = 'none';
                    }
                  }}
                  onLoad={() => console.log("Preview image loaded successfully")}
                />
                <p className="file-name" style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                  📎 {uploadedFile?.name}
                </p>
                <p style={{ fontSize: '12px', color: '#999' }}>
                  Size: {uploadedFile?.size ? (uploadedFile.size / 1024).toFixed(2) + ' KB' : 'Unknown'}
                </p>
              </div>
            ) : (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <p>📷 Klik untuk mengunggah foto</p>
                <p style={{ fontSize: '12px', color: '#666' }}>Format: JPG, PNG, GIF</p>
              </div>
            )}
          </div>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* Tombol untuk deteksi */}
      <button
        className="camera-btn"
        onClick={isUploaded ? handleDetection : null}
        disabled={isLoading || !isUploaded}
        style={{
          backgroundColor: isUploaded ? '#4CAF50' : '#ccc',
          cursor: isUploaded && !isLoading ? 'pointer' : 'not-allowed',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          marginTop: '20px'
        }}
      >
        {isLoading
          ? "🔄 Sedang Memproses..."
          : isUploaded
          ? "🔍 Deteksi Sekarang"
          : "📤 Ayo deteksi sampahmu"}
      </button>

      {/* Loading indicator */}
      {isLoading && (
        <div className="loading-indicator" style={{
          textAlign: 'center',
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f0f8ff',
          borderRadius: '8px'
        }}>
          <p>🤖 Menganalisis gambar...</p>
          <div className="loading-spinner" style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            animation: 'spin 1s linear infinite',
            margin: '10px auto'
          }}></div>
          <p style={{ fontSize: '12px', color: '#666' }}>
            Mohon tunggu sebentar...
          </p>
        </div>
      )}

      {/* Debug info - hanya tampil di development */}
      {process.env.NODE_ENV === 'development' && isUploaded && (
        <div className="debug-info" style={{ 
          marginTop: '20px', 
          padding: '10px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          fontSize: '12px', 
          color: '#666' 
        }}>
          <p><strong>Debug Info:</strong></p>
          <p>✓ Blob URL: {file ? 'Created' : 'None'}</p>
          <p>✓ Base64: {fileBase64 ? 'Created' : 'None'}</p>
          <p>✓ File name: {uploadedFile?.name}</p>
          <p>✓ File size: {uploadedFile?.size} bytes</p>
          <p>✓ Ready to detect: {isUploaded.toString()}</p>
        </div>
      )}
    </div>
  );
}