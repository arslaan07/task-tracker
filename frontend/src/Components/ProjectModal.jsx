import React, { useEffect, useRef, useState } from 'react'

const ProjectModal = ({isOpen, closeModal}) => {
    if(!isOpen) return null
    const [title, setTitle] = useState('')
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
        }
        setErrors(newErrors)
    }
    const handleChange = (e) => {
        const {name, value} = e.target
        setTitle(value)
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
      <div ref={modalRef} className=' absolute w-[600px] h-[220px] bg-white rounded-md p-6'>
      <button onClick={closeModal} className='absolute top-3 right-5 text-xl hover:font-semibold'>X</button>
      <form>
        <div className='flex flex-col gap-4'>
        <label className='text-3xl font-medium' htmlFor="title">Project Title</label>
        <input 
        className='border-2 border-black rounded-md py-2 px-3 outline-none'
        placeholder='enter project title'
        type="text" 
        name='title'
        value={title}
        onChange={handleChange}
        />
        </div>
        {errors.title && <div className='text-red-500 text-base min-h-[10px]'>{errors.title}</div>}
        <button type='submit' className='bg-blue-600 text-white font-medium rounded-md px-3 py-2 mt-4 hover:bg-blue-700'>Add Project</button>
      </form>
      </div>
    </div>
  )
}

export default ProjectModal
