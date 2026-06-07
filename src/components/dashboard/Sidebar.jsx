import { motion } from 'framer-motion';

const icons = {
  LayoutDashboard: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-2a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  Receipt: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
    </svg>
  ),
  PieChart: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
  ),
  BarChart3: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Target: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth={1.8} />
      <circle cx="12" cy="12" r="6" strokeWidth={1.8} />
      <circle cx="12" cy="12" r="2" strokeWidth={1.8} />
    </svg>
  ),
  FileText: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Settings: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', group: 'main' },
  { id: 'expenses', label: 'Expenses', icon: 'Receipt', group: 'main' },
  { id: 'budgets', label: 'Budgets', icon: 'PieChart', group: 'main' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3', group: 'main' },
  { id: 'goals', label: 'Goals', icon: 'Target', group: 'tools' },
  { id: 'reports', label: 'Reports', icon: 'FileText', group: 'tools' },
  { id: 'settings', label: 'Settings', icon: 'Settings', group: 'tools' },
];

export default function Sidebar({ isOpen, setSidebarOpen, activeSection, setActiveSection }) {
  const mainItems = navItems.filter(i => i.group === 'main');
  const toolItems = navItems.filter(i => i.group === 'tools');

  const renderItem = (item) => {
    const IconComponent = icons[item.icon];
    const isActive = activeSection === item.id;
    return (
      <motion.button
        key={item.id}
        onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
        className={`sidebar-item${isActive ? ' active' : ''}`}
        whileHover={{ x: 3 }}
        whileTap={{ scale: 0.97 }}
      >
        <span style={{ color: isActive ? '#10b981' : '#64748b', display: 'flex', alignItems: 'center' }}>
          {IconComponent && <IconComponent />}
        </span>
        <span style={{ color: isActive ? 'white' : '#94a3b8' }}>{item.label}</span>
        {isActive && (
          <motion.div
            layoutId="sidebarActiveIndicator"
            style={{
              marginLeft: 'auto', width: '6px', height: '6px',
              borderRadius: '50%', background: '#10b981', flexShrink: 0,
              boxShadow: '0 0 8px rgba(16,185,129,0.6)',
            }}
          />
        )}
      </motion.button>
    );
  };

  const sidebarStyle = {
    position: 'fixed',
    top: '64px',
    left: 0,
    height: 'calc(100vh - 64px)',
    width: '240px',
    zIndex: 40,
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #1e2d45',
    background: 'rgba(11,15,20,0.97)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <aside
      style={sidebarStyle}
      className={isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    >
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
        <p style={{
          fontSize: '10px', fontWeight: 700, color: '#334155',
          textTransform: 'uppercase', letterSpacing: '0.12em',
          padding: '8px 12px', marginBottom: '4px',
        }}>
          Main Menu
        </p>
        {mainItems.map(renderItem)}

        <p style={{
          fontSize: '10px', fontWeight: 700, color: '#334155',
          textTransform: 'uppercase', letterSpacing: '0.12em',
          padding: '8px 12px', marginTop: '16px', marginBottom: '4px',
        }}>
          Tools
        </p>
        {toolItems.map(renderItem)}
      </div>

      {/* User card */}
      <div style={{ padding: '12px', borderTop: '1px solid #1e2d45' }}>
        <div className="glass-card" style={{ padding: '14px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: 700, color: 'white',
              fontFamily: 'JetBrains Mono, monospace',
              boxShadow: '0 0 12px rgba(16,185,129,0.25)',
            }}>VR</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Vishal Raj
              </p>
              <p style={{ fontSize: '11px', color: '#475569' }}>Full Stack Dev · Pro</p>
            </div>
          </div>
          <div style={{ fontSize: '11px', color: '#475569', marginBottom: '6px' }}>AI Credits: 847 / 1000</div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              style={{ background: 'linear-gradient(90deg, #10b981, #22d3ee)' }}
              initial={{ width: 0 }}
              animate={{ width: '84.7%' }}
              transition={{ duration: 1.2, delay: 0.5 }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
