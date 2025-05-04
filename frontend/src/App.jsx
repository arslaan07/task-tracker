import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Signup from './pages/Signup'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import { Toaster } from "sonner";
import Loader from './Components/Loader'
import { useSelector } from 'react-redux'

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };
  
  const PublicRoute = ({ children }) => {
    return isAuthenticated ?  <Navigate to="/dashboard" /> : children ;
  }
  return (
    <>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path='/sign-up' element={<PublicRoute><Signup /></PublicRoute> } />
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute> } />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute> } />
        <Route path='/dashboard/tasks/:projectId' element={<PrivateRoute><Tasks /></PrivateRoute> } />
      </Route>
    </Routes>
    <Toaster position='bottom-right'/>
    </>
  )
}

export default App
