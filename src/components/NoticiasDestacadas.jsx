import { noticias } from "../data/noticias";
import TarjetaNoticia from "./TarjetaNoticia";

function NoticiasDestacadas() {
  return (
    <section id="noticias" aria-labelledby="titulo-noticias">
      <h2 id="titulo-noticias">Noticias de la veterinaria</h2>
      <div className="row g-4">
        {noticias.map((noticia) => (
          <div className="col-12 col-md-6 col-lg-4" key={noticia.id}>
            <TarjetaNoticia noticia={noticia} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default NoticiasDestacadas;
