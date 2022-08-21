import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from './components/App'

createRoot(document.getElementById('root') as HTMLElement).render(<App />)
