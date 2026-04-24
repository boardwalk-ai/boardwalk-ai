import { useRef, useState, useEffect } from 'react';
import { C, F } from '../constants';
import Reveal from './Reveal';

function ScrollWord() {
  const ref = useRef(null);
  const [x, setX] = useState(0);
  useEffect(() => {
    const on = () => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      setX((1 - r.top / window.innerHeight) * -200);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <div ref={ref} style={{
      position: 'absolute', top: '30%', left: '-5%', right: '-5%',
      fontFamily: F.display, fontStyle: 'italic', fontSize: 320,
      color: 'rgba(20,17,13,0.04)', whiteSpace: 'nowrap', fontWeight: 300,
      letterSpacing: '-0.05em', pointerEvents: 'none',
      transform: `translate3d(${x}px, 0, 0)`,
    }}>
      octopilot · octopilot
    </div>
  );
}

export default function Products() {
  return (
    <section style={{ background: C.bg, padding: '160px 48px 140px', position: 'relative', overflow: 'hidden' }}>
      <ScrollWord />

      <Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginBottom: 64, position: 'relative' }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.mute, letterSpacing: '0.2em' }}>§ 02 — THE FLAGSHIP</div>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.mute, letterSpacing: '0.2em', textAlign: 'right' }}>01 / 01 SHIPPING</div>
        </div>
      </Reveal>

      <Reveal delay={80} from="left">
        <h2 style={{
          fontFamily: F.display, fontSize: 'clamp(72px, 10vw, 148px)', lineHeight: 0.88,
          fontWeight: 300, margin: '0 0 88px', letterSpacing: '-0.045em',
          color: C.ink, textWrap: 'balance',
        }}>
          An AI copilot <br />
          for <em style={{ color: 'var(--bw-accent, #e32400)', fontWeight: 300 }}>educators</em>.
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <div style={{
          background: C.deep, color: C.bg, padding: '56px 56px 0',
          display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 56,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: -180, top: -180, width: 480, height: 480,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(227,36,0,0.35) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ paddingBottom: 56, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: C.gold, letterSpacing: '0.2em', marginBottom: 24 }}>
                OCTOPILOT AI · IN DEVELOPMENT
              </div>
              <div style={{ fontFamily: F.display, fontSize: 84, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 12 }}>
                Octopilot<span style={{ color: 'var(--bw-accent, #e32400)' }}>.</span>
              </div>
              <div style={{ fontFamily: F.display, fontSize: 22, fontStyle: 'italic', fontWeight: 300, color: C.gold, marginBottom: 32, lineHeight: 1.3 }}>
                — eight tentacles, one workspace.
              </div>
              <p style={{ fontFamily: F.sans, fontSize: 15, lineHeight: 1.6, color: 'rgba(243,238,228,0.75)', margin: 0, maxWidth: 420 }}>
                Octopilot helps writers, students, and researchers shape messy ideas into
                sharp prose. Drop a brief. Attach sources. Rewrite a paragraph until it
                lands. It drafts fast, revises cleanly, and stays out of the way.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, marginTop: 48 }}>
              {['Draft & revise', 'Source-aware', 'Section rewrites', 'Voice & polish'].map((t) => (
                <div key={t} style={{
                  border: '1px solid rgba(243,238,228,0.2)', padding: '14px 16px',
                  fontFamily: F.sans, fontSize: 13, display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ color: 'var(--bw-accent, #e32400)' }}>◆</span> {t}
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', alignSelf: 'end' }}>
            <div style={{
              background: '#0d0c10', borderRadius: '12px 12px 0 0',
              padding: '10px 12px 0',
              transform: 'perspective(1400px) rotateX(4deg) translateY(20px)',
              transformOrigin: 'bottom',
              boxShadow: '0 -40px 100px rgba(227,36,0,0.15), 0 -20px 50px rgba(0,0,0,0.4)',
            }}>
              <div style={{ display: 'flex', gap: 5, marginBottom: 8 }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#28c841' }} />
                <div style={{ flex: 1, textAlign: 'center', fontFamily: F.mono, fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
                  octopilot.ai
                </div>
              </div>
              <img src="/octopilot-preview.png" alt="Octopilot AI interface"
                style={{ width: '100%', display: 'block', borderRadius: '4px 4px 0 0' }} />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
