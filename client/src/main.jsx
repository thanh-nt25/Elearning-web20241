import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProVider from './context/auth-context/index.jsx'
import InstructorProvider from "./context/instructor-context/index.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProVider>
      <InstructorProvider>
        <App />
      </InstructorProvider>
    </AuthProVider>
  </BrowserRouter>
    
)
