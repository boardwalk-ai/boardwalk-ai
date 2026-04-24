import { C, F } from '../constants';

export default function CTA() {
  return (
    <section style={{ background: C.deep, color: C.bg, padding: '180px 48px 140px', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 80% 50%, rgba(227,36,0,0.25) 0%, transparent 60%)',
      }} />
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 80, alignItems: 'end' }}>
        <div>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.gold, letterSpacing: '0.2em', marginBottom: 32 }}>
            § 07 — CONTACT
          </div>
          <h2 style={{
            fontFamily: F.display, fontSize: 'clamp(80px, 12vw, 184px)', fontWeight: 300,
            margin: 0, lineHeight: 0.86, letterSpacing: '-0.045em',
          }}>
            Bring us <br />
            a <em style={{ color: 'var(--bw-accent, #e32400)' }}>hard</em> <br />
            problem.
          </h2>
        </div>
        <div style={{ paddingBottom: 24 }}>
          <div style={{ fontFamily: F.sans, fontSize: 15, color: 'rgba(243,238,228,0.6)', marginBottom: 32, lineHeight: 1.6 }}>
            RFPs, product ideas, one-paragraph hunches. We reply within 48
            hours. No forms. No gatekeepers.
          </div>
          <a href="mailto:hello@boardwalklabs.co" data-hover style={{
            display: 'block', fontFamily: F.display, fontSize: 42, fontWeight: 400,
            color: C.bg, textDecoration: 'underline', textUnderlineOffset: 8,
            letterSpacing: '-0.02em', marginBottom: 12,
          }}>
            hello@boardwalklabs.co
          </a>
          <div style={{ fontFamily: F.mono, fontSize: 12, letterSpacing: '0.15em', color: C.gold, marginBottom: 32 }}>
            OR BOOK A 20-MINUTE CALL ↗
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            <button data-hover style={{
              background: 'var(--bw-accent, #e32400)', color: '#fff', border: 'none',
              padding: '18px 20px', fontFamily: F.sans, fontSize: 14, fontWeight: 500,
            }}>
              Custom contract →
            </button>
            <button data-hover style={{
              background: 'transparent', color: C.bg, border: `1px solid ${C.bg}`,
              padding: '18px 20px', fontFamily: F.sans, fontSize: 14, fontWeight: 500,
            }}>
              Product demo →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
