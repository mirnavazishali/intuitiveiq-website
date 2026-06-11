// ── Build the "10K raw tables" dot grid inside the lineage SVG ────────
(() => {
  const cluster = document.getElementById('raw-cluster');
  if (!cluster) return;
  const COLS = 16, ROWS = 10, DX = 9, DY = 22;
  let svg = '';
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      svg += `<circle cx="${c*DX+4}" cy="${r*DY+4}" r="2"/>`;
    }
  }
  cluster.innerHTML = svg;
})();

// ── Visual showcase tabs (KG / Lineage / Query) ───────────────────────
document.querySelectorAll('.vt-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.vt;
    document.querySelectorAll('.vt-pill').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.visual-pane').forEach(p => p.classList.remove('active'));
    document.querySelector('.vp-' + target)?.classList.add('active');
    // Reset typing animation for the query pane on re-entry
    if (target === 'query') {
      document.querySelectorAll('.anim-query .aq-row').forEach(r => {
        r.style.animation = 'none'; void r.offsetHeight; r.style.animation = '';
      });
      const typed = document.querySelector('.aq-typed');
      if (typed) {
        typed.style.animation = 'none'; void typed.offsetHeight;
        typed.style.animation = '';
      }
    }
    // Reset NL → Action pipeline on re-entry so the typewriter,
    // stage dots, SPARQL line-by-line, action card, and audit chips
    // replay from the top instead of standing static for returning
    // visitors. Same technique as the query pane.
    if (target === 'action') {
      const reset = el => { el.style.animation = 'none'; void el.offsetHeight; el.style.animation = ''; };
      document.querySelectorAll(
        '.act-typed, .act-flow-line, .act-stage, .act-stage-dot, .act-line, ' +
        '.act-card, .act-audit-chip'
      ).forEach(reset);
    }
  });
});

// Auto-rotate the showcase every 9s (pauses on hover).
// The 5th tab — "action" — runs a 7-second animation pipeline (NL
// typewriter → 4-stage flow → SPARQL line-by-line → Action card +
// audit chips), so we give it a longer dwell of 12s when it's the
// active tab. Other tabs stay at 9s.
(() => {
  const tabs = ['kg', 'lineage', 'confidence', 'ask', 'action', 'console'];
  let i = 0;
  const stage = document.querySelector('.visual-stage');
  if (!stage) return;
  let paused = false;
  stage.addEventListener('mouseenter', () => paused = true);
  stage.addEventListener('mouseleave', () => paused = false);
  const tick = () => {
    if (!paused) {
      i = (i + 1) % tabs.length;
      const next = document.querySelector(`.vt-pill[data-vt="${tabs[i]}"]`);
      if (next) next.click();
    }
    const dwell = (tabs[i] === 'action') ? 24000 : 16000;
    setTimeout(tick, dwell);
  };
  setTimeout(tick, 16000);
})();

// Smooth scroll for in-page nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior: 'smooth', block: 'start'});
  });
});

// Subtle reveal-on-scroll for sections
const reveal = (entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      io.unobserve(e.target);
    }
  }
};
const io = new IntersectionObserver(reveal, {threshold: 0.12});
document.querySelectorAll('.section, .hero, .logos').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(12px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  io.observe(el);
});

// ── Mobile burger menu ────────────────────────────────────────────────
document.querySelector('.nav-burger')?.addEventListener('click', (e) => {
  const links = document.querySelector('.nav-links');
  if (!links) return;
  const open = links.classList.toggle('open');
  e.currentTarget.setAttribute('aria-expanded', String(open));
});
