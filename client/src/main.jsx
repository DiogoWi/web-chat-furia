import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LoginCadastroProvider from './context/LoginCadastroContext.jsx'
import MensagemContextProvider from './context/MensagemContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginCadastroProvider>
      <MensagemContextProvider>
        <App />
      </MensagemContextProvider>
    </LoginCadastroProvider>
  </StrictMode>,
)
