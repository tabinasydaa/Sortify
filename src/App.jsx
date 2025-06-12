import './App.css';
import background from './images/background.png';
import EducationSection from './components/EducationSection';
import MoreDetailsPage from './components/MoreDetailsPage';
import MapSection from './components/MapSection';
import WasteDetectionSection from './components/WasteDetectionSection';
import WasteProcessingSection from './components/WasteProcessingSection';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import WasteRecyclingDetails from './components/WasteRecyclingDetails';
import DetectionPage from './components/DetectionPage';
import ResultPage from './components/ResultPage';
import { useState, useEffect } from 'react';
import { Link, useLocation, Route, Routes, useNavigate } from 'react-router-dom';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Sembunyikan navbar/footer di halaman tertentu
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isWasteDetailsPage = location.pathname === '/waste-recycling-details';
  const isDetectionPage = location.pathname === '/detection';
  const isResultPage = location.pathname === '/result';
  const isMoreDetailsPage = location.pathname === '/more-details';

  // Scroll ke hash jika ada di URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      {/* Navbar */}
      {!isLoginPage && !isRegisterPage && !isWasteDetailsPage && !isDetectionPage && !isResultPage && !isMoreDetailsPage && (
        <nav className="navbar">
          <div className="logo">
            <img src="/logo.png" alt="Sortify Logo" />
          </div>
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li>
              <Link to="/#home">Beranda</Link>
            </li>
            <li>
              <Link to="/#map">Peta</Link>
            </li>
            <li>
              <Link to="/#detection">Deteksi</Link>
            </li>
            <li>
              <Link to="/#education">Edukasi</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
          <div className="menu-icon" onClick={toggleMenu}>
            <span className="menu-icon-bar"></span>
            <span className="menu-icon-bar"></span>
            <span className="menu-icon-bar"></span>
          </div>
        </nav>
      )}

      {/* Routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/map" element={<MapSection />} />
        <Route path="/education" element={<EducationSection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/waste-recycling-details" element={<WasteRecyclingDetails />} />
        <Route path="/detection" element={<DetectionPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/waste-processing" element={<WasteProcessingSection />} />
        <Route path="/more-details" element={<MoreDetailsPage />} />
      </Routes>

      {/* Footer */}
      {!isLoginPage && !isRegisterPage && !isWasteDetailsPage && !isDetectionPage && !isResultPage && !isMoreDetailsPage && (
        <footer>
          <div className="footer-content">
            <p>&copy; 2025 SORTIFY. Semua hak dilindungi.</p>
            <ul className="footer-links">
              <li><a href="/#home">Beranda</a></li>
              <li><a href="/#map">Peta</a></li>
              <li><a href="/#detection">Deteksi</a></li>
            </ul>
          </div>
        </footer>
      )}
    </>
  );
}

// Halaman Home dengan section id agar bisa discroll ke sana
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

      {/* Setiap section diberi id yang sesuai dengan anchor link */}
      <MapSection id="map" />
      <WasteDetectionSection id="detection" />
      <EducationSection id="education" />
      <WasteProcessingSection id="waste-processing" />
    </>
  );
};
