import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FadeIn, StaggerChildren, staggerItem } from '../animations/AnimationWrappers';
import { testimonials, faqs } from '../../data/mockData';

// ─── Testimonials ──────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  return (
    <section style={{ padding: '96px 24px' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <FadeIn style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '8px 16px', borderRadius: '9999px',
            border: '1px solid rgba(139,92,246,0.2)', background: 'rgba(139,92,246,0.05)',
            color: '#a78bfa', fontSize: '13px', fontWeight: 500, marginBottom: '24px',
          }}>
            ⭐ What our users say
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: 'white', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            Real results, <span className="gradient-text">real people</span>
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '18px', maxWidth: '550px', margin: '0 auto', lineHeight: 1.6 }}>
            Join 50,000+ people who transformed their financial lives with FinTrack.
          </p>
        </FadeIn>

        <StaggerChildren staggerDelay={0.1} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {testimonials.map((t, i) => (
            <motion.div key={t.id} variants={staggerItem}>
              <div
                className="glass-card"
                style={{
                  padding: '24px', height: '100%', display: 'flex', flexDirection: 'column',
                  cursor: 'pointer', borderColor: `${t.color}20`,
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} style={{ color: '#fbbf24', fontSize: '14px' }}>★</span>
                  ))}
                </div>

                {/* Quote */}
                <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                  "{t.text}"
                </p>

                {/* Saved badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 700,
                  background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}25`,
                  marginBottom: '16px', width: 'fit-content',
                }}>
                  ✓ {t.saved}
                </div>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid #1f1f35' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: 700, color: 'white',
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>{t.name}</p>
                    <p style={{ fontSize: '11px', color: '#6b7280' }}>{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────────
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section style={{ padding: '96px 24px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <FadeIn style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '8px 16px', borderRadius: '9999px',
            border: '1px solid rgba(34,211,238,0.2)', background: 'rgba(34,211,238,0.05)',
            color: '#22d3ee', fontSize: '13px', fontWeight: 500, marginBottom: '24px',
          }}>
            💬 FAQ
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: 'white', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            Got <span className="gradient-text">questions?</span>
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '18px', lineHeight: 1.6 }}>
            Everything you need to know about FinTrack.
          </p>
        </FadeIn>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div
                className="glass-card"
                style={{
                  borderRadius: '16px', overflow: 'hidden',
                  borderColor: openIndex === i ? 'rgba(99,102,241,0.25)' : undefined,
                  cursor: 'pointer', transition: 'border-color 0.2s',
                }}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px' }}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: 'white', paddingRight: '16px', flex: 1 }}>{faq.question}</p>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      border: '1px solid #1f1f35', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg style={{ width: '12px', height: '12px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div style={{ padding: '0 24px 24px' }}>
                        <div style={{ height: '1px', background: '#1f1f35', marginBottom: '16px' }} />
                        <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.65 }}>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export function Footer() {
  const links = {
    Product: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'API'],
    Company: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Cookie Policy', 'Security', 'GDPR'],
  };

  const socials = ['𝕏', 'in', '⬡', '◈'];

  return (
    <footer style={{ borderTop: '1px solid #1f1f35', background: 'rgba(14,14,26,0.4)' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px', marginBottom: '64px' }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 900, color: 'white',
              }}>FT</div>
              <span style={{ color: 'white', fontWeight: 700, fontSize: '18px' }}>FinTrack</span>
            </div>
            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6, maxWidth: '260px', marginBottom: '24px' }}>
              The intelligent expense tracker that helps you take control of your finances and build lasting wealth.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {socials.map((s, i) => (
                <button key={i} style={{
                  width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #1f1f35',
                  background: '#13131f', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', color: '#6b7280', cursor: 'pointer', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.target.style.color = 'white'; e.target.style.borderColor = 'rgba(99,102,241,0.4)'; e.target.style.background = 'rgba(99,102,241,0.1)'; }}
                  onMouseLeave={e => { e.target.style.color = '#6b7280'; e.target.style.borderColor = '#1f1f35'; e.target.style.background = '#13131f'; }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>{group}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {items.map(item => (
                  <li key={item}>
                    <a href="#" style={{ fontSize: '13px', color: '#4b5563', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#d1d5db'}
                      onMouseLeave={e => e.target.style.color = '#4b5563'}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ paddingTop: '32px', borderTop: '1px solid #1f1f35', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <p style={{ fontSize: '12px', color: '#4b5563' }}>© 2024 FinTrack Technologies, Inc. All rights reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: '12px', color: '#4b5563' }}>All systems operational</span>
            </div>
            <span style={{ fontSize: '12px', color: '#374151' }}>Built with ❤️ in San Francisco</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
