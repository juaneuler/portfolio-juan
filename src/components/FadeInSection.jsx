// Este componente anima cada sección. Una vez que tenga 20% del contenido en el viewport, se inicia la animación. En vista móvil, esto generaba un problema: había que hacer mucho scroll para ver las tarjetas de tecnologías del home, entonces aplicamos el hook personalizado para que se muestre antes!

import { motion } from 'framer-motion'
import useEsMovil from '../hooks/useEsMovil'

const FadeInSection = ({ children }) => {
  const esMovil = useEsMovil()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: esMovil ? 0.05 : 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export default FadeInSection