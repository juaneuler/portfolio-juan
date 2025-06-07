import { render, screen, act } from '@testing-library/react'
import Portada from './Portada'
import '@testing-library/jest-dom'
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'

describe('Portada', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('muestra el cursor al inicio y luego el nombre y subtítulo', async () => {
    render(<Portada delay={1700} />)

    // Avanzamos delay inicial
    act(() => {
      vi.advanceTimersByTime(1700)
    })

    // Avanzamos letra por letra (por si tiene setTimeouts encadenados)
    const letras = 'JUAN EULER'.length
    for (let i = 0; i < letras; i++) {
      act(() => {
        vi.advanceTimersByTime(80)
      })
    }

    // Últimos timers por si hay uno para el subtítulo
    act(() => {
      vi.advanceTimersByTime(500)
    })

    const titulo = screen.getByRole('heading', { name: /JUAN EULER/i })
    expect(titulo).toBeInTheDocument()

    const subtitulo = screen.getByText(/FrontEnd Developer/i)
    expect(subtitulo).toBeInTheDocument()
  })
})