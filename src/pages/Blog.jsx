import { useState } from 'react';
import { Link } from 'react-router-dom';
import { C, F } from '../constants';

// ── Content ───────────────────────────────────────────────────────
const CATEGORIES = ['ALL', 'PRODUCT', 'EDUCATION', 'ENGINEERING', 'COMPANY'];

const posts = [
  {
    id: 1,
    slug: 'why-we-built-octopilot-for-educators',
    cat: 'PRODUCT',
    issue: '008',
    title: 'Why we built Octopilot for educators, not students',
    excerpt: 'Every AI writing tool targets students. We decided the more important — and harder — problem was giving teachers their time back.',
    author: { name: 'Leon T.', initials: 'LT', color: C.accent },
    date: 'Apr 18, 2026',
    readTime: '7 min',
    featured: true,
    gradient: `linear-gradient(135deg, ${C.deep} 0%, #2a1a15 100%)`,
    accentLine: C.accent,
  },
  {
    id: 2,
    slug: 'state-of-ai-in-k12-education',
    cat: 'EDUCATION',
    issue: '007',
    title: 'What the research actually says about AI in K–12 classrooms',
    excerpt: 'We read 40 peer-reviewed papers so you don\'t have to. The findings are more nuanced — and more optimistic — than the discourse suggests.',
    author: { name: 'Leon T.', initials: 'LT', color: C.accent },
    date: 'Apr 10, 2026',
    readTime: '12 min',
    featured: false,
    gradient: `linear-gradient(135deg, #1b2e20 0%, #0d1a10 100%)`,
    accentLine: '#4caf72',
  },
  {
    id: 3,
    slug: 'reducing-hallucination-rate',
    cat: 'ENGINEERING',
    issue: '006',
    title: 'How we cut Octopilot\'s hallucination rate by 28%',
    excerpt: 'Source grounding, context stratification, and a retrieval architecture we almost didn\'t ship. The full technical breakdown.',
    author: { name: 'Leon T.', initials: 'LT', color: C.accent },
    date: 'Mar 28, 2026',
    readTime: '9 min',
    featured: false,
    gradient: `linear-gradient(135deg, #1a1420 0%, #0d0c15 100%)`,
    accentLine: '#9b59b6',
  },
  {
    id: 4,
    slug: 'why-we-say-no-to-most-contracts',
    cat: 'COMPANY',
    issue: '005',
    title: 'We say no to most contract requests. Here\'s why.',
    excerpt: 'Last quarter we declined 11 out of 14 custom software inquiries. Some of them were lucrative. This is what we look for before we say yes.',
    author: { name: 'Leon T.', initials: 'LT', color: C.accent },
    date: 'Mar 14, 2026',
    readTime: '5 min',
    featured: false,
    gradient: `linear-gradient(135deg, ${C.bgDeep} 0%, #d4ccb8 100%)`,
    accentLine: C.gold,
  },
  {
    id: 5,
    slug: 'ferpa-ai-guide-for-districts',
    cat: 'EDUCATION',
    issue: '004',
    title: 'FERPA and AI tools: a practical guide for district administrators',
    excerpt: 'What FERPA actually requires, what it doesn\'t, and the questions you should be asking vendors before signing any contract.',
    author: { name: 'Leon T.', initials: 'LT', color: C.accent },
    date: 'Feb 27, 2026',
    readTime: '10 min',
    featured: false,
    gradient: `linear-gradient(135deg, #1a1f2e 0%, #0d1018 100%)`,
    accentLine: '#3d7cf5',
  },
  {
    id: 6,
    slug: 'building-with-fraunces',
    cat: 'ENGINEERING',
    issue: '003',
    title: 'Choosing Fraunces: type decisions in educational software',
    excerpt: 'Variable optical-size serif fonts in a tool used at 2am under deadline pressure. The case for legibility over novelty — and why we made both work.',
    author: { name: 'Leon T.', initials: 'LT', color: C.accent },
    date: 'Feb 12, 2026',
    readTime: '6 min',
    featured: false,
    gradient: `linear-gradient(135deg, #2e1a10 0%, #1a0e08 100%)`,
    accentLine: C.gold,
  },
  {
    id: 7,
    slug: 'the-rubric-problem',
    cat: 'EDUCATION',
    issue: '002',
    title: 'The rubric problem: why grading feedback is still broken',
    excerpt: 'Teachers spend 7–10 hours per week writing feedback that students spend 12 seconds reading. We think software can close that gap.',
    author: { name: 'Leon T.', initials: 'LT', color: C.accent },
    date: 'Jan 30, 2026',
    readTime: '8 min',
    featured: false,
    gradient: `linear-gradient(135deg, #0d1a12 0%, #060e09 100%)`,
    accentLine: '#4caf72',
  },
  {
    id: 8,
    slug: 'what-we-shipped-q1-2026',
    cat: 'PRODUCT',
    issue: '001',
    title: 'What we shipped in Q1 2026',
    excerpt: 'Rubric mode, section rewrites, long-document support, 28% fewer hallucinations, and a complete rework of the source panel. The full retrospective.',
    author: { name: 'Leon T.', initials: 'LT', color: C.accent },
    date: 'Jan 3, 2026',
    readTime: '4 min',
    featured: false,
    gradient: `linear-gradient(135deg, ${C.deep} 0%, #1a1208 100%)`,
    accentLine: C.accent,
  },
];

// ── Category chip ────────────────────────────────────────────────
function CatChip({ label, color = C.accent }) {
  return (
    <span style={{
      fontFamily: F.mono, fontSize: 10, letterSpacing: '0.2em',
      color, border: `1px solid ${color}33`, padding: '3px 10px',
      display: 'inline-block',
    }}>
      {label}
    </span>
  );
}

// ── Featured hero card ───────────────────────────────────────────
function FeaturedCard({ post }) {
  const [hov, setHov] = useState(false);
  return (
    <a href="#" style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{
        background: post.gradient,
        padding: '72px 64px',
        position: 'relative', overflow: 'hidden',
        transition: 'transform .5s cubic-bezier(.2,.7,.3,1)',
        transform: hov ? 'translateY(-4px)' : 'none',
      }}>
        {/* watermark issue number */}
        <div style={{
          position: 'absolute', right: -10, bottom: -30,
          fontFamily: F.display, fontSize: 280, fontWeight: 300,
          color: 'rgba(255,255,255,0.03)', lineHeight: 1,
          letterSpacing: '-0.06em', pointerEvents: 'none', userSelect: 'none',
        }}>
          {post.issue}
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40 }}>
            <CatChip label={post.cat} color={post.accentLine} />
            <span style={{ fontFamily: F.mono, fontSize: 10, color: 'rgba(243,238,228,0.35)', letterSpacing: '0.15em' }}>
              ISSUE NO. {post.issue} · {post.readTime.toUpperCase()} READ
            </span>
          </div>

          <h2 style={{
            fontFamily: F.display, fontSize: 'clamp(40px, 5vw, 72px)',
            fontWeight: 300, margin: '0 0 28px', lineHeight: 1.0,
            letterSpacing: '-0.035em', color: C.bg, maxWidth: 700,
          }}>
            {post.title}
          </h2>

          <p style={{
            fontFamily: F.sans, fontSize: 17, lineHeight: 1.65,
            color: 'rgba(243,238,228,0.6)', margin: '0 0 48px', maxWidth: 560,
          }}>
            {post.excerpt}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: post.author.color, color: '#fff',
                display: 'grid', placeItems: 'center',
                fontFamily: F.display, fontSize: 13, fontWeight: 500,
              }}>
                {post.author.initials}
              </div>
              <div>
                <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 500, color: C.bg }}>{post.author.name}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, color: 'rgba(243,238,228,0.4)', letterSpacing: '0.1em' }}>{post.date.toUpperCase()}</div>
              </div>
            </div>
            <div style={{
              fontFamily: F.mono, fontSize: 12, color: post.accentLine,
              letterSpacing: '0.15em',
              transform: hov ? 'translateX(6px)' : 'none',
              transition: 'transform .3s',
            }}>
              READ ESSAY →
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

// ── Regular card ─────────────────────────────────────────────────
function PostCard({ post, large = false }) {
  const [hov, setHov] = useState(false);
  return (
    <a href="#" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {/* colour slab */}
      <div style={{
        background: post.gradient,
        height: large ? 240 : 180,
        position: 'relative', overflow: 'hidden',
        flexShrink: 0,
        transition: 'transform .5s cubic-bezier(.2,.7,.3,1)',
        transform: hov ? 'scale(1.02)' : 'none',
      }}>
        <div style={{
          position: 'absolute', bottom: 16, left: 20,
          fontFamily: F.display, fontStyle: 'italic',
          fontSize: large ? 80 : 60, fontWeight: 300,
          color: 'rgba(255,255,255,0.06)', lineHeight: 1,
          letterSpacing: '-0.05em', userSelect: 'none',
        }}>
          {post.issue}
        </div>
        <div style={{ position: 'absolute', top: 16, left: 20 }}>
          <CatChip label={post.cat} color={post.accentLine} />
        </div>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 3, background: post.accentLine,
          transform: hov ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform .4s cubic-bezier(.2,.7,.3,1)',
        }} />
      </div>

      {/* text */}
      <div style={{
        padding: '28px 0 0', flex: 1, display: 'flex', flexDirection: 'column',
        borderTop: `1px solid ${C.line}`,
      }}>
        <div style={{ fontFamily: F.mono, fontSize: 10, color: C.mute, letterSpacing: '0.15em', marginBottom: 14 }}>
          {post.readTime.toUpperCase()} READ · {post.date.toUpperCase()}
        </div>
        <h3 style={{
          fontFamily: F.display, fontWeight: 400,
          fontSize: large ? 28 : 22,
          lineHeight: 1.2, letterSpacing: '-0.02em',
          color: C.ink, margin: '0 0 14px', flex: 1,
        }}>
          {post.title}
        </h3>
        <p style={{
          fontFamily: F.sans, fontSize: 14, lineHeight: 1.6,
          color: C.mute, margin: '0 0 24px',
          display: '-webkit-box', WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {post.excerpt}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: post.author.color, color: '#fff',
              display: 'grid', placeItems: 'center',
              fontFamily: F.display, fontSize: 11, fontWeight: 500,
            }}>
              {post.author.initials}
            </div>
            <span style={{ fontFamily: F.sans, fontSize: 12, color: C.mute }}>{post.author.name}</span>
          </div>
          <div style={{
            fontFamily: F.mono, fontSize: 10, color: post.accentLine,
            letterSpacing: '0.1em',
            opacity: hov ? 1 : 0,
            transform: hov ? 'translateX(0)' : 'translateX(-6px)',
            transition: 'opacity .3s, transform .3s',
          }}>
            READ →
          </div>
        </div>
      </div>
    </a>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function Blog() {
  const [filter, setFilter] = useState('ALL');

  const featured = posts[0];
  const rest = posts.slice(1).filter(p => filter === 'ALL' || p.cat === filter);
  const featuredVisible = filter === 'ALL' || featured.cat === filter;

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
          THE JOURNAL
        </div>
        <Link to="/" style={{ fontFamily: F.sans, fontSize: 13, color: C.ink, textDecoration: 'none' }}>
          ← Back to site
        </Link>
      </div>

      {/* Hero */}
      <div style={{
        background: C.deep, color: C.bg,
        padding: '160px 48px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 0% 100%, rgba(227,36,0,0.15) 0%, transparent 50%)',
        }} />
        {/* big italic background word */}
        <div style={{
          position: 'absolute', right: -40, top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: F.display, fontStyle: 'italic', fontSize: 420,
          fontWeight: 300, color: 'rgba(243,238,228,0.025)',
          lineHeight: 1, letterSpacing: '-0.06em',
          pointerEvents: 'none', userSelect: 'none',
          whiteSpace: 'nowrap',
        }}>
          ideas.
        </div>
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end' }}>
          <div>
            <div style={{ fontFamily: F.mono, fontSize: 11, color: C.gold, letterSpacing: '0.25em', marginBottom: 28 }}>
              BOARDWALK LABS · THE JOURNAL
            </div>
            <h1 style={{
              fontFamily: F.display, fontSize: 'clamp(60px, 8vw, 120px)',
              fontWeight: 300, margin: 0, lineHeight: 0.88,
              letterSpacing: '-0.045em',
            }}>
              Writing about<br />
              <em style={{ color: C.accent }}>building</em>.
            </h1>
          </div>
          <div style={{ paddingBottom: 8 }}>
            <p style={{
              fontFamily: F.sans, fontSize: 17, lineHeight: 1.65,
              color: 'rgba(243,238,228,0.55)', margin: '0 0 24px',
            }}>
              Product decisions, education research, engineering deep-dives, and the thinking behind how we work. Published when there's something worth saying.
            </p>
            <div style={{ display: 'flex', gap: 32, fontFamily: F.mono, fontSize: 11, color: 'rgba(243,238,228,0.3)', letterSpacing: '0.15em' }}>
              <span>{posts.length} ESSAYS</span>
              <span>·</span>
              <span>SINCE DEC 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div style={{
        position: 'sticky', top: 65, zIndex: 40,
        background: 'rgba(243,238,228,0.96)', backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${C.line}`,
        padding: '0 48px', display: 'flex', alignItems: 'center',
      }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            background: 'none', border: 'none',
            padding: '20px 20px 18px', marginRight: 4,
            fontFamily: F.mono, fontSize: 11, letterSpacing: '0.15em',
            color: filter === c ? C.ink : C.mute,
            borderBottom: `2px solid ${filter === c ? C.accent : 'transparent'}`,
            transition: 'all .2s',
          }}>
            {c}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', fontFamily: F.mono, fontSize: 11, color: C.mute, letterSpacing: '0.1em' }}>
          {filter === 'ALL' ? posts.length : posts.filter(p => p.cat === filter).length} ESSAYS
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '64px 48px 120px' }}>

        {/* Featured */}
        {featuredVisible && (
          <div style={{ marginBottom: 64 }}>
            <FeaturedCard post={featured} />
          </div>
        )}

        {/* Grid — asymmetric: 2-col then 3-col rows */}
        {rest.length > 0 && (
          <>
            {/* First row: 2 cols, unequal */}
            {rest.length >= 2 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 2, marginBottom: 2 }}>
                <PostCard post={rest[0]} large />
                <PostCard post={rest[1]} />
              </div>
            )}
            {/* Remaining: 3-col grid */}
            {rest.length > 2 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, marginTop: 2 }}>
                {rest.slice(2).map(p => <PostCard key={p.id} post={p} />)}
              </div>
            )}
            {/* Single article fallback */}
            {rest.length === 1 && <PostCard post={rest[0]} large />}
          </>
        )}

        {/* Empty state */}
        {rest.length === 0 && !featuredVisible && (
          <div style={{ textAlign: 'center', padding: '120px 0' }}>
            <div style={{ fontFamily: F.display, fontSize: 80, fontWeight: 300, color: C.line, marginBottom: 24 }}>∅</div>
            <div style={{ fontFamily: F.sans, fontSize: 16, color: C.mute }}>No {filter} essays yet.</div>
          </div>
        )}
      </div>

      {/* Newsletter strip */}
      <div style={{
        background: C.bgDeep, borderTop: `1px solid ${C.lineStrong}`,
        padding: '80px 48px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center',
      }}>
        <div>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.mute, letterSpacing: '0.2em', marginBottom: 16 }}>
            THE JOURNAL · DISPATCH
          </div>
          <div style={{ fontFamily: F.display, fontSize: 42, fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.025em', color: C.ink }}>
            New essays, when they're<br />
            <em style={{ color: C.accent }}>worth reading</em>.
          </div>
          <div style={{ fontFamily: F.sans, fontSize: 14, color: C.mute, marginTop: 16, lineHeight: 1.6 }}>
            No cadence commitments. No weekly roundups. We send it when it's ready.
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', gap: 0 }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                flex: 1, background: C.bg, border: `1px solid ${C.lineStrong}`,
                borderRight: 'none', padding: '18px 20px',
                fontFamily: F.sans, fontSize: 14, color: C.ink,
                outline: 'none',
              }}
            />
            <button data-hover style={{
              background: C.ink, color: C.bg, border: 'none',
              padding: '18px 28px', fontFamily: F.mono, fontSize: 11,
              letterSpacing: '0.15em', flexShrink: 0,
            }}>
              SUBSCRIBE →
            </button>
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: C.mute, letterSpacing: '0.1em', marginTop: 10 }}>
            NO SPAM. UNSUBSCRIBE ANYTIME.
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div style={{
        background: C.deep, color: 'rgba(243,238,228,0.4)',
        padding: '28px 48px', fontFamily: F.mono, fontSize: 11,
        letterSpacing: '0.1em', display: 'flex', justifyContent: 'space-between',
      }}>
        <span>© 2026 BOARDWALK LABS LLC</span>
        <span>THE JOURNAL</span>
      </div>

    </div>
  );
}
