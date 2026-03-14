import { render, screen } from '@testing-library/react'
import Footer from './Footer'
import { describe, it, expect } from 'vitest'
import { LanguageProvider } from '../context/LanguageContext'

const customRender = (ui) => {
  return render(
    <LanguageProvider>
      {ui}
    </LanguageProvider>
  )
}

describe('Footer', () => {

    it('muestra el texto de copyright con el año actual', () => {
        customRender(<Footer />)
        
        const currentYear = new Date().getFullYear().toString()
        
        const footer = screen.getByRole('contentinfo')
        
        expect(footer).toHaveTextContent(currentYear)
        expect(footer).toHaveTextContent('JUAN EULER')
    })

    it('tiene un enlace a LinkedIn', () => {
        customRender(<Footer />)
        const link = screen.getByRole('link', { name: /linkedin/i })
        expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/juan-euler/')
    })

    it('tiene un enlace a GitHub', () => {
        customRender(<Footer />)
        const link = screen.getByRole('link', { name: /github/i })
        expect(link).toHaveAttribute('href', 'https://github.com/juaneuler')
    })
})