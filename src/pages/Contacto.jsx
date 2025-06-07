import React, { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useLoader } from '../context/LoaderContext'

import '../styles/contacto.scss'

import es from '../locales/es.json'
import en from '../locales/en.json'

import linkedin from "../assets/linkedinLogo2.svg"
import github from "../assets/githubLogo2.svg"
import outlook from "../assets/outlookLogo.svg"

const texts = { es, en }

const Contacto = () => {
  const { language } = useLanguage()
  const t = texts[language]["contacto"]
  const [cargando, setCargando] = useState(true)
  const { hideLoader } = useLoader()

  useEffect(() => {
    const timeout = setTimeout(() => {
      hideLoader()
      setCargando(false)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [])

  if (cargando) {
    return <div style={{
      width: '100vw',
      height: '100vh',
      background: '#0d0d0d',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999
    }} />
  }

  return (
    <section className="contacto">
      <h2>{t.titulo}</h2>
      <p className="contactoIntro">{t.intro}</p>
      <p className="contactoHorario">{t.horario}</p>

      <div className="contactoTarjetas">
        <div className="contactoTarjeta">
          <img src={linkedin} alt="LinkedIn" />
          <a
            href="https://www.linkedin.com/in/juan-euler/"
            target="_blank"
            rel="noopener noreferrer"
            className="contactoBoton"
            aria-label='Ir al perfil de LinkedIn de Juan Euler'
          >
            {t.linkedin}
          </a>
        </div>

        <div className="contactoTarjeta">
          <img src={github} alt="GitHub" />
          <a
            href="https://github.com/juaneuler"
            target="_blank"
            rel="noopener noreferrer"
            className="contactoBoton"
            aria-label='Ir al perfil de Git Hub de Juan Euler'
          >
            {t.github}
          </a>
        </div>

        <div className="contactoTarjeta">
          <img src={outlook} alt="Email" />
          <a
            href="mailto:juan.euler@hotmail.com"
            className="contactoBoton"
            aria-label='Enviar email a juaneuler@hotmail.com'
          >
            {t.mail}
          </a>
        </div>
      </div>

    </section>
  )
}

export default Contacto