import React from "react";
import patel from "../assets/patel.jpg";
import resume from "../assets/resume.pdf";

export default function HomeCard() {
  return (
    <section className="w-full text-white pt-10 pb-20">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-xl font-semibold tracking-wide">Saurabh Pat</h1>

        <button className="
          px-5 py-2 rounded-xl
          bg-gradient-to-r from-blue-500 to-purple-500 
          text-white font-semibold shadow-lg shadow-purple-400/20
          hover:scale-105 transition-all
        ">
          Hire Me
        </button>
      </div>

      {/* MAIN CENTER CONTENT */}
      <div className="flex flex-col items-center text-center gap-6">

        {/* MAIN TITLE */}
        <h2 className="
          text-4xl md:text-5xl lg:text-6xl font-extrabold 
          bg-gradient-to-r from-blue-300 via-blue-200 to-purple-300 
          text-transparent bg-clip-text leading-tight tracking-wide
        ">
          Building Digital <br />
          Products for <br />
          Ambitious Businesses
        </h2>

        {/* CTA BUTTON */}
        <a href="#contact">
          <button className="
            px-8 py-3 text-lg rounded-xl 
            bg-white/10 border border-white/20 backdrop-blur-lg
            hover:bg-white/20 transition-all
          ">
            Discuss <span className="text-blue-300">Your Project</span>
          </button>
        </a>
      </div>

      {/* BOTTOM SECTION */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ABOUT CARD */}
        <div className="
          bg-white/5 border border-white/10 backdrop-blur-xl 
          p-6 rounded-2xl shadow-lg flex flex-col items-start gap-4
        ">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
            <img src={patel} alt="profile" className="w-full h-full object-cover rounded-full" />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-1">About Me</h3>
            <p className="text-gray-300">
              Saurabh Patel <br />
              Freelance Software Engineer specializing in SaaS, AI, and modern Web Apps.
            </p>
          </div>

          <div className="text-sm text-gray-400 mt-3 space-y-1">
            <p>email@example.com</p>
            <p>github.com/saurabh</p>
          </div>

          <div className="flex gap-3 text-sm mt-3">
            <span className="px-3 py-1 rounded-full bg-white/10">React</span>
            <span className="px-3 py-1 rounded-full bg-white/10">AI</span>
            <span className="px-3 py-1 rounded-full bg-white/10">Electron</span>
          </div>
        </div>

        {/* CUSTOM SAAS SOLUTIONS */}
        <div className="
          bg-white/5 border border-white/10 backdrop-blur-xl 
          p-6 rounded-2xl shadow-lg flex flex-col justify-between
        ">
          <div className="text-5xl mb-4">💻</div>
          <h3 className="text-xl font-semibold">
            Custom <span className="text-blue-300">SaaS</span> Solutions
          </h3>
          <p className="text-gray-300 mt-2">
            End-to-end SaaS product development tailored for modern businesses.
          </p>
        </div>

        {/* AI AUTOMATION */}
        <div className="
          bg-white/5 border border-white/10 backdrop-blur-xl 
          p-6 rounded-2xl shadow-lg flex flex-col justify-between
        ">
          <div className="text-5xl mb-4">🤖</div>
          <h3 className="text-xl font-semibold">
            AI-Powered Automation
          </h3>
          <p className="text-gray-300 mt-2">
            Smarter workflows using AI tools, intelligent systems & automation pipelines.
          </p>
        </div>
      </div>

    </section>
  );
}
