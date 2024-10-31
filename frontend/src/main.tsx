import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import createTheme from '@mui/material/styles/createTheme';
import {ThemeProvider } from '@mui/material/styles';
import App from './App';
//Importamos el componente Provider de la librearía react-redux
import { Provider } from 'react-redux'
//Importamos el componente store que definimos en el fichero ./store/index
import { store } from './store/index'

const customTheme = createTheme({
  palette: {
      mode: 'dark',
      primary: {
      main: '#ec407a',
      light: '#e91e63',
      dark: '#d81b60',
    },
    secondary: {
      main: '#9c27b0',
    },
    text: {
      primary: '#fafafa',
      secondary: '#fafafa', 
    },
    error: {
      main: '#b71c1c',
    },
  },
 })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
        <Provider store={store}>
          <App/>
        </Provider>
    </ThemeProvider>
  </StrictMode>,
)
