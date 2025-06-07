import { useState, useEffect } from 'react'

const useEsMovil = (maxWidth = 700) => {
  const [esMovil, setEsMovil] = useState(window.innerWidth <= maxWidth)

  useEffect(() => {
    const handleResize = () => setEsMovil(window.innerWidth <= maxWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [maxWidth])

  return esMovil
}

export default useEsMovil