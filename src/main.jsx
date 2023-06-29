import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import './components/css/Main.module.css'
import { CategoryProvider } from './context/CategoryContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CategoryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </CategoryProvider>
    </AuthProvider>
  </React.StrictMode>,
)
