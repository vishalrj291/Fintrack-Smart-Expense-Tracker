import { motion } from 'framer-motion';
import { FadeIn } from '../animations/AnimationWrappers';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'Perfect for getting started with personal finance.',
    color: '#64748b',
    features: [
      '3 bank account connections',
      'Basic expense tracking',
      '2 budget categories',
      'Monthly spending report',
      'Mobile app access',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '₹299',
    period: '/month',
    description: 'For serious savers who want full control.',
    color: '#10b981',
    features: [
      'Unlimited bank connections',
      'AI-powered insights',
      'Unlimited budget categories',
      'Advanced analytics & charts',
      'Savings goals tracking',
      'ITR-ready reports',
      'CSV & PDF export',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '₹799',
    period: '/month',
    description: 'For families and small business owners.',
    color: '#6366f1',
    features: [
      'Everything in Pro',
      'Up to 5 user accounts',
      'Business expense tracking',
      'GST report generation',
      'Dedicated account manager',
      'API access',
      'Custom integrations',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const CheckIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

export default function PricingSection() {
  return (
    <section id="pricing" className="section-anchor" style={{ padding: '96px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <FadeIn style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '9999px',
            border: '1px solid rgba(99,102,241,0.25)', background: 'rgba(99,102,241,0.06)',
            color: '#818cf8', fontSize: '13px', fontWeight: 500, marginBottom: '24px',
          }}>
            💎 Simple pricing
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: 'white', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            Choose your{' '}
            <span className="gradient-text">plan</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '17px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
            Start free, upgrade when you're ready. No hidden fees. Cancel anytime.
          </p>
        </FadeIn>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          alignItems: 'stretch',
        }}>
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                style={{ height: '100%' }}
              >
                <div
                  className="glass-card"
                  style={{
                    padding: '28px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    borderColor: plan.popular ? `${plan.color}30` : '#1e2d45',
                    boxShadow: plan.popular ? `0 0 40px ${plan.color}18` : undefined,
                  }}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div style={{
                      position: 'absolute', top: '0', right: '24px',
                      padding: '4px 14px', borderRadius: '0 0 10px 10px',
                      background: `linear-gradient(135deg, #10b981, #059669)`,
                      fontSize: '11px', fontWeight: 700, color: 'white',
                      letterSpacing: '0.05em',
                    }}>
                      MOST POPULAR
                    </div>
                  )}

                  {/* Top glow */}
                  {plan.popular && (
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                      background: `linear-gradient(90deg, transparent, ${plan.color}, transparent)`,
                    }} />
                  )}

                  {/* Plan header */}
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: plan.color, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {plan.name}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '36px', fontWeight: 800, color: 'white', fontFamily: 'JetBrains Mono, monospace' }}>
                        {plan.price}
                      </span>
                      <span style={{ fontSize: '14px', color: '#475569' }}>{plan.period}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>{plan.description}</p>
                  </div>

                  {/* Features */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                    {plan.features.map((f, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#94a3b8' }}>
                        <span style={{ color: plan.color, flexShrink: 0 }}>
                          <CheckIcon />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    style={{
                      width: '100%', padding: '12px', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
                      cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
                      background: plan.popular ? `linear-gradient(135deg, ${plan.color}, #059669)` : 'none',
                      border: plan.popular ? 'none' : `1px solid ${plan.color}40`,
                      color: plan.popular ? 'white' : plan.color,
                      boxShadow: plan.popular ? `0 0 20px ${plan.color}25` : 'none',
                    }}
                    onMouseEnter={e => {
                      if (!plan.popular) {
                        e.currentTarget.style.background = `${plan.color}12`;
                        e.currentTarget.style.borderColor = `${plan.color}60`;
                      } else {
                        e.currentTarget.style.boxShadow = `0 0 30px ${plan.color}40`;
                      }
                    }}
                    onMouseLeave={e => {
                      if (!plan.popular) {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.borderColor = `${plan.color}40`;
                      } else {
                        e.currentTarget.style.boxShadow = `0 0 20px ${plan.color}25`;
                      }
                    }}
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <p style={{ textAlign: 'center', fontSize: '13px', color: '#334155', marginTop: '32px' }}>
            All plans include a 14-day free trial. No credit card required.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
