import fs from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as icons from 'react-icons/si';

const techs = [
  ['React', 'SiReact', '#61DAFB'], ['Next.js', 'SiNextdotjs', '#000000'],
  ['Node.js', 'SiNodedotjs', '#5FA04E'], ['Express', 'SiExpress', '#000000'],
  ['MongoDB', 'SiMongodb', '#47A248'], ['C++', 'SiCplusplus', '#3178C6'],
  ['TypeScript', 'SiTypescript', '#3178C6'], ['JavaScript', 'SiJavascript', '#F7DF1E'],
  ['Python', 'SiPython', '#3776AB'], ['Linux', 'SiLinux', '#FCC624'],
  ['Docker', 'SiDocker', '#2496ED'], ['Three.js', 'SiThreedotjs', '#000000'],
];
fs.mkdirSync('public/images/tech-stack', { recursive: true });
const entries = techs.map(([label, name, color]) => {
  const image = `/images/tech-stack/${name}.svg`;
  fs.writeFileSync(`public${image}`, renderToStaticMarkup(React.createElement(icons[name], { size: 200, color })));
  return { label, image };
});
fs.writeFileSync('src/data/tech-stack.json', JSON.stringify(entries, null, 2) + '\n');
