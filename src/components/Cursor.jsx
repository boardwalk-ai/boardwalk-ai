import { useRef, useEffect } from 'react';
import { C } from '../constants';

export default function Cursor() {
  const dot = useRef(null);
  const blob = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0;   // exact mouse
    let bx = 0, by = 0;   // lagged blob position
    let pvx = 0, pvy = 0; // previous velocity for smoothing
    let hover = false;
    let raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onOver = (e) => { hover = e.target.closest('a,button,[data-hover]') !== null; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    const tick = () => {
      // lag factor — blob chases mouse
      const lag = hover ? 0.1 : 0.14;
      bx += (mx - bx) * lag;
      by += (my - by) * lag;

      // velocity = gap between exact mouse and blob
      const vx = mx - bx;
      const vy = my - by;

      // smooth velocity
      pvx += (vx - pvx) * 0.3;
      pvy += (vy - pvy) * 0.3;

      const speed = Math.hypot(pvx, pvy);
      const angle = Math.atan2(pvy, pvx) * (180 / Math.PI);

      // stretch: more speed = more elongation
      const stretch = Math.min(speed * 0.045, 1.6);
      const scaleX = 1 + stretch;
      const scaleY = Math.max(1 - stretch * 0.4, 0.4);

      // blob size
      const size = hover ? 48 : 28;
      const half = size / 2;

      if (dot.current) {
        dot.current.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
        dot.current.style.background = hover ? C.bg : C.accent;
        dot.current.style.width = hover ? '5px' : '6px';
        dot.current.style.height = hover ? '5px' : '6px';
      }

      if (blob.current) {
        blob.current.style.width = `${size}px`;
        blob.current.style.height = `${size}px`;
        blob.current.style.transform = `
          translate(${bx - half}px, ${by - half}px)
          rotate(${angle}deg)
          scaleX(${scaleX})
          scaleY(${scaleY})
        `;
        blob.current.style.background = hover
          ? C.accent
          : 'transparent';
        blob.current.style.border = hover
          ? 'none'
          : `1.5px solid ${C.ink}`;
        blob.current.style.opacity = hover ? '0.85' : '1';
      }

      raf = requestAnimationFrame(tick);
    };

    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <>
      {/* sharp accent dot — exact position */}
      <div ref={dot} style={{
        position: 'fixed', top: 0, left: 0,
        width: 6, height: 6,
        borderRadius: '50%',
        background: C.accent,
        pointerEvents: 'none',
        zIndex: 10001,
        willChange: 'transform',
        mixBlendMode: 'multiply',
      }} />

      {/* liquid blob — lags + stretches */}
      <div ref={blob} style={{
        position: 'fixed', top: 0, left: 0,
        width: 28, height: 28,
        borderRadius: '50%',
        border: `1.5px solid ${C.ink}`,
        background: 'transparent',
        pointerEvents: 'none',
        zIndex: 10000,
        willChange: 'transform',
        transition: 'width .2s, height .2s, background .2s, border .2s, opacity .2s',
      }} />
    </>
  );
}
