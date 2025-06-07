import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.scss'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)