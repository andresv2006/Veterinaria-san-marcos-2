import consulta from "../assets/consulta.jpg";
import mascotas from "../assets/mascotas.jpg";
import vacunacion from "../assets/vacunacion.jpg";

function NoticiasDestacadas() {
  return (
    <section id="noticias" aria-labelledby="titulo-noticias">
      <h2 id="titulo-noticias">Noticias de la veterinaria</h2>
      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-4">
          <article className="card h-100">
            <img
              className="card-img-top"
              src={consulta}
              alt="Personal veterinario atendiendo a un perro"
            />
            <div className="card-body">
              <h3 className="h5 card-title">
                Conoce nuestro servicio de consulta general
              </h3>
              <p className="card-text">
                Veterinaria San Marcos ofrece consultas para perros y gatos.
                Conoce la duración y el valor de este servicio.
              </p>
            </div>
          </article>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <article className="card h-100">
            <img
              className="card-img-top"
              src={vacunacion}
              alt="Un perro recibe una vacuna durante su atención veterinaria"
            />
            <div className="card-body">
              <h3 className="h5 card-title">Vacunación para perros y gatos</h3>
              <p className="card-text">
                Conoce las opciones de vacunación disponibles en la clínica.
              </p>
            </div>
          </article>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <article className="card h-100">
            <img
              className="card-img-top"
              src={mascotas}
              alt="Un perro y un gato durante una atención veterinaria"
            />
            <div className="card-body">
              <h3 className="h5 card-title">
                Servicios de desparasitación
              </h3>
              <p className="card-text">
                La clínica ofrece desparasitación interna para perros y gatos,
                además de aplicación de antiparasitario externo.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default NoticiasDestacadas;
