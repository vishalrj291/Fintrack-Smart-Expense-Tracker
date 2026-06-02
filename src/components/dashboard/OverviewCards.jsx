import { motion } from 'framer-motion';
import CountUpPackage from 'react-countup';
const CountUp = CountUpPackage?.default || CountUpPackage;
import { financialOverview } from '../../data/mockData';

const cards = [
  {
    label: 'Total Balance',
    value: financialOverview.totalBalance,
    change: financialOverview.balanceChange,
    prefix: '$',
    decimals: 2,
    icon: '💰',
    color: '#6366f1',
    description: 'Across all accounts',
  },
  {
    label: 'Monthly Income',
    value: financialOverview.monthlyIncome,
    change: financialOverview.incomeChange,
    prefix: '$',
    decimals: 2,
    icon: '📈',
    color: '#10b981',
    description: 'May 2024',
  },
  {
    label: 'Monthly Expenses',
    value: financialOverview.monthlyExpenses,
    change: financialOverview.expenseChange,
    prefix: '$',
    decimals: 2,
    icon: '💳',
    color: '#f59e0b',
    description: 'May 2024',
  },
  {
    label: 'Net Savings',
    value: financialOverview.savings,
    change: financialOverview.savingsChange,
    prefix: '$',
    decimals: 2,
    icon: '🏦',
    color: '#22d3ee',
    description: `${financialOverview.savingsRate}% savings rate`,
  },
];

export default function OverviewCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="glass-card metric-card"
          style={{
            borderColor: `${card.color}20`,
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top glow line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: `linear-gradient(90deg, transparent, ${card.color}70, transparent)`,
          }} />

          {/* Hover radial bg */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '1rem',
            background: `radial-gradient(circle at top right, ${card.color}08, transparent 65%)`,
          }} />

          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500, marginBottom: '2px' }}>{card.label}</p>
              <p style={{ fontSize: '11px', color: '#6b7280' }}>{card.description}</p>
            </div>
            <div style={{
              width: '40px', height: '40px', borderRadius: '10px',
              background: `${card.color}15`, border: `1px solid ${card.color}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px', flexShrink: 0,
            }}>
              {card.icon}
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'white', fontFamily: "'JetBrains Mono', monospace", marginBottom: '8px', letterSpacing: '-0.5px' }}>
              {card.prefix}
              <CountUp
                end={card.value}
                decimals={card.decimals}
                separator=","
                duration={2}
                delay={0.5 + i * 0.1}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '2px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                background: card.change >= 0 ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)',
                color: card.change >= 0 ? '#34d399' : '#f87171',
              }}>
                <svg style={{ width: '12px', height: '12px', transform: card.change >= 0 ? 'none' : 'rotate(180deg)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                {Math.abs(card.change)}%
              </div>
              <span style={{ fontSize: '11px', color: '#6b7280' }}>vs last month</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
