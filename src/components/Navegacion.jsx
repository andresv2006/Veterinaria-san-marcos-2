import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSesion } from "../context/ContextoSesion";

function Navegacion() {
  const { usuario, salir } = useSesion();
  const navigate = useNavigate();

  const handleSalir = () => {
    salir();
    navigate("/login");
  };

  return (
    <Navbar expand="md" bg="light" data-bs-theme="light" className="mb-3">
      <Container>
        {/* Usamos as={Link} para navegar dinámicamente sin recargar la página */}
        <Navbar.Brand as={Link} to="/">
          Veterinaria San Marcos
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" />

        <Navbar.Collapse id="menu-principal">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            {/* Si tienes ruta de nosotros puedes usar /nosotros, o dejarla al inicio */}
            <Nav.Link as={Link} to="/">
              Nosotros
            </Nav.Link>
          </Nav>

          {/* Opciones de Autenticación y Roles */}
          <Nav className="ms-auto align-items-center gap-2">
            {!usuario ? (
              <>
                <Nav.Link as={Link} to="/login">
                  <Button variant="outline-primary" size="sm">
                    Iniciar Sesión
                  </Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/registro">
                  <Button variant="primary" size="sm">
                    Registrarse
                  </Button>
                </Nav.Link>
              </>
            ) : (
              <>
                {usuario.rol === "ADMIN" && (
                  <Nav.Link as={Link} to="/admin">
                    <Button variant="warning" size="sm" className="fw-bold">
                      Panel Admin
                    </Button>
                  </Nav.Link>
                )}
                <Navbar.Text className="me-2">
                  Hola, <strong>{usuario.nombre}</strong> ({usuario.rol})
                </Navbar.Text>
                <Button variant="outline-danger" size="sm" onClick={handleSalir}>
                  Cerrar Sesión
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacion;