import React, { useEffect, useState, useCallback } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";
import TaskCard from "../Components/TaskCard";
import TaskModal from "../Components/TaskModal";
import { useSelector } from "react-redux";
import api from "../api";
import MyToast from "../Components/MyToast";
import { Link, useParams } from "react-router-dom";
import Loader from "../Components/Loader";

const TasksPerPage = 3;

const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { taskCount, taskUpdated } = useSelector(state => state.task);
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navParams = useParams();

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params = { 
        page: currentPage, 
        limit: TasksPerPage, 
        search: searchQuery 
      };
      const response = await api.get(`/api/v1/task/${navParams.projectId}/tasks`, { params });
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
      MyToast(error.response?.data?.message || 'Error fetching tasks', 'error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, navParams.projectId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTasks();
    }, searchQuery ? 500 : 0); // Only debounce when there's a search query

    return () => clearTimeout(timer);
  }, [fetchTasks, taskCount, taskUpdated]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // Reset to first page when searching
  };

  const pages = [];
  for (let page = 1; page <= totalPages; page++) {
    pages.push(page);
  }

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[80vh]">
          <Loader />
        </div>
      ) : (
        <div className="mt-6 px-14 py-3">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
            <div className="flex gap-4 items-center">
              <Link 
                to='/dashboard' 
                className="text-xl text-white bg-blue-600 flex justify-center items-center rounded-full w-10 h-10 hover:bg-blue-700"
              >
                <IoArrowBack size={20} />
              </Link>
              <button
                onClick={openModal}
                className="text-lg md:text-xl text-white px-3 py-1 bg-blue-600 rounded-md hover:bg-blue-700 flex items-center transition-all duration-300"
              >
                <FaPlus className="mr-2" />
                Create Task
              </button>
            </div>
            <div className="w-full md:w-[30vw]">
              <input
                type="text"
                placeholder="Search tasks..."
                className="px-4 py-2 border border-black rounded-lg w-full outline-none focus:ring-2 focus:ring-black"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-8 mt-8">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard 
                  key={task._id} 
                  taskId={task._id} 
                  title={task.title} 
                  description={task.description} 
                  status={task.status} 
                  createdAt={task.createdAt} 
                  completedAt={task.completedAt} 
                />
              ))
            ) : (
              <h1 className='text-zinc-600 text-3xl w-full mt-10 text-center'>
                {searchQuery ? 'No tasks found' : 'No tasks created yet!'}
              </h1>
            )}
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <div className='flex gap-2 justify-center mt-10 mb-6'>
          {pages.map((page) => (
            <button 
              key={page}
              style={{ backgroundColor: page === currentPage + 1 ? 'blue' : '' }}
              onClick={() => setCurrentPage(page - 1)}
              className='bg-blue-600 text-white py-2 px-3 rounded-md font-semibold hover:bg-blue-700'
            >
              {page}
            </button>
          ))}
        </div>
      )}

      <TaskModal 
        isOpen={isModalOpen} 
        closeModal={closeModal} 
        loading={loading} 
        setLoading={setLoading} 
      />
    </>
  );
};

export default Tasks;