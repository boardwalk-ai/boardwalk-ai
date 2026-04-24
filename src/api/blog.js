const C = {
  accent: '#e32400',
  gold:   '#d5a637',
  deep:   '#1b1710',
  bgDeep: '#ebe4d5',
};

function initialsFromName(name) {
  if (!name || typeof name !== 'string') return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = (parts[0][0] || '') + (parts[parts.length - 1][0] || '');
    return (a || '?').toUpperCase();
  }
  return (parts[0] || '?').slice(0, 2).toUpperCase();
}

/** API may omit author or use snake_case extras; UI always needs name / initials / color */
function normalizeAuthor(raw, accentFallback) {
  const base = raw && typeof raw === 'object' ? raw : null;
  const name = base?.name != null && String(base.name).trim()
    ? String(base.name).trim()
    : 'Boardwalk Labs';
  const color = base?.color ?? base?.accent_color ?? accentFallback ?? C.accent;
  const initialsRaw = base?.initials != null ? String(base.initials).trim() : '';
  const initials = initialsRaw ? initialsRaw.toUpperCase().slice(0, 4) : initialsFromName(name);
  const url = base?.avatar_url ?? base?.avatarUrl ?? base?.photo_url ?? '';
  const avatarUrl = url ? String(url).trim() : null;
  const bio = base?.bio != null ? String(base.bio) : '';
  return { name, initials, color, avatarUrl, bio };
}

/** API uses read_time / accent_color; UI expects readTime / accentLine */
function normalizePost(p) {
  if (!p || typeof p !== 'object') return p;
  const accentLine = p.accentLine ?? p.accent_color ?? C.accent;
  return {
    ...p,
    readTime: p.readTime ?? p.read_time ?? '',
    accentLine,
    date: p.date != null ? String(p.date) : '',
    excerpt: p.excerpt ?? '',
    author: normalizeAuthor(p.author, accentLine),
  };
}

export async function getPosts({ category } = {}) {
  const q = category && category !== 'ALL' ? `?category=${category}` : '';
  try {
    const res = await fetch(`/api/posts${q}`);
    if (res.ok) {
      const data = await res.json();
      return Array.isArray(data) ? data.map(normalizePost) : data;
    }
  } catch { /* API unreachable */ }
  return [];
}

export async function getPost(slug) {
  try {
    const enc = encodeURIComponent(slug);
    const res = await fetch(`/api/posts/${enc}`);
    if (res.ok) return normalizePost(await res.json());
  } catch { /* API unreachable */ }
  return null;
}
