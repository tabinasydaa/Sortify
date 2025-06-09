import './App.css';
import background from './images/background.png';
import EducationSection from './components/EducationSection';
import MapSection from './components/MapSection';
import WasteDetectionSection from './components/WasteDetectionSection';
import { useState, useEffect } from 'react';

export default function App() {
  const [activeLink, setActiveLink] = useState('home');

  // Function to handle scroll and change active link
  const handleScroll = () => {
    const sections = ['home', 'map', 'detection', 'education'];
    let currentSection = 'home';

    sections.forEach((section) => {
      const sectionElement = document.getElementById(section);
      const rect = sectionElement.getBoundingClientRect();

      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        currentSection = section;
      }
    });

    setActiveLink(currentSection);
  };

  // Listen to scroll events
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.png" alt="Sortify Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="#home" className={activeLink === 'home' ? 'active' : ''}>Beranda</a></li>
          <li><a href="#map" className={activeLink === 'map' ? 'active' : ''}>Deteksi</a></li>
          <li><a href="#education" className={activeLink === 'education' ? 'active' : ''}>Edukasi</a></li>
          <li><a href="#">Login</a></li>
        </ul>
      </nav>

    <section
      className="hero"
      id="home"
      style={{ backgroundImage: `url(${background})` }}
    >
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

      {/* Tambahkan Section Peta */}
      <MapSection id="map" />

      {/* Tambahkan Section Deteksi Sampah */}
      <WasteDetectionSection id="detection" />

      {/* Tambahkan Section Edukasi */}
      <EducationSection id="education" />

      {/* Tambahkan Footer */}
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
    </>
  );
}
