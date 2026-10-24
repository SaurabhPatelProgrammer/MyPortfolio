import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";
import "../../styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {

  return (
    <div className="icons-section">
      <nav className="social-icons" data-cursor="icons" id="social" aria-label="Social links">
        <span>
          <a
            href="https://github.com/SaurabhPatelProgrammer"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <FaGithub aria-hidden="true" />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/saurabh-verma-49bb8a28b"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <FaLinkedinIn aria-hidden="true" />
          </a>
        </span>
      </nav>
      <a
        className="resume-button"
        href="/resume/Saurabh_Patel.pdf"
        download="Saurabh_Patel_Resume.pdf"
        aria-label="Download résumé as PDF"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes aria-hidden="true" />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
