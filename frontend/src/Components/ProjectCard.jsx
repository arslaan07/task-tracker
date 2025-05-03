import React from 'react'
const ProjectCard = () => {
  return (
    <button className='mt-4 flex flex-col justify-center items-center w-fit bg-blue-600 w-[350px] h-[400px]
    rounded-md text-white hover:bg-blue-700 gap-4'>
        <span className='text-2xl'>📁</span>
        <h1 className='text-2xl'>Project Title</h1>
    </button>
  )
}

export default ProjectCard
