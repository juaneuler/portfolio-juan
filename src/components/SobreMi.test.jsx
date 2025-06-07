import { screen } from '@testing-library/react'
import SobreMi from './SobreMi'
import { describe, it, expect, vi } from 'vitest'

// Mock del contexto de idioma
vi.mock('../context/LanguageContext', () => ({
  useLanguage: () => ({ language: 'es' })
}))

// Mock del componente BotonCV
vi.mock('./botonCV', () => ({
  default: ({ texto, url }) => (
    <a href={url} data-testid="boton-cv">{texto}</a>
  )
}))

// Mock de textos en español
vi.mock('../locales/es.json', () => ({
  default: {
    "sobre-mi": {
      "titulo": "SOBRE MI",
      "descripcion": "Soy Desarrollador FrontEnd con experiencia en React.js y WordPress.",
      "cvBoton": "Mirá mi CV",
      "cvUrl": "/pdfs/cvEulerJuanES.pdf"
    }
  }
}))

describe('SobreMi', () => {
  it('renderiza el título, la descripción y el botón de CV', () => {
    customRender(<SobreMi />)
    expect(screen.getByRole('heading', { name: /sobre mi/i })).toBeInTheDocument()
    expect(screen.getByText(/soy desarrollador frontend/i)).toBeInTheDocument()
    expect(screen.getByTestId('boton-cv')).toHaveAttribute('href', '/pdfs/cvEulerJuanES.pdf')
    expect(screen.getByTestId('boton-cv')).toHaveTextContent('Mirá mi CV')
  })
})