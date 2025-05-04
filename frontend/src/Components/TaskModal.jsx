import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { decrementTaskCount, incrementTaskCount, updateTask } from '../store/slices/taskSlice'
import api from '../api'
import MyToast from './MyToast'
import { useParams } from 'react-router-dom'
import Loader from './Loader'
import { FaBullseye } from 'react-icons/fa'

const TaskModal = ({isOpen, closeModal, taskId, loading, setLoading}) => {
    if(!isOpen) return null
        const [title, setTitle] = useState('')
        const [description, setDescription] = useState('')
        const [status, setStatus] = useState('pending')
        const [errors, setErrors] = useState({})
        
        const modalRef = useRef()
        const dispatch = useDispatch()
        const navParams = useParams()
        const validateField = (name, value) => {
            const newErrors = {}
            switch(name) {
                case "title":
                    if(!value.trim()) {
                        newErrors.title = 'Title is required!'
                    } else if(value.length <= 5) {
                        newErrors.title = "Title must be atleast 5 characters!"
                    } else if(value.length >= 18) {
                        newErrors.title = "Title must not exceed 18 characters!"
                    } else {
                        delete newErrors.title
                    }
                    break;
                    case "description":
                    if(!value.trim()) {
                        newErrors.description = 'Description is required!'
                    } else if(value.length <= 20) {
                        newErrors.description = "Description must be atleast 20 characters!"
                    } else {
                        delete newErrors.description
                    }
                    break;
                    default:
                        break;
            }
            setErrors(newErrors)
        }
        const handleChange = (e) => {
            const {name, value} = e.target
            if(name == 'title') {
                setTitle(value)
            }
            if(name == 'description') {
                setDescription(value)
            }
            if(name == 'status') {
                setStatus(value)
            }
            validateField(name, value)
        }

        const handleSubmit = async (e) => {
            e.preventDefault()
            if(Object.keys(errors).length != 0) {
                return
            }
            try {
                setLoading(true)
                if(taskId) {
                    const response = await api.put(`/api/v1/task/${taskId}`, {title, description, status}) 
                    console.log(response.data)
                    MyToast('Task updated!', 'success')
                    dispatch(updateTask())
                }
                else {
                    const response = await api.post(`/api/v1/task/${navParams.projectId}`, {title, description, status}) 
                    console.log(response.data)
                    dispatch(incrementTaskCount())
                    MyToast('Task created!', 'success')
                } 
                    setTitle('')
                    setDescription('')
                    setStatus('pending')
                 } catch (error) {
                     console.log(error)
                     MyToast(error.response.data.message, 'error')
                 } finally {
                    setLoading(false)
                    closeModal()
                 }
        }

        useEffect(() => {
            const handleOutsideClick = (e) => {
                if(modalRef.current && !modalRef.current.contains(e.target)) {
                    closeModal()
                }
            }
            document.addEventListener('mousedown', handleOutsideClick)
    
            return () => document.removeEventListener('mousedown', handleOutsideClick)
        }, [isOpen, closeModal])
    
        useEffect(() => {
            const fetchTask = async () => {
                try {
                    setLoading(true)
                    const response = await api.get(`/api/v1/task/${taskId}`)
                    console.log(response.data.task)
                    setTitle(response.data.task.title)
                    setDescription(response.data.task.description)
                    setStatus(response.data.task.status)
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoading(false)
                }
            }
            if(taskId) {
                fetchTask()
            }
        }, [taskId])
  return (
    <>
    {
                loading && <div className="flex items-center justify-center w-[360px] "><Loader /></div>
            }
            {
                !loading && <div className=' fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/50'>
                <div ref={modalRef} className=' absolute w-[600px] h-[500px] bg-white rounded-md  '>
                <button onClick={closeModal} className='absolute top-3 right-5 text-xl hover:font-semibold'>X</button>
                <form className=' flex flex-col p-6'>
                  <div className='flex flex-col gap-2 justify-start '>
                  <label className='text-3xl font-medium' htmlFor="title">Task Title</label>
                  <input 
                  className='border-2 border-black rounded-md py-2 px-3 outline-none'
                  placeholder='enter task title'
                  type="text" 
                  name='title'
                  value={title}
                  onChange={handleChange}
                  />
                  </div>
                  {errors.title && <div className='text-red-500 text-base min-h-[10px]'>{errors.title}</div>}
          
                  <div className='flex flex-col gap-4 mt-5'>
                  <label className='text-3xl font-medium' htmlFor="description">Task Description</label>
                  <input 
                  className='border-2 border-black rounded-md py-2 px-3 outline-none'
                  placeholder='enter task description'
                  type="text" 
                  name='description'
                  value={description}
                  onChange={handleChange}
                  />
                  </div>
                  {errors.description && <div className='text-red-500 text-base min-h-[10px]'>{errors.description}</div>}
          
                  <div className='flex flex-col gap-4 mt-5'>
                  <label className='text-3xl font-medium' htmlFor="description">Task Status</label>
                  <select 
                  name="status" 
                  id=""
                  value={status}
                  onChange={handleChange}
                  className='border-2 border-black rounded-md py-2 px-3 outline-none'>
                      <option value="pending">Pending</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                  </select>
                  
                  </div>
                  <button onClick={handleSubmit} style={{backgroundColor: taskId ? '#efaf00' : 'blue'}} type='submit' className=' text-white font-medium rounded-md px-3 py-2 mt-4 hover:bg-blue-700'>
                      {taskId ? 'Update Task' : 'Add Task'}</button>
                </form>
                </div>
              </div>
            }
    
    </>
  )
}

export default TaskModal
