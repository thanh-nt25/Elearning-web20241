import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProVider from './context/auth-context/index.jsx'
import AdminProvider from './context/admin-context/index.jsx'
import InstructorProvider from "./context/instructor-context/index.jsx";
import StudentProvider from "./context/student-context/index.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProVider>
      <AdminProvider>
        <InstructorProvider>
          <StudentProvider>
            <App />
          </StudentProvider>
        </InstructorProvider>
      </AdminProvider>
    </AuthProVider>
  </BrowserRouter>
    
)
