import { useRef, useEffect } from 'react';
import { C } from '../constants';

// ink and accent as RGB arrays for pixel blending
const INK    = [20, 17, 13];
const ACCENT = [227, 36, 0];

export default function Cursor() {
  const canvasRef = useRef(null);
  const dotRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const SIZE   = 200;
    const HALF   = SIZE / 2;
    canvas.width  = SIZE;
    canvas.height = SIZE;

    // reuse ImageData buffer every frame — no GC pressure
    const imageData = ctx.createImageData(SIZE, SIZE);
    const data      = imageData.data;

    let mx = 0, my = 0;
    let bx = 0, by = 0;   // blob  — slowest
    let tx = 0, ty = 0;   // tail  — medium
    let colorT = 0;        // 0 = ink, 1 = accent (lerped on hover)
    let hover  = false;
    let raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onOver = (e) => { hover = !!e.target.closest('a,button,[data-hover]'); };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    const tick = () => {
      bx += (mx - bx) * 0.09;
      by += (my - by) * 0.09;
      tx += (mx - tx) * 0.16;
      ty += (my - ty) * 0.16;

      // smooth color transition ink ↔ accent on hover
      colorT += ((hover ? 1 : 0) - colorT) * 0.12;
      const cr = INK[0] + (ACCENT[0] - INK[0]) * colorT | 0;
      const cg = INK[1] + (ACCENT[1] - INK[1]) * colorT | 0;
      const cb = INK[2] + (ACCENT[2] - INK[2]) * colorT | 0;

      const speed  = Math.hypot(mx - bx, my - by);
      const blobR  = hover ? 16 : 12;
      // tail shrinks as speed increases — creates the neck then snap-off
      const tailR  = Math.max(1.5, 6.5 - speed * 0.11);

      // center canvas on midpoint of the two balls
      const cx = (bx + tx) * 0.5;
      const cy = (by + ty) * 0.5;
      canvas.style.transform = `translate(${cx - HALF}px, ${cy - HALF}px)`;

      // ball positions in canvas-local space
      const lbx = bx - cx + HALF;
      const lby = by - cy + HALF;
      const ltx = tx - cx + HALF;
      const lty = ty - cy + HALF;

      const bR2 = blobR * blobR;
      const tR2 = tailR * tailR;

      // ── metaball field per pixel ──────────────────────────────────
      // field = Σ r²/d² for each ball.
      // field >= 1.0 → inside the merged surface.
      // anti-alias band: [0.88, 1.08] → smooth alpha edge.
      for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
          const dx1 = x - lbx, dy1 = y - lby;
          const dx2 = x - ltx, dy2 = y - lty;
          const d1  = dx1 * dx1 + dy1 * dy1 || 0.01;
          const d2  = dx2 * dx2 + dy2 * dy2 || 0.01;
          const f   = bR2 / d1 + tR2 / d2;

          const idx = (y * SIZE + x) << 2;
          if (f > 1.08) {
            data[idx]     = cr;
            data[idx + 1] = cg;
            data[idx + 2] = cb;
            data[idx + 3] = 255;
          } else if (f > 0.88) {
            // smooth falloff at surface edge
            const a = (f - 0.88) / 0.20;
            data[idx]     = cr;
            data[idx + 1] = cg;
            data[idx + 2] = cb;
            data[idx + 3] = a * 255 | 0;
          } else {
            data[idx + 3] = 0;
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);

      // sharp accent dot — exact mouse position, outside the metaball canvas
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
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
      <canvas ref={canvasRef} style={{
        position: 'fixed', top: 0, left: 0,
        pointerEvents: 'none', zIndex: 10000,
        willChange: 'transform',
      }} />
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 6, height: 6, borderRadius: '50%',
        background: C.accent,
        pointerEvents: 'none', zIndex: 10001,
        willChange: 'transform',
      }} />
    </>
  );
}
