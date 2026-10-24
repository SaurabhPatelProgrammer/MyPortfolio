import type { SVGProps } from "react";
const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 160 100" role="img" aria-label="Saurabh Patel logo" {...props}>
    <text x="80" y="70" textAnchor="middle" fill="currentColor" fontFamily="monospace" fontWeight="700" fontSize="70">SP</text>
  </svg>
);
export default Logo;
