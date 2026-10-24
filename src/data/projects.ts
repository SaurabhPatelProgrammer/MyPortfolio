import details from "./project-details.json";
export const projects = details.map((p, i) => ({
  id: String(i + 1).padStart(2, "0"), title: p.title,
  category: p.category + " · " + p.status,
  tools: p.tech.join(", "), image: p.image, alt: p.tagline,
  link: p.demo || p.github || undefined,
  description: p.tagline, github: p.github,
  details: { description: p.description, challenge: p.challenge, solution: p.solution, outcome: p.outcome },
}));
