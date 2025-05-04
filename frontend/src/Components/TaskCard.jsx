import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import api from '../api';
import { useDispatch } from 'react-redux';
import { decrementTaskCount } from '../store/slices/taskSlice';
import MyToast from './MyToast';
import TaskModal from './TaskModal';
import { formatDate } from '../utils/formatDate';
import Loader from './Loader';

const TaskCard = ({ title, description, status, taskId, createdAt, completedAt }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const openModal = () => {
        setIsModalOpen(true);
      };
      const closeModal = () => {
        setIsModalOpen(false);
      };
    const deleteTask = async (taskId) => {
        try {
            setDeleteLoading(true)
            const response = await api.delete(`/api/v1/task/${taskId}`) 
            console.log(response.data)
            dispatch(decrementTaskCount())
            MyToast('Task deleted!', 'success')
         } catch (error) {
             console.log(error)
             MyToast(error.response.data.message, 'error')
         } finally {
            setDeleteLoading(false)
         }
    }
    const editTask = async () => {
        setLoading(true)
        openModal()
        setLoading(false)
    }
  return (
    <>
    {
                deleteLoading && <div className="flex items-center justify-center w-[290px] h-[80vh]"><Loader /></div>
            }
            {
                !deleteLoading && <div className='min-w-[360px] min-h-[400px] border-2 border-blue-600 text-black flex flex-col justify-between py-6 px-3 rounded-md'>
                <div>
                  <div className='flex justify-between items-center mb-4 gap-4'>
                    <h1 className='text-3xl font-semibold'>{title}</h1>
                    <span 
                      style={{
                        backgroundColor: status == 'pending' ? 'red' : 
                                        status == 'completed' ? '#059033' : '#efaf00'
                      }} 
                      className='text-white rounded-xl py-2 px-3 capitalize'
                    >
                      {status}
                    </span>
                  </div>
                
                  <p className='text-normal mb-8 max-w-[330px]'>{description}</p>
                </div>
                
                <div>
                  <div className='flex justify-end text-xl gap-5 mb-4'>
                    <button onClick={() => editTask(taskId)} className='hover:scale-105 transition-transform'>
                      <span className='flex text-[#efaf00] justify-center items-center hover:text-yellow-400 gap-1'>
                        <MdModeEditOutline /> Edit
                      </span>
                    </button>
                    <button onClick={() => deleteTask(taskId)} className='hover:scale-105 transition-transform'>
                      <span className='flex text-red-700 justify-center items-center hover:text-red-400 gap-1'>
                        <MdDeleteForever /> Delete
                      </span>
                    </button>
                  </div>
                  
                  <div className='flex justify-between text-sm text-gray-600'>
                    <p>Created at {formatDate(createdAt)}</p>
                    {status === 'completed' && <p>|</p>}
                    {status === 'completed' && <p className='text-[#059033]'>Completed at {completedAt != null && formatDate(completedAt)}</p>}
                  </div>
                </div>
              </div>
            }
    
    <TaskModal isOpen={isModalOpen} closeModal={closeModal} taskId={taskId} loading={loading} setLoading={setLoading} />
    </>
  )
}

export default TaskCard