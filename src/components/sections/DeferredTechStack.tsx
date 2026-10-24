import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLoading } from "../../context/loadingContext";
import skills from "../../data/skills.json";

const TechStack = lazy(() => import("./TechStack"));

const DeferredTechStack = () => {
  const ref = useRef<HTMLElement>(null);
  const [nearby, setNearby] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const { isLoading } = useLoading();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (isLoading || reduced || !ref.current) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setNearby(true); observer.disconnect(); }
    }, { rootMargin: "600px" });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isLoading, reduced]);
  const fallback = <div className="tech-fallback">{skills.skillGroups.flatMap(g => g.items).filter((item, i, all) => all.indexOf(item) === i).map(item => <span key={item}>{item}</span>)}</div>;
  return <section className="techstack" ref={ref} aria-labelledby="techstack-title">
    <h2 id="techstack-title">My tech stack</h2>
    {nearby && !reduced ? <Suspense fallback={fallback}><TechStack fallback={fallback} /></Suspense> : fallback}
  </section>;
};
export default DeferredTechStack;
