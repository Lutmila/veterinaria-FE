import "./Navbar.css";
import logo from "../../../public/images/silueta.png";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">
        <img src={logo} alt="Veterinaria Aquio" />
        <h1>Veterinaria Aquio</h1>
      </div>

      <nav>
        <ul className="nav-links">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#agenda">Agenda</a></li>
          <li><a href="#equipo">Equipo</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>

      <div className="social-links">
        <a href="https://facebook.com" target="_blank">f</a>
        <a href="https://instagram.com" target="_blank">📷</a>
        <a href="https://wa.me/5491112345678" target="_blank">💬</a>
      </div>

      <a href="#turno" className="btn-turno">Solicitar Turno</a>
    </header>
  );
};

export default Navbar;
