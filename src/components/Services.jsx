import { useState } from 'react';
import { C, F } from '../constants';

const items = [
  { n: '01', t: 'AI for education', d: 'Rubric-aware grading, writing copilots, tutoring agents, content pipelines. Shipped into your stack or ours.' },
  { n: '02', t: 'Learning platforms', d: "LMS builds, SIS integrations, standards-aligned curriculum engines. End to end, or filling the gap you can't hire for." },
  { n: '03', t: 'Assessment engines', d: 'Adaptive testing, secure proctoring, accommodations-first UX, psychometrics that actually hold up.' },
  { n: '04', t: 'Research instrumentation', d: 'Learning analytics, data warehouses, IRB-ready research tooling. Papers, not whitepapers.' },
];

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section style={{ background: C.deep, color: C.bg, padding: '160px 48px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginBottom: 96 }}>
        <div>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.gold, letterSpacing: '0.2em', marginBottom: 24 }}>
            § 03 — CUSTOM SOFTWARE
          </div>
          <h2 style={{
            fontFamily: F.display, fontSize: 'clamp(64px, 9vw, 128px)', fontWeight: 300,
            margin: 0, lineHeight: 0.88, letterSpacing: '-0.045em',
          }}>
            The hard <br />
            <em style={{ color: 'var(--bw-accent, #e32400)', fontWeight: 300 }}>ones</em>.
          </h2>
        </div>
        <div style={{ paddingTop: 80 }}>
          <p style={{ fontFamily: F.display, fontSize: 28, fontStyle: 'italic', lineHeight: 1.3, fontWeight: 300, margin: 0, color: C.gold }}>
            We take on a small number of custom engagements — the ones where the problem is genuinely hard and the team wants to go deep.
          </p>
          <p style={{ fontFamily: F.sans, fontSize: 15, color: 'rgba(243,238,228,0.7)', lineHeight: 1.6, margin: '24px 0 0' }}>
            The engineers who build Octopilot are the engineers we put on your
            contract. No offshoring. No junior-heavy pods. No "senior architect
            will join kickoff then vanish." The team you meet is the team that ships.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, borderTop: '1px solid rgba(243,238,228,0.2)' }}>
        {items.map((s, i) => (
          <div key={s.n}
            data-hover
            onMouseEnter={() => setActive(i)}
            style={{
              padding: '40px 28px',
              borderRight: i < 3 ? '1px solid rgba(243,238,228,0.2)' : 'none',
              borderBottom: '1px solid rgba(243,238,228,0.2)',
              minHeight: 360,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              background: active === i ? 'rgba(227,36,0,0.08)' : 'transparent',
              transition: 'background .3s',
            }}>
            <div>
              <div style={{
                fontFamily: F.display, fontSize: 52, fontStyle: 'italic',
                color: 'var(--bw-accent, #e32400)', fontWeight: 300, marginBottom: 32,
              }}>
                {s.n}
              </div>
              <div style={{ fontFamily: F.display, fontSize: 24, fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.15, marginBottom: 14 }}>
                {s.t}
              </div>
              <div style={{ fontFamily: F.sans, fontSize: 13, color: 'rgba(243,238,228,0.6)', lineHeight: 1.55 }}>
                {s.d}
              </div>
            </div>
            <div style={{
              fontFamily: F.mono, fontSize: 11, color: C.gold, letterSpacing: '0.15em',
              marginTop: 24, display: 'flex', alignItems: 'center', gap: 8,
              opacity: active === i ? 1 : 0.5, transition: 'opacity .3s',
            }}>
              REQUEST BRIEF <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
