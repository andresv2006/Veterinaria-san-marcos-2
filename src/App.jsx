import Bienvenida from "./components/Bienvenida";
import Cabecera from "./components/Cabecera";

function App() {
  return (
    <>
      <Cabecera />
      <main className="container py-4">
        <Bienvenida />
      </main>
    </>
  );
}

export default App;
