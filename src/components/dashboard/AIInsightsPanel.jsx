import { motion } from 'framer-motion';
import { aiInsights } from '../../data/mockData';
import { useState } from 'react';

const priorityConfig = {
  high: { label: 'High Priority', badge: 'badge-danger' },
  medium: { label: 'Action needed', badge: 'badge-warning' },
  low: { label: 'Opportunity', badge: 'badge-success' },
};

export default function AIInsightsPanel() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <div style={{
            width: '26px', height: '26px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #6366f1, #10b981)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px',
          }}>🤖</div>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'white' }}>AI Insights</h2>
          <span className="badge badge-primary">4 new</span>
        </div>
        <p style={{ fontSize: '12px', color: '#475569' }}>Personalized recommendations</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {aiInsights.map((insight, i) => {
          const priority = priorityConfig[insight.priority];
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.01 }}
              style={{
                padding: '14px', borderRadius: '12px', cursor: 'pointer',
                border: `1px solid ${insight.color}18`, position: 'relative', overflow: 'hidden',
                background: `${insight.color}04`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{
                  width: '34px', height: '34px', borderRadius: '9px', flexShrink: 0,
                  background: `${insight.color}14`, border: `1px solid ${insight.color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px',
                }}>
                  {insight.icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>{insight.title}</p>
                    <span className={`badge ${priority.badge}`} style={{ fontSize: '10px' }}>{priority.label}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5, marginBottom: '10px' }}>
                    {insight.description}
                  </p>
                  <button style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '5px 10px', borderRadius: '7px', fontSize: '12px', fontWeight: 600,
                    background: `${insight.color}12`, color: insight.color,
                    border: `1px solid ${insight.color}22`, cursor: 'pointer', transition: 'all 0.2s',
                    fontFamily: 'Inter, sans-serif',
                  }}>
                    {insight.action}
                    <svg style={{ width: '11px', height: '11px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <button
        onClick={handleRefresh}
        style={{
          marginTop: '14px', width: '100%', padding: '11px', borderRadius: '10px',
          border: '1px dashed #1e2d45', fontSize: '12px', color: refreshing ? '#10b981' : '#475569',
          background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
        }}
        onMouseEnter={e => { if (!refreshing) { e.currentTarget.style.color = '#10b981'; e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)'; e.currentTarget.style.background = 'rgba(16,185,129,0.04)'; } }}
        onMouseLeave={e => { if (!refreshing) { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = '#1e2d45'; e.currentTarget.style.background = 'none'; } }}
      >
        <svg
          style={{ width: '14px', height: '14px', animation: refreshing ? 'spin-slow 0.8s linear infinite' : 'none' }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        {refreshing ? 'Analyzing...' : 'Refresh AI analysis'}
      </button>
    </div>
  );
}
