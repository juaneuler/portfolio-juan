import React from 'react'
import { render, screen } from '@testing-library/react'
import Proyectos from './Proyectos'
import { MemoryRouter } from 'react-router-dom'

vi.mock('firebase/firestore', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    collection: vi.fn(),
    query: vi.fn(),
    orderBy: vi.fn(),
    getDocs: vi.fn(() =>
      Promise.resolve({
        docs: [
          {
            id: '1',
            data: () => ({
              titulo: 'Proyecto Uno',
              descripcion: { es: 'Descripción uno', en: 'Description one' },
              img: ['img1.jpg'],
              imgMiniatura: 'mini1.jpg',
              tecnologias: [{ nombre: 'React', logo: 'react-logo.png' }],
              slug: 'proyecto-uno',
              orden: 1
            })
          },
          {
            id: '2',
            data: () => ({
              titulo: 'Proyecto Dos',
              descripcion: { es: 'Descripción dos', en: 'Description two' },
              img: ['img2.jpg'],
              imgMiniatura: 'mini2.jpg',
              tecnologias: [{ nombre: 'JavaScript', logo: 'js-logo.png' }],
              slug: 'proyecto-dos',
              orden: 2
            })
          }
        ]
      })
    )
  }
})

vi.mock('../context/LanguageContext', () => ({
  useLanguage: () => ({ language: 'es' })
}))

vi.mock('../context/LoaderContext', () => ({
  useLoader: () => ({
    showLoader: vi.fn(),
    hideLoader: vi.fn()
  })
}))

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    NavLink: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>
  }
})

describe('Proyectos', () => {
  it('renderiza la lista de proyectos obtenidos de Firebase', async () => {
    render(
      <MemoryRouter>
        <Proyectos />
      </MemoryRouter>
    )

    expect(await screen.findByText(/proyecto uno/i)).toBeInTheDocument()
    expect(await screen.findByText(/proyecto dos/i)).toBeInTheDocument()
  })
})
