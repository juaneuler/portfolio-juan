import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import CustomNavbar from './components/CustomNavbar'
import Home from './pages/Home'
import Proyectos from './pages/Proyectos'
import ProyectosDetalle from './pages/ProyectosDetalle'
import Footer from './components/Footer'
import Contacto from './pages/Contacto'

// Contexto
import { LanguageProvider } from './context/LanguageContext'
import { LoaderProvider, useLoader } from './context/LoaderContext'

function AppRoutes() {
  const location = useLocation()
  const { showLoader } = useLoader()

  useEffect(() => {
    showLoader()
  }, [location])

  return (
    <div className="contenidoPrincipal">
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/proyectos/:slug" element={<ProyectosDetalle />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <LoaderProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </LanguageProvider>
    </LoaderProvider>
  )
}

export default App