import { C, F } from '../constants';

export default function Nav({ scrolled }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center',
      padding: scrolled ? '16px 48px' : '28px 48px',
      fontFamily: F.sans, color: C.ink,
      borderBottom: `1px solid ${scrolled ? C.line : 'transparent'}`,
      background: scrolled ? 'rgba(243,238,228,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all .4s cubic-bezier(.2,.7,.3,1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <svg width="28" height="28" viewBox="0 0 28 28">
          <rect x="2" y="2" width="24" height="24" fill="none" stroke={C.ink} strokeWidth="1.5" />
          <rect x="8" y="8" width="12" height="12" fill={C.accent} />
        </svg>
        <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500, letterSpacing: '-0.01em' }}>
          Boardwalk Labs
        </div>
      </div>
      <div style={{ display: 'flex', gap: 36, fontSize: 13, fontWeight: 500 }}>
        {['Octopilot AI', 'Services', 'Process', 'Studio', 'Contact'].map(t => (
          <a key={t} className="bw-hov" href="#" style={{ color: C.ink, textDecoration: 'none' }}>{t}</a>
        ))}
      </div>
      <div style={{ textAlign: 'right' }}>
        <button data-hover style={{
          background: C.ink, color: C.bg, border: 'none',
          padding: '10px 18px', fontFamily: F.sans, fontSize: 12,
          fontWeight: 500, letterSpacing: '0.05em',
        }}>
          START A PROJECT ↗
        </button>
      </div>
    </div>
  );
}
