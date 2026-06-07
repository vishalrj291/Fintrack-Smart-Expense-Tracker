import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FadeIn } from '../animations/AnimationWrappers';
 
// Mini bar chart for the dashboard preview
function MiniBarChart() {
  const bars = [42, 68, 38, 85, 52, 79, 61];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '64px' }}>
      {bars.map((h, i) => (
        <motion.div
          key={i}
          style={{
            flex: 1,
            background: `linear-gradient(to top, #10b981cc, #22d3ee88)`,
            borderRadius: '3px 3px 0 0',
          }}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: 0.4 + i * 0.07, duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

// Donut chart SVG
function MiniDonut() {
  const segments = [
    { value: 35, color: '#6366f1' },
    { value: 25, color: '#10b981' },
    { value: 20, color: '#f59e0b' },
    { value: 20, color: '#22d3ee' },
  ];
  const r = 32, cx = 40, cy = 40, strokeW = 10;
  const circ = 2 * Math.PI * r;
  let cumulative = 0;
  return (
    <svg width="80" height="80" viewBox="0 0 80 80">
      {segments.map((seg, i) => {
        const offset = circ * (1 - seg.value / 100);
        const rotation = -90 + (cumulative / 100) * 360;
        cumulative += seg.value;
        return (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeW}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transformOrigin: `${cx}px ${cy}px`, transform: `rotate(${rotation}deg)` }}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.8, ease: 'easeOut' }}
          />
        );
      })}
    </svg>
  );
}

const mockTransactions = [
  { icon: '💼', name: 'Salary Credit', amount: '+₹42,000', time: 'Today, 8:00 AM', type: 'credit' },
  { icon: '🍔', name: 'Swiggy', amount: '-₹372', time: 'Today, 1:30 PM', type: 'debit' },
  { icon: '📦', name: 'Amazon', amount: '-₹1,299', time: 'Yesterday', type: 'debit' },
  { icon: '🚗', name: 'Uber', amount: '-₹186', time: 'Yesterday', type: 'debit' },
];

function DashboardPreview() {
  const cards = [
    { label: 'Balance', value: '₹84,320', color: '#10b981' },
    { label: 'Income', value: '₹42,000', color: '#22d3ee' },
    { label: 'Expenses', value: '₹7,831', color: '#f59e0b' },
    { label: 'Savings', value: '₹4,569', color: '#6366f1' },
  ];

  return (
    <div style={{ position: 'relative' }}>
      {/* Browser chrome */}
      <div className="glass-card" style={{
        borderRadius: '20px', overflow: 'hidden',
        boxShadow: '0 0 80px rgba(16,185,129,0.12), 0 40px 100px rgba(0,0,0,0.7)',
        border: '1px solid #1e2d45',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 14px', borderBottom: '1px solid #1e2d45',
          background: 'rgba(11,15,20,0.9)',
        }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            {['#ef4444', '#f59e0b', '#10b981'].map((c, i) => (
              <div key={i} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c, opacity: 0.8 }} />
            ))}
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <span style={{
              fontSize: '11px', color: '#475569', background: '#0b0f14',
              padding: '3px 14px', borderRadius: '5px', fontFamily: 'JetBrains Mono, monospace',
            }}>
              ✓ app.fintrack.io/dashboard
            </span>
          </div>
        </div>

        <div style={{ padding: '16px', background: 'rgba(11,15,20,0.5)' }}>
          {/* Stat cards row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '14px' }}>
            {cards.map((c, i) => (
              <motion.div
                key={c.label}
                className="glass-card"
                style={{ padding: '12px', borderRadius: '10px', borderColor: `${c.color}20` }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <p style={{ fontSize: '10px', color: '#64748b', marginBottom: '3px' }}>{c.label}</p>
                <p style={{ fontSize: '14px', fontWeight: 700, color: c.color, fontFamily: 'JetBrains Mono, monospace' }}>{c.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts row */}
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '14px', marginBottom: '14px', alignItems: 'center' }}>
            <MiniDonut />
            <div>
              <p style={{ fontSize: '10px', color: '#64748b', marginBottom: '8px' }}>Spending this week</p>
              <MiniBarChart />
            </div>
          </div>

          {/* Transactions */}
          <div className="glass-card" style={{ borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 12px', borderBottom: '1px solid #1e2d45' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: 'white' }}>Recent Activity</p>
            </div>
            {mockTransactions.map((t, i) => (
              <motion.div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 12px', borderBottom: i < mockTransactions.length - 1 ? '1px solid rgba(30,45,69,0.5)' : 'none',
                }}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.08 }}
              >
                <span style={{ fontSize: '16px' }}>{t.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</p>
                  <p style={{ fontSize: '10px', color: '#475569' }}>{t.time}</p>
                </div>
                <p style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'JetBrains Mono', color: t.type === 'credit' ? '#34d399' : '#94a3b8', flexShrink: 0 }}>
                  {t.amount}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating notification card */}
      <motion.div
        className="glass-card"
        style={{
          position: 'absolute', right: '-24px', top: '40px', width: '180px',
          padding: '12px', borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(16,185,129,0.2)',
          borderColor: 'rgba(16,185,129,0.2)',
        }}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>💰</div>
          <div>
            <p style={{ fontSize: '10px', color: '#64748b' }}>Salary received</p>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#34d399', fontFamily: 'JetBrains Mono' }}>+₹42,000</p>
          </div>
        </div>
      </motion.div>

      {/* Floating AI insight */}
      <motion.div
        className="glass-card hidden md:block"
        style={{
          position: 'absolute', left: '-28px', bottom: '60px', width: '176px',
          padding: '12px', borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(99,102,241,0.2)',
          borderColor: 'rgba(99,102,241,0.2)',
        }}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
          <span style={{ fontSize: '14px' }}>🤖</span>
          <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>AI Insight</p>
        </div>
        <p style={{ fontSize: '10px', color: '#d1d5db', lineHeight: 1.4 }}>Save ₹2,000/mo by reducing dining out expenses</p>
      </motion.div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export function HeroSection() {

  const trustBadges = [
    { icon: '🔒', label: 'Secure & Private' },
    { icon: '📊', label: 'Real-Time Analytics' },
    { icon: '🎯', label: 'Budget Tracking' },
  ];

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '90px 24px 60px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: '60px',
          alignItems: 'center',
        }}>
          {/* LEFT — Headline + CTAs */}
          <div>
            <FadeIn delay={0.1}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 14px', borderRadius: '9999px',
                border: '1px solid rgba(16,185,129,0.25)', background: 'rgba(16,185,129,0.07)',
                color: '#34d399', fontSize: '13px', fontWeight: 500, marginBottom: '28px',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', animation: 'pulse 2s infinite', display: 'inline-block' }} />
                Trusted by 50,000+ users in India
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 style={{
                fontSize: 'clamp(36px, 5vw, 60px)',
                fontWeight: 800,
                lineHeight: 1.1,
                color: 'white',
                marginBottom: '20px',
                letterSpacing: '-1.5px',
              }}>
                Know Exactly Where{' '}
                <span className="gradient-text">Every Rupee</span>{' '}
                Goes.
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p style={{
                fontSize: 'clamp(15px, 2vw, 18px)',
                color: '#94a3b8',
                lineHeight: 1.7,
                marginBottom: '36px',
                maxWidth: '520px',
              }}>
                Track expenses, manage budgets, monitor savings, and make smarter financial decisions with powerful real-time analytics.
              </p>
            </FadeIn>

            {/* CTA Buttons */}
            <FadeIn delay={0.4}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '40px' }}>
                <Link to="/dashboard">
                  <motion.button
                    className="btn-primary"
                    style={{ fontSize: '15px', padding: '13px 28px' }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Get Started Free
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.button>
                </Link>
                <motion.button
                  className="btn-ghost"
                  style={{ fontSize: '15px', padding: '13px 28px' }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const el = document.getElementById('features');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Explore Features
                </motion.button>
              </div>
            </FadeIn>

            {/* Trust badges */}
            <FadeIn delay={0.5}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {trustBadges.map((b, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '6px 14px', borderRadius: '8px',
                      background: 'rgba(255,255,255,0.03)', border: '1px solid #1e2d45',
                      fontSize: '13px', color: '#64748b',
                    }}
                  >
                    <span>{b.icon}</span>
                    <span>{b.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Stats row */}
            <FadeIn delay={0.7}>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px', marginTop: '48px', paddingTop: '32px',
                borderTop: '1px solid #1e2d45',
                maxWidth: '420px',
              }}>
                {[
                  { prefix: '', end: 50, suffix: 'K+', label: 'Active Users' },
                  { prefix: '₹', end: 2.4, suffix: 'Cr+', label: 'Avg Monthly Tracked' },
                  { prefix: '', end: 99.9, suffix: '%', label: 'Uptime SLA' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                   <div className="gradient-text" style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
                      {s.prefix}
{s.end}
{s.suffix}
                    </div>
                    <p style={{ fontSize: '11px', color: '#475569', marginTop: '3px' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* RIGHT — Dashboard Preview */}
          <FadeIn delay={0.5} style={{ position: 'relative', paddingRight: '32px', paddingLeft: '8px' }}>
            <DashboardPreview />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Trust Section ─────────────────────────────────────────────────────────────
export function TrustSection() {
  const badges = [
    { icon: '🔒', title: '256-bit AES', desc: 'Bank-level encryption' },
    { icon: '🛡️', title: 'SOC 2 Type II', desc: 'Certified secure' },
    { icon: '🏦', title: '50+ Indian Banks', desc: 'Including UPI & NEFT' },
    { icon: '🔐', title: 'Read-only Access', desc: 'Zero risk to your funds' },
  ];

  const partners = ['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank', 'Kotak', 'Razorpay'];

  return (
    <section style={{ padding: '60px 24px 80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <FadeIn style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, marginBottom: '28px' }}>
            Trusted by users at
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '28px', marginBottom: '56px' }}>
            {partners.map(p => (
              <span key={p} style={{ color: '#334155', fontWeight: 700, fontSize: '16px', letterSpacing: '0.03em' }}>{p}</span>
            ))}
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {badges.map((badge, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{badge.icon}</div>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>{badge.title}</p>
                <p style={{ fontSize: '12px', color: '#475569' }}>{badge.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}