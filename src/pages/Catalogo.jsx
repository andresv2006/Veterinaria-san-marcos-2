import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TarjetaProducto from "../components/TarjetaProducto";
import { servicios } from "../data/catalogo";
import { formatearPrecio } from "../utils/precio";

function Catalogo({ productos, onAgregar }) {
  const [categoria, setCategoria] = useState("Todas");
  const [texto, setTexto] = useState("");
  const [categoriaServicio, setCategoriaServicio] = useState("Todas");

  const porCategoria = categoria === "Todas"
    ? productos
    : productos.filter((producto) => producto.categoria === categoria);

  const visibles = porCategoria.filter((producto) =>
    producto.nombre.toLowerCase().includes(texto.toLowerCase())
  );

  const serviciosVisibles = categoriaServicio === "Todas"
    ? servicios
    : servicios.filter((servicio) => servicio.categoria === categoriaServicio);

  return (
    <Container className="py-4">
      <h1>Catálogo</h1>

      <h2 className="h4 mt-4">Productos</h2>
      <Row className="g-3 mb-3">
        <Col xs={12} md={6}>
          <label htmlFor="buscar" className="form-label">Buscar por nombre</label>
          <input
            id="buscar"
            className="form-control"
            value={texto}
            onChange={(evento) => setTexto(evento.target.value)}
          />
        </Col>
        <Col xs={12} md={6}>
          <label htmlFor="categoria" className="form-label">Categoría</label>
          <select
            id="categoria"
            className="form-select"
            value={categoria}
            onChange={(evento) => setCategoria(evento.target.value)}
          >
            <option>Todas</option>
            <option>Antibióticos</option>
            <option>Antiparasitarios</option>
            <option>Antiinflamatorios</option>
            <option>Dermatología</option>
            <option>Digestivo</option>
            <option>Cardíaco</option>
            <option>Analgésicos</option>
            <option>Vacunas</option>
            <option>Suplementos</option>
          </select>
        </Col>
      </Row>

      <p>{visibles.length} producto(s) encontrado(s)</p>

      <Row className="g-4">
        {visibles.map((producto) => (
          <Col xs={12} md={6} lg={4} key={producto.codigo}>
            <TarjetaProducto producto={producto} onAgregar={onAgregar} />
          </Col>
        ))}
      </Row>

      <h2 className="h4 mt-5">Servicios</h2>
      <label htmlFor="categoria-servicio" className="form-label">Categoría de servicio</label>
      <select
        id="categoria-servicio"
        className="form-select mb-3"
        value={categoriaServicio}
        onChange={(evento) => setCategoriaServicio(evento.target.value)}
      >
        <option>Todas</option>
        <option>Consultas</option>
        <option>Vacunación</option>
        <option>Cirugía</option>
        <option>Desparasitación</option>
        <option>Exámenes</option>
        <option>Otros</option>
      </select>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Código</th>
              <th>Servicio</th>
              <th>Especie</th>
              <th>Duración</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {serviciosVisibles.map((servicio) => (
              <tr key={servicio.codigo}>
                <td>{servicio.codigo}</td>
                <td>{servicio.nombre}</td>
                <td>{servicio.especie}</td>
                <td>{servicio.duracion}</td>
                <td>{formatearPrecio(servicio.precio)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default Catalogo;
