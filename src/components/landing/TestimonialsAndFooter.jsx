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
            padding: '6px 16px', borderRadius: '9999px',
            border: '1px solid rgba(245,158,11,0.25)', background: 'rgba(245,158,11,0.06)',
            color: '#fbbf24', fontSize: '13px', fontWeight: 500, marginBottom: '24px',
          }}>
            ⭐ What our users say
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: 'white', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            Real results, <span className="gradient-text">real people</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '17px', maxWidth: '550px', margin: '0 auto', lineHeight: 1.6 }}>
            Join 50,000+ people who transformed their financial lives with FinTrack.
          </p>
        </FadeIn>

        <StaggerChildren staggerDelay={0.1} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {testimonials.map((t, i) => (
            <motion.div key={t.id} variants={staggerItem}>
              <motion.div
                className="glass-card"
                style={{
                  padding: '24px', height: '100%', display: 'flex', flexDirection: 'column',
                  cursor: 'default', borderColor: `${t.color}18`,
                }}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} style={{ color: '#fbbf24', fontSize: '14px' }}>★</span>
                  ))}
                </div>

                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.65, marginBottom: '20px', flex: 1 }}>
                  "{t.text}"
                </p>

                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700,
                  background: `${t.color}12`, color: t.color, border: `1px solid ${t.color}22`,
                  marginBottom: '16px', width: 'fit-content',
                }}>
                  ✓ {t.saved}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid #1e2d45' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: 700, color: 'white',
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>{t.name}</p>
                    <p style={{ fontSize: '12px', color: '#475569' }}>{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
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
            padding: '6px 16px', borderRadius: '9999px',
            border: '1px solid rgba(34,211,238,0.2)', background: 'rgba(34,211,238,0.05)',
            color: '#22d3ee', fontSize: '13px', fontWeight: 500, marginBottom: '24px',
          }}>
            💬 FAQ
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: 'white', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            Got <span className="gradient-text">questions?</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '17px', lineHeight: 1.6 }}>
            Everything you need to know about FinTrack.
          </p>
        </FadeIn>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div
                className="glass-card"
                style={{
                  borderRadius: '14px', overflow: 'hidden',
                  borderColor: openIndex === i ? 'rgba(16,185,129,0.25)' : '#1e2d45',
                  cursor: 'pointer', transition: 'border-color 0.2s',
                }}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px' }}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: 'white', paddingRight: '16px', flex: 1 }}>
                    {faq.question}
                  </p>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      border: '1px solid #1e2d45', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, color: openIndex === i ? '#10b981' : '#64748b',
                    }}
                  >
                    <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      <div style={{ padding: '0 22px 20px' }}>
                        <div style={{ height: '1px', background: '#1e2d45', marginBottom: '14px' }} />
                        <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.65 }}>{faq.answer}</p>
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

  return (
    <footer style={{ borderTop: '1px solid #1e2d45', background: 'rgba(11,15,20,0.6)' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px', marginBottom: '64px' }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 900, color: 'white',
              }}>FT</div>
              <span style={{ color: 'white', fontWeight: 700, fontSize: '18px' }}>FinTrack</span>
            </div>
            <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.65, maxWidth: '260px', marginBottom: '24px' }}>
              The intelligent expense tracker that helps you take control of your finances and build lasting wealth.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['𝕏', 'in', '⬡', '◈'].map((s, i) => (
                <button
                  key={i}
                  style={{
                    width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #1e2d45',
                    background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', color: '#334155', cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(16,185,129,0.4)'; e.currentTarget.style.background = 'rgba(16,185,129,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#334155'; e.currentTarget.style.borderColor = '#1e2d45'; e.currentTarget.style.background = '#111827'; }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 style={{ fontSize: '11px', fontWeight: 600, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                {group}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{ fontSize: '13px', color: '#334155', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#d1d5db'}
                      onMouseLeave={e => e.target.style.color = '#334155'}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ paddingTop: '32px', borderTop: '1px solid #1e2d45', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <p style={{ fontSize: '12px', color: '#1e2d45' }}>© 2025 FinTrack by Vishal Raj. All rights reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: '12px', color: '#1e2d45' }}>All systems operational</span>
            </div>
            <span style={{ fontSize: '12px', color: '#1e2d45' }}>Built with ❤️ in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
