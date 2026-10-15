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
    textoAlternativo: "Personal veterinario atendiendo a un perro",
  },
  {
    id: 2,
    titulo: "Vacunación para perros y gatos",
    descripcion: "Conoce las opciones de vacunación disponibles en la clínica.",
    imagen: vacunacion,
    textoAlternativo:
      "Un perro recibe una vacuna durante su atención veterinaria",
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
