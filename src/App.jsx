import './App.css';
import background from './images/background.png';
import EducationSection from './components/EducationSection';

export default function App() {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.png" alt="Sortify Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="#" className="active">Beranda</a></li>
          <li><a href="#">Deteksi</a></li>
          <li><a href="#">Edukasi</a></li>
          <li><a href="#">Login</a></li>
        </ul>
      </nav>

      <section
        className="hero"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="overlay">
          <h1 className="sortify-logo">SORTIFY</h1>
          <p>
            Teman cerdas dalam memilah dan mengelola sampah untuk lingkungan yang lebih bersih.
          </p>
          <button>AYO MULAI</button>
        </div>
      </section>

      {/* Tambahkan Section Edukasi */}
      <EducationSection />
    </>
  );
}
