import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { therapistAuthApi } from '../../api'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'
import { Mail, Lock, ArrowRight } from 'lucide-react'

function PsychoCareLogo({ size = 36 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" width={size} height={size}>
      <circle cx="20" cy="20" r="18" fill="#8BAF8E" opacity="0.25" />
      <path d="M20 10 C14 10 10 14 10 19 C10 24 14 27 20 31 C26 27 30 24 30 19 C30 14 26 10 20 10Z" fill="#4A7A52" />
      <circle cx="17" cy="18" r="2" fill="white" />
      <circle cx="23" cy="18" r="2" fill="white" />
      <path d="M15 24 Q20 28 25 24" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function TherapistLoginPage() {
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { setTherapistAuth } = useAuthStore()
  const navigate = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await therapistAuthApi.login({ emailId, password })
      const d = res.data.data
      setTherapistAuth(d.token, d.therapist)
      navigate('/therapist/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .tl-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          background: #F8F5EF;
          position: relative;
          overflow: hidden;
          padding: 40px 24px;
        }
        .tl-root::before {
          content: '';
          position: absolute;
          width: 700px; height: 700px;
          background: radial-gradient(ellipse, rgba(139,175,142,0.14) 0%, transparent 65%);
          top: -200px; left: -200px;
          pointer-events: none;
        }
        .tl-root::after {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          background: radial-gradient(ellipse, rgba(184,212,187,0.1) 0%, transparent 65%);
          bottom: -150px; right: -150px;
          pointer-events: none;
        }

        .tl-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 420px;
        }

        .tl-logo-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .tl-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 600;
          color: #1A1F2E;
          line-height: 1;
        }

        .tl-portal-tag {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;
        }
        .tl-portal-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 100px;
          background: rgba(139,175,142,0.1);
          border: 1px solid rgba(139,175,142,0.28);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #4A7A52;
        }
        .tl-portal-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #8BAF8E;
          animation: tlPulse 2s infinite;
        }
        @keyframes tlPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .tl-card {
          background: white;
          border-radius: 28px;
          padding: 44px 40px;
          border: 1px solid rgba(26,31,46,0.07);
          box-shadow: 0 20px 60px rgba(26,31,46,0.08), 0 4px 16px rgba(26,31,46,0.04);
        }

        .tl-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #1A1F2E;
          margin-bottom: 6px;
        }
        .tl-sub {
          font-size: 14px;
          color: #7A8090;
          font-weight: 300;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .tl-field { margin-bottom: 18px; }
        .tl-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #3D4454;
          margin-bottom: 8px;
          letter-spacing: 0.2px;
        }
        .tl-input-wrap { position: relative; }
        .tl-icon {
          position: absolute;
          left: 14px; top: 50%;
          transform: translateY(-50%);
          color: #8BAF8E;
          pointer-events: none;
        }
        .tl-input {
          width: 100%;
          padding: 13px 16px 13px 44px;
          border-radius: 12px;
          border: 1.5px solid rgba(26,31,46,0.1);
          background: #FDFAF5;
          font-size: 14px;
          color: #1A1F2E;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .tl-input::placeholder { color: #B0B5BF; }
        .tl-input:focus {
          border-color: #8BAF8E;
          box-shadow: 0 0 0 3px rgba(139,175,142,0.15);
        }

        .tl-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 15px;
          border-radius: 14px;
          border: none;
          background: #1A1F2E;
          color: white;
          font-size: 15px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.25s;
          margin-top: 26px;
          letter-spacing: 0.2px;
        }
        .tl-btn:hover:not(:disabled) {
          background: #4A7A52;
          box-shadow: 0 12px 30px rgba(74,122,82,0.25);
          transform: translateY(-1px);
        }
        .tl-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .tl-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.25);
          border-top-color: white;
          border-radius: 50%;
          animation: tlSpin 0.7s linear infinite;
        }
        @keyframes tlSpin { to { transform: rotate(360deg); } }

        .tl-divider {
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid rgba(26,31,46,0.07);
        }
        .tl-footer-text {
          text-align: center;
          font-size: 14px;
          color: #7A8090;
          margin-bottom: 10px;
        }
        .tl-footer-text a {
          color: #4A7A52;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }
        .tl-footer-text a:hover { color: #8BAF8E; }

        .tl-back-link {
          display: block;
          text-align: center;
          font-size: 13px;
          color: #7A8090;
          text-decoration: none;
          transition: color 0.2s;
          margin-top: 8px;
        }
        .tl-back-link:hover { color: #4A7A52; }

        .tl-trust {
          display: flex;
          justify-content: center;
          gap: 22px;
          margin-top: 22px;
          flex-wrap: wrap;
        }
        .tl-trust-item {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px;
          color: #7A8090;
        }

        @media (max-width: 767px) {
          .tl-root { padding: 20px 16px; }
          .tl-card { padding: 30px 20px; }
          .tl-trust { gap: 10px; flex-direction: column; align-items: center; }
        }
      `}</style>

      <div className="tl-root">
        <motion.div
          className="tl-wrap"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Logo */}
          <div className="tl-logo-row">
            <PsychoCareLogo size={38} />
            <span className="tl-brand-name">PsychoCare</span>
          </div>

          {/* Portal badge */}
          <div className="tl-portal-tag">
            <div className="tl-portal-badge">
              <span className="tl-portal-dot" />
              Therapist Portal
            </div>
          </div>

          {/* Card */}
          <div className="tl-card">
            <div className="tl-title">Therapist <em style={{ fontStyle: 'italic', color: '#4A7A52' }}>Login</em></div>
            <div className="tl-sub">Welcome back. Continue making a difference.</div>

            <form onSubmit={submit}>
              <div className="tl-field">
                <label className="tl-label">Email Address</label>
                <div className="tl-input-wrap">
                  <Mail size={16} className="tl-icon" />
                  <input
                    type="email"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    placeholder="therapist@example.com"
                    required
                    className="tl-input"
                  />
                </div>
              </div>

              <div className="tl-field">
                <label className="tl-label">Password</label>
                <div className="tl-input-wrap">
                  <Lock size={16} className="tl-icon" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="tl-input"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="tl-btn"
                whileHover={{ scale: loading ? 1 : 1.015 }}
                whileTap={{ scale: loading ? 1 : 0.985 }}
              >
                {loading
                  ? <div className="tl-spinner" />
                  : <><span>Sign In</span><ArrowRight size={16} /></>
                }
              </motion.button>
            </form>

            <div className="tl-divider">
              <p className="tl-footer-text">
                New therapist? <Link to="/therapist/signup">Register Now</Link>
              </p>
              <Link to="/login" className="tl-back-link">← Back to User Login</Link>
            </div>
          </div>

          {/* Trust strip */}
          <div className="tl-trust">
            {[['🔐', 'Encrypted'], ['🏥', 'RCI Licensed'], ['📋', 'HIPAA Compliant']].map(([icon, label]) => (
              <div className="tl-trust-item" key={label as string}><span>{icon}</span>{label}</div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}