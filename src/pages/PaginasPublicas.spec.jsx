import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Bienvenida from '../components/Bienvenida'
import NoticiasDestacadas from '../components/NoticiasDestacadas'
import Inicio from './Inicio'
import Multimedia from './Multimedia'
import NoEncontrada from './NoEncontrada'
import Noticias from './Noticias'
import Nosotros from './Nosotros'

function renderConRouter(componente) {
  return render(<MemoryRouter>{componente}</MemoryRouter>)
}

describe('páginas públicas', () => {
  it('presenta el mensaje principal y la imagen accesible de bienvenida', () => {
    renderConRouter(<Bienvenida />)

    expect(
      screen.getByRole('heading', {
        name: 'Cuidamos la salud y el bienestar de tus mascotas',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', {
        name: 'Un perro y un gato atendidos en Veterinaria San Marcos',
      }),
    ).toBeInTheDocument()
  })

  it('muestra las noticias destacadas disponibles', () => {
    renderConRouter(<NoticiasDestacadas />)

    expect(
      screen.getByRole('heading', { name: 'Noticias de la veterinaria' }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('integra bienvenida y noticias en la página de inicio', () => {
    renderConRouter(<Inicio />)

    expect(
      screen.getByRole('heading', {
        name: 'Cuidamos la salud y el bienestar de tus mascotas',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Noticias de la veterinaria' }),
    ).toBeInTheDocument()
  })

  it('presenta la historia, el equipo y el propósito de la clínica', () => {
    renderConRouter(<Nosotros />)

    expect(
      screen.getByRole('heading', { name: 'Conoce Veterinaria San Marcos' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/fundada en 2009 en Rancagua/)).toBeInTheDocument()
    expect(screen.getByText('Tres médicos veterinarios.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Nuestro propósito' })).toBeInTheDocument()
  })

  it('presenta las noticias y sus tarjetas en la página de noticias', () => {
    renderConRouter(<Noticias />)

    expect(screen.getByRole('heading', { name: 'Noticias', level: 1 })).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('incluye el video con título accesible en la página multimedia', () => {
    renderConRouter(<Multimedia />)

    expect(screen.getByRole('heading', { name: 'Música para perros' })).toBeInTheDocument()
    expect(screen.getByTitle('Música para perros con ansiedad')).toHaveAttribute(
      'src',
      'https://www.youtube-nocookie.com/embed/DIt8a1Sb68U',
    )
  })

  it('explica cuando una dirección pública no existe', () => {
    renderConRouter(<NoEncontrada />)

    const main = screen.getByRole('main')
    expect(within(main).getByRole('heading', { name: 'Página no encontrada' })).toBeInTheDocument()
    expect(
      within(main).getByText('La dirección solicitada no corresponde a una vista disponible.'),
    ).toBeInTheDocument()
  })
})
