import React, { useState } from 'react'
import '../styles/carrusel.scss'

const Carrusel = ({ imagenes }) => {
  const [indice, setIndice] = useState(0)
  const total = imagenes.length

  const siguiente = () => {
    setIndice((prev) => (prev + 1) % total)
  }

  const anterior = () => {
    setIndice((prev) => (prev - 1 + total) % total)
  }

  const seleccionar = (i) => {
    setIndice(i)
  }

  return (
    <div className="carrusel">
      <div className="carrusel-wrapper">
        <div
          className="carrusel-track"
          style={{ transform: `translateX(-${indice * 100}%)` }}
        >
          {imagenes.map((img, index) => (
            <img key={index} src={img} alt={`screenshot-${index}`} />
          ))}
        </div>

        <button className="flecha izq" onClick={anterior} aria-label="Imagen anterior">‹</button>
        <button className="flecha der" onClick={siguiente} aria-label="Imagen siguiente">›</button>
      </div>

      <div className="dots">
        {imagenes.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === indice ? 'activo' : ''}`}
            onClick={() => seleccionar(i)}
            aria-label={`Seleccionar imagen ${i + 1}`}
          ></span>
        ))}
      </div>
    </div>
  )
}

export default Carrusel
