import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import axios from 'axios';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password && password === rePassword) {
        try {
            const response = await axios.post('http://localhost:5000/register', { email, password });
            console.log(response);  // Lihat apakah response dari backend sesuai
            alert('Registrasi berhasil!');
            navigate('/login');  // Redirect ke halaman login setelah registrasi berhasil
        } catch (error) {
            console.error('Error during registration:', error);  // Log error jika terjadi
            alert('Gagal registrasi, coba lagi!');
        }
    } else {
        alert('Isi semua field dan pastikan password cocok!');
    }
};

  return (
    <div className="register-container">
      <div className="register-form-container">
        {/* Kiri */}
        <div className="register-left">
          <div className="logo-text">
            <img src="/logo.png" alt="Sortify Logo" width="60" />
            <p className="logo-description">Buat akun Sortify Anda</p>
          </div>
        </div>

        {/* Kanan (Form Registrasi) */}
        <div className="register-right">
          <h2>Buat akun Anda</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email :</label>
              <input 
                type="email" 
                placeholder="Masukkan email Anda" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>

            <div className="form-group">
              <label>Password :</label>
              <input 
                type="password" 
                placeholder="Masukkan password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>

            <div className="form-group">
              <label>Re-Password :</label>
              <input 
                type="password" 
                placeholder="Ulangi password Anda" 
                value={rePassword} 
                onChange={(e) => setRePassword(e.target.value)} 
                required
              />
            </div>

            <button type="submit">Daftar</button>
          </form>
          <p>Sudah punya akun? <a href="/login">Masuk</a></p>
        </div>
      </div>
    </div>
  );
}
