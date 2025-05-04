import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './bootstrap.min.css'
// import { WaterUsageProvider } from './context/WaterUsageContext';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    
        <App />
     
      </AuthProvider>
    </BrowserRouter>
   
  </StrictMode>,
)
