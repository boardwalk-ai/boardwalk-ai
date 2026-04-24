import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { C, F } from '../constants';
import { getPosts } from '../api/blog';

const CATEGORIES = ['ALL', 'PRODUCT', 'EDUCATION', 'ENGINEERING', 'COMPANY'];

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
    <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{
        background: post.gradient,
        padding: '72px 64px',
        position: 'relative', overflow: 'hidden',
        transition: 'transform .5s cubic-bezier(.2,.7,.3,1)',
        transform: hov ? 'translateY(-4px)' : 'none',
      }}>
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
    </Link>
  );
}

// ── Regular card ─────────────────────────────────────────────────
function PostCard({ post, large = false }) {
  const [hov, setHov] = useState(false);
  return (
    <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
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
    </Link>
  );
}

// ── Skeleton card ────────────────────────────────────────────────
function SkeletonCard({ height = 180 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ height, background: `linear-gradient(90deg, ${C.bgDeep} 25%, ${C.line} 50%, ${C.bgDeep} 75%)`, backgroundSize: '200% 100%', animation: 'bw-skeleton 1.4s ease infinite' }} />
      <div style={{ borderTop: `1px solid ${C.line}`, padding: '28px 0 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ height: 10, width: '40%', background: C.line, borderRadius: 2 }} />
        <div style={{ height: 22, width: '85%', background: C.line, borderRadius: 2 }} />
        <div style={{ height: 14, width: '95%', background: C.line, borderRadius: 2 }} />
        <div style={{ height: 14, width: '70%', background: C.line, borderRadius: 2 }} />
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function Blog() {
  const [filter, setFilter]   = useState('ALL');
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPosts({ category: filter })
      .then(setPosts)
      .finally(() => setLoading(false));
  }, [filter]);

  const featured        = posts.find(p => p.featured);
  const rest            = posts.filter(p => !p.featured);
  const featuredVisible = !!featured;

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>

      <style>{`
        @keyframes bw-skeleton {
          0%   { background-position: 200% 0 }
          100% { background-position: -200% 0 }
        }
      `}</style>

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
              <span>{posts.length || '—'} ESSAYS</span>
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
            transition: 'all .2s', cursor: 'none',
          }}>
            {c}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', fontFamily: F.mono, fontSize: 11, color: C.mute, letterSpacing: '0.1em' }}>
          {loading ? '—' : posts.length} ESSAYS
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '64px 48px 120px' }}>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            <SkeletonCard height={240} />
            <SkeletonCard height={180} />
            <SkeletonCard height={180} />
          </div>
        ) : (
          <>
            {featuredVisible && (
              <div style={{ marginBottom: 64 }}>
                <FeaturedCard post={featured} />
              </div>
            )}

            {rest.length >= 2 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 2, marginBottom: 2 }}>
                <PostCard post={rest[0]} large />
                <PostCard post={rest[1]} />
              </div>
            )}
            {rest.length > 2 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, marginTop: 2 }}>
                {rest.slice(2).map(p => <PostCard key={p.id} post={p} />)}
              </div>
            )}
            {rest.length === 1 && !featuredVisible && <PostCard post={rest[0]} large />}

            {posts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '120px 0' }}>
                <div style={{ fontFamily: F.display, fontSize: 80, fontWeight: 300, color: C.line, marginBottom: 24 }}>∅</div>
                <div style={{ fontFamily: F.sans, fontSize: 16, color: C.mute }}>No {filter} essays yet.</div>
              </div>
            )}
          </>
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
              letterSpacing: '0.15em', flexShrink: 0, cursor: 'none',
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
