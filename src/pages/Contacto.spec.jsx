import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contacto from './Contacto'

describe('Contacto', () => {
  it('identifica los campos obligatorios y el correo opcional', () => {
    render(<Contacto />)

    expect(screen.getByLabelText(/Nombre completo/)).toBeRequired()
    expect(screen.getByLabelText(/Comentario/)).toBeRequired()
    expect(screen.getByLabelText(/Correo electrónico/)).not.toBeRequired()
  })

  it('muestra errores al enviar vacíos los campos obligatorios', async () => {
    const user = userEvent.setup()
    render(<Contacto />)

    await user.click(screen.getByRole('button', { name: 'Enviar consulta de prueba' }))

    expect(screen.getByText('El nombre es obligatorio.')).toBeInTheDocument()
    expect(screen.getByText('El comentario es obligatorio.')).toBeInTheDocument()
  })

  it('rechaza un correo con formato inválido', async () => {
    const user = userEvent.setup()
    render(<Contacto />)

    await user.type(screen.getByLabelText(/Nombre completo/), 'Camila Pérez')
    await user.type(screen.getByLabelText(/Correo electrónico/), 'correo-invalido')
    await user.type(screen.getByLabelText(/Comentario/), 'Consulta por vacunación')
    await user.click(screen.getByRole('button', { name: 'Enviar consulta de prueba' }))

    expect(screen.getByText('Escribe un correo electrónico válido.')).toBeInTheDocument()
  })

  it('acepta el correo opcional y confirma la consulta de prueba', async () => {
    const user = userEvent.setup()
    render(<Contacto />)

    await user.type(screen.getByLabelText(/Nombre completo/), 'Camila Pérez')
    await user.type(screen.getByLabelText(/Comentario/), 'Consulta por vacunación')
    await user.click(screen.getByRole('button', { name: 'Enviar consulta de prueba' }))

    expect(screen.getByRole('status')).toHaveTextContent(
      'Consulta de prueba enviada. No se envió ni almacenó.',
    )
    expect(screen.getByLabelText(/Nombre completo/)).toHaveValue('')
    expect(screen.getByLabelText(/Comentario/)).toHaveValue('')
  })
})
