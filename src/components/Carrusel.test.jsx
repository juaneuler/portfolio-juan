import { screen, fireEvent } from '@testing-library/react'
import Carrusel from './Carrusel'
import { describe, it, expect } from 'vitest'

const imagenes = [
  '/img1.png',
  '/img2.png',
  '/img3.png'
]

describe('Carrusel', () => {
  it('muestra la primera imagen al renderizar', () => {
    customRender(<Carrusel imagenes={imagenes} />)
    const img = screen.getByAltText('screenshot-0')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/img1.png')
  })

  it('avanza a la siguiente imagen al hacer click en la flecha derecha', () => {
    customRender(<Carrusel imagenes={imagenes} />)
    const btnDer = screen.getByRole('button', { name: /imagen siguiente/i })
    fireEvent.click(btnDer)
    expect(screen.getByAltText('screenshot-1')).toBeInTheDocument()
  })

  it('vuelve a la imagen anterior al hacer click en la flecha izquierda', () => {
    customRender(<Carrusel imagenes={imagenes} />)
    const btnIzq = screen.getByRole('button', { name: /imagen anterior/i })
    fireEvent.click(btnIzq)
    expect(screen.getByAltText('screenshot-2')).toBeInTheDocument()
  })

  it('puede seleccionar una imagen haciendo click en un dot', () => {
    customRender(<Carrusel imagenes={imagenes} />)
    const dot = screen.getByLabelText('Seleccionar imagen 3')
    fireEvent.click(dot)
    expect(screen.getByAltText('screenshot-2')).toBeInTheDocument()
  })
})