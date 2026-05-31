import { motion } from 'framer-motion';
import { budgets, goals } from '../../data/mockData';

// ─── Budget Tracker ─────────────────────────────────────────────────────────────
export function BudgetTracker() {
  return (
    <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>Budget Tracker</h2>
          <p style={{ fontSize: '12px', color: '#6b7280' }}>May 2024 · 4 days remaining</p>
        </div>
        <button style={{ fontSize: '12px', color: '#818cf8', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>
          Edit budgets
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {budgets.map((budget, i) => {
          const pct = (budget.spent / budget.allocated) * 100;
          const isOver = pct > 90;
          const remaining = budget.allocated - budget.spent;

          return (
            <motion.div key={budget.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>{budget.icon}</span>
                  <span style={{ fontSize: '13px', color: '#d1d5db', fontWeight: 500 }}>{budget.category}</span>
                  {isOver && <span className="badge badge-warning" style={{ fontSize: '10px' }}>Near limit</span>}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', color: 'white' }}>${budget.spent}</span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}> / ${budget.allocated}</span>
                </div>
              </div>

              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  style={{
                    background: isOver
                      ? 'linear-gradient(90deg, #f59e0b, #ef4444)'
                      : `linear-gradient(90deg, ${budget.color}, ${budget.color}aa)`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(pct, 100)}%` }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.08 }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>{pct.toFixed(0)}% used</span>
                <span style={{ fontSize: '11px', fontWeight: 500, color: remaining > 0 ? '#6b7280' : '#f87171' }}>
                  {remaining > 0 ? `$${remaining} left` : `$${Math.abs(remaining)} over`}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Goals Section ─────────────────────────────────────────────────────────────
export function GoalsSection() {
  return (
    <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>Financial Goals</h2>
          <p style={{ fontSize: '12px', color: '#6b7280' }}>Tracking {goals.length} active goals</p>
        </div>
        <button style={{ fontSize: '12px', color: '#818cf8', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>
          + Add goal
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {goals.map((goal, i) => {
          const pct = (goal.current / goal.target) * 100;
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.01 }}
              style={{
                padding: '16px', borderRadius: '12px', cursor: 'pointer',
                border: `1px solid ${goal.color}20`, transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                  background: `${goal.color}18`, border: `1px solid ${goal.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
                }}>
                  {goal.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{goal.title}</p>
                  <p style={{ fontSize: '11px', color: '#6b7280' }}>{goal.category} · Due {goal.deadline}</p>
                </div>
                <p style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: goal.color, flexShrink: 0 }}>
                  {pct.toFixed(0)}%
                </p>
              </div>

              <div className="progress-bar" style={{ marginBottom: '8px' }}>
                <motion.div
                  className="progress-fill"
                  style={{ background: `linear-gradient(90deg, ${goal.color}, ${goal.color}70)` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(pct, 100)}%` }}
                  transition={{ duration: 1.2, delay: 0.4 + i * 0.1 }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: '#6b7280', fontFamily: 'JetBrains Mono, monospace' }}>${goal.current.toLocaleString()} saved</span>
                <span style={{ fontSize: '11px', color: '#4b5563', fontFamily: 'JetBrains Mono, monospace' }}>${goal.target.toLocaleString()} goal</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
