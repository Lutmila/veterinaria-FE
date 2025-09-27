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
          <li><a href="#servicios">Clientes</a></li>
          <li><a href="#inicio">Mascotas</a></li>
        </ul>
      </nav>

    </header>
  );
};

export default Navbar;
