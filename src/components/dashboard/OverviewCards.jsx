import { motion } from 'framer-motion';
import { useExpenses } from '../../context/ExpenseContext';

const cardConfig = [
  {
    key: 'totalBalance',
    label: 'Total Balance',
    prefix: '₹',
    decimals: 0,
    icon: '💰',
    color: '#10b981',
    description: 'Across all accounts',
    changeKey: 'balanceChange',
  },
  {
    key: 'totalIncome',
    label: 'Monthly Income',
    prefix: '₹',
    decimals: 0,
    icon: '📈',
    color: '#22d3ee',
    description: 'May 2024',
    changeKey: 'incomeChange',
  },
  {
    key: 'totalExpenses',
    label: 'Monthly Expenses',
    prefix: '₹',
    decimals: 0,
    icon: '💳',
    color: '#f59e0b',
    description: 'May 2024',
    changeKey: 'expenseChange',
  },
  {
    key: 'savings',
    label: 'Net Savings',
    prefix: '₹',
    decimals: 0,
    icon: '🏦',
    color: '#6366f1',
    description: 'This month',
    changeKey: 'savingsChange',
  },
];

const overviewChanges = {
  balanceChange: +2.4,
  incomeChange: +5.2,
  expenseChange: -1.8,
  savingsChange: +12.3,
};

export default function OverviewCards() {
  const { computed } = useExpenses();

  const data = {
    totalBalance: computed.totalBalance,
    totalIncome: computed.totalIncome,
    totalExpenses: computed.totalExpenses,
    savings: computed.savings,
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      {cardConfig.map((card, i) => {
        const change = overviewChanges[card.changeKey];
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="glass-card metric-card"
            style={{ borderColor: `${card.color}20`, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: `linear-gradient(90deg, transparent, ${card.color}70, transparent)`,
            }} />
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '1rem',
              background: `radial-gradient(circle at top right, ${card.color}07, transparent 65%)`,
            }} />

            <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500, marginBottom: '2px' }}>{card.label}</p>
                <p style={{ fontSize: '11px', color: '#475569' }}>{card.description}</p>
              </div>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: `${card.color}14`, border: `1px solid ${card.color}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', flexShrink: 0,
              }}>
                {card.icon}
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'white', fontFamily: 'JetBrains Mono, monospace', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                {card.prefix}
                {Number(data[card.key]).toLocaleString()}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                  background: change >= 0 ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)',
                  color: change >= 0 ? '#34d399' : '#f87171',
                }}>
                  <svg style={{ width: '10px', height: '10px', transform: change >= 0 ? 'none' : 'rotate(180deg)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                  {Math.abs(change)}%
                </div>
                <span style={{ fontSize: '11px', color: '#475569' }}>vs last month</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
