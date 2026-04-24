import { C, F } from '../constants';
import Reveal from './Reveal';

const rows = [
  { q: "Octopilot reclaimed five hours of my week. Five hours. I actually teach with those hours now instead of typing comments.",                  n: 'Dr. Priya Raman',  r: 'Director of Learning',  o: 'Pacific Ridge School',        tag: 'EDUCATOR', c: '#d5a637' },
  { q: "They scoped our adaptive assessment engine in four months. Two other vendors quoted fourteen. It shipped on time.",                         n: 'Marcus Levy',      r: 'Chief Technology Officer', o: 'Lyceum Learning',             tag: 'CUSTOM',   c: '#e32400' },
  { q: "The only EdTech team I've worked with that actually reads the research literature before opening the laptop.",                              n: 'Prof. Elena Vargas',r: 'Education Research',      o: 'University of Albany',        tag: 'RESEARCH', c: '#1b4332' },
  { q: "Weekly Loom updates genuinely changed how I brief my board. I now require it of every vendor we work with.",                               n: 'Theo Nakashima',   r: 'Chief of Staff',          o: 'Kingfisher Charter Network',  tag: 'PROCESS',  c: '#6b4dff' },
  { q: "My non-English-speaking parents feel in the loop for the first time in fifteen years of me teaching.",                                     n: 'Whitney Okafor',   r: '4th Grade Teacher',       o: 'Harlem Prep Academy',         tag: 'COMMS',    c: '#e32400' },
  { q: "They pushed back on half our ideas and were right about most of them. Rare. Worth every hour of the engagement.",                           n: 'Sana Abadi',       r: 'Founder',                 o: 'Lumen Tutors',                tag: 'ADVICE',   c: '#d5a637' },
];

export default function Testimonials() {
  return (
    <section style={{ background: C.bg, padding: '160px 48px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 80 }}>
        <Reveal from="left">
          <div>
            <div style={{ fontFamily: F.mono, fontSize: 11, color: C.mute, letterSpacing: '0.2em', marginBottom: 20 }}>
              § 06 — FIELD NOTES
            </div>
            <h2 style={{
              fontFamily: F.display, fontSize: 'clamp(72px, 9.5vw, 132px)', fontWeight: 300,
              margin: 0, lineHeight: 0.88, letterSpacing: '-0.045em',
            }}>
              From the <em style={{ color: 'var(--bw-accent, #e32400)' }}>classroom</em>.
            </h2>
          </div>
        </Reveal>
        <Reveal from="right" delay={100}>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.mute, letterSpacing: '0.2em' }}>
            EARLY PARTNERS · 2024 – 2026
          </div>
        </Reveal>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: C.line }}>
        {rows.map((t, i) => (
          <Reveal key={i} delay={i * 60}>
            <div data-hover style={{
              background: C.bg, padding: 32, display: 'flex', flexDirection: 'column',
              minHeight: 340, position: 'relative', transition: 'background .3s',
              height: '100%',
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = C.paper}
              onMouseLeave={(e) => e.currentTarget.style.background = C.bg}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', background: t.c, color: '#fff',
                  display: 'grid', placeItems: 'center', fontFamily: F.display, fontSize: 18, fontWeight: 500,
                }}>
                  {t.n.split(' ').filter(p => !p.includes('.')).map(p => p[0]).slice(0, 2).join('')}
                </div>
                <div style={{ fontFamily: F.mono, fontSize: 10, color: C.mute, letterSpacing: '0.2em', border: `1px solid ${C.line}`, padding: '4px 10px' }}>
                  {t.tag}
                </div>
              </div>
              <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 400, lineHeight: 1.35, flex: 1, letterSpacing: '-0.005em', color: C.ink }}>
                "{t.q}"
              </div>
              <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid ${C.line}` }}>
                <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 500 }}>{t.n}</div>
                <div style={{ fontFamily: F.sans, fontSize: 12, color: C.mute, marginTop: 2 }}>
                  {t.r} · <em style={{ color: C.ink }}>{t.o}</em>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
