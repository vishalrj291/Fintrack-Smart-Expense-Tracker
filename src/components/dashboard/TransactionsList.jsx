import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useExpenses } from '../../context/ExpenseContext';

const categoryColors = {
  Income: '#10b981',
  Groceries: '#22d3ee',
  Entertainment: '#f59e0b',
  Transport: '#6366f1',
  Technology: '#8b5cf6',
  Health: '#ef4444',
  Travel: '#ec4899',
  'Food & Drinks': '#f97316',
  Shopping: '#a78bfa',
  Housing: '#60a5fa',
};

export default function TransactionsList({ showAll = false, onAddClick }) {
  const { filteredTransactions, deleteTransaction } = useExpenses();
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Income', 'Expenses', 'Pending'];

  const filtered = filteredTransactions.filter(t => {
    if (filter === 'All') return true;
    if (filter === 'Income') return t.type === 'credit';
    if (filter === 'Expenses') return t.type === 'debit' && t.status === 'completed';
    if (filter === 'Pending') return t.status === 'pending';
    return true;
  });

  const displayed = showAll ? filtered : filtered.slice(0, 8);

  return (
    <div className="glass-card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
        gap: '12px', padding: '20px 20px 16px', borderBottom: '1px solid #1e2d45',
      }}>
        <div>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '3px' }}>Recent Transactions</h2>
          <p style={{ fontSize: '12px', color: '#475569' }}>{filtered.length} transactions</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {onAddClick && (
            <motion.button
              onClick={onAddClick}
              className="btn-primary"
              style={{ padding: '7px 14px', fontSize: '13px' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              + Add
            </motion.button>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: 'rgba(11,15,20,0.8)', borderRadius: '10px', padding: '4px', border: '1px solid #1e2d45' }}>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  position: 'relative', padding: '5px 10px', borderRadius: '7px', fontSize: '11px', fontWeight: 500,
                  color: filter === f ? 'white' : '#64748b', background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {filter === f && (
                  <motion.div
                    layoutId="txnFilter"
                    style={{
                      position: 'absolute', inset: 0, borderRadius: '7px',
                      background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)',
                    }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{f}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div>
        <AnimatePresence mode="popLayout">
          {displayed.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#334155', fontSize: '14px' }}>
              No transactions found
            </div>
          ) : displayed.map((txn, i) => (
            <motion.div
              key={txn.id}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2, delay: i * 0.02 }}
              className="transaction-row"
              style={{ borderBottom: i < displayed.length - 1 ? '1px solid rgba(30,45,69,0.5)' : 'none' }}
            >
              {/* Icon */}
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                background: `${categoryColors[txn.category] || '#6366f1'}14`,
                border: `1px solid ${categoryColors[txn.category] || '#6366f1'}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
              }}>
                {txn.icon}
              </div>

              {/* Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {txn.merchant}
                  </p>
                  {txn.status === 'pending' && <span className="badge badge-warning" style={{ fontSize: '10px' }}>Pending</span>}
                </div>
                <p style={{ fontSize: '11px', color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {txn.category} · {txn.account}
                </p>
              </div>

              {/* Date */}
              <div style={{ textAlign: 'right', flexShrink: 0 }} className="hidden sm:block">
                <p style={{ fontSize: '11px', color: '#334155' }}>{txn.date}</p>
                <p style={{ fontSize: '11px', color: '#1e2d45' }}>{txn.time}</p>
              </div>

              {/* Amount */}
              <div style={{ textAlign: 'right', flexShrink: 0, minWidth: '80px' }}>
                <p style={{
                  fontSize: '13px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace',
                  color: txn.amount > 0 ? '#34d399' : 'white',
                }}>
                  {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount).toLocaleString('en-IN')}
                </p>
              </div>

              {/* Delete button — only if showAll */}
              {showAll && (
                <motion.button
                  onClick={() => deleteTransaction(txn.id)}
                  className="btn-danger"
                  style={{ padding: '5px 8px', fontSize: '11px', flexShrink: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </motion.button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {!showAll && filtered.length > 8 && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid #1e2d45' }}>
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#334155' }}>
            Showing 8 of {filtered.length} — go to Expenses for full list
          </p>
        </div>
      )}
    </div>
  );
}
