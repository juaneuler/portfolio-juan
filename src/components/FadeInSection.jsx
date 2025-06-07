// Este componente anima cada sección. Una vez que tenga 20% del contenido en el viewport, se inicia la animación
import { motion } from 'framer-motion'

const FadeInSection = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export default FadeInSection
