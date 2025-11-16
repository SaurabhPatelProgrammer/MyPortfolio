import React from "react";
import SkillCard from "./SkillsCard.jsx";

const skills = [
  {
    title: "React.js",
    description:
      "Building dynamic UI with reusable components, hooks, and advanced state handling.",
  },
  {
    title: "Next.js",
    description:
      "Experience with SSR, SSG, API routes, and performance-optimized full-stack apps.",
  },
  {
    title: "Tailwind CSS",
    description:
      "Crafting modern, responsive and clean UI with utility-first design principles.",
  },
  {
    title: "JavaScript",
    description:
      "Strong understanding of ES6+, async programming, DOM logic & architecture patterns.",
  },
  {
    title: "Node.js",
    description:
      "Building scalable backend services, REST APIs, authentication & business logic.",
  },
  {
    title: "MongoDB",
    description:
      "Schema design, CRUD operations, data modeling & efficient Mongo queries.",
  },
  {
    title: "Python",
    description:
      "Automation, scripting, data handling and backend logic using Python.",
  },
  {
    title: "Linux",
    description:
      "Command-line usage, system navigation, permissions, and server environment basics.",
  },
  {
    title: "Git & GitHub",
    description:
      "Branching, merging, pull requests, version management and workflow organization.",
  },
];

export default function SkillsSection() {
  return (
    <section className="w-full py-20" id="skills">
      <h1 className="text-5xl lg:text-6xl font-bold text-center gradient-text mb-12">
        My Skills
      </h1>

      {/* Modern Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 px-6">
        {skills.map((skill, index) => (
          <SkillCard
            key={index}
            title={skill.title}
            description={skill.description}
          />
        ))}
      </div>
    </section>
  );
}
