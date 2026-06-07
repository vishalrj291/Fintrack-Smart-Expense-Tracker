import { motion } from 'framer-motion';
import { useState } from 'react';
import { userProfile } from '../../data/mockData';
import { useExpenses } from '../../context/ExpenseContext';

export default function SettingsPage() {
  const { resetToDefaults } = useExpenses();
  const [profile, setProfile] = useState({
    name: userProfile.name,
    email: userProfile.email,
    role: userProfile.role,
    phone: userProfile.phone,
    location: userProfile.location,
  });
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    budgetAlerts: true,
    salaryCredit: true,
    weeklyReport: true,
    aiInsights: true,
    marketingEmails: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const update = (key) => (e) => setProfile(f => ({ ...f, [key]: e.target.value }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>Settings</h1>
        <p style={{ fontSize: '14px', color: '#475569' }}>Manage your profile and preferences</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'start' }}>
        {/* Profile */}
        <div>
          <div className="glass-card" style={{ padding: '24px', borderRadius: '16px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
              Profile
            </h2>

            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '16px', flexShrink: 0,
                background: 'linear-gradient(135deg, #10b981, #059669)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', fontWeight: 700, color: 'white',
                fontFamily: 'JetBrains Mono, monospace',
                boxShadow: '0 0 24px rgba(16,185,129,0.3)',
              }}>VR</div>
              <div>
                <p style={{ fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '2px' }}>{profile.name}</p>
                <p style={{ fontSize: '13px', color: '#475569', marginBottom: '10px' }}>{profile.role}</p>
                <button className="btn-secondary" style={{ padding: '5px 14px', fontSize: '12px' }}>
                  Change Avatar
                </button>
              </div>
            </div>

            {/* Fields */}
            {[
              { label: 'Full Name', key: 'name', type: 'text' },
              { label: 'Email Address', key: 'email', type: 'email' },
              { label: 'Role', key: 'role', type: 'text' },
              { label: 'Phone', key: 'phone', type: 'tel' },
              { label: 'Location', key: 'location', type: 'text' },
            ].map(field => (
              <div key={field.key} style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={profile[field.key]}
                  onChange={update(field.key)}
                  className="input-field"
                />
              </div>
            ))}

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <motion.button
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center', padding: '11px' }}
                onClick={handleSave}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
              >
                {saved ? '✓ Saved!' : 'Save Changes'}
              </motion.button>
              <button className="btn-ghost" style={{ padding: '11px 16px' }}>
                Cancel
              </button>
            </div>
          </div>

          {/* Plan info */}
          <div className="glass-card" style={{ padding: '24px', borderRadius: '16px', borderColor: 'rgba(16,185,129,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Subscription
              </h2>
              <span className="badge badge-primary">Pro</span>
            </div>
            <p style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '4px', fontFamily: 'JetBrains Mono' }}>₹299/month</p>
            <p style={{ fontSize: '13px', color: '#475569', marginBottom: '16px' }}>Renews June 30, 2024</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '9px', fontSize: '13px' }}>Upgrade to Enterprise</button>
            </div>
          </div>
        </div>

        {/* Notifications + Data */}
        <div>
          <div className="glass-card" style={{ padding: '24px', borderRadius: '16px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
              Notifications
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {Object.entries(notifications).map(([key, value]) => {
                const labels = {
                  budgetAlerts: { title: 'Budget Alerts', desc: 'Get notified when nearing category limits' },
                  salaryCredit: { title: 'Salary Credits', desc: 'Notify when income is received' },
                  weeklyReport: { title: 'Weekly Report', desc: 'Get a Sunday summary of your week' },
                  aiInsights: { title: 'AI Insights', desc: 'Personalized financial recommendations' },
                  marketingEmails: { title: 'Marketing Emails', desc: 'Product updates and promotions' },
                };
                const info = labels[key];
                return (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <div>
                      <p style={{ fontSize: '14px', color: 'white', fontWeight: 500, marginBottom: '2px' }}>{info.title}</p>
                      <p style={{ fontSize: '12px', color: '#475569' }}>{info.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications(n => ({ ...n, [key]: !n[key] }))}
                      style={{
                        width: '42px', height: '24px', borderRadius: '12px', border: 'none',
                        cursor: 'pointer', flexShrink: 0, transition: 'all 0.25s',
                        background: value ? 'linear-gradient(90deg, #10b981, #059669)' : '#1e2d45',
                        position: 'relative',
                      }}
                    >
                      <motion.div
                        animate={{ x: value ? 18 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        style={{
                          position: 'absolute', top: '3px',
                          width: '18px', height: '18px', borderRadius: '50%', background: 'white',
                          boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
                        }}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Data management */}
          <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
              Data Management
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button className="btn-ghost" style={{ justifyContent: 'flex-start', padding: '10px 14px', fontSize: '13px' }}>
                📤 Export All Data (CSV)
              </button>
              <button className="btn-ghost" style={{ justifyContent: 'flex-start', padding: '10px 14px', fontSize: '13px' }}>
                📄 Download Financial Report (PDF)
              </button>
              <button
                className="btn-danger"
                style={{ justifyContent: 'flex-start', padding: '10px 14px', fontSize: '13px' }}
                onClick={() => { if (window.confirm('Reset all transactions to default demo data?')) resetToDefaults(); }}
              >
                🔄 Reset to Demo Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
