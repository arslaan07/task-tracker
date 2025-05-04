import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";
import TaskCard from "../Components/TaskCard";
import TaskModal from "../Components/TaskModal";
import { useSelector } from "react-redux";
import api from "../api";
import MyToast from "../Components/MyToast";
import { Link, useParams } from "react-router-dom";

const TasksPerPage = 4
const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { taskCount, taskUpdated } = useSelector(state => state.task)
  const [tasks, setTasks] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  let params = { page: currentPage, limit: TasksPerPage };
  const navParams = useParams()
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
          const fetchTasks = async () => {
              try {
                  const response = await api.get(`/api/v1/task/${navParams.projectId}/tasks`, {params})
                  console.log(response.data.tasks)
                  setTasks(response.data.tasks)
                  setTotalPages(response.data.totalPages)
              } catch (error) {
                  console.log(error)
                  MyToast(error.response.data.message, 'error')
              }
          }
          fetchTasks()
      }, [taskCount, taskUpdated, currentPage])
      let pages = []
          for(let page=1; page<=totalPages; page++) {
            pages.push(page)
          }
  return (
    <>
      <div className=" mt-6 px-14 py-3">
        <div className=" pt-4 flex gap-6">
          <Link to='/dashboard' className=" relative text-3xl text-white bg-blue-600 flex justify-center 
          items-center rounded-full w-[60px] h-[60px] hover:bg-blue-700">
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
              <IoArrowBack size={40} />
            </span>
          </Link>
          <button
            onClick={openModal}
            className="text-3xl text-white px-4 py-2 bg-blue-600 w-fit rounded-md hover:bg-blue-700 flex 
              justify-center items-center transition-all duration-300"
          >
            <span className="mr-2">
              <FaPlus />
            </span>
            Create a Task
          </button>
        </div>
        <div className="flex mt-8 gap-8">
        {
        tasks && tasks.length > 0 && 
        tasks.map((task) => (
            <TaskCard key={task._id} taskId={task._id} title={task.title} description={task.description} 
            status={task.status} createdAt={task.createdAt} completedAt={task.completedAt} />
        ))
      }
      {
        tasks && tasks.length == 0 && 
        <h1 className='text-zinc-600 text-3xl w-full mt-10 text-center'>No tasks created yet!</h1>
      }
        </div>
      </div>
      <div className='flex gap-2 justify-center mt-10'>
        {
          pages.map((page, i) => (
            <button style={{backgroundColor: page == currentPage+1? 'blue' : ''}} key={i} onClick={() => {
              setCurrentPage(page-1)
            }} className='bg-blue-600 text-white py-2 px-3 rounded-md font-semibold hover:bg-zinc-400'>{page}</button>
          ))
        }
      </div>
      <TaskModal isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default Tasks;
