import { C, F } from '../constants';

const words = ['Educators', 'Researchers', 'Writers', 'Students', 'Founders', 'Districts', 'Labs', 'Universities'];

export default function Marquee() {
  return (
    <section style={{
      background: C.bg, padding: '60px 0', overflow: 'hidden',
      borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`,
    }}>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 64, whiteSpace: 'nowrap', animation: 'bw-mq1 50s linear infinite' }}>
          {[...Array(2)].flatMap((_, k) => words.map((t, i) => (
            <span key={`${k}-${i}`} style={{
              fontFamily: F.display, fontSize: 112, fontWeight: 300,
              color: C.ink, letterSpacing: '-0.04em',
              fontStyle: i % 2 === 1 ? 'italic' : 'normal',
            }}>
              {t}
              <span style={{ color: 'var(--bw-accent, #e32400)', margin: '0 24px' }}>✦</span>
            </span>
          )))}
        </div>
      </div>
    </section>
  );
}
