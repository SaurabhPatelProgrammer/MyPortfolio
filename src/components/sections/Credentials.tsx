import "../../styles/Extra.css";
import { LuGraduationCap, LuShieldCheck } from "react-icons/lu";
const Credentials = () => (
  <section className="extra-section section-container" id="credentials" aria-labelledby="cred-title">
    <h2 id="cred-title" className="extra-title">Education and <span>foundation</span></h2>
    <ul className="cred-grid">
      <li className="cred-card"><LuGraduationCap aria-hidden="true" className="cred-icon" /><div><h3>Bachelor of Computer Applications</h3><p>Cyber Security &amp; Forensics</p></div></li>
      <li className="cred-card"><LuShieldCheck aria-hidden="true" className="cred-icon" /><div><h3>Security-aware engineering</h3><p>Interfaces, APIs, authentication and data flows built with a security-aware mindset.</p></div></li>
    </ul>
  </section>
);
export default Credentials;
