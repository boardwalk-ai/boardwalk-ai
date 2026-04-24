import { C, F } from '../constants';
import Reveal from './Reveal';

const steps = [
  { n: 'I',   t: 'Conversation', d: "A real call, not a discovery workshop. You describe the problem. We push back on assumptions. You leave knowing whether we should keep talking." },
  { n: 'II',  t: 'Proposal',     d: "One page. Scope, timeline, team, fixed price when possible. If we can't explain it cleanly on one page, we don't understand it yet." },
  { n: 'III', t: 'Build',        d: 'Weekly Loom updates. Staging from day two. Real users in the loop by week three. We ship every Friday and account for what we shipped.' },
  { n: 'IV',  t: 'Handoff',      d: "Codebase, runbooks, your team onboarded. We want you to not need us — and then to want us anyway." },
];

export default function Process() {
  return (
    <section style={{ background: C.bgDeep, padding: '160px 48px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 100 }}>
        <Reveal from="left">
          <div>
            <div style={{ fontFamily: F.mono, fontSize: 11, color: C.mute, letterSpacing: '0.2em', marginBottom: 20 }}>
              § 05 — PROCESS
            </div>
            <h2 style={{
              fontFamily: F.display, fontSize: 'clamp(72px, 9.5vw, 132px)', fontWeight: 300,
              margin: 0, lineHeight: 0.88, letterSpacing: '-0.045em', color: C.ink,
            }}>
              Four <em style={{ color: 'var(--bw-accent, #e32400)' }}>steps</em>.
            </h2>
          </div>
        </Reveal>
        <Reveal from="right" delay={100}>
          <div style={{ fontFamily: F.sans, fontSize: 14, color: C.mute, textAlign: 'right', maxWidth: 280 }}>
            Eight weeks minimum. Zero surprise invoices. Every step is a real
            handoff, not a milestone on a gantt chart.
          </div>
        </Reveal>
      </div>

      <div style={{ position: 'relative' }}>
        <Reveal from="fade">
          <div style={{ position: 'absolute', top: 66, left: 0, right: 0, height: 1, background: C.ink }} />
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32 }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div>
                <div style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: 'var(--bw-accent, #e32400)',
                  position: 'relative', top: 60, marginBottom: 88,
                  boxShadow: `0 0 0 6px ${C.bgDeep}`,
                }} />
                <div style={{ fontFamily: F.display, fontSize: 52, fontWeight: 300, fontStyle: 'italic', color: C.ink, marginBottom: 20 }}>
                  {s.n}
                </div>
                <div style={{ fontFamily: F.display, fontSize: 24, fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 14 }}>
                  {s.t}
                </div>
                <div style={{ fontFamily: F.sans, fontSize: 14, color: C.mute, lineHeight: 1.55, maxWidth: 280 }}>
                  {s.d}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
