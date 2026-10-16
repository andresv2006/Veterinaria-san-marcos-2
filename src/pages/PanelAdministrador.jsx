import React from "react";
import { Container, Table, Card, Badge } from "react-bootstrap";
import { servicioLogin } from "../services/servicioLogin";

export const PanelAdministrador = () => {
  const usuarios = servicioLogin.obtenerTodosLosUsuarios();

  return (
    <Container className="my-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-dark text-white p-3">
          <h4 className="m-0">Panel de Administración</h4>
        </Card.Header>
        <Card.Body className="p-4">
          <p className="text-muted">
            Lista de usuarios registrados y su ubicación geográfica.
          </p>

          <Table striped bordered hover responsive className="align-middle mt-3">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Correo Electrónico</th>
                <th>Región</th>
                <th>Comuna</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u, index) => (
                <tr key={u.id}>
                  <td>{index + 1}</td>
                  <td>{u.nombre}</td>
                  <td>{u.correo}</td>
                  <td>{u.region || "N/A"}</td>
                  <td>{u.comuna || "N/A"}</td>
                  <td>
                    <Badge bg={u.rol === "ADMIN" ? "warning" : "secondary"}>
                      {u.rol}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};