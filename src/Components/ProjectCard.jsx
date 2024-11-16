import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { RiSignalTowerFill } from "react-icons/ri";
function ProjectCard(props) {
  return (
    <div className=" p-4 m-4">
      <div className=" h-[450px]  w-[275px]  md:w-[320px] border-2 border-gray-200  border-opacity-60 rounded-2xl overflow-clip lg:overflow-hidden hover:shadow-md lg:hover:scale-105 transition-all backdrop-blur-3xl shadow-xl">
        <a href="">
          <img
            src={props.image}
            alt="project image"
            className=" lg:h-48 h-[200px] w-full object-cover object-center"
          />
        </a>
        <div className=" p-4 flex flex-col lg:gap-3">
          <div className=" ">
            <h2 className="  tracking-widest text-2xl text-white">
              {props.title}
            </h2>
          </div>
          <h1 className=" text-lg lg:text-xl font-bold text-gray-400 ">
            {props.des}
          </h1>
          <div className=" flex  items-center justify-between  ">
            <a href="#">
              <AiFillGithub className=" text-pink-500 font-bold inline-flex items-center text-lg md:text-xl mb-2 lg:mb-0  hover:text-purple-600 cursor-pointer " />
            </a>
            <a href="#">
              <RiSignalTowerFill className=" text-pink-500 font-bold inline-flex items-center text-lg md:text-xl mb-2 lg:mb-0  hover:text-purple-600 cursor-pointer  " />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
