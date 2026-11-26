import "../../styles/About.css";
const About = () => (
  <div className="about-section" id="about">
    <div className="about-me">
      <h3 className="title">About Me</h3>
      <img className="profile-photo" src="/images/saurabh-patel.jpg" alt="Saurabh Patel" width="120" height="120" loading="lazy" />
      <p className="para">I am Saurabh, a software developer from Ambedkar Nagar. I build full-stack applications and explore email automation with n8n. I’m planning Taarloom OS, an AI operating system. One problem I want to explore is how an assistant can resume a task across apps after an interruption and tell which actions have already succeeded.</p>
      <p className="para">Live websites I’ve worked on include{" "}
        <a href="https://shikshase.com">ShikshaSe.com</a>,{" "}
        <a href="https://wedecor4u.com">wedecor4u.com</a>, and{" "}
        <a href="https://luxtronics.com">luxtronics.com</a>.
      </p>
      <ul className="about-facts" aria-label="Quick facts">
        <li><strong>BCA</strong> Cyber Security &amp; Forensics</li>
        <li><strong>MERN</strong> development</li>
        <li><strong>SHYRA</strong> modular AI experiment</li>
        <li><strong>Open</strong> to AI and automation internships</li>
      </ul>
    </div>
  </div>
);
export default About;
