import { render, screen, act } from '@testing-library/react'
import Contacto from './Contacto'
import { describe, it, expect, vi } from 'vitest'
import { LanguageProvider } from '../context/LanguageContext'
import { LoaderProvider } from '../context/LoaderContext'

const customRender = (ui) => {
  return render(
    <LanguageProvider>
      <LoaderProvider>
        {ui}
      </LoaderProvider>
    </LanguageProvider>
  )
}

vi.mock('../context/LanguageContext', () => ({
  useLanguage: () => ({ language: 'es' }),
  LanguageProvider: ({ children }) => <div>{children}</div>
}))

vi.mock('../context/LoaderContext', () => ({
  useLoader: () => ({
    hideLoader: vi.fn()
  }),
  LoaderProvider: ({ children }) => <div>{children}</div>
}))

vi.mock('../assets/linkedinLogo2.svg', () => ({ default: 'linkedin.svg' }))
vi.mock('../assets/githubLogo2.svg', () => ({ default: 'github.svg' }))
vi.mock('../assets/outlookLogo.svg', () => ({ default: 'outlook.svg' }))

vi.mock('../locales/es.json', () => ({
  default: {
    contacto: {
      titulo: "CONTACTO",
      intro: "Tenés una propuesta interesante o alguna consulta? Hablemos!",
      linkedin: "LinkedIn",
      github: "GitHub",
      mail: "Email"
    }
  }
}))

describe('Contacto', () => {
  it('renderiza el título, la intro nueva y los enlaces sociales después del loader', () => {
    vi.useFakeTimers()
    
    customRender(<Contacto />)

    act(() => {
      vi.advanceTimersByTime(1500)
    })

    expect(screen.getByRole('heading', { name: /contacto/i, level: 2 })).toBeInTheDocument()
    
    expect(screen.getByText(/propuesta interesante/i)).toBeInTheDocument()
    
    expect(screen.queryByText(/presupuesto/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/reuniones días hábiles/i)).not.toBeInTheDocument()

    const linkLinkedin = screen.getByRole('link', { name: /perfil de linkedin/i })
    expect(linkLinkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/juan-euler/')

    const linkGithub = screen.getByRole('link', { name: /perfil de git hub/i })
    expect(linkGithub).toHaveAttribute('href', 'https://github.com/juaneuler')

    const linkMail = screen.getByRole('link', { name: /enviar email/i })
    expect(linkMail).toHaveAttribute('href', 'mailto:juaneuler@hotmail.com')

    vi.useRealTimers()
  })
})