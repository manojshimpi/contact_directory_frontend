import React from 'react'


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Userlayout from './Userpanel/Userlayout'
import Login from './auth/Login'
import Register from './auth/Register'
import GoogleAuthWrapper from './auth/GoogleAuthWrapper'

function App() {
  return (
    <>
     <Router>
        <Routes>
          <Route path="/user/*" element={<Userlayout />} />
          <Route path="/admin/*" element={<h1>Manoj</h1>} />
          <Route path="/*" element={<GoogleAuthWrapper />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    
    </>
  )
}

export default App