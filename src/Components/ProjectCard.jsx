import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiFillGithub } from "react-icons/ai";
import { RiExternalLinkFill } from "react-icons/ri";

export default function ProjectCard({ image, title, des, github, live }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="
        relative w-[260px] md:w-[300px] 
        h-[400px] 
        bg-[#0f0f0f]/70 border border-white/10 
        rounded-2xl overflow-hidden backdrop-blur-xl
        shadow-xl hover:shadow-2xl hover:-translate-y-1 
        transition-all cursor-pointer group"
    >

      {/* IMAGE */}
      <div className="w-full h-40 overflow-hidden">
        <img
          src={image}
          alt="project"
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-2 h-[200px]">
        <h2 className="text-xl font-semibold text-white leading-tight">
          {title}
        </h2>

        {/* DESCRIPTION */}
        <p
          className={`
            text-white/70 text-sm leading-relaxed transition-all duration-300
            ${expanded ? "line-clamp-none" : "line-clamp-2"}
          `}
        >
          {des}
        </p>

        {/* VIEW MORE / LESS */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-pink-400 text-sm underline hover:text-purple-300 w-fit"
        >
          {expanded ? "View Less" : "View More"}
        </button>
      </div>

      {/* FIXED FOOTER */}
      <div
        className="
          absolute bottom-0 left-0 right-0 
          h-12 
          flex items-center justify-between 
          px-5 
          border-t border-white/10 
          bg-[#000]/40 backdrop-blur-lg
        "
      >
        <a href={github} target="_blank" className="text-pink-400 hover:text-purple-300 text-2xl">
          <AiFillGithub />
        </a>

        <a href={live} target="_blank" className="text-pink-400 hover:text-purple-300 text-2xl">
          <RiExternalLinkFill />
        </a>
      </div>
    </motion.div>
  );
}
