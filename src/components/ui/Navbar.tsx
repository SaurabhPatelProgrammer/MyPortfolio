import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "../../styles/Navbar.css";
import { setSmoother, getSmoother } from "../../utils/smootherRegistry";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const Navbar = () => {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 1025px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper", content: "#smooth-content",
        smooth: 0.6, effects: false, autoResize: true, ignoreMobileResize: true,
      });
      setSmoother(smoother);
      return () => { smoother.kill(); setSmoother(null); };
    });

    const links = document.querySelectorAll<HTMLAnchorElement>(".header ul a");
    const linkBindings: Array<{ el: HTMLAnchorElement; fn: EventListener }> = [];
    links.forEach((element) => {
      const fn: EventListener = (e) => {
        const smoother = getSmoother();
        if (smoother) {
          e.preventDefault();
          const target = e.currentTarget as HTMLAnchorElement;
          const section = target.getAttribute("data-href");
          const s = getSmoother();
          if (section && s) s.scrollTo(section, true, "top top");
        }
      };
      element.addEventListener("click", fn);
      linkBindings.push({ el: element, fn });
    });

    return () => {
      linkBindings.forEach(({ el, fn }) => el.removeEventListener("click", fn));
      media.revert();
    };
  }, []);
  return (
    <>
      {/* Outside the header on purpose: a blend mode can only see the page behind it
          if no ancestor forms its own stacking context. */}
      <a href="/#" className="brand-logo" data-cursor="disable" aria-label="Saurabh Patel, home">
        <Logo className="navbar-logo" />
      </a>
      <header className="header" role="banner">
        <a
          href="mailto:saurabhprpgrammer94@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
          aria-label="Email Saurabh Patel"
        >
          saurabhprpgrammer94@gmail.com
        </a>
        <nav aria-label="Primary">
          <ul>
            <li>
              <a data-href="#about" href="#about" aria-label="Go to About section">
                <HoverLinks text="ABOUT" />
              </a>
            </li>
            <li>
              <a data-href="#work" href="#work" aria-label="Go to Work section">
                <HoverLinks text="WORK" />
              </a>
            </li>
            <li>
              <a data-href="#contact" href="#contact" aria-label="Go to Contact section">
                <HoverLinks text="CONTACT" />
              </a>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </header>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
