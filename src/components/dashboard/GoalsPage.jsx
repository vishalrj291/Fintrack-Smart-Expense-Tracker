import { motion } from 'framer-motion';
import { goals } from '../../data/mockData';
import { useState } from 'react';

export default function GoalsPage() {
  const [selected, setSelected] = useState(null);

  const totalTarget = goals.reduce((s, g) => s + g.target, 0);
  const totalSaved = goals.reduce((s, g) => s + g.current, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>Savings Goals</h1>
          <p style={{ fontSize: '14px', color: '#475569' }}>{goals.length} active goals · ₹{totalSaved.toLocaleString('en-IN')} of ₹{totalTarget.toLocaleString('en-IN')} saved</p>
        </div>
        <motion.button
          className="btn-primary"
          style={{ padding: '10px 20px', fontSize: '14px' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          + New Goal
        </motion.button>
      </div>

      {/* Overall progress */}
      <div className="glass-card" style={{ padding: '24px', borderRadius: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <p style={{ fontSize: '14px', color: '#94a3b8' }}>Overall savings progress</p>
          <span className="gradient-text" style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
            {((totalSaved / totalTarget) * 100).toFixed(0)}%
          </span>
        </div>
        <div className="progress-bar" style={{ height: '8px', marginBottom: '12px' }}>
          <motion.div
            className="progress-fill"
            style={{ background: 'linear-gradient(90deg, #10b981, #22d3ee)' }}
            initial={{ width: 0 }}
            animate={{ width: `${(totalSaved / totalTarget) * 100}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
            ₹{totalSaved.toLocaleString('en-IN')} saved
          </span>
          <span style={{ fontSize: '13px', color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>
            ₹{(totalTarget - totalSaved).toLocaleString('en-IN')} remaining
          </span>
        </div>
      </div>

      {/* Goals grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {goals.map((goal, i) => {
          const pct = ((goal.current / goal.target) * 100);
          const isSelected = selected === goal.id;
          return (
            <motion.div
              key={goal.id}
              onClick={() => setSelected(isSelected ? null : goal.id)}
              className="glass-card"
              style={{
                padding: '24px', cursor: 'pointer',
                borderColor: isSelected ? `${goal.color}40` : `${goal.color}18`,
                boxShadow: isSelected ? `0 0 30px ${goal.color}15` : 'none',
                transition: 'all 0.3s',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Icon + Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
                  background: `${goal.color}16`, border: `1px solid ${goal.color}28`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
                }}>
                  {goal.icon}
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '3px' }}>{goal.title}</p>
                  <span style={{
                    display: 'inline-block', padding: '2px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 500,
                    background: `${goal.color}12`, color: goal.color, border: `1px solid ${goal.color}20`,
                  }}>
                    {goal.category}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="progress-bar" style={{ height: '6px', marginBottom: '12px' }}>
                <motion.div
                  className="progress-fill"
                  style={{ background: `linear-gradient(90deg, ${goal.color}, ${goal.color}80)` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(pct, 100)}%` }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.1 }}
                />
              </div>

              {/* Amounts */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: goal.color, fontFamily: 'JetBrains Mono, monospace' }}>
                  ₹{goal.current.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '12px', color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>
                  / ₹{goal.target.toLocaleString('en-IN')}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#475569' }}>
                  Due: {goal.deadline}
                </span>
                <span style={{
                  fontSize: '18px', fontWeight: 800, color: pct >= 100 ? '#34d399' : 'white',
                  fontFamily: 'JetBrains Mono, monospace',
                }}>
                  {pct.toFixed(0)}%
                </span>
              </div>

              {/* Quick add (visible when selected) */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #1e2d45' }}
                >
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="number"
                      placeholder="Add amount ₹"
                      className="input-field"
                      style={{ flex: 1, padding: '8px 12px', fontSize: '13px' }}
                      onClick={e => e.stopPropagation()}
                    />
                    <button
                      className="btn-primary"
                      style={{ padding: '8px 14px', fontSize: '13px', flexShrink: 0 }}
                      onClick={e => e.stopPropagation()}
                    >
                      Add
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
