import React from 'react'

//Hoja de estilos
import '../styles/educacion.scss'

// Contexto
import { useLanguage } from '../context/LanguageContext'

// Archivo Js que tiene el contenido a renderizar
import { educacion } from '../data/educacion'

// Textos a renderizar
import es from '../locales/es.json'
import en from '../locales/en.json'

const texts = { es, en }

const Educacion = () => {
    const { language } = useLanguage()
    const t = texts[language]["educacion"]

    return (
        <section className="educacion">
            <h2>{t.titulo}</h2>
            <div className="educacionContenedor">
                {educacion.map((curso, index) => {
                    const datos = t[curso.id]

                    return (
                        <div key={index} className="educacionCarta">
                            <h3>{datos.titulo}</h3>
                            <p className="educacionInstitucion">{datos.institucion} - {datos.fecha}</p>
                            <p className="educacionNota">{t.textoNota}{curso.nota}</p>
                            <p className="educacionTemario">{t.textoTemario}</p>
                            <ul className="educacionTemas">
                                {datos.temas.map((tema, i) => {
                                    return <li key={i}>{tema}</li>
                                })}
                            </ul>
                            <a href={curso.certificado} className="educacionCertificado" target="_blank" rel="noopener noreferrer" aria-label={`Ver certificado de ${datos.titulo}`}>{t.textoCertificado}</a>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Educacion