import { motion } from 'framer-motion';
import { FadeIn, StaggerChildren, staggerItem, HoverCard } from '../animations/AnimationWrappers';
import { features } from '../../data/mockData';

export default function FeaturesSection() {
  return (
    <section id="features" className="section-anchor" style={{ padding: '96px 24px' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <FadeIn style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '9999px',
            border: '1px solid rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.06)',
            color: '#34d399', fontSize: '13px', fontWeight: 500, marginBottom: '24px',
          }}>
            ✦ Everything you need
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: 'white', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            Finance management,{' '}
            <span className="gradient-text">reimagined</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Every feature designed with intention. No bloat, no confusion — just the tools that actually move the needle.
          </p>
        </FadeIn>

        <StaggerChildren staggerDelay={0.07} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {features.map((feature, i) => (
            <motion.div key={i} variants={staggerItem}>
              <HoverCard>
                <div
                  className="glass-card"
                  style={{
                    padding: '28px', cursor: 'pointer', position: 'relative', overflow: 'hidden',
                    height: '100%', transition: 'border-color 0.3s',
                    borderColor: `${feature.color}18`,
                  }}
                >
                  {/* Radial glow on hover */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `radial-gradient(circle at top left, ${feature.color}08, transparent 60%)`,
                    borderRadius: '1rem',
                  }} />

                  {/* Top accent line */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, transparent, ${feature.color}60, transparent)`,
                    borderRadius: '1rem 1rem 0 0',
                  }} />

                  {/* Icon */}
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '14px',
                    background: `${feature.color}15`, border: `1px solid ${feature.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '24px', marginBottom: '20px', position: 'relative',
                  }}>
                    {feature.icon}
                  </div>

                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'white', marginBottom: '10px', position: 'relative' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.65, marginBottom: '20px', position: 'relative' }}>
                    {feature.description}
                  </p>

                  {/* Stats pill */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600,
                    background: `${feature.color}12`, color: feature.color,
                    border: `1px solid ${feature.color}22`,
                    position: 'relative',
                  }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: feature.color }} />
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
