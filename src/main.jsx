import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { EmployeeProvider } from './context/EmployeeProvider.jsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  
    <EmployeeProvider>
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </EmployeeProvider>
  
)
