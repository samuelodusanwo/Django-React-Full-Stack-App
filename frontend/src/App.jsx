import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'


import './App.css';

import Home from './pages/home/Home.component';
import Register from './pages/Register/register.component';
import Login from './pages/Login/Login.component';
import NotFound from './components/NotFound/NotFound.component';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.component'


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}


function RegisterAndLogOut() {
  localStorage.clear()
  return <Register />
}


function App(){
    return (
      <>
        <Routes>
          <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute> }/>
          <Route path='/register' element={<RegisterAndLogOut />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/notfound' element={<NotFound />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </>
    )
}

export default App;