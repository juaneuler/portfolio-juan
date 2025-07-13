import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import ProyectosDetalle from './ProyectosDetalle'
import { MemoryRouter } from 'react-router-dom'

// Mock useParams para controlar el slug que busca
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useParams: () => ({ slug: 'proyecto-uno' }),
    NavLink: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>
  }
})

// Mock firestore getDocs
vi.mock('firebase/firestore', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    collection: vi.fn(),
    getDocs: vi.fn(() =>
      Promise.resolve({
        docs: [
          {
            id: '1',
            data: () => ({
              titulo: 'Proyecto Uno',
              descripcionDetalle: { es: 'Descripción detallada uno', en: 'Detailed description one' },
              img: ['img1.jpg', 'img2.jpg'],
              imgCarruselMovil: ['imgMovil1.jpg'],
              tecnologias: [
                { nombre: 'React', logo: 'react-logo.png' }
              ],
              slug: 'proyecto-uno',
              demo: 'https://demo1.com',
              github: 'https://github.com/proyecto-uno'
            })
          }
        ]
      })
    )
  }
})

// Mock useLanguage
vi.mock('../context/LanguageContext', () => ({
  useLanguage: () => ({ language: 'es' })
}))

// Mock useLoader
vi.mock('../context/LoaderContext', () => ({
  useLoader: () => ({
    showLoader: vi.fn(),
    hideLoader: vi.fn()
  })
}))

// Mock useEsMovil
vi.mock('../hooks/useEsMovil', () => ({
  __esModule: true,
  default: () => false // Asumimos escritorio para el test
}))

// Mock de los carruseles
vi.mock('../components/Carrusel', () => ({
  default: () => <div>Mock Carrusel</div>,
}))

vi.mock('../components/CarruselMovil', () => ({
  default: () => <div>Mock Carrusel Movil</div>,
}))

describe('ProyectosDetalle', () => {
  it('muestra el proyecto encontrado con datos cargados', async () => {
    render(
      <MemoryRouter>
        <ProyectosDetalle />
      </MemoryRouter>
    )

    // Esperamos que aparezca el título del proyecto
    expect(await screen.findByText(/Proyecto Uno/i)).toBeInTheDocument()

    // También verificamos que se muestre la descripción en español
    expect(screen.getByText(/Descripción detallada uno/i)).toBeInTheDocument()

    // Verificamos que se muestre el mock del Carrusel
    expect(screen.getByText(/Mock Carrusel/i)).toBeInTheDocument()

    // Verificamos que los botones "Demo" y "GitHub" existan y tengan el href correcto
    expect(screen.getByRole('link', { name: /ver demo de proyecto uno/i })).toHaveAttribute('href', 'https://demo1.com')
    expect(screen.getByRole('link', { name: /ver repositorio de github de proyecto uno/i })).toHaveAttribute('href', 'https://github.com/proyecto-uno')

    // Verificamos que el link de volver a proyectos esté presente
    expect(screen.getByText(/volver/i).closest('a')).toHaveAttribute('href', '/proyectos')
  })
})