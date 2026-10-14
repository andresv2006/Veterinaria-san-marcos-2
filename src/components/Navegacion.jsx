import { Container, Nav, Navbar } from "react-bootstrap";

function Navegacion() {
  return (
    <Navbar expand="md" bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="#inicio">Veterinaria San Marcos</Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto">
            <Nav.Link href="#inicio">Inicio</Nav.Link>
            <Nav.Link href="#nosotros">Nosotros</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacion;
