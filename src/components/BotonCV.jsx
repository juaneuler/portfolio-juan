import React from 'react'
import '../styles/boton-cv.scss'

const BotonCV = ({ texto, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="botonCV"
    aria-label="Descargar CV"
  >
    {texto}
  </a>
)

export default BotonCV