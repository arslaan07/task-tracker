import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";
import TaskCard from "../Components/TaskCard";
import TaskModal from "../Components/TaskModal";
const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className=" mt-6 px-14 py-3">
        <div className=" pt-4 flex gap-6">
          <button className=" relative text-3xl text-white bg-blue-600 flex justify-center 
          items-center rounded-full w-[60px] h-[60px] hover:bg-blue-700">
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
              <IoArrowBack size={40} />
            </span>
          </button>
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
            <TaskCard />
            <TaskCard />
            <TaskCard />
        </div>
      </div>
      <TaskModal isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default Tasks;
