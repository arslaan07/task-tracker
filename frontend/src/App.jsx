import React from 'react'
import Navbar from './Components/Navbar'
import Signup from './pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import { Toaster } from "sonner";
import Loader from './Components/Loader'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/tasks/:projectId' element={<Tasks />} />
      </Route>
    </Routes>
    <Toaster position='bottom-right'/>
    {/* <Loader /> */}
    </>
  )
}

export default App
