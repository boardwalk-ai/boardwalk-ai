const C = {
  accent: '#e32400',
  gold:   '#d5a637',
  deep:   '#1b1710',
  bgDeep: '#ebe4d5',
};

export const POSTS = [
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
    body: [
      { type: 'p', text: 'When we started building Octopilot, the obvious move was to build an AI writing assistant for students. The market was clear, the demand was obvious, and every other company was already doing it.' },
      { type: 'p', text: 'We did the opposite.' },
      { type: 'h2', text: 'The feedback loop nobody talks about' },
      { type: 'p', text: 'Teachers in the US spend between 7 and 10 hours per week writing feedback on student work. That\'s a part-time job on top of their actual job. And the research is pretty clear: students spend an average of 12 seconds reading that feedback before moving on.' },
      { type: 'quote', text: 'The most expensive content in education might be teacher feedback — and the least read.' },
      { type: 'p', text: 'This isn\'t a technology problem yet. It\'s a leverage problem. Teachers don\'t need a better way to write feedback — they need a way to stop writing feedback from scratch every time.' },
      { type: 'h2', text: 'What we actually built' },
      { type: 'p', text: 'Octopilot\'s educator dashboard does two things differently. First, it learns from the rubric — not as a static checklist, but as a weighted grading framework that understands what matters at different levels of a piece of writing.' },
      { type: 'p', text: 'Second, it maintains a model of what good feedback looks like for each teacher. Not generic AI suggestions — feedback that sounds like it came from them, because it was trained on their past comments.' },
      { type: 'h2', text: 'The thing we got wrong at first' },
      { type: 'p', text: 'Our first version targeted students directly. Predictably, it was fine. Students used it, but we hadn\'t solved anything important. They still submitted mediocre work, and teachers still spent hours responding to it.' },
      { type: 'p', text: 'The insight came from a school administrator in Albany who told us: "We don\'t need students to write better. We need teachers to get Thursday nights back."' },
      { type: 'quote', text: 'We don\'t need students to write better. We need teachers to get Thursday nights back.' },
      { type: 'p', text: 'That reframing changed everything about our product roadmap. We stopped asking what students needed and started asking what would give a 10th-grade English teacher two hours back on a Sunday afternoon.' },
    ],
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
    body: [
      { type: 'p', text: 'The discourse around AI in K–12 education tends toward two extremes: uncritical enthusiasm from edtech vendors and moral panic from teachers\' unions. The peer-reviewed literature is more interesting than either.' },
      { type: 'h2', text: 'What we read' },
      { type: 'p', text: 'Over three months, we reviewed 40 papers published between 2022 and 2026 covering AI tools in classroom settings, with a focus on writing instruction, feedback quality, and measurable student outcomes.' },
      { type: 'quote', text: 'The most consistent finding: AI feedback accelerates revision cycles, but does not improve first-draft quality. Students write the same first drafts. They revise more.' },
      { type: 'h2', text: 'The nuance in the data' },
      { type: 'p', text: 'Studies with the strongest outcomes shared a common factor: teacher involvement in configuring the AI tools. Schools that handed students AI tools without teacher integration saw marginal gains. Schools that used AI to amplify teacher feedback saw significant ones.' },
      { type: 'p', text: 'This is consistent with what we see in Octopilot. The feature with the highest engagement isn\'t the student-facing writing assistant. It\'s the rubric calibration tool used by teachers.' },
      { type: 'h2', text: 'What the optimists get right' },
      { type: 'p', text: 'AI feedback at scale means every student can get detailed, specific comments on every draft — not just the ones whose teachers have time. That\'s a meaningful equity intervention, particularly in high-need districts where class sizes are large and teacher bandwidth is thin.' },
    ],
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
    body: [
      { type: 'p', text: 'Hallucination in academic writing tools isn\'t just a product embarrassment — it\'s an integrity problem. A student who cites a paper that doesn\'t exist, because our product invented it, has a serious problem. We take this seriously.' },
      { type: 'h2', text: 'What we were measuring' },
      { type: 'p', text: 'We define hallucination narrowly: factual claims generated by Octopilot that contradict or cannot be verified against the source materials the user provided. We don\'t count stylistic suggestions or structural rewrites in this metric.' },
      { type: 'quote', text: 'The architecture that won was embarrassingly simple: when in doubt, quote directly.' },
      { type: 'h2', text: 'The retrieval architecture' },
      { type: 'p', text: 'The breakthrough came from context stratification. Instead of feeding the full source document into the context window, we built a retrieval layer that identifies the three most relevant passages for each suggestion request. The model works from specific evidence rather than summarized context.' },
      { type: 'p', text: 'This reduced hallucination rate from 4.3% to 3.1% — a 28% improvement. More importantly, it made the remaining hallucinations more detectable: they tend to occur at passage boundaries, where the model interpolates between retrieved chunks.' },
      { type: 'h2', text: 'The architecture we almost didn\'t ship' },
      { type: 'p', text: 'The earliest version of this system used a confidence-scoring layer that would refuse to generate suggestions when source evidence was below a threshold. It was more accurate, but users found it frustrating — it felt like the product was broken. We replaced it with explicit uncertainty markers: the model still suggests, but flags low-confidence claims.' },
    ],
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
    body: [
      { type: 'p', text: 'Boardwalk Labs takes on a small number of custom software contracts each year. Last quarter, we received 14 inquiries. We said yes to three.' },
      { type: 'h2', text: 'What we look for' },
      { type: 'p', text: 'The filter isn\'t budget — it\'s fit. We\'re a small studio with specific capabilities: data-intensive web applications, AI-integrated workflows, and products that need to work in institutional environments (schools, universities, hospitals, government). If a project doesn\'t use those capabilities, we\'re not the best team for it.' },
      { type: 'quote', text: 'A lucrative project that pulls us away from our core strengths is a bad project, even if the check clears.' },
      { type: 'h2', text: 'The 11 we declined' },
      { type: 'p', text: 'Of the 11 declined projects, three were outside our technical wheelhouse (mobile apps), four were in industries we don\'t serve (e-commerce, direct-to-consumer), and four were structurally problematic — scope unclear, ownership contested, or the client wanted to hire a vendor rather than a partner.' },
      { type: 'p', text: 'The last category is the most common reason we say no, and the hardest to explain. We do our best work when clients treat us like colleagues. When a client wants us to execute a predetermined spec, we\'re competing with Upwork, and we\'ll lose that competition on price.' },
    ],
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
    body: [
      { type: 'p', text: 'FERPA (the Family Educational Rights and Privacy Act) governs how student educational records can be shared. It was written in 1974. It was not written with AI in mind.' },
      { type: 'h2', text: 'What FERPA actually says' },
      { type: 'p', text: 'FERPA restricts the disclosure of "education records" — documents and materials that contain information directly related to a student and are maintained by an educational institution. The key question for AI tools is whether student writing samples constitute education records. The short answer: yes, if they\'re maintained by the school.' },
      { type: 'quote', text: 'The FERPA risk isn\'t in the AI doing the analyzing. It\'s in where the data goes after.' },
      { type: 'h2', text: 'Questions to ask vendors' },
      { type: 'p', text: 'Before signing any AI writing tool contract for district use, ask: Does student work leave your servers for model training? Is data retained after account deletion? Is the vendor a "school official" under your FERPA policy? Do they have a signed data processing agreement?' },
      { type: 'p', text: 'Octopilot answers all four of these questions clearly in our Trust Center. Any vendor who can\'t answer them should not be handling student data.' },
    ],
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
    body: [
      { type: 'p', text: 'Typography in consumer software is largely decorative. Typography in educational software — particularly writing tools — is functional. The font choices in Octopilot affect how students perceive their own writing.' },
      { type: 'h2', text: 'Why a serif' },
      { type: 'p', text: 'Most SaaS products use sans-serif type throughout. We use Fraunces for all display headings and Inter Tight for body text. The decision wasn\'t aesthetic — it was about signal. Fraunces reads as literary. It tells users that the tool takes writing seriously.' },
      { type: 'quote', text: 'The font you write in changes how you think about what you\'re writing. That\'s not superstition — it\'s documented in the reading research.' },
      { type: 'h2', text: 'Variable optical sizing' },
      { type: 'p', text: 'Fraunces is a variable font with an "optical size" axis — the letterforms become more legible at small sizes while staying expressive at large ones. This matters for a tool that renders text at 12px in the editor sidebar and 72px in the document title simultaneously.' },
      { type: 'p', text: 'The performance cost of loading a variable font is real but justified. We serve it as a subset — Latin characters only — which keeps the initial load under 80kb.' },
    ],
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
    body: [
      { type: 'p', text: 'A rubric is a grading framework that maps criteria to performance levels. In theory, rubrics make assessment consistent and transparent. In practice, most rubrics are written once, filed somewhere, and never updated.' },
      { type: 'h2', text: 'The gap between rubric and feedback' },
      { type: 'p', text: 'The rubric says "sophisticated use of evidence." The teacher\'s comment says "good job with sources." These are not the same thing. The gap between rubric language and teacher feedback language is where a lot of educational signal gets lost.' },
      { type: 'quote', text: 'Students don\'t fail to meet the rubric because they don\'t try. They fail because they don\'t know what the rubric actually means in practice.' },
      { type: 'h2', text: 'What rubric-aware feedback looks like' },
      { type: 'p', text: 'Octopilot\'s rubric mode translates rubric criteria into specific, actionable comments at the sentence level. Instead of "needs stronger evidence," it says: "This claim (\'the industrial revolution caused urbanization\') is asserted without a source. The rubric weights evidence at 30% — adding a citation here directly improves your score."' },
      { type: 'p', text: 'This level of specificity is possible because the model understands both the rubric weights and the document. It\'s not pattern-matching on "citation needed" — it\'s identifying specific claims against specific criteria.' },
    ],
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
    body: [
      { type: 'p', text: 'Q1 2026 was the heaviest shipping quarter in Octopilot\'s history. We launched six major features, reduced hallucination rate by 28%, and shipped Octopilot v0.3.0 through v0.4.0.' },
      { type: 'h2', text: 'The features that landed' },
      { type: 'p', text: 'Rubric-aware feedback was the biggest one. It took four months of R&D and two failed architectures before we found an approach that worked reliably across different rubric formats. The breakthrough was treating rubric criteria as retrieval targets rather than classification labels.' },
      { type: 'p', text: 'Section rewrites came from user research. Students kept asking to revise specific paragraphs without touching the rest of their document. It sounds simple. It\'s not — maintaining voice and coherence across a selectively-edited document requires the model to understand what it isn\'t allowed to change.' },
      { type: 'quote', text: 'The features users ask for are often the right features. The architecture to implement them rarely is what they imagine.' },
      { type: 'h2', text: 'What didn\'t ship' },
      { type: 'p', text: 'We planned a real-time collaboration feature for Q1. We deprioritized it when rubric mode proved more complex than estimated. It\'s on the Q3 roadmap now. Some of the infrastructure work is already done.' },
    ],
  },
];

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
  } catch { /* fall through to local data */ }
  if (category && category !== 'ALL') return POSTS.filter(p => p.cat === category);
  return POSTS;
}

export async function getPost(slug) {
  try {
    const enc = encodeURIComponent(slug);
    const res = await fetch(`/api/posts/${enc}`);
    if (res.ok) return normalizePost(await res.json());
  } catch { /* fall through to local data */ }
  return POSTS.find(p => p.slug === slug) ?? null;
}
