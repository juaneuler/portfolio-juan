import { screen } from '@testing-library/react'
import Educacion from './Educacion'
import { describe, it, expect, vi } from 'vitest'

// Mock del contexto de idioma
vi.mock('../context/LanguageContext', () => ({
  useLanguage: () => ({ language: 'es' })
}))

// Mock del archivo de datos
vi.mock('../data/educacion', () => ({
  educacion: [
    {
      id: 'wordpress',
      nota: 9,
      certificado: '/certificado-wordpress.pdf'
    },
    {
      id: 'react',
      nota: 10,
      certificado: '/certificado-react.pdf'
    },
    {
      id: 'javascript',
      nota: 10,
      certificado: '/certificado-js.pdf'
    },
    {
      id: 'desarrollo-web',
      nota: 9,
      certificado: '/certificado-web.pdf'
    }
  ]
}))

describe('Educacion', () => {
  it('renderiza los títulos y datos de todos los cursos en español', () => {
    customRender(<Educacion />)
    // Título principal
    expect(screen.getByRole('heading', { name: /educación/i })).toBeInTheDocument()
    // Títulos de cursos
    expect(screen.getByRole('heading', { name: /curso de wordpress/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /curso de react\.js/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /curso de javascript/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /curso de desarrollo web/i })).toBeInTheDocument()
    // Notas finales
    expect(screen.getAllByText(/nota final:/i).length).toBe(4)
    // Certificados
    expect(screen.getByRole('link', { name: /ver certificado de curso de wordpress/i })).toHaveAttribute('href', '/certificado-wordpress.pdf')
    expect(screen.getByRole('link', { name: /ver certificado de curso de react\.js/i })).toHaveAttribute('href', '/certificado-react.pdf')
    expect(screen.getByRole('link', { name: /ver certificado de curso de javascript/i })).toHaveAttribute('href', '/certificado-js.pdf')
    expect(screen.getByRole('link', { name: /ver certificado de curso de desarrollo web/i })).toHaveAttribute('href', '/certificado-web.pdf')
  })
})