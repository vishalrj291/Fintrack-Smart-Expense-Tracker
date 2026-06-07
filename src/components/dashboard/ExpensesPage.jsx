import { useState } from 'react';
import TransactionsList from './TransactionsList';
import AddExpenseModal from './AddExpenseModal';
import { motion } from 'framer-motion';
import { useExpenses } from '../../context/ExpenseContext';

export default function ExpensesPage() {
  const [addOpen, setAddOpen] = useState(false);
  const { computed, transactions } = useExpenses();

  const totalDebit = transactions.filter(t => t.type === 'debit').reduce((s, t) => s + Math.abs(t.amount), 0);
  const totalCredit = transactions.filter(t => t.type === 'credit').reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>Expenses</h1>
          <p style={{ fontSize: '14px', color: '#475569' }}>All {transactions.length} transactions · Persisted to LocalStorage</p>
        </div>
        <motion.button
          className="btn-primary"
          style={{ padding: '10px 20px', fontSize: '14px' }}
          onClick={() => setAddOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          + Add Transaction
        </motion.button>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        {[
          { label: 'Total Spent', value: totalDebit, color: '#ef4444', icon: '📤' },
          { label: 'Total Income', value: totalCredit, color: '#10b981', icon: '📥' },
          { label: 'Net Savings', value: computed.savings, color: '#22d3ee', icon: '💰' },
          { label: 'Savings Rate', value: null, display: `${computed.savingsRate}%`, color: '#6366f1', icon: '📊' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            className="glass-card"
            style={{ padding: '16px', borderColor: `${s.color}20` }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <p style={{ fontSize: '12px', color: '#64748b' }}>{s.label}</p>
              <span style={{ fontSize: '18px' }}>{s.icon}</span>
            </div>
            <p style={{ fontSize: '20px', fontWeight: 700, color: s.color, fontFamily: 'JetBrains Mono, monospace' }}>
              {s.display ?? `₹${s.value.toLocaleString('en-IN')}`}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Full transaction list */}
      <TransactionsList showAll onAddClick={() => setAddOpen(true)} />

      <AddExpenseModal isOpen={addOpen} onClose={() => setAddOpen(false)} />
    </motion.div>
  );
}
