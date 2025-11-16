import React from "react";
import { AiFillInstagram, AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const ContactSection = () => {
  return (
    <section
      data-aos="fade-left"
      className="w-full py-20 mb-20 lg:mb-36 flex flex-col items-center"
    >
      {/* Heading */}
      <h1 className="text-5xl lg:text-7xl gradient-text font-bold mb-14 text-center">
        Contact Me
      </h1>

      {/* Main Container */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-start justify-between gap-12 px-5">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          <h2 className="text-3xl text-white font-bold">Get in Touch</h2>

          <p className="text-white/70 text-lg leading-relaxed">
            Whether you have a project idea, opportunity, or just want to say
            hello — feel free to reach out!
          </p>

          {/* Contact Info */}
          <div className="flex flex-col gap-2 mt-3">
            <a
              href="mailto:sv491009@gmail.com"
              className="text-white font-mono underline hover:text-purple-400 text-lg"
            >
              sv491009@gmail.com
            </a>
            <a
              href="tel:+918081917007"
              className="text-white font-mono underline hover:text-purple-400 text-lg"
            >
              +91 8081917007
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <a
              href="https://github.com/SaurabhPatelProgrammer"
              className="text-white text-3xl hover:text-purple-400 transition"
            >
              <AiFillGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/saurabh-verma-49bb8a28b/"
              className="text-white text-3xl hover:text-purple-400 transition"
            >
              <AiFillLinkedin />
            </a>

            <a
              href="https://www.instagram.com/cyber_king_saurabh/"
              className="text-white text-3xl hover:text-purple-400 transition"
            >
              <AiFillInstagram />
            </a>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div
          className="w-full lg:w-1/2 bg-white/10 border border-white/20 backdrop-blur-xl 
                     p-8 rounded-2xl shadow-xl"
        >
          <form
            action="https://formspree.io/f/mzzbglpq"
            method="POST"
            className="flex flex-col gap-6"
          >
            {/* Name Input */}
            <div className="relative">
              <input
                type="text"
                name="name"
                required
                className="
                  w-full p-3 bg-transparent border-b-2 border-white/30 
                  text-white placeholder-white/40 outline-none
                  focus:border-purple-500 transition-all
                "
                placeholder="Your Name"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                className="
                  w-full p-3 bg-transparent border-b-2 border-white/30 
                  text-white placeholder-white/40 outline-none
                  focus:border-purple-500 transition-all
                "
                placeholder="Your Email"
              />
            </div>

            {/* Message Box */}
            <div className="relative">
              <textarea
                name="message"
                rows="4"
                required
                className="
                  w-full p-3 bg-transparent border-b-2 border-white/30 
                  text-white placeholder-white/40 outline-none
                  focus:border-purple-500 transition-all resize-none
                "
                placeholder="Your Message"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="
                px-6 py-3 bg-purple-500 hover:bg-purple-600
                rounded-lg text-white font-semibold text-lg
                shadow-lg hover:shadow-purple-500/30 transition-all
              "
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
