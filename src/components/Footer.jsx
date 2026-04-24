import { C, F } from '../constants';

const cols = [
  {
    heading: 'Products',
    links: [
      { label: 'Octopilot AI', href: 'https://www.octopilotai.com', external: true },
      { label: 'Changelog',    href: '#' },
      { label: 'Trust Center', href: '#' },
      { label: 'Roadmap',      href: '#' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Custom contracts',       href: '#' },
      { label: 'AI for education',       href: '#' },
      { label: 'Research partnerships',  href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Blog',        href: '#' },
      { label: 'Developers',  href: '#' },
      { label: 'Careers',     href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{
      background: C.bgDeep, color: C.ink, padding: '72px 48px 32px',
      fontFamily: F.sans, fontSize: 13, borderTop: `1px solid ${C.ink}`,
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr 1.2fr',
        gap: 48, marginBottom: 56,
      }}>
        {/* brand + address */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <svg width="28" height="28" viewBox="0 0 28 28">
              <rect x="2" y="2" width="24" height="24" fill="none" stroke={C.ink} strokeWidth="1.5" />
              <rect x="8" y="8" width="12" height="12" fill="var(--bw-accent, #e32400)" />
            </svg>
            <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 500 }}>Boardwalk Labs</div>
          </div>
          <div style={{ color: C.mute, maxWidth: 340, lineHeight: 1.55, marginBottom: 20 }}>
            An education-software studio making academic products and taking on a small number of custom engagements each year.
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.ink, letterSpacing: '0.1em', lineHeight: 1.8 }}>
            BOARDWALK LABS, LLC <br />
            No. 418 BROADWAY, SUITE N <br />
            ALBANY, NEW YORK 12207
          </div>
        </div>

        {/* link columns */}
        {cols.map(({ heading, links }) => (
          <div key={heading}>
            <div style={{ color: C.mute, fontFamily: F.mono, fontSize: 10, letterSpacing: '0.2em', marginBottom: 16 }}>
              {heading.toUpperCase()}
            </div>
            {links.map(({ label, href, external }) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <a
                  className="bw-hov"
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  style={{ color: C.ink, textDecoration: 'none' }}
                >
                  {label}{external ? ' ↗' : ''}
                </a>
              </div>
            ))}
          </div>
        ))}

        {/* contact */}
        <div>
          <div style={{ color: C.mute, fontFamily: F.mono, fontSize: 10, letterSpacing: '0.2em', marginBottom: 16 }}>
            CONTACT
          </div>
          <div style={{ marginBottom: 10 }}>
            <a className="bw-hov" href="mailto:support@octopilotai.com" style={{ color: C.ink, textDecoration: 'none' }}>
              support@octopilotai.com
            </a>
          </div>
          <div style={{ marginBottom: 10 }}>
            <a className="bw-hov" href="tel:+17046682497" style={{ color: C.ink, textDecoration: 'none' }}>
              +1 (704) 668 2497
            </a>
          </div>
          <div style={{ marginBottom: 10 }}>
            <a className="bw-hov" href="https://www.linkedin.com/company/109204476" target="_blank" rel="noreferrer" style={{ color: C.ink, textDecoration: 'none' }}>
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      <div style={{
        borderTop: `1px solid ${C.line}`, paddingTop: 20,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: F.mono, fontSize: 11, color: C.mute, letterSpacing: '0.1em',
      }}>
        <span>© 2026 BOARDWALK LABS LLC</span>
        <span>MADE IN ALBANY, NEW YORK ◆</span>
      </div>
    </footer>
  );
}
