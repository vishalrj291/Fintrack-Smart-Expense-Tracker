import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import OverviewCards from '../components/dashboard/OverviewCards';
import ChartsSection from '../components/dashboard/ChartsSection';
import TransactionsList from '../components/dashboard/TransactionsList';
import AIInsightsPanel from '../components/dashboard/AIInsightsPanel';
import { BudgetTracker, GoalsSection } from '../components/dashboard/BudgetAndGoals';
import ExpensesPage from '../components/dashboard/ExpensesPage';
import AnalyticsPage from '../components/dashboard/AnalyticsPage';
import GoalsPage from '../components/dashboard/GoalsPage';
import ReportsPage from '../components/dashboard/ReportsPage';
import SettingsPage from '../components/dashboard/SettingsPage';
import AddExpenseModal from '../components/dashboard/AddExpenseModal';
import { pageVariants } from '../components/animations/AnimationWrappers';
import { ExpenseProvider } from '../context/ExpenseContext';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function DashboardOverview({ onAddExpense }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, color: 'white', marginBottom: '6px' }}>
          {getGreeting()}, Vishal 👋
        </h1>
        <p style={{ fontSize: '14px', color: '#475569' }}>
          Here's your financial overview for May 2024
        </p>
      </div>

      {/* Metric cards */}
      <div style={{ marginBottom: '24px' }}>
        <OverviewCards />
      </div>

      {/* Charts + AI Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '20px', marginBottom: '24px' }}
        className="grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <ChartsSection />
        <AIInsightsPanel />
      </div>

      {/* Transactions + Budgets/Goals */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)', gap: '20px', marginBottom: '24px' }}
        className="grid-cols-1 xl:grid-cols-[3fr_2fr]">
        <TransactionsList onAddClick={onAddExpense} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <BudgetTracker />
          <GoalsSection />
        </div>
      </div>
    </motion.div>
  );
}

function BudgetsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>Budgets</h1>
        <p style={{ fontSize: '14px', color: '#475569' }}>Track and manage your spending limits</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        <BudgetTracker />
      </div>
    </motion.div>
  );
}

function DashboardContent({ activeSection, setActiveSection }) {
  const [addOpen, setAddOpen] = useState(false);

  const sections = {
    dashboard: <DashboardOverview onAddExpense={() => setAddOpen(true)} />,
    expenses: <ExpensesPage />,
    budgets: <BudgetsPage />,
    analytics: <AnalyticsPage />,
    goals: <GoalsPage />,
    reports: <ReportsPage />,
    settings: <SettingsPage />,
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div key={activeSection} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          {sections[activeSection] || sections.dashboard}
        </motion.div>
      </AnimatePresence>
      <AddExpenseModal isOpen={addOpen} onClose={() => setAddOpen(false)} />
    </>
  );
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  // Close sidebar on route change for mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [activeSection]);

  return (
    <ExpenseProvider>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ minHeight: '100vh', backgroundColor: '#0b0f14' }}
      >
        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 30,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)',
              }}
              className="lg:hidden"
            />
          )}
        </AnimatePresence>

        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <Sidebar
          isOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Main content */}
        <main
          style={{
            paddingTop: '64px',
            paddingLeft: '0',
            minHeight: '100vh',
            transition: 'padding-left 0.3s ease',
          }}
          className="lg:pl-60"
        >
          <div style={{ padding: '28px 24px', maxWidth: '1400px', margin: '0 auto' }}>
            <DashboardContent activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>
        </main>
      </motion.div>
    </ExpenseProvider>
  );
}
