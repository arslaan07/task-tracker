import React from 'react'
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
const TaskCard = () => {
  return (
    <div className='w-[500px] border-2 border-blue-600 text-black flex flex-col gap-4 py-6 px-5 rounded-md'>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-semibold'>Implement New User Dashboard</h1>
            <span className='bg-blue-600 text-white rounded-xl py-2 px-3'>Pending</span>
        </div>
      
      <h1 className='text-xl'>Design and develop a responsive dashboard for new users that includes analytics, recent activities, and personalized recommendations based on user behavior.</h1>
      <div className='flex justify-end text-xl gap-5'>
        <button>
            <span className='flex text-yellow-700 justify-center items-center hover:text-yellow-400'><MdModeEditOutline /> Edit</span>
        </button>
        <button>
            <span className='flex text-red-700 justify-center items-center hover:text-red-400'><MdDeleteForever /> Delete</span>
        </button>
      </div>
      <h1>Created at 12-03-2025</h1>
    </div>
  )
}

export default TaskCard
