import React, { useEffect } from 'react'
import PortfolioCard from '../Components/PortfolioCard'
import HomeCard from '../Components/HomeCard'
import AboutCard from '../Components/AboutCard'
import SkillsSections from '../Components/SkillsSections'
import ProjectSection from "../Components/ProjectSecton"
import ContactSection from "../Components/ContactSection"
import AOS from 'aos';
import 'aos/dist/aos.css';


const Home = () => {
  useEffect(()=>{
    AOS.init({
      duration:1500,
    });
  },[])
  return (
   <div className='w-[80vw] mx-auto'>
   <PortfolioCard />
   <HomeCard />
   <AboutCard />
   <SkillsSections />
   <ProjectSection />
   <ContactSection />
   </div>
  )
}

export default Home