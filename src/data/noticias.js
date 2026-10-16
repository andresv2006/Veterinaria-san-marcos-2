import consulta from "../assets/consulta.jpg";
import mascotas from "../assets/mascotas.jpg";
import vacunacion from "../assets/vacunacion.jpg";

export const noticias = [
  {
    id: 1,
    titulo: "Conoce nuestro servicio de consulta general",
    descripcion:
      "Veterinaria San Marcos ofrece consultas para perros y gatos. Conoce la duración y el valor de este servicio.",
    imagen: consulta,
    textoAlternativo:
      "Personal veterinario colocando una venda en la pata de un perro",
    fecha: "3 de septiembre de 2026",
    fechaIso: "2026-09-03",
    pieImagen: "Imagen ilustrativa de una atención veterinaria.",
    detalle: [
      "Veterinaria San Marcos cuenta con el servicio de consulta general para perros y gatos. Este servicio forma parte de la categoría Consultas de nuestro catálogo.",
      "La clínica está ubicada en Rancagua y cuenta con un equipo de tres médicos veterinarios, un técnico veterinario y una recepcionista administrativa.",
    ],
    informacionServicio: [
      "Código: SV001.",
      "Especies: perro y gato.",
      "Duración aproximada: 30 minutos.",
      "Precio según catálogo: $15.000 CLP.",
    ],
  },
  {
    id: 2,
    titulo: "Vacunación para perros y gatos",
    descripcion: "Conoce las opciones de vacunación disponibles en la clínica.",
    imagen: vacunacion,
    textoAlternativo:
      "Un perro recibe una vacuna durante su atención veterinaria",
    fecha: "3 de septiembre de 2026",
    fechaIso: "2026-09-03",
    pieImagen: "Imagen ilustrativa de la vacunación de un perro.",
    detalle: [
      "El catálogo de Veterinaria San Marcos incluye una categoría de vacunación con servicios para perros y gatos. Cada servicio tiene un código, una especie y un precio definidos.",
      "Entre las opciones se encuentran la vacuna antirrábica canina, la vacuna antirrábica felina y la vacuna triple felina. Los tres servicios tienen una duración aproximada de 10 minutos según el catálogo.",
    ],
    informacionServicio: [
      "VA001: vacuna antirrábica canina, para perros. Precio: $12.000 CLP.",
      "VA006: vacuna antirrábica felina, para gatos. Precio: $12.000 CLP.",
      "VA004: vacuna triple felina, para gatos. Precio: $17.000 CLP.",
    ],
  },
  {
    id: 3,
    titulo: "Servicios de desparasitación",
    descripcion:
      "La clínica ofrece desparasitación interna para perros y gatos, además de aplicación de antiparasitario externo.",
    imagen: mascotas,
    textoAlternativo: "Un perro y un gato durante una atención veterinaria",
  },
];
