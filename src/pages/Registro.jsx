import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert, Container, Row, Col } from "react-bootstrap";
import { useSesion } from "../context/ContextoSesion";
import { 
  validarCamposVacios, 
  validarFormatoCorreo, 
  REGIONES_Y_COMUNAS, 
  obtenerComunasPorRegion 
} from "../services/servicioLogin";

export const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [error, setError] = useState("");

  const { registrar } = useSesion();
  const navigate = useNavigate();

  // Obtener comunas según la región seleccionada mediante función pura
  const comunasDisponibles = obtenerComunasPorRegion(region);

  const handleRegionChange = (e) => {
    const regionSeleccionada = e.target.value;
    setRegion(regionSeleccionada);
    setComuna(""); // Reiniciar comuna al cambiar de región
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validarCamposVacios(nombre, correo, clave, region, comuna)) {
      setError("Todos los campos (incluyendo región y comuna) son obligatorios");
      return;
    }

    if (!validarFormatoCorreo(correo)) {
      setError("El formato del correo electrónico no es válido");
      return;
    }

    try {
      await registrar(nombre, correo, clave, region, comuna);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={7} lg={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h3 className="text-center mb-4">Registro de Usuario</h3>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="nombre">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Juan Pérez"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="correo">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="clave">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Crea una contraseña"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                  />
                </Form.Group>

                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group controlId="region">
                      <Form.Label>Región</Form.Label>
                      <Form.Select value={region} onChange={handleRegionChange}>
                        <option value="">Selecciona Región</option>
                        {REGIONES_Y_COMUNAS.map((r) => (
                          <option key={r.region} value={r.region}>
                            {r.region}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="comuna">
                      <Form.Label>Comuna</Form.Label>
                      <Form.Select
                        value={comuna}
                        onChange={(e) => setComuna(e.target.value)}
                        disabled={!region}
                      >
                        <option value="">Selecciona Comuna</option>
                        {comunasDisponibles.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="success" type="submit" className="w-100 py-2">
                  Registrarse
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};