import data from "../../data/skills.json";
import "../../styles/Extra.css";
const Services = () => <section className="extra-section section-container" aria-labelledby="services-title">
  <h2 id="services-title" className="extra-title">Software, AI and <span>automation</span></h2>
  <div className="process-grid">{data.services.map(s => <article key={s.id} className="process-card"><span className="process-num">{s.number}</span><h3>{s.title}</h3><p>{s.description}</p><ul>{s.features.map(f => <li key={f}>{f}</li>)}</ul></article>)}</div>
  <div className="skills-grid">{data.skillGroups.map(g => <div key={g.title}><h3>{g.title}</h3><p>{g.items.join(" · ")}</p></div>)}</div>
</section>;
export default Services;
