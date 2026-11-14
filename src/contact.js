import { gsap, ScrollTrigger, $, $$, reduceMotion } from './motion/core.js';
import { isArriving, openLift } from './motion/chrome.js';
import { toast, getVisitor } from './motion/interactions.js';

export async function intro() {
  const p = isArriving() ? openLift() : Promise.resolve();
  if (!reduceMotion) {
    gsap.timeline({ delay: isArriving() ? 0.35 : 0, defaults: { ease: 'expo.out' } })
      .from('.site-header', { yPercent: -100, opacity: 0, duration: 1.1, clearProps: 'transform,opacity' }, 0)
      .from('.contact-hero__top', { opacity: 0, x: -20, duration: 0.9 }, 0.1)
      .from('.contact-hero__title', { yPercent: 40, opacity: 0, duration: 1.2, ease: 'expo.out' }, 0.15)
      .from('.contact-hero__lead', { y: 20, opacity: 0, duration: 1 }, 0.25)
      .from('.telemetry-card', { y: 35, opacity: 0, duration: 1, stagger: 0.08 }, 0.35);
  }
  return p;
}

export function animate() {
  initForm();
  initCopyActions();
  initFaq();

  if (reduceMotion) return;

  gsap.from('.dispatch-form', {
    y: 60, opacity: 0, duration: 1.2, ease: 'expo.out',
    scrollTrigger: { trigger: '.dispatch-form', start: 'top 85%' },
  });

  gsap.from('.step-card', {
    y: 50, opacity: 0, duration: 1.1, stagger: 0.1, ease: 'expo.out',
    scrollTrigger: { trigger: '.contact-steps__grid', start: 'top 85%' },
  });

  gsap.from('.channel-card', {
    y: 45, opacity: 0, duration: 1, stagger: 0.08, ease: 'expo.out',
    scrollTrigger: { trigger: '.channels-grid', start: 'top 88%' },
  });

  gsap.from('.contact-faq .qa', {
    y: 30, opacity: 0, duration: 0.9, stagger: 0.06, ease: 'expo.out',
    scrollTrigger: { trigger: '.contact-faq__list', start: 'top 85%' },
  });
}

/* ───────── Dispatch brief interactive builder ───────── */
function initForm() {
  const form = $('#dispatch-form');
  if (!form) return;

  // Pre-fill visitor name if known from previous greeting interaction
  const visitor = getVisitor();
  const nameInput = $('#sender-name');
  if (visitor && nameInput && !nameInput.value) {
    nameInput.value = visitor;
  }

  // Interactive chip selector
  const chips = $$('.chip-toggle', form);
  chips.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selected = btn.classList.toggle('is-selected');
      btn.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });
  });

  // Interactive timeline options (single select)
  const timelineBtns = $$('.timeline-option', form);
  timelineBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      timelineBtns.forEach((b) => {
        b.classList.remove('is-selected');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-selected');
      btn.setAttribute('aria-pressed', 'true');
    });
  });

  // Submission handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = ($('#sender-name')?.value || '').trim();
    const brand = ($('#sender-brand')?.value || '').trim();
    const email = ($('#sender-email')?.value || '').trim();
    const message = ($('#sender-brief')?.value || '').trim();

    if (!name || !email) {
      toast('<span>missing details</span> please enter your name and email');
      if (!name) $('#sender-name')?.focus();
      else $('#sender-email')?.focus();
      return;
    }

    const selectedServices = $$('.chip-toggle.is-selected', form)
      .map((c) => c.dataset.service || c.textContent.trim().replace(/\+$/, ''))
      .join(', ') || 'General Marketing & Strategy';

    const selectedTimeline = $('.timeline-option.is-selected', form)?.textContent.trim() || 'Flexible / In Discussion';

    const briefText = [
      `Sender: ${name}${brand ? ` (${brand})` : ''}`,
      `Reply to: ${email}`,
      `Services: ${selectedServices}`,
      `Timeline: ${selectedTimeline}`,
      '',
      'Brief Overview:',
      message || '(Brief to be discussed on call)',
    ].join('\n');

    const subject = `Brief for Ankita: ${name}${brand ? ` — ${brand}` : ''}`;
    const mailtoUrl = `mailto:ankitashah.work@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(briefText)}`;

    // Show on-screen stamped confirmation receipt
    const receipt = $('#dispatch-receipt');
    const preview = $('#receipt-preview');
    if (receipt && preview) {
      preview.textContent = briefText;
      receipt.classList.add('is-visible');
      ScrollTrigger.refresh();
      receipt.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Fallback copy button on receipt
    const copyReceiptBtn = $('#receipt-copy-btn');
    if (copyReceiptBtn) {
      copyReceiptBtn.onclick = () => {
        navigator.clipboard.writeText(briefText).then(() => {
          toast('<span>copied!</span> brief copied to clipboard');
        });
      };
    }

    // Launch email client
    try {
      window.location.href = mailtoUrl;
    } catch {}

    toast('<span>brief prepared!</span> opening your mail client...');
  });
}

/* ───────── One-click copy email buttons ───────── */
function initCopyActions() {
  $$('[data-copy-email]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const mail = btn.dataset.copyEmail || 'ankitashah.work@gmail.com';
      navigator.clipboard.writeText(mail).then(() => {
        toast(`<span>copied!</span> ${mail} copied to clipboard`);
      }).catch(() => {
        window.location.href = `mailto:${mail}`;
      });
    });
  });
}

/* ───────── FAQ accordions ───────── */
function initFaq() {
  $$('.contact-faq .qa').forEach((d) => {
    const summary = $('summary', d);
    const body = $('.qa__a', d);
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      if (reduceMotion) { d.open = !d.open; return; }
      if (d.open) {
        gsap.to(body, {
          height: 0, opacity: 0, duration: 0.5, ease: 'expo.inOut',
          onComplete: () => { d.open = false; gsap.set(body, { clearProps: 'all' }); ScrollTrigger.refresh(); },
        });
      } else {
        d.open = true;
        const h = body.offsetHeight;
        gsap.fromTo(body, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.5, ease: 'expo.out', onComplete: () => { gsap.set(body, { clearProps: 'all' }); ScrollTrigger.refresh(); } });
      }
    });
  });
}

