import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { authApi } from '../../api'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'
import { Mail, Lock, Smartphone, ArrowRight } from 'lucide-react'

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

export default function LoginPage() {
  const [tab, setTab] = useState<'pw' | 'otp'>('pw')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setUserAuth } = useAuthStore()
  const navigate = useNavigate()

  async function loginPw(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authApi.login({ emailId: email, password })
      const d = res.data.data
      setUserAuth(d.token, d)
      toast.success('Welcome back!')
      navigate('/user/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally { setLoading(false) }
  }

  async function sendOtp() {
    if (!email) { toast.error('Enter email or mobile'); return }
    setLoading(true)
    try {
      await authApi.requestOtp(email)
      setOtpSent(true)
      toast.success('OTP sent!')
    } catch { toast.error('Failed to send OTP') }
    finally { setLoading(false) }
  }

  async function loginOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authApi.verifyOtp(email, otp)
      const d = res.data.data
      setUserAuth(d.token, d)
      toast.success('Welcome back!')
      navigate('/user/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid OTP')
    } finally { setLoading(false) }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lp-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #F8F5EF;
          overflow: hidden;
        }

        /* Responsive root for mobile */
        @media (max-width: 1023px) {
          .lp-root {
            overflow: auto;
          }
        }

        /* ── Left panel (brand side) ── */
        .lp-left {
          display: none;
          position: relative;
          overflow: hidden;
          background: #1A1F2E;
        }
        @media (min-width: 1024px) {
          .lp-left {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 60px;
          }
        }

        /* Responsive left panel padding */
        @media (min-width: 1024px) and (max-width: 1280px) {
          .lp-left {
            padding: 40px;
          }
        }

        .lp-left-glow-1 {
          position: absolute;
          width: 500px; height: 500px;
          background: radial-gradient(ellipse, rgba(139,175,142,0.18) 0%, transparent 65%);
          top: -100px; left: -100px;
          pointer-events: none;
        }

        /* Responsive glow adjustments */
        @media (min-width: 1024px) and (max-width: 1280px) {
          .lp-left-glow-1 {
            width: 400px;
            height: 400px;
            top: -80px;
            left: -80px;
          }
          .lp-left-glow-2 {
            width: 300px;
            height: 300px;
            bottom: -60px;
            right: -50px;
          }
        }

        .lp-left-glow-2 {
          position: absolute;
          width: 360px; height: 360px;
          background: radial-gradient(ellipse, rgba(201,169,110,0.1) 0%, transparent 65%);
          bottom: -80px; right: -60px;
          pointer-events: none;
        }

        .lp-brand-content { position: relative; z-index: 1; text-align: center; max-width: 440px; }

        /* Responsive brand content */
        @media (min-width: 1024px) and (max-width: 1280px) {
          .lp-brand-content {
            max-width: 380px;
          }
        }

        .lp-brand-logo { display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 40px; }

        /* Responsive brand logo */
        @media (min-width: 1024px) and (max-width: 1280px) {
          .lp-brand-logo {
            gap: 12px;
            margin-bottom: 32px;
          }
        }

        .lp-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          font-weight: 600;
          color: white;
          letter-spacing: 0.5px;
          line-height: 1;
        }

        /* Responsive brand name */
        @media (min-width: 1024px) and (max-width: 1280px) {
          .lp-brand-name {
            font-size: 36px;
          }
        }

        .lp-brand-tagline {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 700;
          color: white;
          line-height: 1.15;
          margin-bottom: 20px;
        }

        /* Responsive tagline */
        @media (min-width: 1024px) and (max-width: 1280px) {
          .lp-brand-tagline {
            font-size: 30px;
            margin-bottom: 16px;
          }
        }

        .lp-brand-tagline em { font-style: italic; color: #B8D4BB; }

        .lp-brand-sub {
          font-size: 16px;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          font-weight: 300;
          margin-bottom: 48px;
        }

        /* Responsive brand sub */
        @media (min-width: 1024px) and (max-width: 1280px) {
          .lp-brand-sub {
            font-size: 14px;
            margin-bottom: 36px;
          }
        }

        /* Stat pills */
        .lp-stats { display: flex; flex-direction: column; gap: 12px; }

        /* Responsive stats */
        @media (min-width: 1024px) and (max-width: 1280px) {
          .lp-stats {
            gap: 10px;
          }
        }

        .lp-stat-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 20px;
          background: rgba(139,175,142,0.07);
          border: 1px solid rgba(139,175,142,0.15);
          border-radius: 14px;
        }

        /* Responsive stat row */
        @media (min-width: 1024px) and (max-width: 1280px) {
          .lp-stat-row {
            padding: 12px 16px;
            gap: 12px;
          }
        }

        .lp-stat-icon { font-size: 22px; }

        /* Responsive stat icon */
        @media (min-width: 1024px) and (max-width: 1280px) {
          .lp-stat-icon {
            font-size: 20px;
          }
        }

        .lp-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          color: white;
        }

        /* Responsive stat num */
        @media (min-width: 1024px) and (max-width: 1280px) {
          .lp-stat-num {
            font-size: 20px;
          }
        }

        .lp-stat-label { font-size: 13px; color: rgba(255,255,255,0.45); }

        /* Responsive stat label */
        @media (min-width: 1024px) and (max-width: 1280px) {
          .lp-stat-label {
            font-size: 12px;
          }
        }

        /* Marquee strip at bottom of left panel */
        .lp-marquee-wrap {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          overflow: hidden;
          padding: 14px 0;
          background: rgba(139,175,142,0.07);
          border-top: 1px solid rgba(139,175,142,0.1);
        }

        /* Responsive marquee */
        @media (min-width: 1024px) and (max-width: 1280px) {
          .lp-marquee-wrap {
            padding: 10px 0;
          }
        }

        .lp-marquee-track {
          display: flex;
          gap: 40px;
          white-space: nowrap;
          animation: lpMarquee 22s linear infinite;
        }

        /* Responsive marquee track */
        @media (min-width: 1024px) and (max-width: 1280px) {
          .lp-marquee-track {
            gap: 30px;
          }
        }

        .lp-marquee-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.5px;
          font-family: 'Cormorant Garamond', serif;
        }

        /* Responsive marquee item */
        @media (min-width: 1024px) and (max-width: 1280px) {
          .lp-marquee-item {
            font-size: 11px;
            gap: 8px;
          }
        }

        .lp-marquee-dot { width: 4px; height: 4px; background: #8BAF8E; border-radius: 50%; flex-shrink: 0; }
        @keyframes lpMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* ── Right panel (form side) ── */
        .lp-right {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          padding: 40px 24px;
          background: #F8F5EF;
          position: relative;
          overflow: hidden;
        }

        /* Responsive right panel padding */
        @media (max-width: 768px) {
          .lp-right {
            padding: 32px 20px;
          }
        }

        @media (max-width: 480px) {
          .lp-right {
            padding: 24px 16px;
          }
        }

        /* Subtle cream radial bg */
        .lp-right::before {
          content: '';
          position: absolute;
          width: 600px; height: 600px;
          background: radial-gradient(ellipse, rgba(139,175,142,0.12) 0%, transparent 65%);
          top: -150px; right: -150px;
          pointer-events: none;
        }

        /* Responsive right panel glow */
        @media (max-width: 768px) {
          .lp-right::before {
            width: 400px;
            height: 400px;
            top: -100px;
            right: -100px;
          }
          .lp-right::after {
            width: 300px;
            height: 300px;
            bottom: -80px;
            left: -80px;
          }
        }

        @media (max-width: 480px) {
          .lp-right::before {
            width: 280px;
            height: 280px;
            top: -70px;
            right: -70px;
          }
          .lp-right::after {
            width: 220px;
            height: 220px;
            bottom: -60px;
            left: -60px;
          }
        }

        .lp-right::after {
          content: '';
          position: absolute;
          width: 400px; height: 400px;
          background: radial-gradient(ellipse, rgba(201,169,110,0.08) 0%, transparent 65%);
          bottom: -100px; left: -100px;
          pointer-events: none;
        }

        .lp-form-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 420px;
        }

        /* Responsive form wrap */
        @media (max-width: 480px) {
          .lp-form-wrap {
            max-width: 100%;
          }
        }

        /* Mobile logo (hidden on desktop) */
        .lp-mobile-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 32px;
        }
        @media (min-width: 1024px) { .lp-mobile-logo { display: none; } }

        /* Responsive mobile logo */
        @media (max-width: 480px) {
          .lp-mobile-logo {
            margin-bottom: 24px;
          }
        }

        .lp-mobile-logo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 600;
          color: #1A1F2E;
        }

        /* Responsive mobile logo name */
        @media (max-width: 480px) {
          .lp-mobile-logo-name {
            font-size: 24px;
          }
        }

        /* Card */
        .lp-card {
          background: white;
          border-radius: 28px;
          padding: 44px 40px;
          border: 1px solid rgba(26,31,46,0.07);
          box-shadow: 0 20px 60px rgba(26,31,46,0.08), 0 4px 16px rgba(26,31,46,0.04);
        }

        /* Responsive card padding */
        @media (max-width: 768px) {
          .lp-card {
            padding: 36px 32px;
          }
        }

        @media (max-width: 480px) {
          .lp-card {
            padding: 28px 20px;
            border-radius: 24px;
          }
        }

        .lp-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #1A1F2E;
          margin-bottom: 6px;
        }

        /* Responsive card title */
        @media (max-width: 480px) {
          .lp-card-title {
            font-size: 24px;
          }
        }

        .lp-card-sub {
          font-size: 14px;
          color: #7A8090;
          margin-bottom: 28px;
          font-weight: 300;
        }

        /* Responsive card sub */
        @media (max-width: 480px) {
          .lp-card-sub {
            font-size: 13px;
            margin-bottom: 24px;
          }
        }

        /* Tab switcher */
        .lp-tabs {
          display: flex;
          background: #F8F5EF;
          border-radius: 14px;
          padding: 4px;
          margin-bottom: 28px;
          border: 1px solid rgba(26,31,46,0.07);
        }

        /* Responsive tabs */
        @media (max-width: 480px) {
          .lp-tabs {
            margin-bottom: 24px;
          }
        }

        .lp-tab {
          flex: 1;
          padding: 10px;
          border-radius: 10px;
          border: none;
          background: transparent;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          color: #7A8090;
          cursor: pointer;
          transition: all 0.25s;
        }

        /* Responsive tab */
        @media (max-width: 480px) {
          .lp-tab {
            padding: 8px;
            font-size: 13px;
          }
        }

        .lp-tab.active {
          background: #1A1F2E;
          color: white;
          box-shadow: 0 4px 14px rgba(26,31,46,0.2);
        }

        /* Label */
        .lp-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #3D4454;
          margin-bottom: 8px;
          letter-spacing: 0.2px;
        }

        /* Responsive label */
        @media (max-width: 480px) {
          .lp-label {
            font-size: 12px;
            margin-bottom: 6px;
          }
        }

        /* Input */
        .lp-input-wrap { position: relative; }
        .lp-input-icon {
          position: absolute;
          left: 14px; top: 50%;
          transform: translateY(-50%);
          color: #8BAF8E;
          pointer-events: none;
        }

        /* Responsive input icon */
        @media (max-width: 480px) {
          .lp-input-icon {
            left: 12px;
          }
        }

        .lp-input {
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

        /* Responsive input */
        @media (max-width: 480px) {
          .lp-input {
            padding: 11px 14px 11px 38px;
            font-size: 13px;
          }
        }

        .lp-input::placeholder { color: #B0B5BF; }
        .lp-input:focus {
          border-color: #8BAF8E;
          box-shadow: 0 0 0 3px rgba(139,175,142,0.15);
        }
        .lp-input-otp {
          text-align: center;
          letter-spacing: 0.5em;
          font-size: 22px;
          font-weight: 600;
          padding-left: 16px;
        }

        /* Responsive OTP input */
        @media (max-width: 480px) {
          .lp-input-otp {
            font-size: 18px;
            letter-spacing: 0.3em;
          }
        }

        /* OTP row */
        .lp-otp-row { display: flex; gap: 10px; }
        .lp-otp-row .lp-input-wrap { flex: 1; }

        /* Responsive OTP row */
        @media (max-width: 480px) {
          .lp-otp-row {
            gap: 8px;
          }
        }

        /* Send OTP button */
        .lp-send-btn {
          padding: 13px 18px;
          border-radius: 12px;
          border: 1.5px solid rgba(74,122,82,0.3);
          background: rgba(139,175,142,0.1);
          color: #4A7A52;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.25s;
        }

        /* Responsive send OTP button */
        @media (max-width: 480px) {
          .lp-send-btn {
            padding: 11px 14px;
            font-size: 12px;
          }
        }

        .lp-send-btn:hover {
          background: rgba(139,175,142,0.2);
          border-color: #4A7A52;
        }
        .lp-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Primary button */
        .lp-btn-primary {
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
          margin-top: 24px;
          letter-spacing: 0.2px;
        }

        /* Responsive primary button */
        @media (max-width: 480px) {
          .lp-btn-primary {
            padding: 13px;
            font-size: 14px;
            margin-top: 20px;
          }
        }

        .lp-btn-primary:hover:not(:disabled) {
          background: #4A7A52;
          box-shadow: 0 12px 30px rgba(74,122,82,0.25);
          transform: translateY(-1px);
        }
        .lp-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Spinner */
        .lp-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.25);
          border-top-color: white;
          border-radius: 50%;
          animation: lpSpin 0.7s linear infinite;
        }
        @keyframes lpSpin { to { transform: rotate(360deg); } }

        /* Divider */
        .lp-divider {
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid rgba(26,31,46,0.07);
        }

        /* Responsive divider */
        @media (max-width: 480px) {
          .lp-divider {
            margin-top: 24px;
            padding-top: 20px;
          }
        }

        .lp-signup-text {
          text-align: center;
          font-size: 14px;
          color: #7A8090;
        }

        /* Responsive signup text */
        @media (max-width: 480px) {
          .lp-signup-text {
            font-size: 13px;
          }
        }

        .lp-signup-text a {
          color: #4A7A52;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }
        .lp-signup-text a:hover { color: #8BAF8E; }

        .lp-links-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 14px;
        }

        /* Responsive links row */
        @media (max-width: 480px) {
          .lp-links-row {
            gap: 12px;
            margin-top: 12px;
          }
        }

        .lp-links-row a {
          font-size: 13px;
          color: #7A8090;
          text-decoration: none;
          transition: color 0.2s;
        }

        /* Responsive links */
        @media (max-width: 480px) {
          .lp-links-row a {
            font-size: 12px;
          }
        }

        .lp-links-row a:hover { color: #4A7A52; }
        .lp-links-sep { color: rgba(26,31,46,0.15); font-size: 13px; }

        /* Trust strip below card */
        .lp-trust-strip {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-top: 24px;
          flex-wrap: wrap;
        }

        /* Responsive trust strip */
        @media (max-width: 768px) {
          .lp-trust-strip {
            gap: 20px;
            margin-top: 20px;
          }
        }

        @media (max-width: 480px) {
          .lp-trust-strip {
            gap: 16px;
            margin-top: 18px;
          }
        }

        .lp-trust-item {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px;
          color: #7A8090;
        }

        /* Responsive trust item */
        @media (max-width: 480px) {
          .lp-trust-item {
            font-size: 11px;
            gap: 4px;
          }
          .lp-trust-item span {
            font-size: 12px;
          }
        }

        .lp-trust-item span { font-size: 14px; }

        /* Field spacing */
        .lp-field { margin-bottom: 18px; }

        /* Responsive field spacing */
        @media (max-width: 480px) {
          .lp-field {
            margin-bottom: 16px;
          }
        }
      `}</style>

      <div className="lp-root">

        {/* ── LEFT BRAND PANEL ─────────────────────────────── */}
        <div className="lp-left">
          <div className="lp-left-glow-1" />
          <div className="lp-left-glow-2" />

          <div className="lp-brand-content">
            <div className="lp-brand-logo">
              <PsychoCareLogo size={52} />
              <div style={{ textAlign: 'left' }}>
                <div className="lp-brand-name">PsychoCare</div>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#8BAF8E', marginTop: 2 }}>Mental Health Platform</div>
              </div>
            </div>

            <h2 className="lp-brand-tagline">
              Your Mind Deserves<br /><em>Expert Care.</em>
            </h2>
            <p className="lp-brand-sub">
              Connect with certified psychologists, therapists & counselors — privately, confidentially, from anywhere.
            </p>

            <div className="lp-stats">
              {[
                ['🌿', '50,000+', 'Lives Changed'],
                ['👨‍⚕️', '200+', 'Certified Therapists'],
                ['⭐', '4.9 Rating', 'Average across platform'],
              ].map(([icon, num, label]) => (
                <div className="lp-stat-row" key={num}>
                  <span className="lp-stat-icon">{icon}</span>
                  <div>
                    <div className="lp-stat-num">{num}</div>
                    <div className="lp-stat-label">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee */}
          <div className="lp-marquee-wrap">
            <div className="lp-marquee-track">
              {['Anxiety & Stress','Depression Support','Relationship Counseling','Trauma & PTSD','Marriage Therapy','Child Psychology','Anger Management','Sleep Disorders',
                'Anxiety & Stress','Depression Support','Relationship Counseling','Trauma & PTSD','Marriage Therapy','Child Psychology','Anger Management','Sleep Disorders'].map((item, i) => (
                <div className="lp-marquee-item" key={i}>
                  <span className="lp-marquee-dot" />{item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT FORM PANEL ─────────────────────────────── */}
        <div className="lp-right">
          <motion.div
            className="lp-form-wrap"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Mobile logo */}
            <div className="lp-mobile-logo">
              <PsychoCareLogo size={36} />
              <span className="lp-mobile-logo-name">PsychoCare</span>
            </div>

            <div className="lp-card">
              <div className="lp-card-title">Welcome Back</div>
              <div className="lp-card-sub">Sign in to continue your healing journey</div>

              {/* Tabs */}
              <div className="lp-tabs">
                <button className={`lp-tab${tab === 'pw' ? ' active' : ''}`} onClick={() => setTab('pw')}>Password</button>
                <button className={`lp-tab${tab === 'otp' ? ' active' : ''}`} onClick={() => setTab('otp')}>OTP Login</button>
              </div>

              <AnimatePresence mode="wait">
                {tab === 'pw' ? (
                  <motion.form
                    key="pw"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={loginPw}
                  >
                    <div className="lp-field">
                      <label className="lp-label">Email Address</label>
                      <div className="lp-input-wrap">
                        <Mail size={16} className="lp-input-icon" />
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="lp-input" />
                      </div>
                    </div>
                    <div className="lp-field">
                      <label className="lp-label">Password</label>
                      <div className="lp-input-wrap">
                        <Lock size={16} className="lp-input-icon" />
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required className="lp-input" />
                      </div>
                    </div>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="lp-btn-primary"
                      whileHover={{ scale: loading ? 1 : 1.015 }}
                      whileTap={{ scale: loading ? 1 : 0.985 }}
                    >
                      {loading ? <div className="lp-spinner" /> : <><span>Sign In</span><ArrowRight size={16} /></>}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="otp"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={loginOtp}
                  >
                    <div className="lp-field">
                      <label className="lp-label">Email or Mobile</label>
                      <div className="lp-otp-row">
                        <div className="lp-input-wrap">
                          <Smartphone size={16} className="lp-input-icon" />
                          <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email or mobile number" required className="lp-input" />
                        </div>
                        <motion.button
                          type="button"
                          onClick={sendOtp}
                          disabled={loading}
                          className="lp-send-btn"
                          whileTap={{ scale: 0.97 }}
                        >
                          {otpSent ? 'Resend' : 'Send OTP'}
                        </motion.button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {otpSent && (
                        <motion.div
                          className="lp-field"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28 }}
                        >
                          <label className="lp-label">Enter OTP</label>
                          <input
                            type="text"
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            placeholder="——————"
                            maxLength={6}
                            required
                            className={`lp-input lp-input-otp`}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={!otpSent || loading}
                      className="lp-btn-primary"
                      whileHover={{ scale: (!otpSent || loading) ? 1 : 1.015 }}
                      whileTap={{ scale: (!otpSent || loading) ? 1 : 0.985 }}
                    >
                      {loading ? <div className="lp-spinner" /> : <><span>Verify & Login</span><ArrowRight size={16} /></>}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>

              <div className="lp-divider">
                <p className="lp-signup-text">
                  Don't have an account? <Link to="/signup">Sign Up Free</Link>
                </p>
                <div className="lp-links-row">
                  <Link to="/therapist/login">Therapist Login</Link>
                  <span className="lp-links-sep">|</span>
                  <Link to="/admin/login">Admin</Link>
                </div>
              </div>
            </div>

            {/* Trust strip */}
            <div className="lp-trust-strip">
              {[['🔐','Encrypted'], ['🏥','RCI Licensed'], ['📋','HIPAA Compliant']].map(([icon, label]) => (
                <div className="lp-trust-item" key={label}><span>{icon}</span>{label}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}