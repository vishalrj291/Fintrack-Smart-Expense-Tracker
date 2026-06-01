import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/animations/AnimatedBackground';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import OverviewCards from '../components/dashboard/OverviewCards';
import ChartsSection from '../components/dashboard/ChartsSection';
import TransactionsList from '../components/dashboard/TransactionsList';
import { BudgetTracker, GoalsSection } from '../components/dashboard/BudgetAndGoals';
import AIInsightsPanel from '../components/dashboard/AIInsightsPanel';
import { pageVariants } from '../components/animations/AnimationWrappers';

export default function DashboardPage({ theme, setTheme }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ minHeight: '100vh', backgroundColor: '#070710' }}
    >
      {/* Animated background — fixed, behind everything */}
      <AnimatedBackground />

      {/* Navbar — fixed top bar */}
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Mobile overlay — close sidebar on tap */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 30,
          }}
          className="lg:hidden"
        />
      )}

      {/* Main content — pushed right on desktop, full-width on mobile */}
      <main
        style={{
          paddingTop: '64px',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
        }}
        className="lg:pl-60"
      >
        <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
          {/* Page header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, color: 'white', marginBottom: '4px' }}>
                  Good morning, Alex 👋
                </h1>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>
                  Here's your financial snapshot for{' '}
                  <span style={{ color: '#9ca3af' }}>May 2024</span>
                </p>
              </div>

              {/* Savings rate badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>Savings rate this month</p>
                  <p className="gradient-text" style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>36.8%</p>
                </div>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))',
                  border: '1px solid rgba(99,102,241,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
                }}>📊</div>
              </div>
            </div>
          </div>

          {/* Overview Cards */}
          <div style={{ marginBottom: '24px' }}>
            <OverviewCards />
          </div>

          {/* Charts + AI Insights */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
              gap: '24px',
              alignItems: 'start',
            }}>
              <div style={{ gridColumn: 'span 1' }} className="xl:col-span-2-of-3">
                <ChartsSection />
              </div>
              <div>
                <AIInsightsPanel />
              </div>
            </div>
          </div>

          {/* Transactions + Budget + Goals */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}>
            <div>
              <TransactionsList />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <BudgetTracker />
              <GoalsSection />
            </div>
          </div>

          {/* Bottom spacing */}
          <div style={{ height: '40px' }} />
        </div>
      </main>
    </motion.div>
  );
}
