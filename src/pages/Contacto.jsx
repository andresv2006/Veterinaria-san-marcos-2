import { useState } from "react";

const datosIniciales = { nombre: "", correo: "", comentario: "" };

function Contacto() {
  const [datos, setDatos] = useState(datosIniciales);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
    setMensaje("");
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = {};

    if (!datos.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }
    if (datos.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)) {
      nuevosErrores.correo = "Escribe un correo electrónico válido.";
    }
    if (!datos.comentario.trim()) {
      nuevosErrores.comentario = "El comentario es obligatorio.";
    }

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    setMensaje("Consulta de prueba enviada. No se envió ni almacenó.");
    setDatos(datosIniciales);
  }

  return (
    <main className="container py-4">
      <h1>Contacto</h1>
      <p>Completa el formulario para realizar una consulta de prueba.</p>
      <p>Utiliza solo datos ficticios. Esta demostración no envía ni almacena mensajes.</p>

      <form onSubmit={enviar} noValidate>
        <fieldset className="mb-3">
          <legend>Datos de contacto</legend>

          <div className="mb-3">
            <label className="form-label" htmlFor="nombre">Nombre completo (obligatorio)</label>
            <input
              className={`form-control${errores.nombre ? " is-invalid" : ""}`}
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              value={datos.nombre}
              onChange={cambiar}
              aria-describedby="error-nombre"
            />
            <div id="error-nombre" className="invalid-feedback" aria-live="polite">
              {errores.nombre}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="correo">Correo electrónico (opcional)</label>
            <input
              className={`form-control${errores.correo ? " is-invalid" : ""}`}
              id="correo"
              name="correo"
              type="email"
              autoComplete="email"
              maxLength={100}
              value={datos.correo}
              onChange={cambiar}
              aria-describedby="error-correo"
            />
            <div id="error-correo" className="invalid-feedback" aria-live="polite">
              {errores.correo}
            </div>
          </div>
        </fieldset>

        <fieldset className="mb-3">
          <legend>Tu consulta</legend>
          <div className="mb-3">
            <label className="form-label" htmlFor="comentario">
              Comentario (obligatorio, máximo 500 caracteres)
            </label>
            <textarea
              className={`form-control${errores.comentario ? " is-invalid" : ""}`}
              id="comentario"
              name="comentario"
              rows={5}
              required
              maxLength={500}
              value={datos.comentario}
              onChange={cambiar}
              aria-describedby="error-comentario"
            />
            <div id="error-comentario" className="invalid-feedback" aria-live="polite">
              {errores.comentario}
            </div>
          </div>
        </fieldset>

        <button className="btn btn-primary" type="submit">Enviar consulta de prueba</button>
        <p className="mt-3" role="status">{mensaje}</p>
      </form>
    </main>
  );
}

export default Contacto;
