import React from 'react'
import { Link } from 'react-router-dom'
const ProjectCard = ({ title, projectId }) => {
    
  return (
    <Link to={`/dashboard/tasks/${projectId}`} className='mt-4 no-underline flex flex-col justify-center items-center w-fit bg-blue-600 min-w-[300px] h-[400px]
    rounded-md text-white hover:bg-blue-700 gap-4'>
        <span className='text-2xl'>📁</span>
        <h1 className='text-2xl'>{title}</h1>
    </Link>
  )
}

export default ProjectCard
