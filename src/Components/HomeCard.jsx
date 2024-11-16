import React from "react";
// import saurabverma from "../assets/saurabverma.jpg";
import patel from "../assets/patel.jpg";
import resume from "../assets/resume.pdf";
// import saurabhverma from "../assets/saurabhverma.jpg";
function HomeCard() {
  return (
    <div className=" flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between items-center mb-20 lg:mb-36">
      <div data-aos="fade-up-right" className="flex flex-col gap-5 lg:w-[50%]">
        <h1 className="text-5xl lg:text-7xl mb-10 gradient-text">Hey!</h1>
        <p className=" text-gray-300 text-lg lg:2xl font-serif  ">
          I am Saurabh Verma from Ambedkar Nagar, Uttar Pradesh. I completed my
          12th grade at Chandi Prasad Mishra Akshhay Chanda Rashtriya Inter
          College, Tenduaikalan, Ambedkar Nagar, Uttar Pradesh, and I am
          currently pursuing a Bachelor of Computer Applications (BCA) in
          Cybersecurity and Digital Forensics at BBD University.
        </p>
        <p className=" text-gray-300 text-lg lg:2xl font-serif ">
          Experienced Web Designer with a strong background in web design and
          development. Passionate about creating visually appealing and
          user-friendly web interfaces, I have collaborated with development
          teams to seamlessly integrate design elements. Proficient in
          programming and database management techniques, I have enhanced web
          designs' interactivity and optimized application performance. My BCA
          in Cyber Security & Forensics provides a solid foundation in security
          standards and digital assets, complementing my skills in Python
          programming and computer networking. Eager to leverage my expertise in
          web development as a Web Developer, I am committed to delivering
          high-quality, innovative solutions that meet and exceed client
          expectations.{" "}
        </p>
        <a href={resume} download={true}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
            Download CV
          </button>
        </a>
      </div>
      <div data-aos="fade-up-left" className=" mt-24">
        <img
          src={patel}
          alt="Saurabh verma"
          className=" rounded-lg w-[250px] h-[250px] lg:w-[450px] lg:h-[450px] mx-auto"
        />
      </div>
    </div>
  );
}

export default HomeCard;
