import { Link } from "react-router-dom";

function PiePagina() {
  return (
    <footer className="py-3 bg-dark text-white text-center">
      <div className="container">
        <p className="mb-2">Veterinaria San Marcos</p>
        <address className="mb-0">
          <Link className="text-white" to="/contacto">
            Formulario de contacto
          </Link>
        </address>
      </div>
    </footer>
  );
}

export default PiePagina;
