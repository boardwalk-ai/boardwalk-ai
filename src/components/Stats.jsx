import { useRef, useEffect, useState } from 'react';
import { C, F } from '../constants';
import Reveal from './Reveal';

function useCounter(target, duration = 1400) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started || target === null) return;
    let start; const step = (ts) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      // ease out cubic
      const ease = 1 - Math.pow(1 - pct, 3);
      setVal(Math.round(ease * target));
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return [val, ref];
}

function StatItem({ k, v, sub, index }) {
  // parse numeric targets; null = no counting
  const numericTarget = /^\d+/.test(k) ? parseInt(k, 10) : null;
  const suffix        = numericTarget !== null ? k.replace(/^\d+/, '') : '';
  const [count, ref]  = useCounter(numericTarget);

  const display = numericTarget !== null
    ? (numericTarget < 10 ? String(count).padStart(2, '0') : count) + suffix
    : k;

  return (
    <Reveal delay={index * 100} style={{
      display: 'flex', alignItems: 'baseline', gap: 20,
      borderRight: index < 3 ? `1px solid ${C.line}` : 'none',
      paddingRight: 24,
    }}>
      <div ref={ref} style={{
        fontFamily: F.display, fontSize: 72, lineHeight: 0.95,
        fontWeight: 300, letterSpacing: '-0.03em', color: C.ink,
      }}>
        {display}
      </div>
      <div>
        <div style={{ fontFamily: F.display, fontSize: 18, fontStyle: 'italic', color: 'var(--bw-accent, #e32400)' }}>{v}</div>
        <div style={{ fontFamily: F.sans, fontSize: 12, color: C.mute, marginTop: 4, maxWidth: 180, lineHeight: 1.4 }}>{sub}</div>
      </div>
    </Reveal>
  );
}

const items = [
  { k: '2024', v: 'founded',  sub: 'Albany, New York · remote-first' },
  { k: '01',   v: 'flagship', sub: 'Octopilot AI, in active development' },
  { k: '∞',    v: 'ambition', sub: 'education software built the right way' },
  { k: '48h',  v: 'response', sub: 'every inquiry, every founder' },
];

export default function Stats() {
  return (
    <section style={{
      background: C.bgDeep, padding: '72px 48px',
      borderTop: `1px solid ${C.lineStrong}`, borderBottom: `1px solid ${C.lineStrong}`,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
        {items.map((it, i) => <StatItem key={i} {...it} index={i} />)}
      </div>
    </section>
  );
}
