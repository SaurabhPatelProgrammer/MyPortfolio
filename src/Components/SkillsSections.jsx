import React from 'react'
import SkillsCard from './SkillsCard'

const SkillsSections = () => {
  return (
    <div data-aos="fade-right" className=' mb-20 lg:mb-36 '>
        <h1 className=' text-5xl lg:text-7xl gradient-text mb-10 '> MY Skills</h1>
        <div className=' h-[300px] overflow-y-scroll  select-nones scroll-bar'>
        < SkillsCard  title={"React js "} value={75}/>
        < SkillsCard  title={"Next js"} value={50}/>
        < SkillsCard  title={" tailwind css "} value={60}/>
        < SkillsCard  title={" mongodb"} value={55}/>
        < SkillsCard  title={"Node js "} value={77}/>
        < SkillsCard  title={"Express js "} value={90}/>
        < SkillsCard  title={"Python  "} value={50}/>
        < SkillsCard  title={"Linux  "} value={50}/>
        </div>
    </div>
  )
}

export default SkillsSections