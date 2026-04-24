import { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { C } from './constants';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Products from './components/Products';
import Marquee from './components/Marquee';
import Services from './components/Services';
import About from './components/About';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import TrustCenter from './pages/TrustCenter';
import Changelog from './pages/Changelog';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

const ACCENT    = '#e32400';
const HERO_WORD = 'academic';

function ScrollProgress() {
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
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 9998 }}>
      <div ref={barRef} style={{ height: '100%', background: C.accent, width: '0%', transition: 'width .1s linear' }} />
    </div>
  );
}

function Home() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      <Nav scrolled={scrolled} />
      <Hero accent={ACCENT} heroWord={HERO_WORD} />
      <Stats />
      <Products />
      <Marquee />
      <Services />
      <About />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.style.setProperty('--bw-accent', ACCENT);
  }, []);

  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/trust-center" element={<TrustCenter />} />
        <Route path="/changelog"    element={<Changelog />} />
        <Route path="/blog"         element={<Blog />} />
        <Route path="/blog/:slug"   element={<BlogPost />} />
      </Routes>
    </>
  );
}
