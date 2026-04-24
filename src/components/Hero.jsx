import { useRef, useState, useEffect, useReducer } from 'react';
import { C, F } from '../constants';

function LensCanvas() {
  const cvs = useRef(null);
  const lensRef = useRef({ x: 0.72, y: 0.5, r: 0.22, dragging: false });
  const [, force] = useReducer(n => n + 1, 0);

  useEffect(() => {
    const c = cvs.current; if (!c) return;
    const ctx = c.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w, h;
    const resize = () => {
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(c);

    let t = 0, raf;
    const draw = () => {
      t += 0.005;
      const L = lensRef.current;
      const lx = L.x * w, ly = L.y * h;
      const lr = L.r * Math.min(w, h);

      ctx.fillStyle = C.bg;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(20,17,13,0.28)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 30; i++) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 6) {
          const y = h / 2
            + Math.sin(x * 0.003 + t + i * 0.13) * (80 + i * 7)
            + Math.cos(x * 0.001 + t * 0.6 + i * 0.09) * (40 + i * 3);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(lx, ly, lr, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = C.deep;
      ctx.fillRect(lx - lr, ly - lr, lr * 2, lr * 2);
      ctx.strokeStyle = C.accent;
      ctx.lineWidth = 1.1;
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        for (let x = lx - lr; x <= lx + lr; x += 4) {
          const y = ly
            + Math.sin(x * 0.006 + t * 1.4 + i * 0.18) * (55 + i * 4)
            + Math.cos(x * 0.002 + t * 0.8 + i * 0.12) * (28 + i * 2);
          x === lx - lr ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      ctx.beginPath();
      ctx.arc(lx, ly, lr, 0, Math.PI * 2);
      ctx.strokeStyle = C.ink; ctx.lineWidth = 1.5; ctx.stroke();
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2;
        const x1 = lx + Math.cos(a) * (lr + 6);
        const y1 = ly + Math.sin(a) * (lr + 6);
        const x2 = lx + Math.cos(a) * (lr + (i % 6 === 0 ? 14 : 10));
        const y2 = ly + Math.sin(a) * (lr + (i % 6 === 0 ? 14 : 10));
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
        ctx.strokeStyle = i % 6 === 0 ? C.accent : 'rgba(20,17,13,0.45)';
        ctx.lineWidth = i % 6 === 0 ? 1.5 : 1;
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onDown = (e) => {
      const r = c.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const L = lensRef.current;
      const dx = (px - L.x) * r.width, dy = (py - L.y) * r.height;
      if (Math.hypot(dx, dy) < L.r * Math.min(r.width, r.height) + 20) {
        L.dragging = true; force();
      }
    };
    const onMove = (e) => {
      const L = lensRef.current;
      if (!L.dragging) return;
      const r = c.getBoundingClientRect();
      L.x = Math.max(0.1, Math.min(0.9, (e.clientX - r.left) / r.width));
      L.y = Math.max(0.18, Math.min(0.85, (e.clientY - r.top) / r.height));
      force();
    };
    const onUp = () => { lensRef.current.dragging = false; force(); };
    c.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      c.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  const L = lensRef.current;
  return (
    <>
      <canvas ref={cvs} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        display: 'block', zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
        clipPath: `circle(${L.r * 100}% at ${L.x * 100}% ${L.y * 100}%)`,
        color: C.bg,
      }} data-lens-overlay />
    </>
  );
}

function HeroText({ accent, heroWord, layer }) {
  const inkColor = layer === 'lens' ? C.bg : C.ink;
  const accentColor = layer === 'lens' ? C.bg : accent;
  const wrapperStyle = layer === 'lens'
    ? { position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 4 }
    : { position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 };

  const [clip, setClip] = useState('circle(0% at 50% 50%)');
  useEffect(() => {
    if (layer !== 'lens') return;
    let raf;
    const tick = () => {
      const o = document.querySelector('[data-lens-overlay]');
      if (o) setClip(o.style.clipPath);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [layer]);

  return (
    <div style={{ ...wrapperStyle, clipPath: layer === 'lens' ? clip : 'none' }}>
      <div style={{
        position: 'absolute', left: 48, right: 48, top: 140, bottom: 120,
        display: 'grid', gridTemplateRows: '1fr auto',
      }}>
        <div>
          <div className="bw-rise" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: F.mono, fontSize: 11, color: inkColor,
            letterSpacing: '0.2em', marginBottom: 32,
            padding: '6px 12px', border: `1px solid ${inkColor}`,
            animationDelay: '0.1s',
          }}>
            <span style={{ width: 6, height: 6, background: accentColor, borderRadius: '50%' }} />
            EDTECH STUDIO · ALBANY, NY
          </div>
          <h1 className="bw-rise" style={{
            fontFamily: F.display, fontWeight: 400, margin: 0,
            fontSize: 'clamp(80px, 12vw, 184px)', lineHeight: 0.86,
            letterSpacing: '-0.045em', color: inkColor, animationDelay: '0.2s',
          }}>
            Software for <br />
            <em style={{ fontWeight: 300, fontStyle: 'italic' }}>{heroWord}</em>
            <span style={{ color: accentColor, fontStyle: 'italic', fontWeight: 300 }}>.</span> <br />
            work that matters.
          </h1>
        </div>
        <div className="bw-rise" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          gap: 48, animationDelay: '0.4s',
        }}>
          <p style={{ fontFamily: F.sans, fontSize: 16, lineHeight: 1.5, color: inkColor, margin: 0, maxWidth: 420 }}>
            We design and ship academic products for schools, universities, and
            the teams rewriting how learning happens. And we take on a small
            number of custom software contracts — the hard ones.
          </p>
          <div style={{ display: 'flex', gap: 12, pointerEvents: 'auto' }}>
            <button data-hover style={{
              padding: '18px 24px', background: inkColor,
              color: layer === 'lens' ? C.deep : C.bg,
              border: 'none', fontFamily: F.sans, fontSize: 14, fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              Meet Octopilot AI <span>↗</span>
            </button>
            <button data-hover style={{
              padding: '18px 24px', background: 'transparent', color: inkColor,
              border: `1px solid ${inkColor}`, fontFamily: F.sans, fontSize: 14, fontWeight: 500,
            }}>
              Start a contract
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ accent, heroWord }) {
  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 820, overflow: 'hidden', background: C.bg }}>
      <LensCanvas />
      <HeroText accent={accent} heroWord={heroWord} layer="base" />
      <HeroText accent={accent} heroWord={heroWord} layer="lens" />
      <div style={{
        position: 'absolute', bottom: 48, left: 48, zIndex: 5,
        fontFamily: F.mono, fontSize: 11, color: C.ink, letterSpacing: '0.2em',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{
          width: 20, height: 20, borderRadius: '50%',
          border: `1px solid ${C.ink}`, display: 'inline-block',
        }} />
        DRAG THE LENS
      </div>
      <div style={{
        position: 'absolute', bottom: 48, right: 48, zIndex: 5,
        fontFamily: F.mono, fontSize: 11, color: C.ink, letterSpacing: '0.2em',
      }}>
        SCROLL ↓ <span style={{ animation: 'bw-blink 1s infinite' }}>●</span>
      </div>
    </section>
  );
}
