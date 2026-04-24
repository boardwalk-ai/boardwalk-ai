import { useRef, useEffect } from 'react';
import { C } from '../constants';

export default function Cursor() {
  const blobCircle = useRef(null);
  const tailCircle = useRef(null);
  const sharpDot   = useRef(null);
  const svgEl      = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0;
    let bx = 0, by = 0;   // main blob — slow lag
    let tx = 0, ty = 0;   // tail dot — medium lag
    let hover = false;
    let raf;

    const onMove  = (e) => { mx = e.clientX; my = e.clientY; };
    const onOver  = (e) => { hover = e.target.closest('a,button,[data-hover]') !== null; };
    const onClick = () => {
      // pulse on click
      if (!blobCircle.current) return;
      blobCircle.current.setAttribute('r', hover ? 28 : 22);
      setTimeout(() => blobCircle.current?.setAttribute('r', hover ? 18 : 13), 120);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onClick);

    const tick = () => {
      // blob lags most, tail lags less → they stretch apart when fast
      bx += (mx - bx) * 0.10;
      by += (my - by) * 0.10;
      tx += (mx - tx) * 0.22;
      ty += (my - ty) * 0.22;

      const speed = Math.hypot(mx - bx, my - by);

      // tail radius shrinks as it pulls away (neck effect)
      const tailR = Math.max(2, 7 - speed * 0.18);
      const blobR = hover ? 18 : 13;
      const fill  = hover ? C.accent : C.ink;

      if (blobCircle.current) {
        blobCircle.current.setAttribute('cx', bx);
        blobCircle.current.setAttribute('cy', by);
        blobCircle.current.setAttribute('r',  blobR);
        blobCircle.current.setAttribute('fill', fill);
      }
      if (tailCircle.current) {
        tailCircle.current.setAttribute('cx', tx);
        tailCircle.current.setAttribute('cy', ty);
        tailCircle.current.setAttribute('r',  tailR);
        tailCircle.current.setAttribute('fill', fill);
      }
      if (sharpDot.current) {
        sharpDot.current.setAttribute('cx', mx);
        sharpDot.current.setAttribute('cy', my);
        sharpDot.current.setAttribute('r', hover ? 2.5 : 2);
        sharpDot.current.setAttribute('fill', hover ? C.bg : C.accent);
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onClick);
    };
  }, []);

  return (
    <svg
      ref={svgEl}
      style={{
        position: 'fixed', inset: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none', zIndex: 10000,
        overflow: 'visible',
      }}
    >
      <defs>
        <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feColorMatrix
            in="blur" mode="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 28 -12"
            result="goo"
          />
        </filter>
      </defs>

      {/* gooey group — blob + tail merge like liquid */}
      <g filter="url(#goo)">
        <circle ref={blobCircle} cx="0" cy="0" r="13" fill={C.ink} />
        <circle ref={tailCircle} cx="0" cy="0" r="6"  fill={C.ink} />
      </g>

      {/* sharp dot outside the filter — stays crisp at exact position */}
      <circle ref={sharpDot} cx="0" cy="0" r="2" fill={C.accent} />
    </svg>
  );
}
