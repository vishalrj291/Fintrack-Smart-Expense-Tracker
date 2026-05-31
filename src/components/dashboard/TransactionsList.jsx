import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { transactions } from '../../data/mockData';

const categoryColors = {
  Income: '#10b981',
  Groceries: '#22d3ee',
  Entertainment: '#f59e0b',
  Transport: '#6366f1',
  Technology: '#8b5cf6',
  Health: '#ef4444',
  Travel: '#ec4899',
  'Food & Drinks': '#f97316',
};

export default function TransactionsList() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Income', 'Expenses', 'Pending'];

  const filtered = transactions.filter(t => {
    if (filter === 'All') return true;
    if (filter === 'Income') return t.type === 'credit';
    if (filter === 'Expenses') return t.type === 'debit' && t.status === 'completed';
    if (filter === 'Pending') return t.status === 'pending';
    return true;
  });

  return (
    <div className="glass-card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
        gap: '16px', padding: '24px', borderBottom: '1px solid #1f1f35',
      }}>
        <div>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>Recent Transactions</h2>
          <p style={{ fontSize: '12px', color: '#6b7280' }}>{filtered.length} transactions</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#0e0e1a', borderRadius: '10px', padding: '4px' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                position: 'relative', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500,
                color: filter === f ? 'white' : '#6b7280', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s',
              }}
            >
              {filter === f && (
                <motion.div
                  layoutId="txnFilter"
                  style={{
                    position: 'absolute', inset: 0, borderRadius: '8px',
                    background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)',
                  }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>{f}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div>
        <AnimatePresence mode="popLayout">
          {filtered.map((txn, i) => (
            <motion.div
              key={txn.id}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              className="transaction-row"
              style={{ borderBottom: '1px solid rgba(31,31,53,0.5)' }}
            >
              {/* Icon */}
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: `${categoryColors[txn.category] || '#6366f1'}18`,
                border: `1px solid ${categoryColors[txn.category] || '#6366f1'}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', flexShrink: 0, transition: 'transform 0.2s',
              }}>
                {txn.icon}
              </div>

              {/* Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {txn.merchant}
                  </p>
                  {txn.status === 'pending' && <span className="badge badge-warning">Pending</span>}
                </div>
                <p style={{ fontSize: '11px', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {txn.category} · {txn.account}
                </p>
              </div>

              {/* Date - hidden on mobile */}
              <div style={{ textAlign: 'right' }} className="hidden sm:block">
                <p style={{ fontSize: '11px', color: '#4b5563' }}>{txn.date}</p>
                <p style={{ fontSize: '11px', color: '#374151' }}>{txn.time}</p>
              </div>

              {/* Amount */}
              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '8px' }}>
                <p style={{
                  fontSize: '13px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace',
                  color: txn.amount > 0 ? '#34d399' : 'white',
                }}>
                  {txn.amount > 0 ? '+' : ''}${Math.abs(txn.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', marginTop: '2px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: txn.amount > 0 ? '#34d399' : '#4b5563' }} />
                  <span style={{ fontSize: '11px', color: '#4b5563' }}>{txn.type}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div style={{ padding: '16px', borderTop: '1px solid #1f1f35' }}>
        <button style={{
          width: '100%', padding: '10px', borderRadius: '10px',
          fontSize: '13px', color: '#818cf8', fontWeight: 500,
          background: 'none', border: 'none', cursor: 'pointer', transition: 'background 0.2s',
        }}
          onMouseEnter={e => e.target.style.background = 'rgba(99,102,241,0.08)'}
          onMouseLeave={e => e.target.style.background = 'none'}
        >
          View all transactions →
        </button>
      </div>
    </div>
  );
}
