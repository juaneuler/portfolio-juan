import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import Button from '@mui/material/Button'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useLoader } from '../context/LoaderContext'


// Archivos .json para renderizar según el idioma
import es from '../locales/es.json'
import en from '../locales/en.json'

const texts = { es, en }

const CustomNavbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const { language, setLanguage } = useLanguage()
  const t = texts[language].navbar
  const { showLoader } = useLoader()

  const pages = [
    { label: t.inicio, path: '/' },
    { label: t.proyectos, path: '/proyectos' },
    { label: t.contacto, path: '/contacto' }
  ]

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  // Botón de cambio de idioma
  const handleChangeLanguage = () => {
    showLoader(1500)
    setTimeout(() => {
      setLanguage(language === 'es' ? 'en' : 'es')
    }, 1500)
  }

  return (
    <AppBar position="sticky" color="default" sx={{ backgroundColor: '#1a1a1a', color: '#f5f5f5', boxShadow: 'none' }}>
      <Toolbar sx={{ position: 'relative', justifyContent: 'center', width: '100%' }}>
        {/* Menú hamburguesa para vista móvil */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            position: { xs: 'absolute', md: 'static' },
            left: 0,
            alignItems: 'center',
            height: '100%',
          }}
        >
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {pages.map((page) => (
              <MenuItem key={page.path} onClick={handleCloseNavMenu} component={NavLink} to={page.path}>
                <Typography textAlign="center">{page.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        {/* Menú para escritorio */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2, justifyContent: 'center' }}>
          {pages.map((page) => (
            <Button
              key={page.path}
              component={NavLink}
              to={page.path}
              sx={{ color: 'white', display: 'block' }}
            >
              {page.label}
            </Button>
          ))}
        </Box>
        {/* Botón de para cambiar de idioma */}
        <Button
          color="inherit"
          onClick={handleChangeLanguage} 
          aria-label={language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
          sx={{
            ml: 2, fontWeight: 700, backgroundColor: '#2575FC',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#0350d2',
              color: '#fff'
            }
          }}
        >
          {language === 'es' ? 'EN' : 'ES'}
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default CustomNavbar