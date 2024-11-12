import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import './index.css'
import { ContextProvider } from './context/Contact'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
    <App />
    </ContextProvider>
  </StrictMode>,
)
