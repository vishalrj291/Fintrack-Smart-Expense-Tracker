import { motion } from 'framer-motion';
import { financialOverview, monthlySpending, userProfile } from '../../data/mockData';
import { useExpenses } from '../../context/ExpenseContext';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export default function ReportsPage() {
  const { computed, transactions } = useExpenses();

  const categories = ['Housing', 'Food & Drinks', 'Transport', 'Entertainment', 'Health', 'Shopping', 'Groceries', 'Other'];
  const categoryTotals = categories.map(cat => {
    const total = transactions.filter(t => t.category === cat && t.type === 'debit').reduce((s, t) => s + Math.abs(t.amount), 0);
    return { category: cat, total };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>Monthly Report</h1>
          <p style={{ fontSize: '14px', color: '#475569' }}>May 2024 · Generated for Vishal Raj</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-ghost" style={{ padding: '9px 18px', fontSize: '13px' }}>
            📊 Export CSV
          </button>
          <button className="btn-primary" style={{ padding: '9px 18px', fontSize: '13px' }}>
            📄 Download PDF
          </button>
        </div>
      </div>

      {/* Report header card */}
      <div className="glass-card" style={{
        padding: '28px', borderRadius: '16px', marginBottom: '24px',
        background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(17,24,39,0.98))',
        borderColor: 'rgba(16,185,129,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', fontWeight: 700, color: 'white', fontFamily: 'JetBrains Mono',
          }}>VR</div>
          <div>
            <p style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>{userProfile.name}</p>
            <p style={{ fontSize: '13px', color: '#475569' }}>{userProfile.email} · FinTrack Pro</p>
          </div>
          <span className="badge badge-success" style={{ marginLeft: 'auto' }}>Report Period: May 2024</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
          {[
            { label: 'Opening Balance', value: `₹${(financialOverview.totalBalance - computed.savings).toLocaleString('en-IN')}`, color: '#94a3b8' },
            { label: 'Total Income', value: `₹${computed.totalIncome.toLocaleString('en-IN')}`, color: '#34d399' },
            { label: 'Total Expenses', value: `₹${computed.totalExpenses.toLocaleString('en-IN')}`, color: '#f87171' },
            { label: 'Closing Balance', value: `₹${financialOverview.totalBalance.toLocaleString('en-IN')}`, color: '#10b981' },
            { label: 'Savings Rate', value: `${computed.savingsRate}%`, color: '#22d3ee' },
          ].map((item, i) => (
            <div key={i}>
              <p style={{ fontSize: '11px', color: '#475569', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ fontSize: '16px', fontWeight: 700, color: item.color, fontFamily: 'JetBrains Mono, monospace' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly trend table */}
      <div className="glass-card" style={{ padding: '24px', borderRadius: '16px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '20px' }}>6-Month Summary</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0', fontSize: '13px', minWidth: '500px' }}>
            <thead>
              <tr>
                {['Month', 'Income', 'Expenses', 'Savings', 'Rate'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#334155', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #1e2d45' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlySpending.map((row, i) => {
                const rate = ((row.savings / row.income) * 100).toFixed(0);
                return (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(30,45,69,0.4)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <td style={{ padding: '12px 12px', color: 'white', fontWeight: 500 }}>{row.month}</td>
                    <td style={{ padding: '12px 12px', color: '#34d399', fontFamily: 'JetBrains Mono, monospace' }}>₹{row.income.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px 12px', color: '#f87171', fontFamily: 'JetBrains Mono, monospace' }}>₹{row.expenses.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px 12px', color: '#60a5fa', fontFamily: 'JetBrains Mono, monospace' }}>₹{row.savings.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px 12px' }}>
                      <span className={`badge ${Number(rate) >= 30 ? 'badge-success' : Number(rate) >= 20 ? 'badge-warning' : 'badge-danger'}`}>
                        {rate}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category expense table */}
      <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '20px' }}>Expense by Category</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {categoryTotals.filter(c => c.total > 0).sort((a, b) => b.total - a.total).map((cat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', width: '120px', flexShrink: 0 }}>{cat.category}</span>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                <motion.div
                  style={{ height: '100%', background: 'linear-gradient(90deg, #10b981, #22d3ee)', borderRadius: '4px' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((cat.total / 15000) * 100, 100)}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'white', fontFamily: 'JetBrains Mono, monospace', width: '80px', textAlign: 'right', flexShrink: 0 }}>
                ₹{cat.total.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
