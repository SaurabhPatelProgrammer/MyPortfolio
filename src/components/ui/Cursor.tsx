import { useEffect, useRef } from "react";
import "../../styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const media = gsap.matchMedia();
    media.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power2.out" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power2.out" });
      const onMove = (event: PointerEvent) => { xTo(event.clientX); yTo(event.clientY); };
      const onOver = (event: PointerEvent) => {
        const target = event.target instanceof Element ? event.target.closest("[data-cursor]") : null;
        cursor.classList.toggle("cursor-disable", target?.getAttribute("data-cursor") === "disable");
      };
      document.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver);
      return () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        xTo.tween.kill();
        yTo.tween.kill();
        gsap.set(cursor, { clearProps: "transform" });
      };
    });
    return () => media.revert();
  }, []);
  return <div className="cursor-main" ref={cursorRef} aria-hidden="true" />;
};
export default Cursor;
