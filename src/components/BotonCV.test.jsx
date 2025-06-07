import { screen } from '@testing-library/react'
import BotonCV from './botonCV'
import { describe, it, expect } from 'vitest'

describe('BotonCV', () => {
  it('muestra el texto recibido por props', () => {
    customRender(<BotonCV texto="Descargar CV" url="/cv.pdf" />)
    expect(screen.getByRole('link', { name: /descargar cv/i })).toBeInTheDocument()
  })

  it('tiene el href correcto', () => {
    customRender(<BotonCV texto="Descargar CV" url="/cv.pdf" />)
    const link = screen.getByRole('link', { name: /descargar cv/i })
    expect(link).toHaveAttribute('href', '/cv.pdf')
  })

  it('abre en una nueva pestaña', () => {
    customRender(<BotonCV texto="Descargar CV" url="/cv.pdf" />)
    const link = screen.getByRole('link', { name: /descargar cv/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})