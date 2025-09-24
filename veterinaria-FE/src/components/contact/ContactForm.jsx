import "./ContactForm.css";

const ContactForm = () => {
  return (
    <section className="contact">
      <h2>Contáctanos</h2>
      <form>
        <input type="text" placeholder="Tu nombre" required />
        <input type="email" placeholder="Tu correo" required />
        <textarea placeholder="Tu mensaje" required></textarea>
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
};

export default ContactForm;
