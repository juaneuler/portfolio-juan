import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import BotonCV from './botonCV'

// Textos a renderizar
import es from '../locales/es.json'
import en from '../locales/en.json'

// Hoja de estilos
import '../styles/sobre-mi.scss'

const texts = { es, en }

const SobreMi = () => {

    const { language } = useLanguage()
    const t = texts[language]["sobre-mi"]

    return (
        <section className="sobreMi">
            <h2 className="tituloSobreMi">{t.titulo}</h2>
            <p className="textoSobreMi">{t.descripcion}</p>
            <BotonCV texto={t.cvBoton} url={t.cvUrl} />
        </section>
    )
}

export default SobreMi