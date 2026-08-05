import { lazy, Suspense } from 'react';
import { useMediaQuery } from '@hooks/useMediaQuery';

const InteractiveHeroCanvas = lazy(() => import('./InteractiveHeroCanvas'));

function StaticOrb() {
  return (
    <div className="relative grid h-full place-items-center">
      <div className="absolute h-64 w-64 rounded-full bg-[#a78bfa]/15 blur-3xl" />
      <div className="relative h-48 w-48 rounded-full border border-[#a78bfa]/35 bg-[radial-gradient(circle_at_35%_30%,rgba(167,139,250,.38),rgba(31,20,46,.94)_45%,#0a0912)] shadow-[0_0_90px_rgba(167,139,250,.2)]">
        <div className="absolute -inset-7 rounded-full border border-[#fb7185]/25" />
      </div>
    </div>
  );
}

export default function HeroCanvas() {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const smallScreen = useMediaQuery('(max-width: 639px)');

  if (reduceMotion || smallScreen) return <StaticOrb />;

  return <Suspense fallback={<StaticOrb />}><InteractiveHeroCanvas /></Suspense>;
}
