import assert from 'node:assert/strict';
import fs from 'node:fs';

const projects = JSON.parse(fs.readFileSync('src/data/project-details.json', 'utf8'));
assert.equal(projects.length, 6, 'All six original projects must be retained');
assert.equal(new Set(projects.map(p => p.id)).size, projects.length);
for (const p of projects) {
  assert(fs.existsSync(`public${p.image}`), `Missing project image: ${p.image}`);
  for (const key of ['title', 'tagline', 'description', 'challenge', 'solution', 'outcome', 'status']) assert(p[key], `${p.id}: missing ${key}`);
  for (const link of [p.demo, p.github].filter(Boolean)) assert.equal(new URL(link).protocol, 'https:');
}
const resume = fs.readFileSync('public/resume/Saurabh_Patel.pdf');
assert.equal(resume.subarray(0, 5).toString(), '%PDF-');
const techs = JSON.parse(fs.readFileSync('src/data/tech-stack.json', 'utf8'));
for (const tech of techs) assert(fs.existsSync(`public${tech.image}`), `Missing technology icon: ${tech.image}`);
const htmlFiles = ['index.html', ...fs.readdirSync('public').filter(f => f.endsWith('.html')).map(f => `public/${f}`)];
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  assert(!/shoaibahmedsoomro|soomro\.shoaibahmed|Asico|University of Sindh|IT Infrastructure Engineer/i.test(html), `Old profile remains in ${file}`);
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"#?]+)"/g)) {
    if (url === '/' || url.startsWith('/src/')) continue;
    assert(fs.existsSync(`public${url}`) || fs.existsSync(`public${url}.html`), `Broken asset or page in ${file}: ${url}`);
  }
}
console.log('Content checks passed: six projects, original details, images, resume and local HTML links.');
