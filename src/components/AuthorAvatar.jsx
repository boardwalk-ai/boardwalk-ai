import { C, F } from '../constants';

/** Photo if `avatarUrl` is set; otherwise initials on accent color */
export default function AuthorAvatar({ author, size = 36, style }) {
  const a = author ?? {};
  const d = size;
  const base = { width: d, height: d, borderRadius: '50%', flexShrink: 0, ...style };
  if (a.avatarUrl) {
    return (
      <img
        src={a.avatarUrl}
        alt={a.name ? `${a.name}` : ''}
        style={{ ...base, objectFit: 'cover', display: 'block' }}
      />
    );
  }
  return (
    <div style={{
      ...base,
      background: a.color ?? C.accent,
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      fontFamily: F.display,
      fontSize: Math.max(10, Math.round(d * 0.36)),
      fontWeight: 500,
    }}>
      {a.initials || '?'}
    </div>
  );
}
