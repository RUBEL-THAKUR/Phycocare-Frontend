import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { therapistAuthApi } from '../../api'
import toast from 'react-hot-toast'
import { User, Mail, Phone, Lock, FileText, ArrowRight } from 'lucide-react'

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

export default function TherapistSignupPage() {
  const [f, setF] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    mobileNumber: '',
    isAbove18: false,
    acceptedTerms: false,
  })
  const [cv, setCv] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((p) => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!cv) { toast.error('Please upload your CV'); return }
    if (!f.isAbove18) { toast.error('You must be 18 or older'); return }
    if (!f.acceptedTerms) { toast.error('Please accept the terms'); return }
    const fd = new FormData()
    Object.entries(f).forEach(([k, v]) => fd.append(k, String(v)))
    fd.append('cv', cv)
    setLoading(true)
    try {
      await therapistAuthApi.signup(fd)
      toast.success('Application submitted! Pending approval.')
      navigate('/therapist/login')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ts-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          background: #F8F5EF;
          position: relative;
          overflow: hidden;
          padding: 48px 24px;
        }
        .ts-root::before {
          content: '';
          position: absolute;
          width: 700px; height: 700px;
          background: radial-gradient(ellipse, rgba(139,175,142,0.13) 0%, transparent 65%);
          top: -200px; right: -200px;
          pointer-events: none;
        }
        .ts-root::after {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          background: radial-gradient(ellipse, rgba(184,212,187,0.09) 0%, transparent 65%);
          bottom: -150px; left: -150px;
          pointer-events: none;
        }

        .ts-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 500px;
        }

        .ts-logo-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .ts-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 600;
          color: #1A1F2E;
          line-height: 1;
        }

        .ts-portal-tag {
          display: flex;
          justify-content: center;
          margin-bottom: 32px;
        }
        .ts-portal-badge {
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
        .ts-portal-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #8BAF8E;
          animation: tsPulse 2s infinite;
        }
        @keyframes tsPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .ts-card {
          background: white;
          border-radius: 28px;
          padding: 44px 40px;
          border: 1px solid rgba(26,31,46,0.07);
          box-shadow: 0 20px 60px rgba(26,31,46,0.08), 0 4px 16px rgba(26,31,46,0.04);
        }

        .ts-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #1A1F2E;
          margin-bottom: 6px;
        }
        .ts-sub {
          font-size: 14px;
          color: #7A8090;
          font-weight: 300;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .ts-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

        .ts-field { margin-bottom: 18px; }
        .ts-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #3D4454;
          margin-bottom: 8px;
          letter-spacing: 0.2px;
        }
        .ts-input-wrap { position: relative; }
        .ts-icon {
          position: absolute;
          left: 14px; top: 50%;
          transform: translateY(-50%);
          color: #8BAF8E;
          pointer-events: none;
        }
        .ts-input {
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
        .ts-input::placeholder { color: #B0B5BF; }
        .ts-input:focus {
          border-color: #8BAF8E;
          box-shadow: 0 0 0 3px rgba(139,175,142,0.15);
        }

        /* CV Upload */
        .ts-cv-label {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          border-radius: 14px;
          border: 1.5px dashed rgba(26,31,46,0.15);
          background: #FDFAF5;
          cursor: pointer;
          transition: all 0.25s;
        }
        .ts-cv-label:hover { border-color: #8BAF8E; background: rgba(139,175,142,0.04); }
        .ts-cv-label.has-file { border-color: #8BAF8E; border-style: solid; background: rgba(139,175,142,0.06); }
        .ts-cv-icon { font-size: 22px; flex-shrink: 0; }
        .ts-cv-name { font-size: 14px; font-weight: 500; color: #1A1F2E; }
        .ts-cv-hint { font-size: 12px; color: #7A8090; margin-top: 2px; font-weight: 300; }
        .ts-cv-check { margin-left: auto; font-size: 18px; color: #4A7A52; }

        /* Checkboxes */
        .ts-checks { display: flex; flex-direction: column; gap: 12px; margin-bottom: 4px; }
        .ts-check-label {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          cursor: pointer;
        }
        .ts-check-box {
          width: 20px; height: 20px;
          border-radius: 6px;
          border: 1.5px solid rgba(26,31,46,0.2);
          background: white;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
          transition: all 0.2s;
        }
        .ts-check-box.checked {
          background: #4A7A52;
          border-color: #4A7A52;
        }
        .ts-check-text {
          font-size: 13px;
          color: #7A8090;
          line-height: 1.6;
          font-weight: 300;
        }

        .ts-btn {
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
        .ts-btn:hover:not(:disabled) {
          background: #4A7A52;
          box-shadow: 0 12px 30px rgba(74,122,82,0.25);
          transform: translateY(-1px);
        }
        .ts-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .ts-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.25);
          border-top-color: white;
          border-radius: 50%;
          animation: tsSpin 0.7s linear infinite;
        }
        @keyframes tsSpin { to { transform: rotate(360deg); } }

        .ts-divider {
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid rgba(26,31,46,0.07);
          text-align: center;
          font-size: 14px;
          color: #7A8090;
        }
        .ts-divider a {
          color: #4A7A52;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }
        .ts-divider a:hover { color: #8BAF8E; }

        .ts-trust {
          display: flex;
          justify-content: center;
          gap: 22px;
          margin-top: 22px;
          flex-wrap: wrap;
        }
        .ts-trust-item {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px;
          color: #7A8090;
        }

        /* Step indicator */
        .ts-steps {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 28px;
          padding: 14px 18px;
          background: rgba(139,175,142,0.06);
          border: 1px solid rgba(139,175,142,0.15);
          border-radius: 14px;
        }
        .ts-step { display: flex; align-items: center; gap: 8px; flex: 1; }
        .ts-step-dot {
          width: 26px; height: 26px;
          border-radius: 50%;
          background: #1A1F2E;
          color: white;
          font-size: 11px;
          font-weight: 600;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ts-step-text { font-size: 12px; color: #3D4454; font-weight: 500; }
        .ts-step-line { flex: 1; height: 1px; background: rgba(26,31,46,0.12); margin: 0 8px; }

        @media (max-width: 767px) {
          .ts-root { padding: 20px 16px; }
          .ts-card { padding: 30px 20px; }
          .ts-grid-2 { grid-template-columns: 1fr; }
          .ts-trust { gap: 10px; flex-direction: column; align-items: center; }
          .ts-steps { flex-direction: column; gap: 10px; }
          .ts-step-line { width: 1px; height: 20px; margin: 0; }
        }
      `}</style>

      <div className="ts-root">
        <motion.div
          className="ts-wrap"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Logo */}
          <div className="ts-logo-row">
            <PsychoCareLogo size={38} />
            <span className="ts-brand-name">PsychoCare</span>
          </div>

          {/* Portal badge */}
          <div className="ts-portal-tag">
            <div className="ts-portal-badge">
              <span className="ts-portal-dot" />
              Therapist Registration
            </div>
          </div>

          {/* Card */}
          <div className="ts-card">
            <div className="ts-title">Join Our <em style={{ fontStyle: 'italic', color: '#4A7A52' }}>Network</em></div>
            <div className="ts-sub">Apply to join 200+ certified therapists making a difference across India.</div>

            {/* Steps hint */}
            <div className="ts-steps">
              {[['1', 'Fill Form'], ['2', 'Upload CV'], ['3', 'Get Approved']].map(([num, label], i) => (
                <div key={num} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div className="ts-step">
                    <div className="ts-step-dot">{num}</div>
                    <span className="ts-step-text">{label}</span>
                  </div>
                  {i < 2 && <div className="ts-step-line" />}
                </div>
              ))}
            </div>

            <form onSubmit={submit}>
              {/* Name */}
              <div className="ts-grid-2">
                <div className="ts-field">
                  <label className="ts-label">First Name</label>
                  <div className="ts-input-wrap">
                    <User size={15} className="ts-icon" />
                    <input type="text" value={f.firstName} onChange={set('firstName')} placeholder="First name" required className="ts-input" />
                  </div>
                </div>
                <div className="ts-field">
                  <label className="ts-label">Last Name</label>
                  <div className="ts-input-wrap">
                    <User size={15} className="ts-icon" />
                    <input type="text" value={f.lastName} onChange={set('lastName')} placeholder="Last name" required className="ts-input" />
                  </div>
                </div>
              </div>

              <div className="ts-field">
                <label className="ts-label">Email Address</label>
                <div className="ts-input-wrap">
                  <Mail size={16} className="ts-icon" />
                  <input type="email" value={f.emailId} onChange={set('emailId')} placeholder="therapist@example.com" required className="ts-input" />
                </div>
              </div>

              <div className="ts-field">
                <label className="ts-label">Mobile Number</label>
                <div className="ts-input-wrap">
                  <Phone size={16} className="ts-icon" />
                  <input type="tel" value={f.mobileNumber} onChange={set('mobileNumber')} placeholder="10-digit mobile number" required className="ts-input" />
                </div>
              </div>

              <div className="ts-field">
                <label className="ts-label">Password</label>
                <div className="ts-input-wrap">
                  <Lock size={16} className="ts-icon" />
                  <input type="password" value={f.password} onChange={set('password')} placeholder="Create a secure password" required className="ts-input" />
                </div>
              </div>

              {/* CV Upload */}
              <div className="ts-field">
                <label className="ts-label">Curriculum Vitae (PDF)</label>
                <label className={`ts-cv-label${cv ? ' has-file' : ''}`}>
                  <span className="ts-cv-icon"><FileText size={22} color={cv ? '#4A7A52' : '#8BAF8E'} /></span>
                  <div style={{ flex: 1 }}>
                    <div className="ts-cv-name">{cv ? cv.name : 'Upload your CV'}</div>
                    <div className="ts-cv-hint">{cv ? `${(cv.size / 1024 / 1024).toFixed(2)} MB` : 'PDF format, max 5MB'}</div>
                  </div>
                  {cv && <span className="ts-cv-check">✓</span>}
                  <input type="file" accept=".pdf" onChange={(e) => setCv(e.target.files?.[0] || null)} style={{ display: 'none' }} />
                </label>
              </div>

              {/* Checkboxes */}
              <div className="ts-field">
                <div className="ts-checks">
                  <label className="ts-check-label" onClick={() => setF(p => ({ ...p, isAbove18: !p.isAbove18 }))}>
                    <div className={`ts-check-box${f.isAbove18 ? ' checked' : ''}`}>
                      {f.isAbove18 && <span style={{ color: 'white', fontSize: 11, lineHeight: 1 }}>✓</span>}
                    </div>
                    <span className="ts-check-text">I confirm that I am 18 years or older</span>
                  </label>
                  <label className="ts-check-label" onClick={() => setF(p => ({ ...p, acceptedTerms: !p.acceptedTerms }))}>
                    <div className={`ts-check-box${f.acceptedTerms ? ' checked' : ''}`}>
                      {f.acceptedTerms && <span style={{ color: 'white', fontSize: 11, lineHeight: 1 }}>✓</span>}
                    </div>
                    <span className="ts-check-text">I accept the Terms and Conditions of the PsychoCare Therapist Programme</span>
                  </label>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="ts-btn"
                whileHover={{ scale: loading ? 1 : 1.015 }}
                whileTap={{ scale: loading ? 1 : 0.985 }}
              >
                {loading
                  ? <div className="ts-spinner" />
                  : <><span>Submit Application</span><ArrowRight size={16} /></>
                }
              </motion.button>
            </form>

            <div className="ts-divider">
              Already registered? <Link to="/therapist/login">Sign In</Link>
            </div>
          </div>

          {/* Trust strip */}
          <div className="ts-trust">
            {[['🔐', 'Encrypted'], ['🏥', 'RCI Licensed'], ['📋', 'HIPAA Compliant'], ['🇮🇳', 'Made in India']].map(([icon, label]) => (
              <div className="ts-trust-item" key={label as string}><span>{icon}</span>{label}</div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}