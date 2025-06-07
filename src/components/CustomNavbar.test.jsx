import { screen, fireEvent, act } from '@testing-library/react'
import CustomNavbar from './CustomNavbar'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock NavLink
vi.mock('react-router-dom', () => ({
    NavLink: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>
}))

// Mocks de contextos
const setLanguageMock = vi.fn()
const showLoaderMock = vi.fn()

let mockLanguage = 'es'

vi.mock('../context/LanguageContext', () => ({
    useLanguage: () => ({
        language: mockLanguage,
        setLanguage: setLanguageMock
    })
}))
vi.mock('../context/LoaderContext', () => ({
    useLoader: () => ({
        showLoader: showLoaderMock
    })
}))

beforeEach(() => {
    setLanguageMock.mockClear()
    showLoaderMock.mockClear()
    mockLanguage = 'es' // Valor por defecto para cada test
})

describe('CustomNavbar', () => {
    it('renderiza los textos de navegación', () => {
        customRender(<CustomNavbar />)
        expect(screen.getAllByText(/inicio/i).length).toBeGreaterThan(0)
        expect(screen.getAllByText(/proyectos/i).length).toBeGreaterThan(0)
        expect(screen.getAllByText(/contacto/i).length).toBeGreaterThan(0)
    })

    it('abre y cierra el menú móvil', () => {
        customRender(<CustomNavbar />)
        const menuBtn = screen.getByLabelText(/menu/i)
        fireEvent.click(menuBtn)
        expect(screen.getByRole('menu')).toBeInTheDocument()
        // Cierra el menú usando el texto dentro del menú
        const menuItems = screen.getAllByText(/inicio/i)
        fireEvent.click(menuItems[1])
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })

    it('cambia de idioma efectivamente al hacer click en el botón', async () => {
        vi.useFakeTimers()
        customRender(<CustomNavbar />)
        const langBtn = screen.getByRole('button', { name: /cambiar a inglés/i })
        fireEvent.click(langBtn)
        expect(showLoaderMock).toHaveBeenCalledWith(1500)
        // Avanza el tiempo simulado
        await act(() => {
            vi.advanceTimersByTime(1500)
        })
        expect(setLanguageMock).toHaveBeenCalledWith('en')
        vi.useRealTimers()
    })

    it('el botón de idioma tiene el label correcto', () => {
        customRender(<CustomNavbar />)
        expect(screen.getByRole('button', { name: /cambiar a inglés/i })).toBeInTheDocument()
    })

    it('el botón de idioma muestra EN cuando el idioma es español', () => {
        customRender(<CustomNavbar />)
        expect(screen.getByRole('button', { name: /cambiar a inglés/i })).toHaveTextContent('EN')
    })

    it('el botón de idioma muestra ES cuando el idioma es inglés', () => {
        mockLanguage = 'en'
        customRender(<CustomNavbar />)
        expect(screen.getByRole('button', { name: /switch to spanish/i })).toHaveTextContent('ES')
    })

    it('el menú móvil contiene los tres enlaces', () => {
        customRender(<CustomNavbar />)
        const menuBtn = screen.getByLabelText(/menu/i)
        fireEvent.click(menuBtn)
        const menu = screen.getByRole('menu')
        expect(menu).toBeInTheDocument()
        expect(screen.getAllByText(/inicio/i).length).toBeGreaterThan(0)
        expect(screen.getAllByText(/proyectos/i).length).toBeGreaterThan(0)
        expect(screen.getAllByText(/contacto/i).length).toBeGreaterThan(0)
    })
})