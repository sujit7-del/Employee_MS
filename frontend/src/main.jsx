import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContext from './context/authContext.jsx'
import {ThemeProvider} from "./context/ThemeContext.jsx"

createRoot(document.getElementById('root')).render(
  <AuthContext>
    <ThemeProvider>
       <App />
    </ThemeProvider>
  </AuthContext>,
)


