import React, { useEffect, useRef, useState } from 'react'

const TaskModal = ({isOpen, closeModal}) => {
    if(!isOpen) return null
        const [title, setTitle] = useState('')
        const [description, setDescription] = useState('')
        const [status, setStatus] = useState('pending')
        const [errors, setErrors] = useState({})
        const modalRef = useRef()
        const validateField = (name, value) => {
            const newErrors = {}
            switch(name) {
                case "title":
                    if(!value.trim()) {
                        newErrors.title = 'Title is required!'
                    } else if(value.length <= 5) {
                        newErrors.title = "Title must be atleast 5 characters!"
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
        useEffect(() => {
            const handleOutsideClick = (e) => {
                if(modalRef.current && !modalRef.current.contains(e.target)) {
                    closeModal()
                }
            }
            document.addEventListener('mousedown', handleOutsideClick)
    
            return () => document.removeEventListener('mousedown', handleOutsideClick)
        }, [isOpen, closeModal])
  return (
    <div className=' fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/50'>
      <div ref={modalRef} className=' absolute w-[600px] h-[440px] bg-white rounded-md p-6'>
      <button onClick={closeModal} className='absolute top-3 right-5 text-xl hover:font-semibold'>X</button>
      <form>
        <div className='flex flex-col gap-4'>
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
        <button type='submit' className='bg-blue-600 text-white font-medium rounded-md px-3 py-2 mt-4 hover:bg-blue-700'>Add Task</button>
      </form>
      </div>
    </div>
  )
}

export default TaskModal
