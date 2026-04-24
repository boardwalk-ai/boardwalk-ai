import { C, F } from '../constants';

const pillars = [
  ['Teacher-tested', "Every feature is validated in a real classroom before it ships. Slow where it counts, fast where it doesn't."],
  ['Research-grade', 'Analytics and instrumentation built to IRB standards — so your product holds up in peer review, not just a pitch deck.'],
  ['Own the stack', 'Data layer to design system. We build the thing, not glue other vendors together.'],
  ['No demo-ware', "Products ship. Contracts deliver. We don't do pilots, PoCs, or beauty demos to justify an invoice."],
];

export default function About() {
  return (
    <section style={{ background: C.bg, padding: '180px 48px' }}>
      <div style={{ fontFamily: F.mono, fontSize: 11, color: C.mute, letterSpacing: '0.2em', marginBottom: 32 }}>
        § 04 — THE STUDIO
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 120, alignItems: 'start' }}>
        <div>
          <h2 style={{
            fontFamily: F.display, fontSize: 'clamp(52px, 6.5vw, 92px)', fontWeight: 300,
            margin: 0, lineHeight: 1, letterSpacing: '-0.035em', color: C.ink, textWrap: 'balance',
          }}>
            A young studio <br />
            with an <em style={{ color: 'var(--bw-accent, #e32400)' }}>old&#8209;world</em> <br />
            standard of care.
          </h2>
          <p style={{ fontFamily: F.sans, fontSize: 18, lineHeight: 1.55, color: C.mute, maxWidth: 620, margin: '36px 0 0' }}>
            Boardwalk Labs is an education-software studio based in Albany, New York.
            We build products we'd want used in our own kids' classrooms. We take on
            contracts we'd sign our name to. And we say no often enough that the yes
            actually means something.
          </p>

          <div style={{ marginTop: 72, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 40, maxWidth: 720 }}>
            {pillars.map(([t, d], i) => (
              <div key={i} style={{ borderTop: `1px solid ${C.ink}`, paddingTop: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ color: 'var(--bw-accent, #e32400)', fontFamily: F.mono, fontSize: 11, letterSpacing: '0.15em' }}>0{i + 1}</span>
                  <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>{t}</div>
                </div>
                <div style={{ fontFamily: F.sans, fontSize: 14, color: C.mute, lineHeight: 1.55 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: C.bgDeep, padding: 40, border: `1px solid ${C.line}`,
          fontFamily: F.sans, fontSize: 14, color: C.ink,
          position: 'sticky', top: 120,
        }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.2em', color: C.mute, marginBottom: 28 }}>
            MANIFESTO — 2026
          </div>
          <p style={{ fontFamily: F.display, fontSize: 24, fontWeight: 300, lineHeight: 1.4, margin: 0, letterSpacing: '-0.005em' }}>
            Most education software is sold to administrators and endured by teachers.
          </p>
          <p style={{ fontFamily: F.display, fontSize: 24, fontStyle: 'italic', fontWeight: 300, lineHeight: 1.4, margin: '18px 0 0', color: 'var(--bw-accent, #e32400)' }}>
            We're trying the opposite order.
          </p>
          <div style={{ marginTop: 24, fontSize: 14, color: C.mute, lineHeight: 1.65 }}>
            Build for the people doing the actual work. Respect the research.
            Show your receipts. Every product starts with a real classroom —
            not a market segment. Every contract we take is one we'd staff
            with our own names on the deliverable.
          </div>
          <div style={{
            marginTop: 32, paddingTop: 20, borderTop: `1px solid ${C.line}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontFamily: F.mono, fontSize: 11, letterSpacing: '0.15em', color: C.mute,
          }}>
            <span>— THE FOUNDERS</span>
            <span style={{ color: 'var(--bw-accent, #e32400)' }}>◆◆</span>
          </div>
        </div>
      </div>
    </section>
  );
}
