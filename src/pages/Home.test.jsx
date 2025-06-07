import { screen, act } from '@testing-library/react'
import Home from './Home'
import { describe, it, expect, vi } from 'vitest'

// Mocks de contextos
vi.mock('../context/LoaderContext', () => ({
  useLoader: () => ({
    hideLoader: vi.fn()
  })
}))
vi.mock('../context/LanguageContext', () => ({
  useLanguage: () => ({ language: 'es' })
}))

// Mocks de componentes hijos
vi.mock('../components/Portada', () => ({
  default: () => <div data-testid="portada" />
}))
vi.mock('../components/SobreMi', () => ({
  default: () => <div data-testid="sobre-mi" />
}))
vi.mock('../components/Tecnologias', () => ({
  default: () => <div data-testid="tecnologias" />
}))
vi.mock('../components/Educacion', () => ({
  default: () => <div data-testid="educacion" />
}))
vi.mock('../components/Servicios', () => ({
  default: () => <div data-testid="servicios" />
}))
vi.mock('../components/FadeInSection', () => ({
  default: ({ children }) => <div data-testid="fade-in">{children}</div>
}))

describe('Home', () => {
  it('renderiza los componentes principales después del loader', () => {
    vi.useFakeTimers()
    customRender(<Home />)

    // Avanza el tiempo para que desaparezca el loader
    act(() => {
      vi.advanceTimersByTime(1500)
    })

    expect(screen.getByTestId('portada')).toBeInTheDocument()
    expect(screen.getByTestId('sobre-mi')).toBeInTheDocument()
    expect(screen.getByTestId('tecnologias')).toBeInTheDocument()
    expect(screen.getByTestId('educacion')).toBeInTheDocument()
    expect(screen.getByTestId('servicios')).toBeInTheDocument()
    // Opcional: verifica que haya 4 FadeInSection (uno por cada sección)
    expect(screen.getAllByTestId('fade-in').length).toBe(4)

    vi.useRealTimers()
  })
})