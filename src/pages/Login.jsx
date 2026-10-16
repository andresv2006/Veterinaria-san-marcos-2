import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert, Container, Row, Col } from "react-bootstrap";
import { useSesion } from "../context/ContextoSesion";
import { validarCamposVacios } from "../services/servicioLogin";

export const Login = () => {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const { ingresar } = useSesion();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validarCamposVacios(correo, clave)) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const usuario = await ingresar(correo, clave);
      if (usuario.rol === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h3 className="text-center mb-4">Iniciar Sesión</h3>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="correo">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="clave">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-2">
                  Entrar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};