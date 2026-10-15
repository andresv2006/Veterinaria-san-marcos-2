import Bienvenida from "./components/Bienvenida";
import Cabecera from "./components/Cabecera";
import Navegacion from "./components/Navegacion";

function App() {
  return (
    <>
      <Cabecera />
      <Navegacion />
      <main className="container py-4">
        <Bienvenida />
      </main>
    </>
  );
}

export default App;
