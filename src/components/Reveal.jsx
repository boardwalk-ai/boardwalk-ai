import { useRef, useEffect, useState } from 'react';

const transforms = {
  up:    'translateY(60px)',
  down:  'translateY(-40px)',
  left:  'translateX(-60px)',
  right: 'translateX(60px)',
  fade:  'none',
};

export default function Reveal({
  children,
  delay  = 0,
  from   = 'up',
  style  = {},
  as: Tag = 'div',
  ...props
}) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{
        opacity:    on ? 1 : 0,
        transform:  on ? 'none' : transforms[from],
        transition: `opacity 0.85s cubic-bezier(.22,1,.36,1) ${delay}ms,
                     transform 0.85s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
