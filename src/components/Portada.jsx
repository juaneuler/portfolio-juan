import React, { useEffect, useState } from 'react';

// Hoja de estilos
import "../styles/portada.scss";

const nombre = "JUAN EULER";
const subtitulo = "FrontEnd Developer - React & WordPress";

const Portada = ({delay = 1700 }) => {
  const [mostrarCursor, setMostrarCursor] = useState(true);
  const [texto, setTexto] = useState("");
  const [escribiendo, setEscribiendo] = useState(false);

  useEffect(() => {
    // El cursor se muestra solo durante 1 segundo
    const timer = setTimeout(() => {
      setMostrarCursor(false);
      setEscribiendo(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (escribiendo && texto.length < nombre.length) {
      const timeout = setTimeout(() => {
        setTexto(nombre.slice(0, texto.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [escribiendo, texto]);

  return (
    <section className="portada" aria-label="Portada del portfolio de Juan Euler">
      <div className="portadaOverlay" />
      <div className="portadaContenido">
        <h1 className="titulo">
          {mostrarCursor ? (
            <span className="cursor" />
          ) : (
            <>
              {texto}
              <span className="cursor" />
            </>
          )}
        </h1>
        {!mostrarCursor && texto === nombre && (
          <h2 className="subtitulo">{subtitulo}</h2>
        )}
      </div>
    </section>
  );
};

export default Portada