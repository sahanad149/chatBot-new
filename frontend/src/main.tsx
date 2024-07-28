import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'      //IT adds the wrapping funtionality inside the web browser to use react in the application.

const theme = createTheme({
  typography:{
    fontFamily: "Roboto Slab, serif", 
    allVariants:{color:"white"}
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
    </BrowserRouter>
    <App />
  </React.StrictMode>,
)
