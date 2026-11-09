import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { EmployeeProvider } from './context/EmployeeProvider';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <EmployeeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </EmployeeProvider>
);

