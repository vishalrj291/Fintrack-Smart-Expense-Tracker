import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import { monthlySpending, categorySpending, spendingTrend } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #1e2d45', fontSize: '12px', minWidth: '140px' }}>
        <p style={{ color: '#64748b', marginBottom: '8px', fontWeight: 500 }}>{label}</p>
        {payload.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
            <span style={{ color: '#94a3b8', textTransform: 'capitalize' }}>{p.dataKey}:</span>
            <span style={{ color: 'white', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>₹{p.value?.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const tabs = ['Overview', 'Spending', 'Category', 'Weekly'];

export default function ChartsSection() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>Financial Analytics</h2>
          <p style={{ fontSize: '12px', color: '#475569' }}>6-month performance overview</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(11,15,20,0.8)', borderRadius: '10px', padding: '4px', border: '1px solid #1e2d45' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                position: 'relative', padding: '6px 12px', borderRadius: '7px', fontSize: '12px', fontWeight: 500,
                color: activeTab === tab ? 'white' : '#64748b', background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="chartTab"
                  style={{
                    position: 'absolute', inset: 0, borderRadius: '7px',
                    background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)',
                  }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>{tab}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'Overview' && (
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlySpending}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }} formatter={v => <span style={{ color: '#94a3b8' }}>{v}</span>} />
              <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} fill="url(#colorIncome)" />
              <Area type="monotone" dataKey="expenses" stroke="#6366f1" strokeWidth={2} fill="url(#colorExpenses)" />
              <Area type="monotone" dataKey="savings" stroke="#22d3ee" strokeWidth={2} fill="url(#colorSavings)" />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {activeTab === 'Spending' && (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlySpending} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }} formatter={v => <span style={{ color: '#94a3b8' }}>{v}</span>} />
              <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} opacity={0.85} />
              <Bar dataKey="expenses" fill="#6366f1" radius={[4, 4, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeTab === 'Category' && (
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: '32px' }}>
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie data={categorySpending} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                    {categorySpending.map((entry, index) => (
                      <Cell key={index} fill={entry.color} opacity={0.85} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Spent']}
                    contentStyle={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', color: '#fff', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ flex: 1, minWidth: '180px' }}>
              {categorySpending.map((cat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', color: '#94a3b8', flex: 1 }}>{cat.name}</span>
                  <div style={{ width: '80px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', height: '4px', overflow: 'hidden' }}>
                    <motion.div
                      style={{ height: '100%', background: cat.color, borderRadius: '4px' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(cat.value / 30831) * 100}%` }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                    />
                  </div>
                  <span style={{ fontSize: '12px', color: 'white', fontFamily: 'JetBrains Mono, monospace', width: '56px', textAlign: 'right' }}>
                    ₹{cat.value.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Weekly' && (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={spendingTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#34d399' }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </motion.div>
    </div>
  );
}
