import "../../styles/About.css";
const About = () => (
  <div className="about-section" id="about">
    <div className="about-me">
      <h3 className="title">About Me</h3>
      <img className="profile-photo" src="/images/saurabh-patel.jpg" alt="Saurabh Patel" width="120" height="120" loading="lazy" />
      <p className="para">I am Saurabh, a software developer from Ambedkar Nagar. I build full-stack applications, AI experiments and practical digital products, connecting interfaces, APIs and data into experiences that feel simple.</p>
      <ul className="about-facts" aria-label="Quick facts">
        <li><strong>BCA</strong> Cyber Security &amp; Forensics</li>
        <li><strong>MERN</strong> development</li>
        <li><strong>SHYRA</strong> modular AI experiment</li>
        <li><strong>Open</strong> to roles and client projects</li>
      </ul>
    </div>
  </div>
);
export default About;
