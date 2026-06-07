import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { notifications } from '../../data/mockData';
import { useExpenses } from '../../context/ExpenseContext';

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { setSearchQuery, searchQuery } = useExpenses();
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;

  const closeAll = () => { setShowNotifications(false); setShowProfile(false); };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 md:px-6"
      style={{
        borderBottom: '1px solid #1e2d45',
        background: 'rgba(11,15,20,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-3" style={{ flexShrink: 0 }}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden"
          style={{
            width: '36px', height: '36px', borderRadius: '10px',
            border: '1px solid #1e2d45', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#64748b', background: 'none', cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#2d4060'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = '#1e2d45'; }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <motion.div
            style={{
              width: '32px', height: '32px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 12px rgba(16,185,129,0.3)', flexShrink: 0,
            }}
            whileHover={{ scale: 1.1, rotate: 4 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <span style={{ color: 'white', fontWeight: 900, fontSize: '11px', fontFamily: 'JetBrains Mono' }}>FT</span>
          </motion.div>
          <span style={{ color: 'white', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.3px' }} className="hidden sm:block">
            Fin<span className="gradient-text">Track</span>
          </span>
        </Link>
      </div>

      {/* Search — desktop */}
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#475569' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search transactions..."
            className="input-field"
            style={{ paddingLeft: '2.5rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 ml-auto">

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <motion.button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            style={{
              width: '36px', height: '36px', borderRadius: '10px',
              border: '1px solid #1e2d45', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'none', cursor: 'pointer', color: '#64748b', position: 'relative',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: '-4px', right: '-4px',
                width: '16px', height: '16px', borderRadius: '50%',
                background: '#10b981', fontSize: '9px', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
              }}>
                {unreadCount}
              </span>
            )}
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 90 }} onClick={closeAll} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  style={{ position: 'absolute', right: 0, top: '48px', width: '320px', zIndex: 100 }}
                >
                  <div className="glass-card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                    <div style={{ padding: '14px 16px', borderBottom: '1px solid #1e2d45', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>Notifications</span>
                      <span className="badge badge-primary">{unreadCount} new</span>
                    </div>
                    <div style={{ padding: '6px' }}>
                      {notifications.map(n => (
                        <div key={n.id} style={{
                          display: 'flex', alignItems: 'flex-start', gap: '12px',
                          padding: '10px 12px', borderRadius: '10px', cursor: 'pointer',
                          background: !n.read ? 'rgba(16,185,129,0.04)' : 'none',
                          transition: 'background 0.2s',
                        }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                          onMouseLeave={e => e.currentTarget.style.background = !n.read ? 'rgba(16,185,129,0.04)' : 'none'}
                        >
                          <div style={{
                            width: '8px', height: '8px', borderRadius: '50%', marginTop: '5px', flexShrink: 0,
                            background: n.type === 'alert' ? '#ef4444' : n.type === 'success' ? '#34d399' : n.type === 'warning' ? '#fbbf24' : '#60a5fa',
                          }} />
                          <div>
                            <p style={{ fontSize: '13px', color: '#d1d5db' }}>{n.message}</p>
                            <p style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div style={{ position: 'relative' }}>
          <motion.button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              paddingLeft: '8px', paddingRight: '12px', paddingTop: '5px', paddingBottom: '5px',
              borderRadius: '10px', border: '1px solid #1e2d45',
              background: 'none', cursor: 'pointer',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div style={{
              width: '28px', height: '28px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: 700, color: 'white',
              fontFamily: 'JetBrains Mono, monospace',
            }}>VR</div>
            <span style={{ fontSize: '14px', color: '#d1d5db', fontWeight: 500 }} className="hidden sm:block">Vishal</span>
          </motion.button>

          <AnimatePresence>
            {showProfile && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 90 }} onClick={closeAll} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  style={{ position: 'absolute', right: 0, top: '48px', width: '230px', zIndex: 100 }}
                >
                  <div className="glass-card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                    <div style={{ padding: '16px', borderBottom: '1px solid #1e2d45' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '10px',
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '12px', fontWeight: 700, color: 'white',
                          fontFamily: 'JetBrains Mono',
                        }}>VR</div>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>Vishal Raj</p>
                          <p style={{ fontSize: '11px', color: '#475569' }}>Full Stack Developer</p>
                        </div>
                      </div>
                      <p style={{ fontSize: '12px', color: '#475569' }}>vishal@fintrack.io</p>
                      <span className="badge badge-primary" style={{ marginTop: '8px', display: 'inline-flex' }}>Pro Plan</span>
                    </div>
                    <div style={{ padding: '8px' }}>
                      {[
                        { label: 'Profile Settings', action: null },
                        { label: 'Billing', action: null },
                        { label: 'Preferences', action: null },
                        { label: 'Sign out', action: () => navigate('/') },
                      ].map(item => (
                        <button
                          key={item.label}
                          onClick={() => { closeAll(); item.action?.(); }}
                          style={{
                            width: '100%', textAlign: 'left', padding: '9px 12px',
                            borderRadius: '8px', fontSize: '13px', border: 'none',
                            background: 'none', cursor: 'pointer', transition: 'all 0.2s',
                            color: item.label === 'Sign out' ? '#f87171' : '#94a3b8',
                            fontFamily: 'Inter, sans-serif',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = item.label === 'Sign out' ? 'rgba(248,113,113,0.08)' : 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = item.label === 'Sign out' ? '#f87171' : 'white'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = item.label === 'Sign out' ? '#f87171' : '#94a3b8'; }}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
