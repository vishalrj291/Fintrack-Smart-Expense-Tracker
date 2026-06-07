import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExpenses } from '../../context/ExpenseContext';

const categories = [
  'Food & Drinks', 'Groceries', 'Transport', 'Entertainment', 'Shopping',
  'Health', 'Housing', 'Income', 'Travel', 'Technology', 'Other',
];

const categoryIcons = {
  'Food & Drinks': '🍔', Groceries: '🛒', Transport: '🚗', Entertainment: '🎬',
  Shopping: '📦', Health: '💊', Housing: '🏠', Income: '💼',
  Travel: '✈️', Technology: '💻', Other: '💰',
};

const XIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function AddExpenseModal({ isOpen, onClose }) {
  const { addTransaction } = useExpenses();
  const [form, setForm] = useState({
    merchant: '',
    amount: '',
    category: 'Food & Drinks',
    type: 'debit',
    date: new Date().toISOString().split('T')[0],
    account: 'HDFC •••• 4829',
  });
  const [error, setError] = useState('');

  const update = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.merchant.trim()) { setError('Merchant name is required'); return; }
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      setError('Please enter a valid amount'); return;
    }

    const amount = Number(form.amount);
    addTransaction({
      merchant: form.merchant.trim(),
      category: form.category,
      amount: form.type === 'credit' ? amount : -amount,
      date: form.date,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      icon: categoryIcons[form.category] || '💰',
      color: '#10b981',
      type: form.type,
      account: form.account,
      status: 'completed',
    });

    setForm({ merchant: '', amount: '', category: 'Food & Drinks', type: 'debit', date: new Date().toISOString().split('T')[0], account: 'HDFC •••• 4829' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>Add Transaction</h2>
                  <p style={{ fontSize: '13px', color: '#475569' }}>Record a new expense or income</p>
                </div>
                <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '4px' }}>
                  <XIcon />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Type toggle */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                  {['debit', 'credit'].map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, type: t }))}
                      style={{
                        flex: 1, padding: '10px', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
                        border: form.type === t
                          ? (t === 'credit' ? '1px solid rgba(52,211,153,0.4)' : '1px solid rgba(248,113,113,0.4)')
                          : '1px solid #1e2d45',
                        background: form.type === t
                          ? (t === 'credit' ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)')
                          : 'none',
                        color: form.type === t
                          ? (t === 'credit' ? '#34d399' : '#f87171')
                          : '#64748b',
                      }}
                    >
                      {t === 'credit' ? '+ Income' : '- Expense'}
                    </button>
                  ))}
                </div>

                {/* Merchant */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>
                    Merchant / Description
                  </label>
                  <input
                    type="text"
                    value={form.merchant}
                    onChange={update('merchant')}
                    placeholder="e.g. Swiggy, Amazon, Salary..."
                    className="input-field"
                  />
                </div>

                {/* Amount */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={form.amount}
                    onChange={update('amount')}
                    placeholder="0"
                    min="0"
                    step="1"
                    className="input-field"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  />
                </div>

                {/* Category */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={update('category')}
                    className="input-field"
                    style={{ cursor: 'pointer' }}
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{categoryIcons[c]} {c}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>
                    Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={update('date')}
                    className="input-field"
                  />
                </div>

                {error && (
                  <div style={{
                    padding: '10px 14px', borderRadius: '8px', marginBottom: '16px',
                    background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                    fontSize: '13px', color: '#fca5a5',
                  }}>
                    {error}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-ghost"
                    style={{ flex: 1, justifyContent: 'center', padding: '11px' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ flex: 2, justifyContent: 'center', padding: '11px' }}
                  >
                    Add Transaction
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
