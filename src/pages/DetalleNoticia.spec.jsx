import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import DetalleNoticia from './DetalleNoticia'

function renderDetalle(ruta) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/noticias/:id" element={<DetalleNoticia />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('DetalleNoticia', () => {
  it('muestra la noticia y la información del servicio para un identificador válido', () => {
    renderDetalle('/noticias/1')

    expect(
      screen.getByRole('heading', { name: 'Conoce nuestro servicio de consulta general' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Código: SV001.')).toBeInTheDocument()
  })

  it('informa cuando el identificador no corresponde a una noticia detallada', () => {
    renderDetalle('/noticias/999')

    expect(screen.getByRole('heading', { name: 'Noticia no encontrada' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Volver a noticias' })).toHaveAttribute(
      'href',
      '/noticias',
    )
  })
})
