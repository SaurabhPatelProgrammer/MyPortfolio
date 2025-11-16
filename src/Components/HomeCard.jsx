import React from "react";
import patel from "../assets/patel.jpg";
import resume from "../assets/resume.pdf";

export default function HomeCard() {
  return (
    <section className="flex flex-col lg:flex-row gap-10 justify-between items-center mb-20 lg:mb-36">

      {/* LEFT SIDE CONTENT */}
      <div data-aos="fade-up-right" className="flex flex-col gap-6 lg:w-[50%]">

        {/* Greeting */}
        <h1 className="text-5xl lg:text-7xl gradient-text font-extrabold tracking-wide">
          Hey, I'm Saurabh
        </h1>

        {/* Short Intro */}
        <p className="text-gray-300 text-lg font-light leading-relaxed">
          I’m a <span className="text-purple-400 font-semibold">Web Developer </span> 
          and <span className="text-purple-400 font-semibold"> Cybersecurity Enthusiast </span> 
          from Uttar Pradesh. I design and build modern, secure, and user-friendly web applications.
        </p>

        {/* Professional Highlight Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-xl shadow-lg">
          <p className="text-gray-300 text-base leading-relaxed">
            With experience in <span className="text-pink-400">UI/UX design</span>, 
            <span className="text-pink-400"> full-stack development</span>, 
            and <span className="text-pink-400">digital security</span>,  
            I combine creativity with technical expertise to build 
            impactful digital solutions. I'm currently pursuing BCA in 
            Cybersecurity & Digital Forensics at BBD University.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-4 mt-3">
          <a href={resume} download>
            <button className="
              px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600
              rounded-lg text-white font-semibold shadow-lg 
              hover:scale-105 hover:shadow-purple-500/30 transition-all
            ">
              Download CV
            </button>
          </a>

          <a href="#contact">
            <button className="
              px-5 py-3 border border-purple-400 text-purple-300 
              font-semibold rounded-lg hover:bg-purple-500/20 
              hover:scale-105 transition-all backdrop-blur-md
            ">
              Contact Me
            </button>
          </a>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div data-aos="fade-up-left" className="relative group">
        <div className="
          absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-400/30 
          rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-all
        "></div>

        <img
          src={patel}
          alt="Saurabh Verma"
          className="
            relative w-[260px] h-[260px] lg:w-[420px] lg:h-[420px]
            rounded-3xl  shadow-2xl border border-white/20 
          "
        />
      </div>

    </section>
  );
}
