import './App.css';
import background from './images/background.png';
import EducationSection from './components/EducationSection';
import MapSection from './components/MapSection';
import WasteDetectionSection from './components/WasteDetectionSection';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';  // Import RegisterPage
import Dashboard from './components/Dashboard';
import MoreDetailsPage from './components/MoreDetailsPage';
import { useState } from 'react';
import { Link, useLocation, Route, Routes } from 'react-router-dom';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';  // Menambahkan pengecekan untuk halaman register
  const isMoreDetailsPage = location.pathname === '/more-details';

  return (
    <>
      {/* Navbar hanya ditampilkan jika tidak di halaman login, register, dan MoreDetailsPage */}
      {!isLoginPage && !isRegisterPage && !isMoreDetailsPage && (
        <nav className="navbar">
          <div className="logo">
            <img src="/logo.png" alt="Sortify Logo" />
          </div>
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                Beranda
              </Link>
            </li>
            <li>
              <Link to="/map" className={location.pathname === '/map' ? 'active' : ''}>
                Deteksi
              </Link>
            </li>
            <li>
              <Link to="/education" className={location.pathname === '/education' ? 'active' : ''}>
                Edukasi
              </Link>
            </li>
            <li><Link to="/login">Login</Link></li>
          </ul>
          <div className="menu-icon" onClick={toggleMenu}>
            <span className="menu-icon-bar"></span>
            <span className="menu-icon-bar"></span>
            <span className="menu-icon-bar"></span>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/map" element={<MapSection />} />
        <Route path="/education" element={<EducationSection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/more-details" element={<MoreDetailsPage />} />
      </Routes>

      {/* Footer hanya ditampilkan jika tidak di halaman login, register, dan MoreDetailsPage */}
      {!isLoginPage && !isRegisterPage && !isMoreDetailsPage && (
        <footer>
          <div className="footer-content">
            <p>&copy; 2025 SORTIFY. Semua hak dilindungi.</p>
            <ul className="footer-links">
              <li><a href="#">Kebijakan Privasi</a></li>
              <li><a href="#">Syarat & Ketentuan</a></li>
              <li><a href="#">Hubungi Kami</a></li>
            </ul>
          </div>
        </footer>
      )}
    </>
  );
}

// Komponen untuk halaman Home (Beranda)
const Home = () => {
  return (
    <>
      <section id="home" className="hero" style={{ backgroundImage: `url(${background})` }}>
        <div className="overlay">
          <div className="edu-title-svg">
            <svg viewBox="0 0 1000 150" xmlns="http://www.w3.org/2000/svg" className="edu-title-svg-text">
              <text x="500" y="110"
                textAnchor="middle"
                fontFamily="Impact"
                fontSize="100"
                stroke="#E1FEA4"       
                strokeWidth="20"
                fill="#102B22"         
                paintOrder="stroke"
              >
                SORTIFY
              </text>
            </svg>
          </div>
          <p>
            Teman cerdas dalam memilah dan mengelola sampah untuk lingkungan yang lebih bersih.
          </p>
          <button>Ayo Mulai</button>
        </div>
      </section>

      <MapSection id="map" />
      <WasteDetectionSection id="detection" />
      <EducationSection id="education" />
    </>
  );
};
