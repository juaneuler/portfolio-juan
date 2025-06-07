# Portfolio Juan Euler

[![Node.js](https://img.shields.io/badge/Node.js-v18.x-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.x-brightgreen)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](#tests)

Este es mi portfolio personal, desarrollado en React.js. Acá encontrarás información sobre mí, las tecnologías que uso, educación, servicios, proyectos y formas de contacto. El sitio está optimizado para SEO, es responsive y cuenta con animaciones suaves.

## 👤 Autor

**Juan Euler**

- [GitHub](https://github.com/juaneuler/)
- [LinkedIn](https://www.linkedin.com/in/juan-euler/)

## 📝 Uso

El portfolio muestra secciones como “Sobre mí”, “Proyectos”, “Educación” y “Contacto”. Está pensado para demostrar mis habilidades y experiencia como desarrollador FrontEnd.

## 🚀 Tecnologías usadas

- **React.js**: Librería principal para construir la interfaz.
- **Vite**: Entorno de desarrollo rápido y liviano.
- **Firebase Firestore**: Para almacenar los datos dinámicos de los proyectos.
- **React Router**: Para manejar la navegación entre páginas.
- **Framer Motion**: Animaciones suaves y profesionales.
- **Sass (SCSS)**: Para estilos modulares y ordenados.
- **Vitest + Testing Library**: Para tests unitarios y de componentes.

## 🌐 Despliegue

El sitio está desplegado en Netlify y en Vercel, accesible públicamente en:  

https://portfolio-juan-euler.netlify.app/
https://portfolio-juan-eta.vercel.app/

## 💻 Para ver el proyecto localmente

Para ejecutar el proyecto en tu computadora (necesitas tener Node.js instalado):

1. **Clona el repositorio**
   ```sh
   git clone https://github.com/juaneuler/portfolio-juan.git
   cd portfolio-juan
   ```
2. **Instala las dependencias**
   ```sh
   npm install
   ```
3. **Inicia el servidor de desarrollo**
   ```sh
   npm run dev
   ```

## 📁 Estructura del proyecto

```
portfolio-juan/
├── .github/           # Workflows de GitHub Actions (ej: test.yml)
├── node_modules/
├── public/
│   ├── favicon.ico
│   ├── manifest.json
│   ├── index.html
│   └── img/           # Imágenes y PDFs (certificados, CVs)
├── src/
│   ├── assets/        # Imágenes y SVGs usados en la app
│   ├── components/    # Componentes React reutilizables
│   ├── context/       # Contextos globales (idioma, loader)
│   ├── data/          # Archivos JS con datos estáticos
│   ├── firebase/      # Configuración de Firebase
│   ├── hooks/         # Hooks personalizados (ej: useEsMovil)
│   ├── locales/       # Archivos de traducción (es.json, en.json)
│   ├── pages/         # Páginas principales (Home, Proyectos, Contacto, etc)
│   ├── styles/        # Archivos SCSS de estilos
│   └── tests/         # Setup y utilidades para tests
├── .eslintrc          # Configuración de ESLint
├── index.html         # HTML principal
├── package.json       # Dependencias y scripts
├── vite.config.js     # Configuración de Vite
├── vitest.config.js   # Configuración de Vitest
└── README.md          # Este archivo
```

## 🧪 Tests

El proyecto incluye tests unitarios para componentes clave y lógica principal.  
Puedes ejecutarlos con:

```sh
npm run test
```

---

**Desarrollado por [Juan Euler](https://www.linkedin.com/in/juan-euler/)**