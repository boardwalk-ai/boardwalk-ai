import { useRef, useEffect } from 'react';
import { C } from '../constants';

export default function Cursor() {
  const blobRef = useRef(null);
  const tailRef = useRef(null);
  const dotRef  = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0;
    let bx = 0, by = 0;  // blob  — slowest lag, stays furthest behind
    let tx = 0, ty = 0;  // tail  — medium lag, lives between blob & mouse
    let hover = false;
    let raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onOver = (e) => { hover = !!e.target.closest('a,button,[data-hover]'); };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    const tick = () => {
      bx += (mx - bx) * 0.09;  // blob lags most
      by += (my - by) * 0.09;
      tx += (mx - tx) * 0.16;  // tail stays close enough to blob to merge
      ty += (my - ty) * 0.16;

      const speed   = Math.hypot(mx - bx, my - by);
      // tail radius shrinks as gap widens → visible neck then separation
      const tailR   = Math.max(1.5, 7 - speed * 0.14);
      const blobR   = hover ? 17 : 13;
      const fill    = hover ? C.accent : C.ink;

      blobRef.current?.setAttribute('cx',   bx);
      blobRef.current?.setAttribute('cy',   by);
      blobRef.current?.setAttribute('r',    blobR);
      blobRef.current?.setAttribute('fill', fill);

      tailRef.current?.setAttribute('cx',   tx);
      tailRef.current?.setAttribute('cy',   ty);
      tailRef.current?.setAttribute('r',    tailR);
      tailRef.current?.setAttribute('fill', fill);

      dotRef.current?.setAttribute('cx', mx);
      dotRef.current?.setAttribute('cy', my);
      dotRef.current?.setAttribute('fill', hover ? '#fff' : C.accent);

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
    <svg style={{
      position: 'fixed', inset: 0, width: '100vw', height: '100vh',
      pointerEvents: 'none', zIndex: 10000, overflow: 'visible',
    }}>
      <defs>
        <filter id="goo" x="-30%" y="-30%" width="160%" height="160%">
          {/* 1. blur both circles together */}
          <feGaussianBlur in="SourceGraphic" stdDeviation="5.5" result="blur" />
          {/* 2. boost alpha contrast → hard gooey edges */}
          <feColorMatrix in="blur" mode="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 24 -9"
            result="gooMask"
          />
          {/* 3. clip original sharp colors to the goo alpha shape
                 → ink color stays correct, no cream bleed */}
          <feComposite in="SourceGraphic" in2="gooMask" operator="in" />
        </filter>
      </defs>

      {/* gooey group — blob + tail merge/separate like liquid */}
      <g filter="url(#goo)">
        <circle ref={blobRef} cx="0" cy="0" r="13" fill={C.ink} />
        <circle ref={tailRef} cx="0" cy="0" r="7"  fill={C.ink} />
      </g>

      {/* sharp accent dot outside the filter — always crisp at exact mouse */}
      <circle ref={dotRef} cx="0" cy="0" r="2.5" fill={C.accent} />
    </svg>
  );
}
