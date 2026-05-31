import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { notifications } from '../../data/mockData';

export default function Navbar({ sidebarOpen, setSidebarOpen, theme, setTheme }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6"
      style={{
        borderBottom: isLanding ? '1px solid transparent' : '1px solid #1f1f35',
        background: isLanding ? 'transparent' : 'rgba(14,14,26,0.85)',
        backdropFilter: isLanding ? 'none' : 'blur(20px)',
        WebkitBackdropFilter: isLanding ? 'none' : 'blur(20px)',
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        {!isLanding && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
            style={{
              width: '36px', height: '36px', borderRadius: '10px',
              border: '1px solid #1f1f35', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#9ca3af', background: 'none', cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        <Link to="/" className="flex items-center gap-2.5">
          <motion.div
            style={{
              width: '32px', height: '32px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 12px rgba(99,102,241,0.3)',
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <span style={{ color: 'white', fontWeight: 900, fontSize: '11px' }}>FT</span>
          </motion.div>
          <span style={{ color: 'white', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.3px' }}>
            Fin<span className="gradient-text">Track</span>
          </span>
        </Link>
      </div>

      {/* Center nav links - landing only */}
      {isLanding && (
        <div className="hidden md:flex items-center gap-1 mx-auto">
          {['Features', 'Demo', 'Pricing', 'About'].map(item => (
            <button key={item} style={{
              padding: '6px 16px', borderRadius: '8px', fontSize: '14px',
              color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.target.style.color = 'white'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { e.target.style.color = '#9ca3af'; e.target.style.background = 'none'; }}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Search - dashboard only */}
      {!isLanding && (
        <div className="flex-1 max-w-md mx-6 hidden md:block">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#6b7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search transactions, budgets..."
              className="input-field"
              style={{ paddingLeft: '2.5rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
            />
          </div>
        </div>
      )}

      {/* Right controls */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Theme toggle */}
        <motion.button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style={{
            width: '36px', height: '36px', borderRadius: '10px',
            border: '1px solid #1f1f35', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'none', cursor: 'pointer', fontSize: '16px',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </motion.button>

        {/* Notifications - dashboard only */}
        {!isLanding && (
          <div style={{ position: 'relative' }}>
            <motion.button
              onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
              style={{
                width: '36px', height: '36px', borderRadius: '10px',
                border: '1px solid #1f1f35', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'none', cursor: 'pointer', color: '#9ca3af', position: 'relative',
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
                  background: '#6366f1', fontSize: '10px', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
                }}>
                  {unreadCount}
                </span>
              )}
            </motion.button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                style={{
                  position: 'absolute', right: 0, top: '48px', width: '320px',
                  zIndex: 100,
                }}
              >
                <div className="glass-card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                  <div style={{ padding: '16px', borderBottom: '1px solid #1f1f35', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>Notifications</span>
                    <span className="badge badge-primary">{unreadCount} new</span>
                  </div>
                  <div style={{ padding: '8px' }}>
                    {notifications.map(n => (
                      <div key={n.id} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '12px',
                        padding: '12px', borderRadius: '10px', cursor: 'pointer',
                        background: !n.read ? 'rgba(99,102,241,0.05)' : 'none',
                      }}>
                        <div style={{
                          width: '8px', height: '8px', borderRadius: '50%', marginTop: '6px', flexShrink: 0,
                          background: n.type === 'alert' ? '#f87171' : n.type === 'success' ? '#34d399' : n.type === 'warning' ? '#fbbf24' : '#60a5fa',
                        }} />
                        <div>
                          <p style={{ fontSize: '12px', color: '#d1d5db' }}>{n.message}</p>
                          <p style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Profile */}
        <div style={{ position: 'relative' }}>
          <motion.button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              paddingLeft: '8px', paddingRight: '12px', paddingTop: '6px', paddingBottom: '6px',
              borderRadius: '10px', border: '1px solid #1f1f35',
              background: 'none', cursor: 'pointer', transition: 'all 0.2s',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div style={{
              width: '28px', height: '28px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: 700, color: 'white',
            }}>AM</div>
            <span style={{ fontSize: '14px', color: '#d1d5db', fontWeight: 500 }} className="hidden sm:block">Alex</span>
          </motion.button>

          {showProfile && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              style={{ position: 'absolute', right: 0, top: '48px', width: '220px', zIndex: 100 }}
            >
              <div className="glass-card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid #1f1f35' }}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>Alex Morgan</p>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>alex@fintrack.io</p>
                  <span className="badge badge-primary" style={{ marginTop: '8px', display: 'inline-flex' }}>Pro Plan</span>
                </div>
                <div style={{ padding: '8px' }}>
                  {['Profile Settings', 'Billing', 'Preferences', 'Sign out'].map(item => (
                    <button key={item} style={{
                      width: '100%', textAlign: 'left', padding: '10px 12px',
                      borderRadius: '8px', fontSize: '14px', border: 'none',
                      background: 'none', cursor: 'pointer', transition: 'all 0.2s',
                      color: item === 'Sign out' ? '#f87171' : '#9ca3af',
                    }}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {isLanding && (
          <Link to="/dashboard">
            <motion.button
              className="btn-primary"
              style={{ padding: '8px 20px', fontSize: '14px' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started Free
            </motion.button>
          </Link>
        )}
      </div>
    </nav>
  );
}
