import React, { createContext, useState, useContext } from 'react'

const LanguageContext = createContext();

export const LanguageProvider = ({children}) => {
    const [language, setLanguage] = useState("es") // Castellano va a ser el idioma por defecto del Portfolio

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "es" ? "en" : "es"));
    };


    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);