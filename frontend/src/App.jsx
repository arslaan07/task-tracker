import React from 'react'
import Navbar from './Components/Navbar'
import Signup from './pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/tasks' element={<Tasks />} />
      </Route>
    </Routes>
  )
}

export default App
