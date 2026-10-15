import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

vi.mock('./pages/Contacto', () => ({
  default: () => <h1>Vista de contacto simulada</h1>,
}))

describe('rutas de App', () => {
  it('muestra la página correspondiente a la ruta de contacto', () => {
    render(
      <MemoryRouter initialEntries={['/contacto']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Vista de contacto simulada' })).toBeInTheDocument()
  })
})
