import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import MyToast from './MyToast'
import { logout } from '../store/slices/authSlice'

const Navbar = () => {
    const { isAuthenticated, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const handleLogout = async () => {
        try {
            setLoading(true)
            const response = await api.get('api/v1/user/logout')
            console.log(response.data)
            dispatch(logout())
            navigate('/login')
            MyToast('Logout successfull!', 'success')
        } catch (error) {
            console.log(error)
            MyToast(error.response.data.message, 'error')
        } finally {
            setLoading(false)
        }
    }
  return (
    <>
    {
                loading && <div className="flex items-center justify-center w-[100vw] h-[80vh]"><Loader /></div>
            }
            {
                !loading && <nav className='w-full h-[10vh] bg-blue-700 flex py-2 px-6 items-center justify-between'>
                <Link to='/dashboard' className='font-sans text-3xl text-white font-bold no-underline'>Task Tracker</Link>
                <div className='flex gap-4 pr-4'>
                  {
                      !isAuthenticated && 
                      <>
                      <Link to="/login" className=' text-xl bg-white py-2 px-3 rounded-md hover:bg-zinc-100 no-underline'>Login</Link>
                      <Link to="/sign-up" className=' text-xl bg-white py-2 px-3 rounded-md hover:bg-zinc-100 no-underline'>Signup</Link>
                      </>
                  }
                  {
                      isAuthenticated && 
                      <>
                      <span className='text-xl font-semibold text-white py-2'>Hi {user.name} </span>
                      <button onClick={handleLogout} className=' text-xl bg-white py-2 px-3 rounded-md hover:bg-zinc-100'>Logout</button>
                      </>
                  }
                </div>
              </nav>
            }
    
    </>
  )
}

export default Navbar
