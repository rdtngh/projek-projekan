import "./Navbar.css";
import { Link } from "react-router-dom";

import logo from "../../assets/logo/logo-rsabl.png";

function Navbar({
  buttonText = "LOG IN",
  buttonLink = "/login",
  showButton = true,
  showMenuButton = false,
  isMenuOpen = false,
  onMenuToggle,
}) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        {showMenuButton ? (
          <button
            type="button"
            className={`navbar-menu-toggle${isMenuOpen ? " is-open" : ""}`}
            aria-label={`${isMenuOpen ? "Tutup" : "Buka"} menu navigasi`}
            aria-expanded={isMenuOpen}
            onClick={onMenuToggle}
          >
            <span />
            <span />
            <span />
          </button>
        ) : null}
        <img
          src={logo}
          alt="Logo RS Advent"
          className="navbar-logo"
        />

        <div className="navbar-title">
          <h1>RUMAH SAKIT ADVENT</h1>
          <h2>BANDAR LAMPUNG</h2>
        </div>
      </div>

      {showButton ? (
        <Link to={buttonLink} className="login-btn">
          {buttonText}
        </Link>
      ) : null}
    </header>
  );
}

export default Navbar;
