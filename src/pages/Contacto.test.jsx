import { screen, act } from '@testing-library/react'
import Contacto from './Contacto'
import { describe, it, expect, vi } from 'vitest'

// Mock del contexto de idioma
vi.mock('../context/LanguageContext', () => ({
  useLanguage: () => ({ language: 'es' })
}))

// Mock del contexto de loader (que no muestre nada)
vi.mock('../context/LoaderContext', () => ({
  useLoader: () => ({
    hideLoader: vi.fn()
  })
}))

// Mock de imágenes
vi.mock('../assets/linkedinLogo2.svg', () => ({ default: 'linkedin.svg' }))
vi.mock('../assets/githubLogo2.svg', () => ({ default: 'github.svg' }))
vi.mock('../assets/outlookLogo.svg', () => ({ default: 'outlook.svg' }))

// Mock de textos en español
vi.mock('../locales/es.json', () => ({
  default: {
    contacto: {
      titulo: "CONTACTO",
      intro: "Si querés pedir un presupuesto, o contactarme para hacerme una oferta laboral, conectá conmigo en LinkedIn o enviame un mail!",
      horario: "Estoy disponible para reuniones días hábiles de 10:00 a 18:00 hs.",
      linkedin: "Conectá conmigo en LinkedIn",
      github: "Mirá mis repositorios en GitHub",
      mail: "Contactame vía mail"
    }
  }
}))

describe('Contacto', () => {
  it('renderiza el título, los textos y los enlaces de contacto', () => {
    vi.useFakeTimers()
    customRender(<Contacto />)

    // Avanza el tiempo para que desaparezca el loader
    act(() => {
      vi.advanceTimersByTime(1500)
    })

    expect(screen.getByRole('heading', { name: /contacto/i, level: 2 })).toBeInTheDocument()
    expect(screen.getByText(/presupuesto/i)).toBeInTheDocument()
    expect(screen.getByText(/reuniones días hábiles/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', expect.stringContaining('linkedin.com'))
    expect(screen.getByRole('link', { name: /git hub/i })).toHaveAttribute('href', expect.stringContaining('github.com'))
    expect(screen.getByRole('link', { name: /mail/i })).toHaveAttribute('href', expect.stringContaining('mailto:'))

    vi.useRealTimers()
  })
})