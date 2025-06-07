import React from 'react'
import { NavLink } from 'react-router-dom'

// Contexto par el idioma
import { useLanguage } from '../context/LanguageContext'

// Archivos para renderizar los textos
import es from '../locales/es.json'
import en from '../locales/en.json'

// Hoja de estilos
import '../styles/servicios.scss'

// Imágenes a renderizar
import webImg from "../assets/codeImg.jpg"
import wpImg from "../assets/wpImg.jpg"

const texts = { es, en }
const imagenes = [webImg, wpImg]

const Servicios = () => {

    const { language } = useLanguage()
    const t = texts[language]["servicios"]

    return (
        <section className="servicios">
            <h2 className="tituloServicios">{t.titulo}</h2>
            <div className="serviciosContenedor">
                {t.tarjetas.map((servicio, i) => (
                    <div className="servicioTarjeta" key={i}>
                        <img src={imagenes[i]} alt={servicio.imgAlt} className="servicioImagen" />
                        <div className="servicioTexto">
                            <h3 className="servicioTitulo">{servicio.titulo}</h3>
                            <p className="servicioDescripcion">{servicio.descripcion}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="ctaServicios">
                <p className="ctaFrase">{t.cta}</p>
                <NavLink to="/contacto" className="ctaBoton" aria-label="Ir a la página de contacto">{t.boton}</NavLink>
            </div>
        </section>
    )
}

export default Servicios