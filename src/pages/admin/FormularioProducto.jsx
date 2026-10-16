import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const inicial = { codigo: "", nombre: "", categoria: "", precio: "", stock: "" };

function FormularioProducto({ onGuardar }) {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState({});

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = {};

    if (datos.codigo.trim().length < 3) nuevosErrores.codigo = "Mínimo 3 caracteres";
    if (!datos.nombre.trim()) nuevosErrores.nombre = "Nombre obligatorio";
    if (!datos.categoria) nuevosErrores.categoria = "Selecciona categoría";
    if (datos.precio === "" || Number(datos.precio) < 0) nuevosErrores.precio = "Precio no válido";
    if (datos.stock === "" || Number(datos.stock) < 0) nuevosErrores.stock = "Stock no válido";

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    onGuardar({
      ...datos,
      codigo: datos.codigo.toUpperCase(),
      precio: Number(datos.precio),
      stock: Number(datos.stock),
      stockCritico: 5,
      imagen: "/img/mascotas.jpg"
    });
    setDatos(inicial);
  }

  return (
    <Form onSubmit={enviar} noValidate>
      <Form.Group className="mb-3" controlId="codigo">
        <Form.Label>Código</Form.Label>
        <Form.Control name="codigo" value={datos.codigo}
          onChange={cambiar} isInvalid={Boolean(errores.codigo)} />
        <Form.Control.Feedback type="invalid">
          {errores.codigo}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="nombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control name="nombre" value={datos.nombre}
          onChange={cambiar} isInvalid={Boolean(errores.nombre)} />
        <Form.Control.Feedback type="invalid">
          {errores.nombre}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="categoria">
        <Form.Label>Categoría</Form.Label>
        <Form.Select name="categoria" value={datos.categoria}
          onChange={cambiar} isInvalid={Boolean(errores.categoria)}>
          <option value="">Selecciona</option>
          <option>Antibióticos</option>
          <option>Antiparasitarios</option>
          <option>Vacunas</option>
          <option>Suplementos</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errores.categoria}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="precio">
        <Form.Label>Precio</Form.Label>
        <Form.Control name="precio" type="number" value={datos.precio}
          onChange={cambiar} isInvalid={Boolean(errores.precio)} />
        <Form.Control.Feedback type="invalid">
          {errores.precio}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="stock">
        <Form.Label>Stock</Form.Label>
        <Form.Control name="stock" type="number" value={datos.stock}
          onChange={cambiar} isInvalid={Boolean(errores.stock)} />
        <Form.Control.Feedback type="invalid">
          {errores.stock}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="success">Guardar</Button>
    </Form>
  );
}

export default FormularioProducto;
