import Bienvenida from "./components/Bienvenida";
import Cabecera from "./components/Cabecera";
import Navegacion from "./components/Navegacion";
import PiePagina from "./components/PiePagina";
import NoticiasDestacadas from "./components/NoticiasDestacadas";

function App() {
  return (
    <>
      <Cabecera />
      <Navegacion />
      <main className="container py-4">
        <Bienvenida />
        <NoticiasDestacadas />
      </main>
      <PiePagina />
    </>
  );
}

export default App;
