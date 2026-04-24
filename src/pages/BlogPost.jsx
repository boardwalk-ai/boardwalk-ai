import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { C, F } from '../constants';
import { getPost, getPosts } from '../api/blog';
import AuthorAvatar from '../components/AuthorAvatar';

// ── Reading progress bar ─────────────────────────────────────────
function ReadingProgress({ color }) {
  const barRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 9999, background: 'transparent' }}>
      <div ref={barRef} style={{ height: '100%', background: color, width: '0%', transition: 'width .08s linear' }} />
    </div>
  );
}

// ── Body block renderer ──────────────────────────────────────────
function BodyBlock({ block }) {
  if (block.type === 'h2') {
    return (
      <h2 style={{
        fontFamily: F.display, fontSize: 32, fontWeight: 400,
        letterSpacing: '-0.025em', lineHeight: 1.2,
        color: C.ink, margin: '64px 0 24px',
      }}>
        {block.text}
      </h2>
    );
  }
  if (block.type === 'h3') {
    return (
      <h3 style={{
        fontFamily: F.display, fontSize: 22, fontWeight: 400,
        letterSpacing: '-0.015em', lineHeight: 1.3,
        color: C.ink, margin: '40px 0 16px',
      }}>
        {block.text}
      </h3>
    );
  }
  if (block.type === 'quote') {
    return (
      <blockquote style={{
        margin: '48px 0',
        padding: '32px 40px',
        borderLeft: `3px solid ${C.accent}`,
        background: C.bgDeep,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 16, left: 40,
          fontFamily: F.display, fontSize: 80, fontWeight: 300,
          color: C.accent, opacity: 0.15, lineHeight: 1,
          userSelect: 'none', pointerEvents: 'none',
        }}>
          "
        </div>
        <p style={{
          fontFamily: F.display, fontSize: 22, fontStyle: 'italic',
          fontWeight: 300, lineHeight: 1.5, letterSpacing: '-0.01em',
          color: C.inkSoft, margin: 0, position: 'relative',
        }}>
          {block.text}
        </p>
      </blockquote>
    );
  }
  return (
    <p style={{
      fontFamily: F.sans, fontSize: 18, lineHeight: 1.8,
      color: C.inkSoft, margin: '0 0 28px',
    }}>
      {block.text}
    </p>
  );
}

// ── Related card ─────────────────────────────────────────────────
function RelatedCard({ post }) {
  const [hov, setHov] = useState(false);
  return (
    <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{
        background: post.gradient, height: 140,
        position: 'relative', overflow: 'hidden',
        transition: 'transform .4s cubic-bezier(.2,.7,.3,1)',
        transform: hov ? 'scale(1.02)' : 'none',
      }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: post.accentLine, transform: hov ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform .4s cubic-bezier(.2,.7,.3,1)' }} />
        <div style={{ position: 'absolute', top: 14, left: 16 }}>
          <span style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.2em', color: post.accentLine, border: `1px solid ${post.accentLine}33`, padding: '3px 10px' }}>{post.cat}</span>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${C.line}`, padding: '20px 0 0' }}>
        <div style={{ fontFamily: F.mono, fontSize: 10, color: C.mute, letterSpacing: '0.12em', marginBottom: 10 }}>{post.readTime.toUpperCase()} READ · {post.date.toUpperCase()}</div>
        <h4 style={{ fontFamily: F.display, fontSize: 20, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.25, color: C.ink, margin: '0 0 8px' }}>{post.title}</h4>
        <div style={{ fontFamily: F.mono, fontSize: 10, color: post.accentLine, letterSpacing: '0.1em', opacity: hov ? 1 : 0, transform: hov ? 'translateX(0)' : 'translateX(-4px)', transition: 'all .3s' }}>READ →</div>
      </div>
    </Link>
  );
}

// ── 404 ──────────────────────────────────────────────────────────
function NotFound() {
  return (
    <div style={{ background: C.bg, minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: F.display, fontSize: 120, fontWeight: 300, color: C.line, lineHeight: 1 }}>404</div>
        <div style={{ fontFamily: F.sans, fontSize: 16, color: C.mute, margin: '16px 0 32px' }}>This essay doesn't exist.</div>
        <Link to="/blog" style={{ fontFamily: F.mono, fontSize: 11, color: C.ink, letterSpacing: '0.15em', textDecoration: 'none', border: `1px solid ${C.lineStrong}`, padding: '14px 24px' }}>
          ← ALL ESSAYS
        </Link>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost]         = useState(null);
  const [related, setRelated]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    window.scrollTo(0, 0);
    getPost(slug).then(p => {
      if (!p) { setNotFound(true); setLoading(false); return; }
      setPost(p);
      getPosts({ category: p.cat }).then(all => {
        setRelated(all.filter(x => x.slug !== slug).slice(0, 3));
      });
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ background: C.bg, minHeight: '100vh' }}>
        <div style={{ height: '60vh', background: `linear-gradient(135deg, ${C.deep} 0%, #2a1a15 100%)` }} />
      </div>
    );
  }

  if (notFound) return <NotFound />;

  const hasBody = post.body && post.body.length > 0;

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <ReadingProgress color={post.accentLine} />

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
        <Link to="/blog" style={{ fontFamily: F.sans, fontSize: 13, color: C.ink, textDecoration: 'none' }}>
          ← All essays
        </Link>
      </div>

      {/* Hero */}
      <div style={{
        background: post.gradient,
        padding: '160px 48px 80px',
        position: 'relative', overflow: 'hidden',
        minHeight: '56vh', display: 'flex', alignItems: 'flex-end',
      }}>
        {/* radial glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 100% 0%, rgba(255,255,255,0.04) 0%, transparent 55%)',
        }} />
        {/* giant watermark issue number */}
        <div style={{
          position: 'absolute', right: -20, bottom: -60,
          fontFamily: F.display, fontSize: 360, fontWeight: 300,
          color: 'rgba(255,255,255,0.04)', lineHeight: 1,
          letterSpacing: '-0.06em', pointerEvents: 'none', userSelect: 'none',
        }}>
          {post.issue}
        </div>

        <div style={{ position: 'relative', maxWidth: 860 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
            <span style={{
              fontFamily: F.mono, fontSize: 10, letterSpacing: '0.2em',
              color: post.accentLine, border: `1px solid ${post.accentLine}44`, padding: '4px 12px',
            }}>
              {post.cat}
            </span>
            <span style={{ fontFamily: F.mono, fontSize: 10, color: 'rgba(243,238,228,0.35)', letterSpacing: '0.15em' }}>
              ISSUE NO. {post.issue} · {post.readTime.toUpperCase()} READ
            </span>
          </div>

          <h1 style={{
            fontFamily: F.display,
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: 300, margin: '0 0 40px',
            lineHeight: 1.0, letterSpacing: '-0.04em',
            color: C.bg,
          }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <AuthorAvatar author={post.author} size={44} />
            <div>
              <div style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 500, color: C.bg }}>{post.author.name}</div>
              <div style={{ fontFamily: F.mono, fontSize: 10, color: 'rgba(243,238,228,0.4)', letterSpacing: '0.12em', marginTop: 2 }}>
                {post.date.toUpperCase()} · BOARDWALK LABS
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Excerpt band */}
      <div style={{ borderBottom: `1px solid ${C.line}`, padding: '48px 48px' }}>
        <p style={{
          fontFamily: F.display, fontSize: 22, fontStyle: 'italic',
          fontWeight: 300, color: C.mute, margin: '0 auto',
          maxWidth: 720, lineHeight: 1.5, letterSpacing: '-0.01em',
        }}>
          {post.excerpt}
        </p>
      </div>

      {/* Article body */}
      <div style={{ padding: '72px 48px', maxWidth: 720 + 96, margin: '0 auto' }}>
        <div style={{ maxWidth: 720 }}>
          {hasBody ? (
            post.body.map((block, i) => <BodyBlock key={i} block={block} />)
          ) : (
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
              <div style={{ fontFamily: F.display, fontSize: 48, fontWeight: 300, color: C.line, marginBottom: 16 }}>···</div>
              <div style={{ fontFamily: F.sans, fontSize: 15, color: C.mute, lineHeight: 1.6 }}>
                Full article text lives in the CMS.<br />
                Wire up <code style={{ fontFamily: F.mono, fontSize: 13, background: C.bgDeep, padding: '2px 6px' }}>VITE_API_URL</code> to load it.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Author card */}
      <div style={{ padding: '0 48px 96px', maxWidth: 720 + 96, margin: '0 auto' }}>
        <div style={{ maxWidth: 720, borderTop: `1px solid ${C.line}`, paddingTop: 48 }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: C.mute, letterSpacing: '0.2em', marginBottom: 20 }}>WRITTEN BY</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <AuthorAvatar author={post.author} size={56} />
            <div>
              <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 400, letterSpacing: '-0.02em', color: C.ink }}>{post.author.name}</div>
              <div style={{ fontFamily: F.sans, fontSize: 13, color: C.mute, marginTop: 4, lineHeight: 1.5 }}>
                {post.author.bio || 'Founder, Boardwalk Labs. Building Octopilot AI and thinking about education software.'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div style={{ background: C.bgDeep, borderTop: `1px solid ${C.line}`, padding: '80px 48px' }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: C.mute, letterSpacing: '0.2em', marginBottom: 8 }}>CONTINUE READING</div>
          <div style={{ fontFamily: F.display, fontSize: 32, fontWeight: 300, letterSpacing: '-0.02em', color: C.ink, marginBottom: 48 }}>
            More from <em style={{ color: C.accent }}>{post.cat.charAt(0) + post.cat.slice(1).toLowerCase()}</em>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${related.length}, 1fr)`, gap: 32 }}>
            {related.map(p => <RelatedCard key={p.slug} post={p} />)}
          </div>
        </div>
      )}

      {/* Bottom nav strip */}
      <div style={{
        borderTop: `1px solid ${C.line}`,
        padding: '28px 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: F.mono, fontSize: 11, letterSpacing: '0.12em',
      }}>
        <Link to="/blog" style={{ color: C.ink, textDecoration: 'none' }}>← ALL ESSAYS</Link>
        <span style={{ color: C.mute }}>BOARDWALK LABS · THE JOURNAL</span>
        <a href="mailto:support@octopilotai.com" style={{ color: C.ink, textDecoration: 'none' }}>WRITE TO US →</a>
      </div>

    </div>
  );
}
