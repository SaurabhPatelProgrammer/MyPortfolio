import React from "react";
import ProjectCard from "../Components/ProjectCard";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { useRef } from "react";
import socialmedia from "../assets/socialmedia.png";
import aboutday from "../assets/aboutday.png";
import fullstacktodo from "../assets/fullstacktodo.png";
import noteselling from "../assets/noteselling.jpg";
function ProjectSecton() {
  const scrollRef = useRef(null);

  const hscrollRight = () => {
    scrollRef.current.scrollLeft += 500;
  };

  const hscrollLeft = () => {
    scrollRef.current.scrollLeft -= 500;
  };
  return (
    <div data-aos="fade-down" className=" mb-20 lg:mb-36">
      <h1 className=" text-5xl lg:text-7xl gradient-text mb-10 ">
        My Projects
      </h1>
      <div
        ref={scrollRef}
        className=" flex overflow-x-scroll gap-8 lg:p-3 scroll-hide"
      >
        <ProjectCard
          image={socialmedia}
          title={"social media"}
          des={
            " An Instagram clone app for sharing your moments, connecting withfriends, and exploring the world through photos and videos"
          }
        />
        <ProjectCard
          image={fullstacktodo}
          title={"fullStack TODO "}
          des={
            "A full-stack to-do app for managing tasks, prioritizing goals, and boosting productivity across multiple devices seamlessly"
          }
        />
        <ProjectCard
          image={noteselling}
          title={"Notes Sell"}
          des={
            "A platform for selling and buying academic notes, connecting students and facilitating access to quality educational resources."
          }
        />
        <ProjectCard
          image={aboutday}
          title={"about day"}
          des={
            "An app to help users track, plan, and celebrate each day with unique themes and activities, making everyday special."
          }
        />
      </div>
      <div className=" flex justify-center items-center gap-3 mt-2 select-none">
        <HiArrowSmLeft
          onClick={hscrollLeft}
          className=" text-xl lg:text-2xl cursor-pointer text-yellow-500 hidden lg:block"
        />
        <h2 className="gradient-text font-mono text-lg uppercase ">
          Slide for more
        </h2>
        <HiArrowSmRight
          onClick={hscrollRight}
          className=" text-xl lg:text-2xl cursor-pointer text-yellow-500 hidden lg:block"
        />
      </div>
    </div>
  );
}

export default ProjectSecton;
