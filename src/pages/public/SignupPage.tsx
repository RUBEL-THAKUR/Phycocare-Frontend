import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { authApi } from '../../api'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'
import { User, Mail, Phone, Lock, Gift, ArrowRight } from 'lucide-react'

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

export default function SignupPage() {
  const [f, setF] = useState({
    firstName: '', lastName: '', emailId: '',
    mobileNumber: '', username: '', password: '', referralCode: ''
  })
  const [loading, setLoading] = useState(false)
  const { setUserAuth } = useAuthStore()
  const navigate = useNavigate()

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF(p => ({ ...p, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authApi.signup(f)
      const d = res.data.data
      setUserAuth(d.token, d)
      toast.success('Account created!')
      navigate('/user/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Signup failed')
    } finally { setLoading(false) }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .sp-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #F8F5EF;
          overflow: hidden;
        }

        /* ── Left panel ── */
        .sp-left {
          display: none;
          position: relative;
          overflow: hidden;
          background: #1A1F2E;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 60px;
        }
        @media (min-width: 1024px) { .sp-left { display: flex; flex: 1; } }

        .sp-glow-1 { position:absolute; width:500px; height:500px; background:radial-gradient(ellipse, rgba(139,175,142,0.16) 0%, transparent 65%); top:-120px; left:-120px; pointer-events:none; }
        .sp-glow-2 { position:absolute; width:320px; height:320px; background:radial-gradient(ellipse, rgba(201,169,110,0.09) 0%, transparent 65%); bottom:-60px; right:-60px; pointer-events:none; }
        .sp-glow-3 { position:absolute; width:260px; height:260px; background:radial-gradient(ellipse, rgba(139,175,142,0.08) 0%, transparent 65%); bottom:160px; left:40px; pointer-events:none; }

        .sp-brand { position:relative; z-index:1; max-width:420px; }
        .sp-logo-row { display:flex; align-items:center; gap:14px; margin-bottom:44px; }
        .sp-brand-name { font-family:'Cormorant Garamond',serif; font-size:40px; font-weight:600; color:white; line-height:1; }
        .sp-brand-sub { font-size:10px; letter-spacing:2.5px; text-transform:uppercase; color:#8BAF8E; margin-top:3px; }

        .sp-tagline { font-family:'Playfair Display',serif; font-size:34px; font-weight:700; color:white; line-height:1.2; margin-bottom:18px; }
        .sp-tagline em { font-style:italic; color:#B8D4BB; }
        .sp-desc { font-size:15px; color:rgba(255,255,255,0.45); line-height:1.75; font-weight:300; margin-bottom:44px; }

        /* Feature list */
        .sp-features { display:flex; flex-direction:column; gap:14px; }
        .sp-feat {
          display:flex; align-items:center; gap:14px;
          padding:14px 18px;
          background:rgba(139,175,142,0.07);
          border:1px solid rgba(139,175,142,0.13);
          border-radius:14px;
        }
        .sp-feat-icon { font-size:20px; flex-shrink:0; }
        .sp-feat-text { font-size:14px; color:rgba(255,255,255,0.7); line-height:1.4; }
        .sp-feat-text strong { color:white; font-weight:500; display:block; font-size:13px; }

        /* Marquee */
        .sp-marquee-wrap { position:absolute; bottom:0; left:0; right:0; padding:13px 0; background:rgba(139,175,142,0.06); border-top:1px solid rgba(139,175,142,0.1); overflow:hidden; }
        .sp-marquee-track { display:flex; gap:40px; white-space:nowrap; animation:spMarquee 22s linear infinite; }
        .sp-marquee-item { display:flex; align-items:center; gap:10px; font-size:12px; color:rgba(255,255,255,0.35); font-family:'Cormorant Garamond',serif; letter-spacing:0.5px; }
        .sp-marquee-dot { width:4px; height:4px; background:#8BAF8E; border-radius:50%; flex-shrink:0; }
        @keyframes spMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* ── Right panel ── */
        .sp-right {
          flex:1; display:flex; align-items:center; justify-content:center;
          padding: 32px 24px;
          background:#F8F5EF;
          position:relative;

          overflow-y: auto;
          scrollbar-width: none;  /* Firefox */
        }
        /* .sp-right::before { content:''; position:absolute; width:500px; height:500px; background:radial-gradient(ellipse, rgba(139,175,142,0.11) 0%, transparent 65%); top:-120px; right:-120px; pointer-events:none; } */
        .sp-right::after  { content:''; position:absolute; width:350px; height:350px; background:radial-gradient(ellipse, rgba(201,169,110,0.07) 0%, transparent 65%); bottom:-80px; left:-80px; pointer-events:none; }

        .sp-form-wrap { position:relative; z-index:1; width:100%; max-width:460px; padding: 8px 0; }

        /* Mobile logo */
        .sp-mobile-logo { display:flex; align-items:center; justify-content:center; gap:10px; margin-bottom:28px; }
        @media(min-width:1024px){ .sp-mobile-logo { display:none; } }
        .sp-mobile-name { font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:600; color:#1A1F2E; }

        /* Card */
        .sp-card {
          background:white;
          border-radius:28px;
          padding:40px 38px;
          border:1px solid rgba(26,31,46,0.07);
          box-shadow:0 20px 60px rgba(26,31,46,0.08), 0 4px 16px rgba(26,31,46,0.04);
        }
        .sp-title { font-family:'Playfair Display',serif; font-size:26px; font-weight:700; color:#1A1F2E; margin-bottom:4px; }
        .sp-subtitle { font-size:14px; color:#7A8090; font-weight:300; margin-bottom:26px; }

        /* Step indicator */
        .sp-step-row { display:flex; align-items:center; gap:8px; margin-bottom:26px; }
        .sp-step-item { display:flex; align-items:center; gap:8px; }
        .sp-step-dot { width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:600; }
        .sp-step-dot.done { background:linear-gradient(135deg,#8BAF8E,#4A7A52); color:white; }
        .sp-step-dot.active { background:#1A1F2E; color:white; }
        .sp-step-dot.inactive { background:rgba(26,31,46,0.07); color:#7A8090; }
        .sp-step-line { flex:1; height:1px; background:rgba(26,31,46,0.1); }

        /* Grid */
        .sp-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }

        /* Field */
        .sp-field { margin-bottom:16px; }
        .sp-label { display:block; font-size:13px; font-weight:500; color:#3D4454; margin-bottom:7px; letter-spacing:0.2px; }
        .sp-label-opt { color:#B0B5BF; font-weight:400; font-size:11px; margin-left:4px; }

        .sp-input-wrap { position:relative; }
        .sp-icon { position:absolute; left:13px; top:50%; transform:translateY(-50%); color:#8BAF8E; pointer-events:none; }
        .sp-at { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:#8BAF8E; font-size:15px; font-weight:500; pointer-events:none; }

        .sp-input {
          width:100%; padding:12px 14px 12px 42px;
          border-radius:12px;
          border:1.5px solid rgba(26,31,46,0.1);
          background:#FDFAF5;
          font-size:14px; color:#1A1F2E;
          font-family:'DM Sans',sans-serif;
          transition:border-color 0.2s, box-shadow 0.2s;
          outline:none;
        }
        .sp-input::placeholder { color:#B8BDC7; }
        .sp-input:focus { border-color:#8BAF8E; box-shadow:0 0 0 3px rgba(139,175,142,0.14); }
        .sp-input.gold-border { border-color:rgba(201,169,110,0.25); }
        .sp-input.gold-border:focus { border-color:#C9A96E; box-shadow:0 0 0 3px rgba(201,169,110,0.12); }

        /* Submit */
        .sp-btn {
          width:100%; display:flex; align-items:center; justify-content:center; gap:8px;
          padding:15px; border-radius:14px; border:none;
          background:#1A1F2E; color:white;
          font-size:15px; font-weight:500; font-family:'DM Sans',sans-serif;
          cursor:pointer; transition:all 0.25s; margin-top:22px; letter-spacing:0.2px;
        }
        .sp-btn:hover:not(:disabled) { background:#4A7A52; box-shadow:0 12px 30px rgba(74,122,82,0.25); transform:translateY(-1px); }
        .sp-btn:disabled { opacity:0.6; cursor:not-allowed; }

        .sp-spinner { width:18px; height:18px; border:2px solid rgba(255,255,255,0.25); border-top-color:white; border-radius:50%; animation:spSpin 0.7s linear infinite; }
        @keyframes spSpin { to{transform:rotate(360deg)} }

        /* Footer */
        .sp-footer { margin-top:24px; padding-top:20px; border-top:1px solid rgba(26,31,46,0.07); text-align:center; font-size:14px; color:#7A8090; }
        .sp-footer a { color:#4A7A52; font-weight:600; text-decoration:none; transition:color 0.2s; }
        .sp-footer a:hover { color:#8BAF8E; }

        /* Trust strip */
        .sp-trust { display:flex; justify-content:center; gap:22px; margin-top:20px; flex-wrap:wrap; }
        .sp-trust-item { display:flex; align-items:center; gap:5px; font-size:12px; color:#7A8090; }

        /* Referral highlight box */
        .sp-referral-box {
          background:linear-gradient(135deg, rgba(201,169,110,0.07), rgba(232,201,138,0.05));
          border:1px solid rgba(201,169,110,0.22);
          border-radius:12px; padding:2px;
        }
        .sp-referral-box .sp-input { background:transparent; border:none; box-shadow:none !important; }
        .sp-referral-box .sp-icon { color:#C9A96E; }

        @media (max-width: 767px) {
          .sp-right { padding: 16px 12px; }
          .sp-card { padding: 20px 20px; }
          .sp-grid-2 { grid-template-columns: 1fr; }
          .sp-form-wrap { max-width: 100%; }
          .sp-trust { gap: 10px; flex-direction: column; align-items: center; }
          .sp-marquee-wrap { display: none; }
        }
      `}</style>

      <div className="sp-root">

        {/* ── LEFT BRAND PANEL ── */}
        <div className="sp-left">
          <div className="sp-glow-1" /><div className="sp-glow-2" /><div className="sp-glow-3" />

          <div className="sp-brand">
            <div className="sp-logo-row">
              <PsychoCareLogo size={50} />
              <div>
                <div className="sp-brand-name">PsychoCare</div>
                <div className="sp-brand-sub">Mental Health Platform</div>
              </div>
            </div>

            <h2 className="sp-tagline">Begin Your<br /><em>Healing Journey</em></h2>
            <p className="sp-desc">Join 50,000+ people across India who chose to invest in their mental health. Your first session is on us.</p>

            <div className="sp-features">
              {[
                ['🔒', 'Completely Private', '100% confidential — end-to-end encrypted sessions'],
                ['🤝', 'Perfect Match', 'AI matches you with the right therapist in minutes'],
                ['📱', 'Anywhere, Anytime', 'Video, audio, or chat — on your schedule'],
                ['🎁', 'Free First Session', 'Start your journey with no commitment'],
              ].map(([icon, title, desc]) => (
                <div className="sp-feat" key={title as string}>
                  <span className="sp-feat-icon">{icon}</span>
                  <div className="sp-feat-text">
                    <strong>{title as string}</strong>
                    {desc as string}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sp-marquee-wrap">
            <div className="sp-marquee-track">
              {['Anxiety & Stress','Depression Support','Relationship Counseling','Trauma & PTSD','Marriage Therapy','Child Psychology','Anger Management','OCD & Phobias',
                'Anxiety & Stress','Depression Support','Relationship Counseling','Trauma & PTSD','Marriage Therapy','Child Psychology','Anger Management','OCD & Phobias'].map((item, i) => (
                <div className="sp-marquee-item" key={i}><span className="sp-marquee-dot" />{item}</div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT FORM PANEL ── */}
        <div className="sp-right">
          <motion.div
            className="sp-form-wrap"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Mobile logo */}
            <div className="sp-mobile-logo">
              <PsychoCareLogo size={34} />
              <span className="sp-mobile-name">PsychoCare</span>
            </div>

            <div className="sp-card">
              <div className="sp-title">Create Account</div>
              <div className="sp-subtitle">Start your mental wellness journey today</div>

              <form onSubmit={submit}>
                {/* Name row */}
                <div className="sp-grid-2">
                  <div className="sp-field">
                    <label className="sp-label">First Name</label>
                    <div className="sp-input-wrap">
                      <User size={15} className="sp-icon" />
                      <input type="text" value={f.firstName} onChange={set('firstName')} placeholder="John" required className="sp-input" />
                    </div>
                  </div>
                  <div className="sp-field">
                    <label className="sp-label">Last Name</label>
                    <div className="sp-input-wrap">
                      <User size={15} className="sp-icon" />
                      <input type="text" value={f.lastName} onChange={set('lastName')} placeholder="Doe" required className="sp-input" />
                    </div>
                  </div>
                </div>

                <div className="sp-field">
                  <label className="sp-label">Email Address</label>
                  <div className="sp-input-wrap">
                    <Mail size={16} className="sp-icon" />
                    <input type="email" value={f.emailId} onChange={set('emailId')} placeholder="you@example.com" required className="sp-input" />
                  </div>
                </div>

                <div className="sp-field">
                  <label className="sp-label">Mobile Number</label>
                  <div className="sp-input-wrap">
                    <Phone size={16} className="sp-icon" />
                    <input type="tel" value={f.mobileNumber} onChange={set('mobileNumber')} placeholder="10-digit mobile number" className="sp-input" />
                  </div>
                </div>

                <div className="sp-grid-2">
                  <div className="sp-field">
                    <label className="sp-label">Username</label>
                    <div className="sp-input-wrap">
                      <span className="sp-at">@</span>
                      <input type="text" value={f.username} onChange={set('username')} placeholder="username" required className="sp-input" />
                    </div>
                  </div>
                  <div className="sp-field">
                    <label className="sp-label">Password</label>
                    <div className="sp-input-wrap">
                      <Lock size={16} className="sp-icon" />
                      <input type="password" value={f.password} onChange={set('password')} placeholder="Secure password" required className="sp-input" />
                    </div>
                  </div>
                </div>

                {/* Referral — gold accent */}
                <div className="sp-field">
                  <label className="sp-label">Referral Code <span className="sp-label-opt">(optional)</span></label>
                  <div className="sp-referral-box">
                    <div className="sp-input-wrap">
                      <Gift size={16} className="sp-icon" />
                      <input type="text" value={f.referralCode} onChange={set('referralCode')} placeholder="Enter referral code for bonus" className="sp-input" />
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="sp-btn"
                  whileHover={{ scale: loading ? 1 : 1.015 }}
                  whileTap={{ scale: loading ? 1 : 0.985 }}
                >
                  {loading
                    ? <div className="sp-spinner" />
                    : <><span>Create Account</span><ArrowRight size={16} /></>
                  }
                </motion.button>
              </form>

              <div className="sp-footer">
                Already have an account? <Link to="/login">Sign In</Link>
              </div>
            </div>

            {/* Trust strip */}
            <div className="sp-trust">
              {[['🔐','Encrypted'],['🏥','RCI Licensed'],['📋','HIPAA Compliant'],['🇮🇳','Made in India']].map(([icon, label]) => (
                <div className="sp-trust-item" key={label}><span>{icon}</span>{label}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}