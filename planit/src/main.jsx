import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Nav from './NavBar'
import Cal from './Cal'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav />
    <Cal />
  </StrictMode>,
);
