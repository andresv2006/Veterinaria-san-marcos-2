import Bienvenida from "../components/Bienvenida";
import NoticiasDestacadas from "../components/NoticiasDestacadas";

function Inicio() {
  return (
    <main className="container py-4">
      <Bienvenida />
      <NoticiasDestacadas />
    </main>
  );
}

export default Inicio;
