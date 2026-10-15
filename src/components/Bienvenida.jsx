import mascotas from "../assets/mascotas.jpg";

function Bienvenida() {
  return (
    <section className="row align-items-center g-4">
      <div className="col-12 col-md-6">
        <h1>Cuidamos la salud y el bienestar de tus mascotas</h1>
        <p className="lead">
          Acompañamos el cuidado de tu mascota en cada etapa de su vida.
        </p>
        <p>
          Somos una veterinaria de Rancagua dedicada principalmente a la
          atención de perros y gatos.
        </p>
      </div>
      <div className="col-12 col-md-6">
        <img
          className="img-fluid rounded"
          src={mascotas}
          alt="Un perro y un gato atendidos en Veterinaria San Marcos"
        />
      </div>
    </section>
  );
}

export default Bienvenida;
