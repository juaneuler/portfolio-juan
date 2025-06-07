// Mock para IntersectionObserver
beforeAll(() => {
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

import { screen } from '@testing-library/react'
import FadeInSection from './FadeInSection'
import { describe, it, expect } from 'vitest'

describe('FadeInSection', () => {
  it('renderiza sus hijos correctamente', () => {
    customRender(
      <FadeInSection>
        <div>Contenido animado</div>
      </FadeInSection>
    )
    expect(screen.getByText('Contenido animado')).toBeInTheDocument()
  })
})