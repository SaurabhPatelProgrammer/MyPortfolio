import React from "react";
import { AiFillInstagram, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
const ContactSection = () => {
  return (
    <div
      data-aos="fade-left"
      className="flex flex-col lg:flex-row lg:items-center mb-20 lg:mb-36 border "
    >
      <span className=" uppercase text-3xl lg:text-2xl font-bold gradient-text mb-8 lg:mb-0 rotate-0 lg:-rotate-90 ">
        Get Started!
      </span>
      <div className=" flex flex-col lg:flex-row lg:ml-20 lg:gap-36">
        <div className=" mb-5 lg:mb-0 ">
          <div className=" lg:mt-28 lg:mr-4">
            <h1 className=" text-5xl lg:text-5xl gradient-text mb-5 lg:mb-4 ">
              Contact me
            </h1>
            <div className=" flex flex-col gap-2 ">
              <a
                href="mailto:sv491009@gmail.com"
                className=" text-white font-mono underline text-lg lg:text-2 "
              >
                sv491009@gmail.com
              </a>
              <a
                href="tel:+918081917007"
                className=" text-white font-mono underline text-lg lg:text-2 "
              >
                +91 8081917007
              </a>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <a href="https://github.com/SaurabhPatelProgrammer">
              {" "}
              <AiFillGithub className=" text-white text-2xl " />
            </a>
            <a href="https://www.linkedin.com/in/saurabh-verma-49bb8a28b/">
              <AiFillLinkedin className=" text-white text-2xl " />
            </a>
            <a href="https://www.instagram.com/cyber_king_saurabh/">
              <AiFillInstagram className=" text-white text-2xl " />
            </a>
          </div>
          <h2 className=" text-2xl font-bold font-mono text-white lg:absolute lg:ml-80">
            OR
          </h2>
        </div>
        <div>
          <form
            action="https://formspree.io/f/mzzbglpq"
            method="POST"
            className=" flex flex-col p-3"
          >
            <input
              type="text"
              name="name"
              id="name "
              placeholder="Enter your name"
              className="  bg-transparent p-3 outline-none border focus:border-purple-500 focus:pl-8 transition-all duration-100 rounded-lg border-white gradient-text font-mono text-lg lg:text2xl mb-5 lg:mb-10 w-full lg:w-[30vw]"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your Email"
              className="  bg-transparent p-3 outline-none border focus:border-purple-500 focus:pl-8 transition-all duration-100 rounded-lg border-white gradient-text font-mono text-lg lg:text2xl mb-5 lg:mb-10 w-full lg:w-[30vw]"
            />
            <textarea
              name="message"
              id="message"
              rows="3"
              className="  bg-transparent p-3 outline-none border focus:border-purple-500 focus:pl-8 transition-all duration-100 rounded-lg border-white gradient-text font-mono text-lg lg:text2xl mb-5 lg:mb-10 w-full lg:w-[30vw]"
              placeholder="Enter your message"
            ></textarea>
            <button
              type="submit"
              className=" px-3 py-2 text-lg lg:text-2xl bg-purple-500 hover:bg-purple-600 border font-bold text-white rounded-lg "
            >
              {" "}
              Send message{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
