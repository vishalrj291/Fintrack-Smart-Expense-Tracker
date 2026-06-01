import { motion } from 'framer-motion';
import AnimatedBackground from '../components/animations/AnimatedBackground';
import Navbar from '../components/dashboard/Navbar';
import { HeroSection, TrustSection } from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import { TestimonialsSection, FAQSection, Footer } from '../components/landing/TestimonialsAndFooter';
import { pageVariants, FadeIn } from '../components/animations/AnimationWrappers';

function DemoSection() {
  const mockTransactions = [
    { icon: '🎬', name: 'Netflix', amount: '-$15.99', time: 'Today, 9:12 AM', type: 'debit' },
    { icon: '💼', name: 'Salary', amount: '+$12,400', time: 'Yesterday, 8:00 AM', type: 'credit' },
    { icon: '🛒', name: 'Whole Foods', amount: '-$127.43', time: 'Yesterday, 3:45 PM', type: 'debit' },
    { icon: '🚗', name: 'Uber', amount: '-$24.50', time: '2 days ago', type: 'debit' },
    { icon: '🍎', name: 'Apple Store', amount: '-$299.00', time: '2 days ago', type: 'debit' },
  ];

  return (
    <section style={{ padding: '96px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <FadeIn style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '8px 16px', borderRadius: '9999px',
            border: '1px solid rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.05)',
            color: '#818cf8', fontSize: '13px', fontWeight: 500, marginBottom: '24px',
          }}>
            🚀 Live Demo
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: 'white', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            See it in <span className="gradient-text">action</span>
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '18px', maxWidth: '550px', margin: '0 auto', lineHeight: 1.6 }}>
            A live preview of your financial command center. Everything updates in real-time.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div
            className="glass-card"
            style={{
              borderRadius: '24px', padding: '4px', overflow: 'hidden',
              boxShadow: '0 0 60px rgba(99,102,241,0.15), 0 30px 80px rgba(0,0,0,0.5)',
            }}
          >
            {/* Browser bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderBottom: '1px solid #1f1f35', background: 'rgba(14,14,26,0.6)' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(248,113,113,0.7)' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(251,191,36,0.7)' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(52,211,153,0.7)' }} />
              </div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <span style={{ fontSize: '12px', color: '#4b5563', background: '#0e0e1a', padding: '4px 16px', borderRadius: '6px', display: 'inline-block' }}>
                  ✓ app.fintrack.io/dashboard
                </span>
              </div>
            </div>

            <div style={{ padding: '24px', background: 'rgba(14,14,26,0.3)' }}>
              {/* Responsive grid using CSS auto-fit */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                {/* Left side */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {[
                      { label: 'Balance', value: '$84,320', c: '#6366f1' },
                      { label: 'Income', value: '$12,400', c: '#10b981' },
                      { label: 'Expenses', value: '$7,831', c: '#f59e0b' },
                      { label: 'Savings', value: '$4,569', c: '#22d3ee' },
                    ].map((s, i) => (
                      <motion.div
                        key={s.label}
                        className="glass-card"
                        style={{ padding: '16px', borderRadius: '12px' }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <p style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>{s.label}</p>
                        <p style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: s.c }}>{s.value}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="glass-card" style={{ padding: '16px', borderRadius: '12px' }}>
                    <p style={{ fontSize: '11px', color: '#6b7280', marginBottom: '12px' }}>Spending this week</p>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '72px' }}>
                      {[45, 72, 38, 90, 55, 80, 65].map((h, i) => (
                        <motion.div
                          key={i}
                          style={{ flex: 1, background: 'linear-gradient(to top, #6366f1cc, #8b5cf6aa)', borderRadius: '3px 3px 0 0', cursor: 'pointer' }}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ delay: 0.3 + i * 0.05, duration: 0.6 }}
                          whileHover={{ opacity: 0.8 }}
                        />
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                        <span key={d} style={{ fontSize: '10px', color: '#374151' }}>{d}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side: Transactions */}
                <div className="glass-card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid #1f1f35' }}>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>Latest Activity</p>
                  </div>
                  <div>
                    {mockTransactions.map((t, i) => (
                      <motion.div
                        key={i}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '12px 14px', borderBottom: '1px solid rgba(31,31,53,0.5)',
                          cursor: 'pointer',
                        }}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.08 }}
                        whileHover={{ background: 'rgba(255,255,255,0.03)' }}
                      >
                        <span style={{ fontSize: '18px' }}>{t.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: '12px', fontWeight: 600, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</p>
                          <p style={{ fontSize: '10px', color: '#4b5563' }}>{t.time}</p>
                        </div>
                        <p style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: t.type === 'credit' ? '#34d399' : 'white', flexShrink: 0 }}>
                          {t.amount}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function LandingPage({ theme, setTheme }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ minHeight: '100vh', backgroundColor: '#070710' }}
    >
      {/* Animated background — fixed, z=0 */}
      <AnimatedBackground />

      {/* All content above background — z=1 */}
      <div style={{ position: 'relative', zIndex: 1 }}>
  <Navbar theme={theme} setTheme={setTheme} />
  <HeroSection />
  <TrustSection />
  <FeaturesSection />
  <DemoSection />
  <TestimonialsSection />
  <FAQSection />
  <Footer />
</div>
    </motion.div>
  );
}
