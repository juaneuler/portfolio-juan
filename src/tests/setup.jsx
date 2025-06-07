import '@testing-library/jest-dom'
import { LanguageProvider } from '../context/LanguageContext'
import { render } from '@testing-library/react'

// Hacemos que todos los tests usen el contexto
global.customRender = (ui, options) =>
  render(<LanguageProvider>{ui}</LanguageProvider>, options)