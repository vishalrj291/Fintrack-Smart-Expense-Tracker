import { motion } from 'framer-motion';
import { aiInsights } from '../../data/mockData';

const priorityConfig = {
  high: { label: 'High Priority', badge: 'badge-danger' },
  medium: { label: 'Action needed', badge: 'badge-warning' },
  low: { label: 'Opportunity', badge: 'badge-success' },
};

export default function AIInsightsPanel() {
  return (
    <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <div style={{
            width: '24px', height: '24px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px',
          }}>🤖</div>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'white' }}>AI Insights</h2>
          <span className="badge badge-primary">4 new</span>
        </div>
        <p style={{ fontSize: '12px', color: '#6b7280' }}>Personalized recommendations based on your spending</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {aiInsights.map((insight, i) => {
          const priority = priorityConfig[insight.priority];
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.01 }}
              style={{
                padding: '16px', borderRadius: '12px', cursor: 'pointer',
                border: `1px solid ${insight.color}15`, position: 'relative', overflow: 'hidden',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', position: 'relative' }}>
                {/* Icon */}
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                  background: `${insight.color}15`, border: `1px solid ${insight.color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
                }}>
                  {insight.icon}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>{insight.title}</p>
                    <span className={`badge ${priority.badge}`} style={{ fontSize: '10px' }}>{priority.label}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.5', marginBottom: '12px' }}>
                    {insight.description}
                  </p>
                  <button style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                    background: `${insight.color}15`, color: insight.color,
                    border: `1px solid ${insight.color}25`, cursor: 'pointer', transition: 'all 0.2s',
                  }}>
                    {insight.action}
                    <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Refresh */}
      <button style={{
        marginTop: '16px', width: '100%', padding: '12px', borderRadius: '10px',
        border: '1px dashed #1f1f35', fontSize: '12px', color: '#6b7280',
        background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        transition: 'all 0.2s',
      }}
        onMouseEnter={e => { e.currentTarget.style.color = '#818cf8'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.background = 'rgba(99,102,241,0.05)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.borderColor = '#1f1f35'; e.currentTarget.style.background = 'none'; }}
      >
        <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh AI analysis
      </button>
    </div>
  );
}
