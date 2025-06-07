import { screen } from '@testing-library/react'
import Servicios from './Servicios'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

// Mock del contexto de idioma
vi.mock('../context/LanguageContext', () => ({
    useLanguage: () => ({ language: 'es' })
}))

// Mock de imágenes (para evitar errores de importación en tests)
vi.mock('../assets/codeImg.jpg', () => ({ default: 'codeImg.jpg' }))
vi.mock('../assets/wpImg.jpg', () => ({ default: 'wpImg.jpg' }))

// Mock de textos en castellano
vi.mock('../locales/es.json', () => ({
    default: {
        servicios: {
            titulo: 'Servicios',
            tarjetas: [
                {
                    titulo: 'Desarrollo Web',
                    descripcion: 'Sitios web modernos y responsivos.',
                    imgAlt: 'Código'
                },
                {
                    titulo: 'WordPress',
                    descripcion: 'Sitios administrables con WordPress.',
                    imgAlt: 'WordPress'
                }
            ],
            cta: '¿Listo para tu próximo proyecto?',
            boton: 'Contáctame'
        }
    }
}))

describe('Servicios', () => {
    it('renderiza el título, las tarjetas y el CTA', () => {
        customRender(
            <MemoryRouter>
                <Servicios />
            </MemoryRouter>
        )
        expect(screen.getByRole('heading', { name: /servicios/i })).toBeInTheDocument()
        expect(screen.getByText(/desarrollo web/i)).toBeInTheDocument()
        expect(screen.getByText(/sitios web modernos/i)).toBeInTheDocument()
        
        expect(screen.getAllByText(/wordpress/i).length).toBeGreaterThan(0)
        expect(screen.getByText(/sitios administrables/i)).toBeInTheDocument()
        expect(screen.getByText(/¿listo para tu próximo proyecto\?/i)).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /ir a la página de contacto/i })).toBeInTheDocument()
    })
})