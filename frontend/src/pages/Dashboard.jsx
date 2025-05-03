import React, { useState } from 'react'
import ProjectCard from '../Components/ProjectCard'
import { FaPlus } from "react-icons/fa6";
import ProjectModal from '../Components/ProjectModal';

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => {
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }
  return (
    <>
    <div className=' mt-6 px-14 py-3'>
        <button onClick={openModal} className='text-3xl text-white px-4 py-2 bg-blue-600 w-fit rounded-md hover:bg-blue-700 flex 
        justify-center items-center transition-all duration-300'>
        <span className='mr-2'><FaPlus /></span>
            Create a Project
        </button>
    <div className='flex gap-12 mt-6'>
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </div>
      
    </div>
    <ProjectModal isOpen={isModalOpen} closeModal={closeModal} />
    </>
  )
}

export default Dashboard
