import { C, F } from '../constants';

const items = [
  { k: '2024', v: 'founded', sub: 'Albany, New York · remote-first' },
  { k: '01', v: 'flagship', sub: 'Octopilot AI, in active development' },
  { k: '∞', v: 'ambition', sub: 'education software built the right way' },
  { k: '48h', v: 'response', sub: 'every inquiry, every founder' },
];

export default function Stats() {
  return (
    <section style={{
      background: C.bgDeep, padding: '72px 48px',
      borderTop: `1px solid ${C.lineStrong}`,
      borderBottom: `1px solid ${C.lineStrong}`,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
        {items.map((it, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'baseline', gap: 20,
            borderRight: i < 3 ? `1px solid ${C.line}` : 'none', paddingRight: 24,
          }}>
            <div style={{
              fontFamily: F.display, fontSize: 72, lineHeight: 0.95,
              fontWeight: 300, letterSpacing: '-0.03em', color: C.ink,
            }}>
              {it.k}
            </div>
            <div>
              <div style={{ fontFamily: F.display, fontSize: 18, fontStyle: 'italic', color: 'var(--bw-accent, #e32400)' }}>
                {it.v}
              </div>
              <div style={{ fontFamily: F.sans, fontSize: 12, color: C.mute, marginTop: 4, maxWidth: 180, lineHeight: 1.4 }}>
                {it.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
