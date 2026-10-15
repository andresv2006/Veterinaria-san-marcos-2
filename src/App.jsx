import Bienvenida from "./components/Bienvenida";
import Cabecera from "./components/Cabecera";
import Navegacion from "./components/Navegacion";
import PiePagina from "./components/PiePagina";

function App() {
  return (
    <>
      <Cabecera />
      <Navegacion />
      <main className="container py-4">
        <Bienvenida />
      </main>
      <PiePagina />
    </>
  );
}

export default App;
