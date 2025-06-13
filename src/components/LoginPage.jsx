import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk mengarahkan setelah login
import './LoginPage.css'; // Pastikan impor file CSS di sini
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate(); // Inisialisasi navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
        try {
            // Kirim data login ke backend
            const response = await axios.post('http://localhost:5000/login', { email, password });
            localStorage.setItem('token', response.data.token);  // Simpan token JWT di localStorage
            navigate('/dashboard');  // Arahkan ke halaman Dashboard setelah login berhasil
        } catch (error) {
            alert('Gagal login, cek kembali email dan password!');
            console.error(error);
        }
    } else {
        alert('Email dan password harus diisi!');
    }
};

  return (
    <div className="login-container">
      <div className="login-form-container">
        {/* Bagian kiri */}
        <div className="login-left">
          <div className="logo-text">
            <img src="/logo.png" alt="Sortify Logo" width="60" />
            <p className="logo-description">Bersama Sortify, kenali dan kelola sampah lebih cerdas!</p>
          </div>
        </div>

        {/* Bagian kanan (Form Login) */}
        <div className="login-right">
          <h2>Sign in your account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email :</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>

            <div className="form-group">
              <label>Password :</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>

            <div className="form-group">
              <input 
                type="checkbox" 
                checked={rememberMe} 
                onChange={() => setRememberMe(!rememberMe)} 
              />
              <label> Remember me</label>
            </div>

            <button type="submit">Login</button>
          </form>
          <p>Belum punya akun? <Link to="/register">Daftar</Link></p>
        </div>
      </div>
    </div>
  );
}
