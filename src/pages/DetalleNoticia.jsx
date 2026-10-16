import { Link, useParams } from "react-router-dom";
import { noticias } from "../data/noticias";

function DetalleNoticia() {
  const { id } = useParams();
  const noticia = noticias.find(
    (item) => item.id === Number(id) && item.detalle,
  );

  if (!noticia) {
    return (
      <main className="container py-4">
        <h1>Noticia no encontrada</h1>
        <Link to="/noticias">Volver a noticias</Link>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <article>
        <header>
          <h1>{noticia.titulo}</h1>
          <p>
            Publicado el <time dateTime={noticia.fechaIso}>{noticia.fecha}</time>
          </p>
        </header>
        <figure>
          <img
            className="img-fluid rounded"
            src={noticia.imagen}
            alt={noticia.textoAlternativo}
          />
          <figcaption>{noticia.pieImagen}</figcaption>
        </figure>
        {noticia.detalle.map((parrafo) => (
          <p key={parrafo}>{parrafo}</p>
        ))}
        <h2>Información del servicio</h2>
        <ul>
          {noticia.informacionServicio.map((informacion) => (
            <li key={informacion}>{informacion}</li>
          ))}
        </ul>
        <Link className="btn btn-secondary" to="/noticias">
          Volver a todas las noticias
        </Link>
      </article>
    </main>
  );
}

export default DetalleNoticia;
