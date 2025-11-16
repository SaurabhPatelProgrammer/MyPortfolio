import React, { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

import socialmedia from "../assets/socialmedia.png";
import aboutday from "../assets/aboutday.png";
import fullstacktodo from "../assets/fullstacktodo.png";
import noteselling from "../assets/noteselling.jpg";

export default function ProjectSection() {
  const scrollRef = useRef(null);

  const hscrollRight = () => {
    scrollRef.current.scrollLeft += 500;
  };

  const hscrollLeft = () => {
    scrollRef.current.scrollLeft -= 500;
  };

  return (
    <section data-aos="fade-down" className="mb-20 lg:mb-36">
      <h1 className="text-5xl lg:text-7xl gradient-text mb-10">My Projects</h1>

      {/* SCROLLABLE CARD ROW */}
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll gap-8 p-3 scroll-hide"
      >
        <ProjectCard
          image={socialmedia}
          title="Social Media App"
          des="An Instagram-like app for sharing moments, connecting with friends, and exploring creative posts. Fully responsive with modern UI."
          github="#"
          live="#"
        />

        <ProjectCard
          image={fullstacktodo}
          title="FullStack TODO App"
          des="A complete MERN TODO app with login, task management, smooth UI, API support, authentication, role-based access and more."
          github="#"
          live="#"
        />

        <ProjectCard
          image={noteselling}
          title="Notes Selling Platform"
          des="A platform for buying and selling academic notes, allowing students to upload, manage and download study materials securely."
          github="#"
          live="#"
        />

        <ProjectCard
          image={aboutday}
          title="About Day App"
          des="Track and plan your day with themed activities, reminders, and a clean UI. A daily motivation and productivity boosting app."
          github="#"
          live="#"
        />
      </div>

      {/* SCROLL ARROWS */}
      <div className="flex justify-center items-center gap-3 mt-2 select-none">
        <HiArrowSmLeft
          onClick={hscrollLeft}
          className="text-2xl cursor-pointer text-yellow-500 hidden lg:block"
        />

        <h2 className="gradient-text font-mono text-lg uppercase">
          Slide for more
        </h2>

        <HiArrowSmRight
          onClick={hscrollRight}
          className="text-2xl cursor-pointer text-yellow-500 hidden lg:block"
        />
      </div>
    </section>
  );
}
