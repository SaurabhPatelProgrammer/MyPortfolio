import gsap from "gsap";

export function initialFX() {
  document.body.style.overflowY = "auto";
  const media = gsap.matchMedia();
  media.add({
    motion: "(prefers-reduced-motion: no-preference)",
    reduced: "(prefers-reduced-motion: reduce)",
  }, context => {
    const targets = [".landing-intro h2", ".landing-intro h1", ".landing-info h3", ".landing-info-h2", ".header", ".icons-section", ".nav-fade"];
    gsap.set([".landing-h2-info-1", ".landing-h2-2"], { autoAlpha: 0 });
    if (context.conditions?.reduced) {
      gsap.set(targets, { opacity: 1, y: 0 });
    } else {
      gsap.fromTo(targets, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: "power2.out" });
      // Animate complete words; avoid per-letter elements and blur repainting.
      gsap.timeline({ repeat: -1, repeatDelay: 3, scrollTrigger: { trigger: ".landing-section", start: "top bottom", end: "bottom top", toggleActions: "play pause resume pause" } })
        .set([".landing-h2-info-1", ".landing-h2-2"], { autoAlpha: 0, yPercent: 100 })
        .to([".landing-h2-info", ".landing-h2-1"], { autoAlpha: 0, yPercent: -100, duration: 0.45 }, "+=3")
        .to([".landing-h2-info-1", ".landing-h2-2"], { autoAlpha: 1, yPercent: 0, duration: 0.45 }, "<")
        .to([".landing-h2-info-1", ".landing-h2-2"], { autoAlpha: 0, yPercent: -100, duration: 0.45 }, "+=3")
        .fromTo([".landing-h2-info", ".landing-h2-1"], { yPercent: 100 }, { autoAlpha: 1, yPercent: 0, duration: 0.45 }, "<");
    }
  });
  return () => media.revert();
}
