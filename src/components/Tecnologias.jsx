import React from 'react'

// Hoja de estilos
import '../styles/tecnologias.scss'

// Contexto
import { useLanguage } from '../context/LanguageContext'

// Archivo .js que tiene el contenido a renderizar
import { tecnologias } from '../data/tecnologias'

// Textos a renderizar
import es from '../locales/es.json'
import en from '../locales/en.json'

const texts = { es, en }

const Tecnologias = () => {

  const { language } = useLanguage()
  const t = texts[language]["tecnologias"]

  return (
    <section className="tecnologias">
      <h2>{t.titulo}</h2>
      <div className="tecnologiasContenedor">
        {tecnologias.map((tec, index) => (
          <div key={index} className="tecnologiasCarta">
            <img src={tec.logo} alt={tec.nombre} aria-label={`Logo de ${tec.nombre}`}/>
            <p>{tec.nombre}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Tecnologias