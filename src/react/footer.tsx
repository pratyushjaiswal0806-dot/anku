import { createRoot, Root } from 'react-dom/client';
import StickerSlapFooter from '@/components/ui/sticker-slap-footer';

let footerRoot: Root | null = null;

export function mountFooter(el: HTMLElement) {
  if (footerRoot) {
    try {
      footerRoot.unmount();
    } catch {}
    footerRoot = null;
  }
  footerRoot = createRoot(el);
  footerRoot.render(
    <StickerSlapFooter
      wordmark="ankita"
      paper="transparent"
      panel="#3a0e14"
      cream="#dcebf7"
      ink="#3a0e14"
      accent="#a3202a"
      fontSans="'Manrope', 'Poppins', system-ui, sans-serif"
      homeHref="/"
      navLabel="work"
      navHref="/work/"
      chatHref="mailto:ankitashah.work@gmail.com"
      chatLabel="hello"
      jobsLabel="index"
      jobs={[
        { title: 'selected work', href: '/work/' },
        { title: 'about & practice', href: '/about.html' },
        { title: 'dispatch brief', href: '/contact.html' },
      ]}
      officeLabel="based in"
      address={['mumbai, india', 'open worldwide']}
      mapLabel="local time in india"
      mapHref="/contact.html"
      contactLabel="correspondence"
      email="ankitashah.work@gmail.com"
      copiedLabel="copied, talk soon!"
      note="*made with care, and a little chutzpah."
      socials={[
        { kind: 'linkedin', href: 'https://www.linkedin.com' },
        { kind: 'instagram', href: 'https://www.instagram.com' },
      ]}
      credits={[
        { role: 'strategy & direction', name: 'ankita shah' },
        { role: 'craft & code', name: 'vintage editorial & tactile motion' },
        { role: 'stickers', name: 'peel & slap freely' },
      ]}
      storageKey="as_sticker_slap_footer_v1"
    />,
  );
  return () => {
    if (footerRoot) {
      footerRoot.unmount();
      footerRoot = null;
    }
  };
}

