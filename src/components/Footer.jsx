import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import es from '../locales/es.json'
import en from '../locales/en.json'
import '../styles/footer.scss'

import githubIcono from '../assets/githubLogo.svg'
import linkedinIcono from '../assets/linkedinLogo.svg'

const texts = { es, en }

const Footer = () => {
    const { language } = useLanguage()
    const t = texts[language].footer

    return (
        <footer className="footer">
            <div className="footerRedes">
                <a
                    href="https://github.com/juaneuler"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label='GitHub de Juan Euler'
                >
                    <img src={githubIcono} alt="GitHub" />
                </a>

                <a
                    href="https://www.linkedin.com/in/juan-euler/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label='LinkedIn de Juan Euler'
                >
                    <img src={linkedinIcono} alt="LinkedIn" />
                </a>
            </div>
            <p>© 2025 | JUAN EULER | {t.derechos}</p>
        </footer>
    )
}

export default Footer