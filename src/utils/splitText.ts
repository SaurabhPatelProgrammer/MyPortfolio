import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Reveal whole elements: no DOM splitting or rebuild on scroll refresh/resize.
export default function setSplitText() {
  const media = gsap.matchMedia();
  media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
    document.querySelectorAll<HTMLElement>(".para, .title").forEach(element => {
      gsap.from(element, {
        opacity: 0, y: 28, duration: 0.65, ease: "power2.out",
        scrollTrigger: { trigger: element, start: "top 90%", once: true },
      });
    });
  });
  return () => media.revert();
}
