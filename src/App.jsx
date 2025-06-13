// [Import tetap sama seperti punyamu]
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

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const isLoggedIn = !!localStorage.getItem('user');

  const hiddenPages = [
    '/login', '/register', '/waste-recycling-details',
    '/detection', '/result', '/more-details'
  ];
  const hideNav = hiddenPages.includes(location.pathname);
  const isDashboardPage = location.pathname === '/dashboard';

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

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      {/* NAVBAR */}
      {!hideNav && (
        <nav className={`navbar ${isDashboardPage ? 'dashboard-navbar' : ''}`}>
          <div className="logo">
            <img src="/logo.png" alt="Sortify Logo" />
          </div>
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            {isLoggedIn && isDashboardPage ? (
              <>
                <li><Link to="/dashboard">Beranda</Link></li>
                <li><button onClick={() => scrollToSection('map')}>Peta</button></li>
                <li><button onClick={() => scrollToSection('detection')}>Deteksi</button></li>
                <li><button onClick={() => scrollToSection('education')}>Edukasi</button></li>
                <li><button className="logout-button" onClick={handleLogout}>Keluar</button></li>
              </>
            ) : (
              <>
                <li><button onClick={() => scrollToSection("home")}>Beranda</button></li>
                <li><button onClick={() => scrollToSection("map")}>Peta</button></li>
                <li><button onClick={() => scrollToSection("detection")}>Deteksi</button></li>
                <li><button onClick={() => scrollToSection("education")}>Edukasi</button></li>
                <li><Link to="/login">Login</Link></li>
              </>
            )}
          </ul>
          <div className="menu-icon" onClick={toggleMenu}>
            <span className="menu-icon-bar"></span>
            <span className="menu-icon-bar"></span>
            <span className="menu-icon-bar"></span>
          </div>
        </nav>
      )}

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/map" element={<MapSection />} />
        <Route path="/education" element={<EducationSection />} />
        <Route path="/waste-recycling-details" element={<WasteRecyclingDetails />} />
        <Route path="/detection" element={<DetectionPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/waste-processing" element={<WasteProcessingSection />} />
        <Route path="/more-details" element={<MoreDetailsPage />} />
      </Routes>

      {/* FOOTER */}
      {!hideNav && (
        <footer style={{
          backgroundColor: '#102b22',
          color: 'white',
          padding: '2rem 3rem',
          textAlign: 'center',
          marginTop: '3rem'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ fontSize: '1rem', fontWeight: 400, marginBottom: '1rem' }}>
              © 2025 Sortify. Semua hak dilindungi.
            </p>
            <ul style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li><a href="#map" style={linkStyle}>Peta</a></li>
              <li><a href="#education" style={linkStyle}>Edukasi</a></li>
              <li><a href="#detection" style={linkStyle}>Deteksi</a></li>
            </ul>
          </div>
        </footer>
      )}
    </>
  );
}

// Gaya link di footer
const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  fontWeight: 600,
  fontSize: '1.1rem',
  transition: 'color 0.3s ease',
};

// Halaman Home
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
          <p>Teman cerdas dalam memilah dan mengelola sampah untuk lingkungan yang lebih bersih.</p>
          <button>Ayo Mulai</button>
        </div>
      </section>

      <MapSection id="map" />
      <WasteDetectionSection id="detection" />
      <EducationSection id="education" />
      <WasteProcessingSection id="waste-processing" />
    </>
  );
};

// Layout Dashboard
const DashboardLayout = () => {
  return (
    <>
      <Dashboard />
      <MapSection id="map" />
      <WasteDetectionSection id="detection" />
      <EducationSection id="education" />
      <WasteProcessingSection id="waste-processing" />
    </>
  );
};
