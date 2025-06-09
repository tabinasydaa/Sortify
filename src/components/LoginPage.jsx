import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk mengarahkan setelah login
import './LoginPage.css'; // Pastikan impor file CSS di sini

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate(); // Inisialisasi navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Logika login (misalnya cek email dan password)
    if (email && password) {
      // Jika login berhasil, arahkan ke halaman Dashboard atau halaman lain
      navigate('/dashboard');  // Pindahkan ke halaman Dashboard setelah login
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
          <p>Don't have an account? <a href="#">Register</a></p>
        </div>
      </div>
    </div>
  );
}
