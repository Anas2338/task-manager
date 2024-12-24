"use client";

import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';

export default function Home (){
  const [tasks, setTasks] = useState<{ title: string; id: string }[]>([]);

  const inputReference = useRef<HTMLInputElement>(null);

  const HandleAddTask = () => {
    const inputValue = inputReference?.current?.value as string;
    if (!inputValue){
      return toast.warn('Please Entre Tasks', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
      
    }
    setTasks ([{title:inputValue, id:nanoid()},...tasks]);
    if(inputReference.current){
      inputReference.current.value = ''
    }
    toast.success('Added Successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
  };

  function OnKeyEnter (my_key:{key:string})  {
    if(my_key.key === 'Enter'){
      HandleAddTask();
    }
  };

  function DeleteTask (e:string){
    const newArray =  tasks.filter((elem)=> elem.id !== e);
    setTasks(newArray);
    toast.error('Task Deleted!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
  };

  return(
    <div>
      <div className="w-screen h-[50px] bg-cyan-800">
        <h1 className="font-sans text-[#FFFFFF] font-bold text-[30px] text-center">Task Manager</h1>
      </div>
      <div className="flex flex-col gap-2 py-2  justify-between px-4 sm:px-10">
        <input className="h-[50px] w-auto  border-2 border-black  rounded-lg px-5" placeholder="Add Task Here" ref={inputReference} onKeyDown={OnKeyEnter}/>
        <button className="h-[50px] sm:h-[70px] bg-cyan-900 text-[#FFFFFF] rounded-2xl px-6 text-nowrap" onClick={HandleAddTask}>Add Task</button>
      </div>
      <div className="w-auto h-1 border-2 border-gray-600 mx-4 mt-3"></div>
      <div className=" mx-5 rounded-lg mt-8 ">
        <ul className="md:grid sm:grid-cols-2 gap-4">
        {tasks.length == 0? <h1 className="font-sans font-bold text-[22px] text-center mt-10">No Task Available!</h1> : tasks.map((elem, index)=>{
          return <li className="bg-cyan-800 mt-2 h-[40px] rounded-xl text-[#FFFFFF] pl-5 py-2 flex justify-between px-4 sm:h-[80px] sm:py-6 sm:px-12 " key={elem.id}>{index + 1} {elem.title} <button onClick={()=>{DeleteTask(elem.id)}} className="bg-orange-600 px-3 rounded-xl">Delete</button></li>;
        })}
        </ul>
      </div>
      <ToastContainer />
    </div>
  )
}