import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import Carrusel from '../components/Carrusel'
import CarruselMovil from '../components/CarruselMovil'
import { useLanguage } from '../context/LanguageContext'
import { useLoader } from '../context/LoaderContext'
import useEsMovil from '../hooks/useEsMovil'
import '../styles/proyectos-detalle.scss'
import es from "../locales/es.json"
import en from "../locales/en.json"

const texts = { es, en }

const ProyectosDetalle = () => {
    const { slug } = useParams()
    const [proyecto, setProyecto] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(false)
    const { language } = useLanguage()
    const t = texts[language]["proyectos-detalle"]
    const esMovil = useEsMovil(700)
    const { showLoader, hideLoader } = useLoader()

    useEffect(() => {
        showLoader()
        const fetchProyecto = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'proyectos'))
                const proyectos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                const encontrado = proyectos.find(p => p.slug === slug)
                setProyecto(encontrado)
            } catch (error) {
                setError(true)
            } finally {
                hideLoader()
                setCargando(false)
            }
        }
        fetchProyecto()
    }, [slug])

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

    if (error) {
        return (
            <div style={{
                width: '100vw',
                height: '100vh',
                background: '#0d0d0d',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                Ocurrió un error al cargar el proyecto. Por favor, intentá más tarde.
            </div>
        )
    }

    if (!proyecto) {
        return (
            <section className="proyectos">
                <div className="detalle-cargando">Cargando...</div>
            </section>
        )
    }

    const tituloRenderizado = typeof proyecto.titulo === "string"
        ? proyecto.titulo
        : proyecto.titulo[language]

    return (
        <section className="proyectos">
            <div className="proyectoTarjeta detalle">
                <h2 className="proyectoTitulo">{tituloRenderizado}</h2>
                {esMovil && proyecto.imgCarruselMovil && proyecto.imgCarruselMovil.length > 0
                    ? <CarruselMovil imagenes={proyecto.imgCarruselMovil} />
                    : <Carrusel imagenes={proyecto.img} />
                }
                <p className="proyectoDescripcion descripcionDetalle">
                    {proyecto.descripcionDetalle[language]}
                </p>
                <div className="proyectoTecnologias">
                    {proyecto.tecnologias.map((tec, i) => (
                        <span key={i} className="proyectoTecnologia">
                            <img src={tec.logo} alt={tec.nombre} className="proyectoTecnologiaLogo" />
                            {tec.nombre}
                        </span>
                    ))}
                </div>
                <div className="proyectoBotones">
                    {proyecto.demo && (
                        <a
                            href={proyecto.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="proyectoMasInfo"
                            aria-label={`Ver demo de ${proyecto.titulo}`}
                        >
                            Demo
                        </a>
                    )}
                    {proyecto.github && (
                        <a
                            href={proyecto.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="proyectoMasInfo"
                            aria-label={`Ver repositorio de GitHub de ${proyecto.titulo}`}
                        >
                            GitHub
                        </a>
                    )}
                </div>
                <div className="volverProyectos">
                    <NavLink to="/proyectos" className="volverLink">
                        {t.volver}
                    </NavLink>
                </div>
            </div>
        </section>
    )
}

export default ProyectosDetalle