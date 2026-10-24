import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import "../../styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:saurabhprpgrammer94@gmail.com" data-cursor="disable">
                saurabhprpgrammer94@gmail.com
              </a>
            </p>
            <h4>Location</h4>
            <p>Ambedkar Nagar, Uttar Pradesh, India. Open to software roles and client projects.</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/SaurabhPatelProgrammer"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              <FaGithub aria-hidden="true" /> Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/saurabh-verma-49bb8a28b"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              <FaLinkedinIn aria-hidden="true" /> Linkedin <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Portfolio of <br /> <span>Saurabh Patel</span>
            </h2>
            <h5>
              <MdCopyright /> {new Date().getFullYear()}
            </h5>
            <nav className="contact-legal" aria-label="Legal">
              <a href="/privacy" data-cursor="disable">Privacy</a>
              <a href="/terms" data-cursor="disable">Terms</a>
              <a href="/disclaimer" data-cursor="disable">Disclaimer</a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
