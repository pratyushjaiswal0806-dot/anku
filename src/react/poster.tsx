import { createRoot } from 'react-dom/client';
import WavingPortfolioLanding from '@/components/ui/waving-portfolio-landing';

// Mounted into the loader overlay (.lift) on the first home visit. Palette comes from base.css tokens.
export function mountPoster(el: HTMLElement) {
  const root = createRoot(el);
  root.render(
    <WavingPortfolioLanding
      name="Ankita Shah"
      year="2026"
      roles={['Brand Strategist', 'Marketing']}
      lettersLeft={['ST', 'SM']}
      giantLetter="A"
      lettersRight={['RT', 'RT']}
      title="Start Smart — Ankita Shah"
      signature="ANKITA/SHAH"
      greeting="Hi, I'm Ankita!"
      accent="#a3202a"
      paper="#f7ede8"
      ink="#3a0e14"
      height="100svh"
    />,
  );
  return () => root.unmount();
}
