import { PropsWithChildren, useEffect, useState } from "react";
import About from "./sections/About";
import Career from "./sections/Career";
import Contact from "./sections/Contact";
import Cursor from "./ui/Cursor";
import Landing from "./sections/Landing";
import Navbar from "./ui/Navbar";
import SocialIcons from "./ui/SocialIcons";
import WhatIDo from "./sections/WhatIDo";
import Work from "./sections/Work";
import Services from "./sections/Services";
import Process from "./sections/Process";
import Credentials from "./sections/Credentials";
import Cta from "./sections/Cta";
import setSplitText from "../utils/splitText";
import { setAllTimeline } from "../utils/GsapScroll";
import { initialFX } from "../utils/initialFX";
import { useLoading } from "../context/loadingContext";
import DeferredTechStack from "./sections/DeferredTechStack";

const MainContainer = ({ children }: PropsWithChildren) => {
  const { isLoading } = useLoading();
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.matchMedia("(min-width: 1025px) and (prefers-reduced-motion: no-preference)").matches
  );

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1025px) and (prefers-reduced-motion: no-preference)");
    const update = () => setIsDesktopView(desktop.matches);
    desktop.addEventListener("change", update);
    return () => desktop.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let cleanupText: (() => void) | undefined;
    let cleanupCareer: (() => void) | undefined;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      cleanupText = setSplitText();
      cleanupCareer = setAllTimeline();
    });
    return () => { cancelled = true; cleanupText?.(); cleanupCareer?.(); };
  }, []);

  useEffect(() => {
    if (!isLoading) return initialFX();
  }, [isLoading]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Services />
            <Career />
            <Process />
            <Credentials />
            <Work />
            <DeferredTechStack />
            <Cta />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
