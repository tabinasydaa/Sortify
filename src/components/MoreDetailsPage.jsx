import React from "react";
import "./MoreDetailsPage.css";

import botol from "../images/botol.png";
import kantong from "../images/kantong.png";
import benar from "../images/benar.png";
import salah from "../images/salah.png";

export default function MoreDetailsPage() {
  return (
    <div className="more-details-container">
      <h1>100 Tips to Get to Zero</h1>
      <p>
        Zero Waste adalah gaya hidup yang bertujuan untuk mengurangi produksi sampah hingga mendekati nol.
      </p>

      <div className="tip-category">
        <div>Rumah</div>
        <div>Kamar Mandi</div>
        <div>Dapur</div>
        <div>Sekolah</div>
        <div>Kebun</div>
      </div>

      {/* Scrollable Section */}
      <div className="scroll-wrapper">
        <div className="tip-section">
          {/* Tip 1 */}
          <div className="tip-card">
            <h3>1. Botol Plastik &gt; Botol Isi Ulang</h3>
            <p>
              Botol sekali pakai menambah sampah plastik. Gunakan botol minum yang bisa diisi ulang agar lebih ramah lingkungan dan hemat.
            </p>
            <div className="visual-comparison">
              <div>
                <img src={botol} alt="Botol Plastik" />
                <img className="icon" src={salah} alt="Salah" />
              </div>
              <div>
                <img src={botol} alt="Botol Isi Ulang" />
                <img className="icon" src={benar} alt="Benar" />
              </div>
            </div>
          </div>

          {/* Tip 2 */}
          <div className="tip-card">
            <h3>2. Gunakan Kantong Belanja Kain</h3>
            <p>
              Saat belanja, bawa tas kain sendiri agar tidak perlu kantong plastik. Tas kain bisa dipakai berkali-kali dan tidak mencemari lingkungan.
            </p>
            <div className="visual-comparison">
              <div>
                <img src={kantong} alt="Kantong Plastik" />
                <img className="icon" src={salah} alt="Salah" />
              </div>
              <div>
                <img src={kantong} alt="Tas Kain" />
                <img className="icon" src={benar} alt="Benar" />
              </div>
            </div>
          </div>

          {/* Tambahkan lebih banyak tip-card di sini jika perlu */}
        </div>
      </div>
    </div>
  );
}
