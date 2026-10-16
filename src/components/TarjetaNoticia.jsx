import { Link } from "react-router-dom";

function TarjetaNoticia({ noticia }) {
  return (
    <article className="card h-100">
      <img
        className="card-img-top img-fluid"
        src={noticia.imagen}
        alt={noticia.textoAlternativo}
      />
      <div className="card-body">
        <h3 className="h5 card-title">{noticia.titulo}</h3>
        <p className="card-text">{noticia.descripcion}</p>
        {noticia.detalle && (
          <Link className="btn btn-primary" to={`/noticias/${noticia.id}`}>
            Ver noticia
          </Link>
        )}
      </div>
    </article>
  );
}

export default TarjetaNoticia;
