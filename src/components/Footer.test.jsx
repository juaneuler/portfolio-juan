import { screen } from '@testing-library/react'
import Footer from './Footer'
import { describe, it, expect } from 'vitest'

describe('Footer', () => {

    it('muestra el texto de copyright', () => {
        customRender(<Footer />)
        const footer = screen.getByRole('contentinfo')
        expect(footer).toHaveTextContent('2025')
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