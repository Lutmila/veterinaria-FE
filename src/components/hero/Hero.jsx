import "./Hero.css";
import dog from "../../../public/images/cute-dog-portrait-isolated.png"; 

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <h2>
          Clínica <span>veterinaria</span> de mediana y alta complejidad
        </h2>
        <p>La salud de tu mascota es nuestra prioridad.</p>
        <a href="#turno" className="btn-hero">Solicitar Turno</a>
      </div>
      <div className="hero-img">
        <img src={dog} alt="Perro feliz" />
      </div>
    </section>
  );
};

export default Hero;
