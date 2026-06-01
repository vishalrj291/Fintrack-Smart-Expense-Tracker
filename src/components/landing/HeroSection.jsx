import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FadeIn, StaggerChildren, staggerItem, FloatingElement } from '../animations/AnimationWrappers';
import CountUp from 'react-countup';

// ─── Hero Section ─────────────────────────────────────────────────────────────
export function HeroSection() {
  const stats = [
    { value: 50000, label: 'Active Users', suffix: '+', prefix: '' },
    { value: 2.4, label: 'Avg Monthly Savings', suffix: 'M+', prefix: '$' },
    { value: 99.9, label: 'Uptime SLA', suffix: '%', prefix: '' },
    { value: 12000, label: 'Bank Connections', suffix: '+', prefix: '' },
  ];

  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '96px 24px 64px', position: 'relative', overflow: 'hidden' }}>
      {/* Badge */}
      <FadeIn delay={0.1}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '8px 16px', borderRadius: '9999px',
          border: '1px solid rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.1)',
          color: '#818cf8', fontSize: '13px', fontWeight: 500, marginBottom: '32px',
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#818cf8', animation: 'pulse 2s infinite' }} />
          Trusted by 50,000+ users worldwide
        </div>
      </FadeIn>

      {/* Headline */}
      <FadeIn delay={0.2}>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.1,
          textAlign: 'center', maxWidth: '900px', marginBottom: '24px', letterSpacing: '-1.5px',
          color: 'white',
        }}>
          Your Money.{' '}
          <span className="gradient-text">Smarter Decisions.</span>
          <br />Better Future.
        </h1>
      </FadeIn>

      <FadeIn delay={0.3}>
        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)', color: '#9ca3af', textAlign: 'center',
          maxWidth: '600px', lineHeight: 1.6, marginBottom: '40px',
        }}>
          FinTrack uses AI to give you complete control of your finances. Track expenses, plan budgets, hit your goals — all in one beautiful dashboard.
        </p>
      </FadeIn>

      {/* CTA Buttons */}
      <FadeIn delay={0.4}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '64px' }}>
          <Link to="/dashboard">
            <motion.button
              className="btn-primary"
              style={{ fontSize: '16px', padding: '14px 32px' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Launch Dashboard
              <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>
          </Link>
          <motion.button
            className="btn-ghost"
            style={{ fontSize: '16px', padding: '14px 32px' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Watch Demo
          </motion.button>
        </div>
      </FadeIn>

      {/* Floating Dashboard Preview */}
      <FadeIn delay={0.5} style={{ width: '100%', maxWidth: '900px' }}>
        <FloatingElement amplitude={16} duration={6}>
          <div style={{ position: 'relative' }}>
            <div className="glass-card" style={{
              padding: '4px', borderRadius: '24px', overflow: 'hidden',
              boxShadow: '0 0 80px rgba(99,102,241,0.2), 0 40px 100px rgba(0,0,0,0.6)',
            }}>
              {/* Browser chrome */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderBottom: '1px solid #1f1f35', background: 'rgba(14,14,26,0.8)' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f87171' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#fbbf24' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#34d399' }} />
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#4b5563', background: '#0e0e1a', padding: '4px 16px', borderRadius: '6px' }}>
                    app.fintrack.io/dashboard
                  </span>
                </div>
              </div>

              {/* Dashboard preview */}
              <div style={{ padding: '24px', background: 'rgba(14,14,26,0.5)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
                  {[
                    { label: 'Total Balance', value: '$84,320', change: '+2.4%', color: '#6366f1' },
                    { label: 'Monthly Income', value: '$12,400', change: '+5.2%', color: '#10b981' },
                    { label: 'Expenses', value: '$7,831', change: '-1.8%', color: '#f59e0b' },
                    { label: 'Savings', value: '$4,569', change: '+12.3%', color: '#22d3ee' },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="glass-card"
                      style={{ padding: '16px', borderRadius: '12px' }}
                    >
                      <p style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>{card.label}</p>
                      <p style={{ fontSize: '16px', fontWeight: 700, color: 'white', fontFamily: 'JetBrains Mono, monospace' }}>{card.value}</p>
                      <span style={{ fontSize: '11px', color: card.change.startsWith('+') ? '#34d399' : '#f87171' }}>{card.change}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Chart preview */}
                <div className="glass-card" style={{ padding: '16px', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '80px' }}>
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80].map((h, i) => (
                      <motion.div
                        key={i}
                        style={{ flex: 1, background: 'linear-gradient(to top, #6366f1, #8b5cf6)', borderRadius: '3px 3px 0 0' }}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.9 + i * 0.05, duration: 0.5 }}
                      />
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                      <span key={m} style={{ fontSize: '10px', color: '#374151' }}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <motion.div
              className="glass-card"
              style={{
                position: 'absolute', right: '-48px', top: '64px', width: '200px',
                padding: '16px', borderRadius: '16px',
                boxShadow: '0 8px 30px rgba(16,185,129,0.2)',
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>💰</div>
                <div>
                  <p style={{ fontSize: '11px', color: '#9ca3af' }}>Salary received</p>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#34d399', fontFamily: 'JetBrains Mono, monospace' }}>+$12,400</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass-card hidden md:block"
              style={{
                position: 'absolute', left: '-40px', bottom: '80px', width: '190px',
                padding: '16px', borderRadius: '16px',
                boxShadow: '0 8px 30px rgba(99,102,241,0.2)',
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '18px' }}>🤖</span>
                <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 500 }}>AI Insight</p>
              </div>
              <p style={{ fontSize: '11px', color: '#d1d5db', lineHeight: 1.4 }}>Save $340/mo by cutting unused subscriptions</p>
            </motion.div>
          </div>
        </FloatingElement>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={0.8} style={{ width: '100%', maxWidth: '800px', marginTop: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }} className="md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div className="gradient-text" style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', display: 'block' }}>
                {stat.prefix}
                <CountUp end={stat.value} decimals={stat.value % 1 !== 0 ? 1 : 0} duration={2.5} delay={1} />
              </div>
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>{stat.label}</p>
            </div>
          ))} 
        </div>
      </FadeIn>
    </section>
  );
}

// ─── Trust Section ─────────────────────────────────────────────────────────────
export function TrustSection() {
  const badges = [
    { icon: '🔒', title: '256-bit AES', desc: 'Bank-level encryption' },
    { icon: '🛡️', title: 'SOC 2 Type II', desc: 'Certified secure' },
    { icon: '🏦', title: '12,000+ Banks', desc: 'Global coverage' },
    { icon: '🔐', title: 'Read-only Access', desc: 'Via Plaid SDK' },
  ];

  const partners = ['Chase', 'Bank of America', 'Wells Fargo', 'Citi', 'Capital One', 'HSBC'];

  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <FadeIn style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, marginBottom: '32px' }}>
            Trusted by teams at
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '32px', marginBottom: '64px' }}>
            {partners.map(p => (
              <span key={p} style={{ color: '#4b5563', fontWeight: 600, fontSize: '17px', letterSpacing: '0.05em' }}>{p}</span>
            ))}
          </div>
        </FadeIn>

        <StaggerChildren style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {badges.map((badge, i) => (
            <motion.div key={i} variants={staggerItem}>
              <div className="glass-card" style={{ padding: '24px', textAlign: 'center', transition: 'border-color 0.3s' }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{badge.icon}</div>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>{badge.title}</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>{badge.desc}</p>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}