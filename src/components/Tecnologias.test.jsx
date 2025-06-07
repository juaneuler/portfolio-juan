import { screen } from '@testing-library/react'
import Tecnologias from './Tecnologias'
import { describe, it, expect, vi } from 'vitest'

// Mock del contexto de idioma
vi.mock('../context/LanguageContext', () => ({
  useLanguage: () => ({ language: 'es' })
}))

// Mock de datos de tecnologías
vi.mock('../data/tecnologias', () => ({
  tecnologias: [
    { nombre: 'React', logo: 'react-logo.png' },
    { nombre: 'JavaScript', logo: 'js-logo.png' }
  ]
}))

// Mock de textos en español
vi.mock('../locales/es.json', () => ({
  default: {
    tecnologias: {
      titulo: 'TECNOLOGÍAS'
    }
  }
}))

describe('Tecnologias', () => {
  it('renderiza el título y las cartas de tecnologías', () => {
    customRender(<Tecnologias />)
    expect(screen.getByRole('heading', { name: /tecnologías/i })).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByAltText('React')).toHaveAttribute('src', 'react-logo.png')
    expect(screen.getByAltText('JavaScript')).toHaveAttribute('src', 'js-logo.png')
  })
})