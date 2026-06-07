import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/animations/AnimatedBackground';
import LandingNavbar from '../components/landing/LandingNavbar';
import { LoginModal, SignupModal } from '../components/landing/AuthModals';
import { HeroSection, TrustSection } from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import PricingSection from '../components/landing/PricingSection';
import AboutSection from '../components/landing/AboutSection';
import { TestimonialsSection, FAQSection, Footer } from '../components/landing/TestimonialsAndFooter';
import { pageVariants } from '../components/animations/AnimationWrappers';

export default function LandingPage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ minHeight: '100vh', backgroundColor: '#0b0f14', overflowX: 'hidden' }}
    >
      <AnimatedBackground />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <LandingNavbar
          onLoginClick={() => setLoginOpen(true)}
          onSignupClick={() => setSignupOpen(true)}
        />

        <main>
          <HeroSection />
          <TrustSection />
          <FeaturesSection />
          <TestimonialsSection />
          <PricingSection />
          <AboutSection />
          <FAQSection />
        </main>

        <Footer />
      </div>

      {/* Auth Modals */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToSignup={() => { setLoginOpen(false); setSignupOpen(true); }}
      />
      <SignupModal
        isOpen={signupOpen}
        onClose={() => setSignupOpen(false)}
        onSwitchToLogin={() => { setSignupOpen(false); setLoginOpen(true); }}
      />
    </motion.div>
  );
}
