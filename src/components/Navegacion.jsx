import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSesion } from "../context/ContextoSesion";

function Navegacion({ cantidadCarrito }) {
  const { usuario, salir } = useSesion();
  const navigate = useNavigate();

  const handleSalir = () => {
    salir();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" bg="light" data-bs-theme="light" className="mb-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Veterinaria San Marcos
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" />

        <Navbar.Collapse id="menu-principal">
          {/* Navegación Principal del Sitio */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">
              Nosotros
            </Nav.Link>
            <Nav.Link as={NavLink} to="/noticias">
              Noticias
            </Nav.Link>
            <Nav.Link as={NavLink} to="/multimedia">
              Multimedia
            </Nav.Link>
            <Nav.Link as={NavLink} to="/catalogo">
              Catálogo
            </Nav.Link>
            <Nav.Link as={NavLink} to="/carrito">
              Carrito <span className="badge bg-success">{cantidadCarrito || 0}</span>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">
              Contacto
            </Nav.Link>
          </Nav>

          {/* Opciones de Autenticación y Roles */}
          <Nav className="ms-auto align-items-center gap-2">
            {!usuario ? (
              <>
                <Nav.Link as={NavLink} to="/login">
                  <Button variant="outline-primary" size="sm">
                    Iniciar Sesión
                  </Button>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/registro">
                  <Button variant="primary" size="sm">
                    Registrarse
                  </Button>
                </Nav.Link>
              </>
            ) : (
              <>
                {usuario.rol === "ADMIN" && (
                  <>
                    <Nav.Link as={NavLink} to="/admin">
                      <Button variant="warning" size="sm" className="fw-bold">
                        Panel Admin
                      </Button>
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/admin/productos">
                      Administración Productos
                    </Nav.Link>
                  </>
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