import { FadeIn } from '../animations/AnimationWrappers';

const techStack = [
  { name: 'React 19', color: '#61dafb' },
  { name: 'Vite', color: '#bd34fe' },
  { name: 'Tailwind CSS', color: '#38bdf8' },
  { name: 'Framer Motion', color: '#f59e0b' },
  { name: 'Recharts', color: '#10b981' },
  { name: 'LocalStorage', color: '#6366f1' },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-anchor" style={{ padding: '96px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: '60px',
          alignItems: 'center',
        }}>
          {/* Left — Profile */}
          <FadeIn direction="right">
            <div className="glass-card" style={{ padding: '36px', textAlign: 'center' }}>
              {/* Avatar */}
              <div style={{
                width: '88px', height: '88px', borderRadius: '50%', margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #10b981, #22d3ee)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', fontWeight: 800, color: 'white',
                boxShadow: '0 0 40px rgba(16,185,129,0.3)',
                fontFamily: 'JetBrains Mono, monospace',
              }}>
                VR
              </div>

              <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '6px' }}>Vishal Raj</h3>
              <p style={{ fontSize: '14px', color: '#10b981', marginBottom: '16px', fontWeight: 500 }}>Full Stack Developer</p>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.65, marginBottom: '24px' }}>
                Passionate about building beautiful, functional web applications. FinTrack was built to solve a real problem — making personal finance intuitive and actionable for everyone.
              </p>

              {/* Links */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                {[
                  { label: 'GitHub', href: 'https://github.com', icon: '⬡' },
                  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'in' },
                  { label: 'Portfolio', href: '#', icon: '◈' },
                ].map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500,
                      border: '1px solid #1e2d45', background: 'rgba(255,255,255,0.03)',
                      color: '#94a3b8', textDecoration: 'none', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(16,185,129,0.35)'; e.currentTarget.style.background = 'rgba(16,185,129,0.07)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = '#1e2d45'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                  >
                    <span style={{ fontSize: '12px' }}>{link.icon}</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right — About text */}
          <FadeIn direction="left">
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 16px', borderRadius: '9999px',
                border: '1px solid rgba(16,185,129,0.25)', background: 'rgba(16,185,129,0.06)',
                color: '#34d399', fontSize: '13px', fontWeight: 500, marginBottom: '24px',
              }}>
                👋 About FinTrack
              </div>

              <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 800, color: 'white', marginBottom: '20px', letterSpacing: '-0.5px', lineHeight: 1.15 }}>
                Built by a developer,{' '}
                <span className="gradient-text">for everyone</span>
              </h2>

              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7, marginBottom: '20px' }}>
                FinTrack was born out of frustration with complex spreadsheets and expensive financial apps. The goal was simple: build something beautiful that actually helps people understand their money.
              </p>

              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7, marginBottom: '32px' }}>
                Every feature — from the AI insights to the budget tracker — is designed to provide actionable information without overwhelming the user. Clean, fast, and private.
              </p>

              {/* Tech stack */}
              <div>
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>
                  Built with
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {techStack.map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                        background: `${tech.color}10`, color: tech.color,
                        border: `1px solid ${tech.color}22`,
                      }}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
