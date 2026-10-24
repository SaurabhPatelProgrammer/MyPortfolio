# Saurabh Patel — 3D Portfolio

Interactive React + TypeScript portfolio with Three.js, GSAP, responsive sections and light/dark themes.
Content and assets migrated from SaurabhPatelProgrammer/MyPortfolio. The original repository history is preserved in the destination repository.

## Development

Use Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
npm run lint
npm test
npm run check:content
npm run build
```

Deploy the generated dist folder. Vercel uses the included configuration and clean URLs for legal pages.
Older /about, /projects, /services and /contact links redirect to the corresponding page sections.

## Content

- Projects: src/data/project-details.json (all six original projects, descriptions, technologies and source/demo links).
- Journey: src/data/career.json. These are learning stages, not claimed employment.
- Profile and education: About.tsx and Credentials.tsx.
- Resume: public/resume/Saurabh_Patel.pdf (original supplied document).
- Contact: Navbar.tsx, SocialIcons.tsx, Contact.tsx and Cta.tsx.

## Motion and performance

Desktop mouse users get scroll smoothing and horizontal projects. Touch and reduced-motion users get native scrolling and vertical projects. Reduced motion shows a static technology list.
The physics section imports only within 600 pixels of the viewport; simulation stops when offscreen or the tab is hidden.
Technology icons are pre-rendered SVGs. Run `node scripts/build-tech-icons.mjs` to regenerate their assets and data.
Canvas textures use 512 × 384 pixels, with 20 desktop or 10 mobile bodies and no post-processing.
The remaining large deferred bundle includes the physics WASM runtime; splitting files alone does not remove that cost.
Lifecycle and scroll regression tests run in Node without a real browser or GPU. Real-device FPS and visual profiling remain unverified.

Contact: saurabhprpgrammer94@gmail.com (spelling retained from the original portfolio).
Website: https://saurabhpatel.vercel.app

## Credits

3D design adapted from ShoaibAhmedSoomro/Shoaib-Ahmed-3D-Portfolio.
The upstream MIT license and Moncy Yohannan copyright notice are retained in LICENSE.
