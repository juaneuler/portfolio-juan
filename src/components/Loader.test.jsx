import { screen } from '@testing-library/react'
import Loader from './Loader'
import { describe, it, expect } from 'vitest'

describe('Loader', () => {
  it('muestra el loader cuando isVisible es true', () => {
    customRender(<Loader isVisible={true} />)
    expect(screen.getByAltText('loader-icon')).toBeInTheDocument()
    expect(screen.getByAltText('loader-icon')).toHaveAttribute('src', '/android-chrome-512x512.png')
  })

  it('no muestra el loader cuando isVisible es false', () => {
    customRender(<Loader isVisible={false} />)
    expect(screen.queryByAltText('loader-icon')).not.toBeInTheDocument()
  })
})