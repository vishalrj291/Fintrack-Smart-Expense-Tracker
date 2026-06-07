import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const XIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

function InputField({ label, type = 'text', value, onChange, placeholder, autoComplete }) {
  const [showPwd, setShowPwd] = useState(false);
  const isPassword = type === 'password';
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#94a3b8', marginBottom: '6px' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          type={isPassword && showPwd ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="input-field"
          style={{ paddingRight: isPassword ? '2.5rem' : '1rem' }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            style={{
              position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '2px',
              display: 'flex', alignItems: 'center',
            }}
          >
            {showPwd ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
    </div>
  );
}

function ModalWrapper({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Login Modal ──────────────────────────────────────────────────────────────
export function LoginModal({ isOpen, onClose, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email) { setError('Email is required'); return; }
    if (!password) { setError('Password is required'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError('Demo mode: Use "Continue as Guest" to access the dashboard.');
    }, 800);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div style={{ padding: '28px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '30px', height: '30px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: 'white', fontWeight: 900, fontSize: '10px', fontFamily: 'JetBrains Mono' }}>FT</span>
              </div>
              <span style={{ color: 'white', fontWeight: 700, fontSize: '17px' }}>
                Fin<span className="gradient-text">Track</span>
              </span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>Welcome back</h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>Sign in to your account</p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '4px' }}
          >
            <XIcon />
          </button>
        </div>

        {/* Google sign in */}
        <button
          style={{
            width: '100%', padding: '11px', borderRadius: '10px', fontSize: '14px', fontWeight: 500,
            background: 'rgba(255,255,255,0.04)', border: '1px solid #1e2d45', color: '#d1d5db',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            transition: 'all 0.2s', marginBottom: '20px', fontFamily: 'Inter, sans-serif',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = '#2d4060'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = '#1e2d45'; }}
        >
          <GoogleIcon />
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', background: '#1e2d45' }} />
          <span style={{ fontSize: '12px', color: '#475569' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: '#1e2d45' }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email address"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="vishal@fintrack.io"
            autoComplete="email"
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />

          <div style={{ textAlign: 'right', marginBottom: '16px', marginTop: '-8px' }}>
            <button type="button" style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              Forgot password?
            </button>
          </div>

          {error && (
            <div style={{
              padding: '10px 14px', borderRadius: '8px', marginBottom: '16px',
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
              fontSize: '13px', color: '#fca5a5',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', marginBottom: '12px' }}
            disabled={loading}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin-slow 0.7s linear infinite', display: 'inline-block' }} />
                Signing in...
              </span>
            ) : 'Sign In'}
          </button>
        </form>

        {/* Guest access */}
        <Link to="/dashboard" style={{ display: 'block', textDecoration: 'none' }}>
          <button
            className="btn-ghost"
            style={{ width: '100%', justifyContent: 'center', padding: '11px', marginBottom: '20px' }}
            onClick={onClose}
          >
            Continue as Guest →
          </button>
        </Link>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#475569' }}>
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignup}
            style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}
          >
            Sign up
          </button>
        </p>
      </div>
    </ModalWrapper>
  );
}

// ─── Signup Modal ─────────────────────────────────────────────────────────────
export function SignupModal({ isOpen, onClose, onSwitchToLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const update = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.name) { setError('Full name is required'); return; }
    if (!form.email) { setError('Email is required'); return; }
    if (!form.password || form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  if (success) {
    return (
      <ModalWrapper isOpen={isOpen} onClose={onClose}>
        <div style={{ padding: '40px 28px', textAlign: 'center' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%',
            background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', margin: '0 auto 20px',
          }}>✓</div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>Account created!</h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
            Welcome to FinTrack. You can now access your dashboard.
          </p>
          <Link to="/dashboard">
            <button className="btn-primary" style={{ padding: '12px 32px' }} onClick={onClose}>
              Go to Dashboard →
            </button>
          </Link>
        </div>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>Create account</h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>Start tracking your finances today</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '4px' }}>
            <XIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <InputField label="Full name" value={form.name} onChange={update('name')} placeholder="Vishal Raj" />
          <InputField label="Email address" type="email" value={form.email} onChange={update('email')} placeholder="vishal@example.com" autoComplete="email" />
          <InputField label="Password" type="password" value={form.password} onChange={update('password')} placeholder="Min. 6 characters" autoComplete="new-password" />
          <InputField label="Confirm password" type="password" value={form.confirm} onChange={update('confirm')} placeholder="Repeat password" autoComplete="new-password" />

          {error && (
            <div style={{
              padding: '10px 14px', borderRadius: '8px', marginBottom: '16px',
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
              fontSize: '13px', color: '#fca5a5',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', marginBottom: '12px' }}
            disabled={loading}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin-slow 0.7s linear infinite', display: 'inline-block' }} />
                Creating account...
              </span>
            ) : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#475569' }}>
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}
          >
            Sign in
          </button>
        </p>
      </div>
    </ModalWrapper>
  );
}
