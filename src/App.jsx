import { useState, useEffect } from 'react';
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

const ACCENT = '#e32400';
const HERO_WORD = 'academic';

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--bw-accent', ACCENT);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Cursor />
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
