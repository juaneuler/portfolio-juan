import React, { useEffect, useState } from 'react'
import { useLoader } from '../context/LoaderContext'
import Portada from '../components/Portada'
import SobreMi from '../components/SobreMi'
import Tecnologias from '../components/Tecnologias'
import Educacion from '../components/Educacion'
import Servicios from '../components/Servicios'
import FadeInSection from '../components/FadeInSection'

const Home = () => {

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
        <>
            <Portada delay={1700} />

            <FadeInSection>
                <SobreMi />
            </FadeInSection>
            <FadeInSection>
                <Tecnologias />
            </FadeInSection>
            <FadeInSection>
                <Educacion />
            </FadeInSection>
            <FadeInSection>
                <Servicios />
            </FadeInSection>
        </>
    )
}

export default Home