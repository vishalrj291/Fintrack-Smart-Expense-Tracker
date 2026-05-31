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
      style={{ position: 'relative', minHeight: '100vh' }}
    >
      <AnimatedBackground />

      <div style={{ position: 'relative', zIndex: 10, display: 'flex' }}>
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          theme={theme}
          setTheme={setTheme}
        />
        <Sidebar
          isOpen={sidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Main content area */}
        <main style={{ flex: 1, marginLeft: '240px', paddingTop: '64px', minHeight: '100vh' }} className="lg:ml-60 ml-0">
          <div style={{ padding: '24px', maxWidth: '1400px' }}>
            {/* Page header */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>
                    Good morning, Alex 👋
                  </h1>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    Here's your financial snapshot for{' '}
                    <span style={{ color: '#9ca3af' }}>May 2024</span>
                  </p>
                </div>

                {/* Savings rate badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="hidden md:flex">
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginBottom: '24px' }} className="xl:grid-cols-3">
              <div style={{ gridColumn: 'span 2' }} className="xl:col-span-2">
                <ChartsSection />
              </div>
              <div>
                <AIInsightsPanel />
              </div>
            </div>

            {/* Transactions + Budget + Goals */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }} className="xl:grid-cols-3">
              <div style={{ gridColumn: 'span 2' }} className="xl:col-span-2">
                <TransactionsList />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <BudgetTracker />
                <GoalsSection />
              </div>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
