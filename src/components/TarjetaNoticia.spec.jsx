import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TarjetaNoticia from './TarjetaNoticia'

const noticia = {
  id: 1,
  titulo: 'Consulta veterinaria',
  descripcion: 'Atención para perros y gatos.',
  imagen: '/consulta.jpg',
  textoAlternativo: 'Veterinaria atendiendo a un perro',
  detalle: ['Información del servicio'],
}

function renderTarjeta(datosNoticia) {
  return render(
    <MemoryRouter>
      <TarjetaNoticia noticia={datosNoticia} />
    </MemoryRouter>,
  )
}

describe('TarjetaNoticia', () => {
  it('muestra el título y la descripción recibidos por props', () => {
    renderTarjeta(noticia)

    expect(screen.getByRole('heading', { name: noticia.titulo })).toBeInTheDocument()
    expect(screen.getByText(noticia.descripcion)).toBeInTheDocument()
  })

  it('presenta la imagen con su texto alternativo', () => {
    renderTarjeta(noticia)

    expect(screen.getByRole('img', { name: noticia.textoAlternativo })).toHaveAttribute(
      'src',
      noticia.imagen,
    )
  })

  it('enlaza al detalle cuando la noticia lo tiene', () => {
    renderTarjeta(noticia)

    expect(screen.getByRole('link', { name: 'Ver noticia' })).toHaveAttribute(
      'href',
      '/noticias/1',
    )
  })

  it('omite el enlace cuando no hay detalle disponible', () => {
    const noticiaSinDetalle = { ...noticia, detalle: undefined }
    renderTarjeta(noticiaSinDetalle)

    expect(screen.queryByRole('link', { name: 'Ver noticia' })).not.toBeInTheDocument()
  })
})
