import { useLayoutEffect, useRef } from "react";
import "../../styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../../data/projects";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1025px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const container = section.querySelector<HTMLElement>(".work-container")!;
      const track = section.querySelector<HTMLElement>(".work-flex")!;
      section.classList.add("work-horizontal");
      const distance = () => Math.max(0, track.scrollWidth - container.clientWidth + parseFloat(getComputedStyle(track).marginLeft || "0"));
      gsap.to(track, {
        x: () => -distance(), ease: "none",
        scrollTrigger: {
          trigger: section, start: "top top", end: () => "+=" + Math.max(1, distance()),
          scrub: true, pin: true, anticipatePin: 1, invalidateOnRefresh: true, id: "work",
          onToggle: self => section.classList.toggle("work-pinned", self.isActive),
        },
      });
      return () => section.classList.remove("work-horizontal", "work-pinned");
    }, section);
    return () => media.revert();
  }, []);
  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((p) => (
            <div key={p.id} className="work-box">
              <div className="work-info">
                <div className="work-title">
                  <h3>{p.id}</h3>
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{p.tools}</p>
                <p>{p.description}</p>
                <details className="project-details">
                  <summary>Read project details</summary>
                  {Object.entries(p.details).map(([label, text]) => <p key={label}><strong>{label}: </strong>{text}</p>)}
                </details>
                {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" data-cursor="disable">View source on GitHub ↗</a>}
                {!p.link && <p>Archived local build — preview only</p>}
              </div>
              <WorkImage image={p.image} alt={p.alt} link={p.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
