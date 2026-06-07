import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MenuIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
];

function smoothScroll(href) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    const offset = 72;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export default function LandingNavbar({ onLoginClick, onSignupClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.5rem',
          transition: 'all 0.3s ease',
          background: scrolled ? 'rgba(11,15,20,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid #1e2d45' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <motion.div
            style={{
              width: '34px', height: '34px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 16px rgba(16,185,129,0.35)',
            }}
            whileHover={{ scale: 1.08, rotate: 4 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <span style={{ color: 'white', fontWeight: 900, fontSize: '12px', fontFamily: 'JetBrains Mono, monospace' }}>FT</span>
          </motion.div>
          <span style={{ color: 'white', fontWeight: 700, fontSize: '19px', letterSpacing: '-0.3px' }}>
            Fin<span className="gradient-text">Track</span>
          </span>
        </Link>

        {/* Center nav links - desktop */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '4px', margin: '0 auto' }}>
          {navLinks.map(link => (
            <button
              key={link.label}
              className="nav-link"
              onClick={() => smoothScroll(link.href)}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
          {/* Desktop auth buttons */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '8px' }}>
            <button
              className="nav-link"
              onClick={onLoginClick}
            >
              Login
            </button>
            <motion.button
              onClick={onSignupClick}
              style={{
                padding: '7px 18px', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
                background: 'none', border: '1px solid rgba(16,185,129,0.5)', color: '#10b981',
                cursor: 'pointer', transition: 'all 0.2s',
                fontFamily: 'Inter, sans-serif',
              }}
              whileHover={{ background: 'rgba(16,185,129,0.1)', scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign Up
            </motion.button>
            <Link to="/dashboard">
              <motion.button
                className="btn-primary"
                style={{ padding: '8px 20px', fontSize: '14px' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="flex md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              width: '38px', height: '38px', borderRadius: '10px',
              border: '1px solid #1e2d45', background: 'rgba(17,24,39,0.8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#94a3b8', cursor: 'pointer',
            }}
            whileTap={{ scale: 0.95 }}
          >
            {mobileOpen ? <XIcon /> : <MenuIcon />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '68px', left: 0, right: 0,
              zIndex: 99,
              background: 'rgba(11,15,20,0.97)',
              borderBottom: '1px solid #1e2d45',
              padding: '1rem 1.5rem 1.5rem',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
              {navLinks.map(link => (
                <button
                  key={link.label}
                  className="nav-link"
                  style={{ textAlign: 'left', width: '100%', padding: '10px 12px' }}
                  onClick={() => { smoothScroll(link.href); setMobileOpen(false); }}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => { onLoginClick(); setMobileOpen(false); }}
                style={{
                  width: '100%', padding: '11px', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
                  background: 'none', border: '1px solid #1e2d45', color: '#94a3b8', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Login
              </button>
              <button
                onClick={() => { onSignupClick(); setMobileOpen(false); }}
                style={{
                  width: '100%', padding: '11px', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
                  background: 'none', border: '1px solid rgba(16,185,129,0.4)', color: '#10b981', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Sign Up
              </button>
              <Link to="/dashboard" style={{ display: 'block' }}>
                <button
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '11px' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started →
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
