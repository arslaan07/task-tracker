import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='w-full h-[10vh] bg-blue-700 flex py-2 px-6 items-center justify-between'>
      <h1 className='font-sans text-3xl text-white font-bold'>Task Tracker</h1>
      <div className='flex gap-4 pr-4'>
        <Link to="/login" className=' text-xl bg-white py-2 px-3 rounded-md hover:bg-zinc-100'>Login</Link>
        <Link to="/sign-up" className=' text-xl bg-white py-2 px-3 rounded-md hover:bg-zinc-100'>Signup</Link>
      </div>
    </nav>
  )
}

export default Navbar
