import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/loader.scss'

const Loader = ({ isVisible }) => (
    <AnimatePresence>
        {isVisible && (
            <motion.div
                className="loader-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.img
                    src="/android-chrome-512x512.png"
                    alt="loader-icon"
                    className="loader-icon"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                />
            </motion.div>
        )}
    </AnimatePresence>
)

export default Loader