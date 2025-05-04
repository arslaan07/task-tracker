import React, { useEffect, useState } from 'react'
import ProjectCard from '../Components/ProjectCard'
import { FaPlus } from "react-icons/fa6";
import ProjectModal from '../Components/ProjectModal';
import api from '../api';
import MyToast from '../Components/MyToast';
import { useSelector } from 'react-redux';
import Loader from '../Components/Loader';

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [projects, setProjects] = useState([])
    const { projectCount } = useSelector(state => state.project)
    const [loading, setLoading] = useState(true)
    
    const openModal = () => {
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true)
                const response = await api.get('/api/v1/project')
                console.log(response.data.projects)
                setProjects(response.data.projects)
            } catch (error) {
                console.log(error)
                MyToast(error.response.data.message, 'error')
            } finally {
                setLoading(false)
            }
        }
        fetchProjects()
    }, [projectCount])
  return (
    <>
    {
            loading && <div className="flex items-center justify-center h-[80vh]"><Loader /></div>
        }
        {
            !loading && <div className=' mt-6 px-14 py-3'>
            <button onClick={openModal} className='text-3xl text-white px-4 py-2 bg-blue-600 w-fit rounded-md hover:bg-blue-700 flex 
            justify-center items-center transition-all duration-300'>
            <span className='mr-2'><FaPlus /></span>
                Create a Project
            </button>
        <div className='flex gap-12 mt-6'>
          {
            projects && projects.length > 0 && 
            projects.map((project, id) => (
                <ProjectCard key={id} projectId={project._id} title={project.title} />
            ))
          }
          {
            projects && projects.length == 0 && 
            <h1 className='text-zinc-600 text-3xl w-full mt-10 text-center'>No projects created yet!</h1>
          }
        </div>
          
        </div>
        }
    
    <ProjectModal isOpen={isModalOpen} closeModal={closeModal} />
    </>
  )
}

export default Dashboard
