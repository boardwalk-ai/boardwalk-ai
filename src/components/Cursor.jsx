import { useRef, useState, useEffect } from 'react';
import { C } from '../constants';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let x = 0, y = 0, rx = 0, ry = 0, raf;
    const move = (e) => { x = e.clientX; y = e.clientY; };
    const over = (e) => {
      setHover(e.target.closest('a,button,[data-hover]') !== null);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    const tick = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  return (
    <>
      <div ref={dot} style={{
        position: 'fixed', top: 0, left: 0, width: 6, height: 6,
        borderRadius: '50%', background: C.accent, pointerEvents: 'none',
        zIndex: 10000, mixBlendMode: 'difference',
      }} />
      <div ref={ring} style={{
        position: 'fixed', top: 0, left: 0,
        width: hover ? 64 : 36, height: hover ? 64 : 36,
        borderRadius: '50%', border: `1px solid ${hover ? C.accent : C.ink}`,
        pointerEvents: 'none', zIndex: 9999,
        transition: 'width .25s, height .25s, border-color .25s',
      }} />
    </>
  );
}
