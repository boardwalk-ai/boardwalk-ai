import { useState } from 'react';
import { Link } from 'react-router-dom';
import { C, F } from '../constants';

const TAGS = {
  new:      { label: 'NEW',      color: C.accent, bg: 'rgba(227,36,0,0.08)' },
  improved: { label: 'IMPROVED', color: C.gold,   bg: 'rgba(213,166,55,0.08)' },
  fixed:    { label: 'FIXED',    color: C.ink,     bg: 'rgba(20,17,13,0.06)' },
};

const entries = [
  {
    version: '0.4',
    full: 'v0.4.0',
    date: 'April 2026',
    status: 'LATEST',
    summary: 'Voice matching, citation assistant, and serious speed gains.',
    changes: [
      { type: 'new',      text: 'Voice & Polish mode — Octopilot analyzes your existing writing and matches its rhythm and tone in every suggestion.' },
      { type: 'new',      text: 'Source citation assistant — paste a URL or PDF and get APA, MLA, or Chicago citations formatted automatically.' },
      { type: 'new',      text: 'Educator dashboard — track student draft activity, revision count, and source usage across a class.' },
      { type: 'improved', text: 'Section rewrite response time down 40% across all document lengths.' },
      { type: 'improved', text: 'Rubric-aware feedback now handles multi-criterion rubrics with weighted scoring.' },
      { type: 'fixed',    text: 'Paragraph breaks lost when exporting to .docx on Windows.' },
      { type: 'fixed',    text: 'Session timeout no longer discards unsaved draft state.' },
    ],
  },
  {
    version: '0.3',
    full: 'v0.3.2',
    date: 'March 2026',
    status: null,
    summary: 'Patch release — reliability and cross-browser fixes.',
    changes: [
      { type: 'improved', text: 'Hallucination rate in source-aware mode reduced by 28% through improved context grounding.' },
      { type: 'improved', text: 'Source panel now accepts EPUB and plain-text files in addition to PDF and URL.' },
      { type: 'fixed',    text: 'Canvas not loading on Safari 17.x due to ResizeObserver timing issue.' },
      { type: 'fixed',    text: 'Copy to clipboard broken on Firefox 122+.' },
    ],
  },
  {
    version: '0.3',
    full: 'v0.3.1',
    date: 'March 2026',
    status: null,
    summary: 'Auth and persistence hotfixes.',
    changes: [
      { type: 'fixed', text: 'Auth redirect loop on institutional SSO login (Google Workspace, Microsoft 365).' },
      { type: 'fixed', text: 'Preferences (dark mode, font size) not persisting between sessions.' },
      { type: 'fixed', text: 'Mobile keyboard causing viewport shift on iOS 17.' },
    ],
  },
  {
    version: '0.3',
    full: 'v0.3.0',
    date: 'February 2026',
    status: null,
    summary: 'Rubric mode, section rewrites, and long-document support.',
    changes: [
      { type: 'new',      text: 'Rubric-aware feedback — paste any rubric and get writing feedback aligned to its exact criteria.' },
      { type: 'new',      text: 'Section rewrites — rewrite individual paragraphs in isolation without touching the rest of the document.' },
      { type: 'new',      text: 'Draft comparison — view a diff between any two saved drafts side by side.' },
      { type: 'improved', text: 'Stable performance on documents over 10,000 words. Previous limit was ~6,000.' },
      { type: 'improved', text: 'Context window for source materials expanded from 32k to 128k tokens.' },
    ],
  },
  {
    version: '0.2',
    full: 'v0.2.0',
    date: 'January 2026',
    status: null,
    summary: 'Source-aware writing and draft history.',
    changes: [
      { type: 'new',      text: 'Source-aware mode — attach PDFs and URLs as context. Octopilot references them in suggestions and avoids contradicting them.' },
      { type: 'new',      text: 'Draft history — navigate through up to 50 previous revisions with one-click restore.' },
      { type: 'new',      text: 'Export to Markdown, HTML, and plain text in addition to .docx.' },
      { type: 'improved', text: 'Significant prose quality improvements across all writing modes.' },
      { type: 'fixed',    text: 'Emoji stripped from exported documents.' },
      { type: 'fixed',    text: 'Suggestion panel overflowing on viewports narrower than 1280px.' },
    ],
  },
  {
    version: '0.1',
    full: 'v0.1.0',
    date: 'December 2025',
    status: 'INITIAL',
    summary: 'First public release of Octopilot AI.',
    changes: [
      { type: 'new', text: 'Draft & revise — write from a brief or paste existing text for AI-assisted revision.' },
      { type: 'new', text: 'Voice & tone controls — adjust formality, length, and reading level.' },
      { type: 'new', text: 'Account system with Google and email sign-in.' },
      { type: 'new', text: 'Web-based editor with auto-save.' },
    ],
  },
];

const FILTERS = ['ALL', 'NEW', 'IMPROVED', 'FIXED'];

// ── Tag chip ──────────────────────────────────────────────────────
function Tag({ type }) {
  const t = TAGS[type];
  return (
    <span style={{
      fontFamily: F.mono, fontSize: 10, letterSpacing: '0.15em',
      color: t.color, background: t.bg,
      padding: '3px 8px', display: 'inline-block',
    }}>
      {t.label}
    </span>
  );
}

// ── Single entry ──────────────────────────────────────────────────
function Entry({ entry, filter, isFirst }) {
  const visible = entry.changes.filter(c =>
    filter === 'ALL' || c.type === filter.toLowerCase()
  );
  if (visible.length === 0) return null;

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '260px 1fr',
      gap: 0, borderTop: `1px solid ${C.line}`,
      position: 'relative',
    }}>
      {/* Left — version + meta */}
      <div style={{
        padding: '64px 48px 64px 0',
        position: 'sticky', top: 130,
        alignSelf: 'start',
      }}>
        <div style={{
          fontFamily: F.display, fontWeight: 300,
          fontSize: 'clamp(80px, 8vw, 120px)', lineHeight: 0.85,
          letterSpacing: '-0.05em', color: C.ink,
          marginBottom: 20,
        }}>
          {entry.version}
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: C.accent, letterSpacing: '0.15em', marginBottom: 8 }}>
          {entry.full}
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: C.mute, letterSpacing: '0.12em', marginBottom: 16 }}>
          {entry.date.toUpperCase()}
        </div>
        {entry.status && (
          <div style={{
            display: 'inline-block',
            fontFamily: F.mono, fontSize: 10, letterSpacing: '0.2em',
            color: entry.status === 'LATEST' ? C.bg : C.mute,
            background: entry.status === 'LATEST' ? C.accent : 'transparent',
            border: `1px solid ${entry.status === 'LATEST' ? C.accent : C.line}`,
            padding: '4px 10px',
          }}>
            {entry.status}
          </div>
        )}
      </div>

      {/* Right — changes */}
      <div style={{
        borderLeft: `1px solid ${C.line}`,
        padding: '64px 0 64px 64px',
      }}>
        <p style={{
          fontFamily: F.display, fontSize: 22, fontStyle: 'italic',
          fontWeight: 300, color: C.mute, margin: '0 0 40px',
          letterSpacing: '-0.01em', lineHeight: 1.3, maxWidth: 560,
        }}>
          {entry.summary}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {visible.map((c, i) => (
            <div key={i} style={{
              display: 'flex', gap: 16, alignItems: 'flex-start',
              padding: '20px 24px',
              background: TAGS[c.type].bg,
              borderLeft: `3px solid ${TAGS[c.type].color}`,
              transition: 'background .2s',
            }}>
              <Tag type={c.type} />
              <p style={{
                fontFamily: F.sans, fontSize: 15, lineHeight: 1.6,
                color: C.inkSoft, margin: 0,
              }}>
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function Changelog() {
  const [filter, setFilter] = useState('ALL');

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>

      {/* Nav */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 48px',
        background: 'rgba(243,238,228,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${C.line}`,
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: C.ink }}>
          <svg width="28" height="28" viewBox="0 0 28 28">
            <rect x="2" y="2" width="24" height="24" fill="none" stroke={C.ink} strokeWidth="1.5" />
            <rect x="8" y="8" width="12" height="12" fill={C.accent} />
          </svg>
          <span style={{ fontFamily: F.display, fontSize: 18, fontWeight: 500 }}>Boardwalk Labs</span>
        </Link>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: C.mute, letterSpacing: '0.2em' }}>
          OCTOPILOT AI · CHANGELOG
        </div>
        <Link to="/" style={{ fontFamily: F.sans, fontSize: 13, color: C.ink, textDecoration: 'none' }}>
          ← Back to site
        </Link>
      </div>

      {/* Hero */}
      <div style={{
        background: C.deep, color: C.bg,
        padding: '160px 48px 100px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 100% 100%, rgba(227,36,0,0.2) 0%, transparent 55%)',
        }} />
        {/* giant background version */}
        <div style={{
          position: 'absolute', right: -20, bottom: -60,
          fontFamily: F.display, fontSize: 360, fontWeight: 300,
          color: 'rgba(243,238,228,0.03)', lineHeight: 1,
          letterSpacing: '-0.06em', pointerEvents: 'none', userSelect: 'none',
        }}>
          0.4
        </div>
        <div style={{ position: 'relative', maxWidth: 800 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
            <div style={{ fontFamily: F.mono, fontSize: 11, color: C.gold, letterSpacing: '0.25em' }}>
              OCTOPILOT AI
            </div>
            <div style={{ width: 1, height: 12, background: 'rgba(243,238,228,0.2)' }} />
            <div style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(243,238,228,0.4)', letterSpacing: '0.2em' }}>
              BUILDING IN PUBLIC
            </div>
          </div>
          <h1 style={{
            fontFamily: F.display, fontSize: 'clamp(64px, 9vw, 128px)',
            fontWeight: 300, margin: '0 0 40px', lineHeight: 0.88,
            letterSpacing: '-0.045em',
          }}>
            What ships<em style={{ color: C.accent }}>.</em>
          </h1>
          <p style={{
            fontFamily: F.sans, fontSize: 17, lineHeight: 1.65,
            color: 'rgba(243,238,228,0.6)', maxWidth: 520, margin: 0,
          }}>
            Every release. Every fix. Every improvement. We ship every Friday — this is the record.
          </p>
        </div>
      </div>

      {/* Filter bar — sticky */}
      <div style={{
        position: 'sticky', top: 65, zIndex: 40,
        background: 'rgba(243,238,228,0.96)', backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${C.line}`,
        padding: '0 48px',
        display: 'flex', alignItems: 'center', gap: 0,
      }}>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: C.mute, letterSpacing: '0.2em', marginRight: 32, padding: '20px 0' }}>
          FILTER
        </div>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: 'none', border: 'none',
            padding: '20px 20px 18px',
            fontFamily: F.mono, fontSize: 11, letterSpacing: '0.15em',
            color: filter === f ? C.ink : C.mute,
            borderBottom: `2px solid ${filter === f ? C.accent : 'transparent'}`,
            transition: 'all .2s',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            {f !== 'ALL' && (
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: TAGS[f.toLowerCase()]?.color,
                display: 'inline-block',
              }} />
            )}
            {f}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', fontFamily: F.mono, fontSize: 11, color: C.mute, letterSpacing: '0.1em', padding: '20px 0' }}>
          LATEST — v0.4.0 · APRIL 2026
        </div>
      </div>

      {/* Entries */}
      <div style={{ padding: '0 48px', maxWidth: 1100, margin: '0 auto' }}>
        {entries.map((entry, i) => (
          <Entry key={entry.full} entry={entry} filter={filter} isFirst={i === 0} />
        ))}
      </div>

      {/* Bottom strip */}
      <div style={{
        margin: '0 48px',
        borderTop: `1px solid ${C.line}`,
        padding: '48px 0 80px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.mute, letterSpacing: '0.15em', marginBottom: 8 }}>
            WHAT'S NEXT
          </div>
          <div style={{ fontFamily: F.display, fontSize: 24, fontWeight: 300, color: C.ink }}>
            Check the <em style={{ color: C.accent }}>roadmap</em> to see what's coming in v0.5.
          </div>
        </div>
        <a href="mailto:support@octopilotai.com" style={{
          fontFamily: F.mono, fontSize: 11, color: C.ink,
          letterSpacing: '0.15em', textDecoration: 'none',
          border: `1px solid ${C.line}`, padding: '16px 24px',
          display: 'flex', alignItems: 'center', gap: 10,
          transition: 'border-color .2s',
        }}>
          REPORT A BUG ↗
        </a>
      </div>

      {/* Footer strip */}
      <div style={{
        background: C.deep, color: 'rgba(243,238,228,0.4)',
        padding: '28px 48px', fontFamily: F.mono, fontSize: 11,
        letterSpacing: '0.1em', display: 'flex', justifyContent: 'space-between',
      }}>
        <span>© 2026 BOARDWALK LABS LLC</span>
        <span>OCTOPILOT AI · CHANGELOG</span>
      </div>

    </div>
  );
}
