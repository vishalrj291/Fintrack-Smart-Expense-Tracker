import { motion } from 'framer-motion';
import { FadeIn, StaggerChildren, staggerItem, HoverCard } from '../animations/AnimationWrappers';
import { features } from '../../data/mockData';

export default function FeaturesSection() {
  return (
    <section style={{ padding: '96px 24px' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <FadeIn style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '8px 16px', borderRadius: '9999px',
            border: '1px solid rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.05)',
            color: '#818cf8', fontSize: '13px', fontWeight: 500, marginBottom: '24px',
          }}>
            ✦ Everything you need
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: 'white', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            Finance management,{' '}
            <span className="gradient-text">reimagined</span>
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Every feature designed with intention. No bloat, no confusion — just the tools that actually move the needle.
          </p>
        </FadeIn>

        <StaggerChildren staggerDelay={0.07} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {features.map((feature, i) => (
            <motion.div key={i} variants={staggerItem}>
              <HoverCard>
                <div
                  className="glass-card"
                  style={{
                    padding: '24px', cursor: 'pointer', position: 'relative', overflow: 'hidden',
                    borderColor: `${feature.color}15`, height: '100%',
                    transition: 'border-color 0.3s',
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    background: `${feature.color}18`, border: `1px solid ${feature.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px', marginBottom: '16px',
                  }}>
                    {feature.icon}
                  </div>

                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '8px' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6, marginBottom: '16px' }}>
                    {feature.description}
                  </p>

                  {/* Stats pill */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '4px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: 600,
                    background: `${feature.color}15`, color: feature.color,
                    border: `1px solid ${feature.color}25`,
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: feature.color }} />
                    {feature.stats}
                  </div>
                </div>
              </HoverCard>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
