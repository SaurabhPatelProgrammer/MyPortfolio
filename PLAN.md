# Portfolio smoothness improvements

- [x] Own and clean up scene timelines, timers, pending model loads and GPU resources.
- [x] Make scroll animations responsive without rebuilding all animations on resize.
- [x] Defer the tech-stack import, reduce texture memory and lower mobile rendering cost.
- [x] Keep page accents stable, make cursor movement responsive and shorten the loader exit.
- [x] Run lifecycle/scroll regression tests, content checks, lint, build and dependency audit; push to MyPortfolio.

Keep the character, desktop project animation, project content and interactive tech-stack section.
Use native scrolling on touch devices and respect reduced-motion preferences.
Live browser profiling is currently blocked by the previously denied browser permission.

Verification: seven Node regression tests, content checks, lint and production build passed; npm audit reports zero vulnerabilities.
Texture base RGBA allocation falls from approximately 62 MiB to 9 MiB (12 textures). These are calculated pixel sizes, not measured GPU usage.
The deferred physics bundle falls from approximately 2.55 MB to 2.22 MB uncompressed; its size warning remains.
