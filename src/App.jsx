import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';

function AnimatedRoutes({ theme, setTheme }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<LandingPage theme={theme} setTheme={setTheme} />}
        />
        <Route
          path="/dashboard"
          element={<DashboardPage theme={theme} setTheme={setTheme} />}
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <BrowserRouter>
      <AnimatedRoutes theme={theme} setTheme={setTheme} />
    </BrowserRouter>
  );
}