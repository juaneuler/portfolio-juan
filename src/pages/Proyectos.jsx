import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase/config'
import { NavLink } from 'react-router-dom'
import { useLoader } from '../context/LoaderContext'
import "../styles/proyectos.scss"
import es from "../locales/es.json"
import en from "../locales/en.json"

const texts = { es, en }


const Proyectos = () => {
    const { language } = useLanguage()
    const t = texts[language]["proyectos"]
    const [proyectos, setProyectos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(false)
    const { showLoader, hideLoader } = useLoader()

    useEffect(() => {
        showLoader()
        const fetchProyectos = async () => {
            try {
                const ref = collection(db, 'proyectos')
                const q = query(ref, orderBy('orden', 'asc'))
                const querySnapshot = await getDocs(q)
                setProyectos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            } catch (error) {
                setError(true)
            } finally {
                hideLoader()
                setCargando(false)
            }
        }
        fetchProyectos()
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
                Ocurrió un error al cargar los proyectos. Por favor, intentá más tarde.
            </div>
        )
    }

    return (
        <section className="proyectos">
            <h2>{t.titulo}</h2>
            <div className="proyectosContenedor">
                {proyectos.map(proyecto => (
                    <div className="proyectoTarjeta" key={proyecto.id}>
                        {proyecto.img && (
                            <img
                                src={proyecto.img[0]}
                                alt={proyecto.titulo}
                                className="proyectoImg proyectoImgEscritorio"
                            />
                        )}
                        {proyecto.imgMiniatura && (
                            <img
                                src={proyecto.imgMiniatura}
                                alt={proyecto.titulo + ' movil'}
                                className="proyectoImg proyectoImgMovil"
                            />
                        )}
                        <h3 className="proyectoTitulo">{proyecto.titulo}</h3>
                        <p className="proyectoDescripcion">{proyecto.descripcion[language]}</p>
                        <div className="proyectoTecnologias">
                            {proyecto.tecnologias.map((tec, i) => (
                                <span key={i} className="proyectoTecnologia">
                                    <img src={tec.logo} alt={tec.nombre} className="proyectoTecnologiaLogo" />
                                    {tec.nombre}
                                </span>
                            ))}
                        </div>
                        <NavLink to={`/proyectos/${proyecto.slug}`} className="proyectoMasInfo"
                        aria-label={`Ver detalles del proyecto ${proyecto.titulo}`}
                        >
                            {t.botonInfo}
                        </NavLink>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Proyectos