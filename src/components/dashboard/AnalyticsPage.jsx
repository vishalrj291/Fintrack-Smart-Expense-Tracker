import { motion } from 'framer-motion';
import ChartsSection from './ChartsSection';
import { categorySpending } from '../../data/mockData';

export default function AnalyticsPage() {
  const total = categorySpending.reduce((s, c) => s + c.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>Analytics</h1>
        <p style={{ fontSize: '14px', color: '#475569' }}>Deep-dive into your spending patterns</p>
      </div>

      {/* Charts section — full width */}
      <div style={{ marginBottom: '24px' }}>
        <ChartsSection />
      </div>

      {/* Category breakdown */}
      <div className="glass-card" style={{ padding: '24px', borderRadius: '16px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>Category Breakdown</h2>
        <p style={{ fontSize: '12px', color: '#475569', marginBottom: '24px' }}>Total: ₹{total.toLocaleString('en-IN')}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {categorySpending.map((cat, i) => {
            const pct = ((cat.value / total) * 100).toFixed(1);
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  padding: '16px', borderRadius: '12px',
                  border: `1px solid ${cat.color}18`,
                  background: `${cat.color}05`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '10px', height: '10px', borderRadius: '50%', background: cat.color, flexShrink: 0,
                      boxShadow: `0 0 8px ${cat.color}60`,
                    }} />
                    <span style={{ fontSize: '13px', color: 'white', fontWeight: 500 }}>{cat.name}</span>
                  </div>
                  <span style={{ fontSize: '12px', color: cat.color, fontWeight: 700 }}>{pct}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '5px', overflow: 'hidden', marginBottom: '8px' }}>
                  <motion.div
                    style={{ height: '100%', background: cat.color, borderRadius: '4px' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.06 }}
                  />
                </div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'white', fontFamily: 'JetBrains Mono, monospace' }}>
                  ₹{cat.value.toLocaleString('en-IN')}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Spending insights row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {[
          { label: 'Highest Category', value: 'Housing', amount: '₹12,000', icon: '🏠', color: '#6366f1' },
          { label: 'Most Frequent', value: 'Food & Drinks', amount: '12 transactions', icon: '🍔', color: '#f97316' },
          { label: 'Biggest Transaction', value: 'Rent Payment', amount: '₹12,000', icon: '💳', color: '#ef4444' },
          { label: 'Avg Daily Spend', value: '₹1,277', amount: 'this month', icon: '📊', color: '#22d3ee' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            className="glass-card"
            style={{ padding: '18px', borderColor: `${s.color}20` }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '22px' }}>{s.icon}</span>
              <p style={{ fontSize: '11px', color: '#64748b' }}>{s.label}</p>
            </div>
            <p style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '2px' }}>{s.value}</p>
            <p style={{ fontSize: '12px', color: s.color }}>{s.amount}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
