import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import {
  Calendar, Video, Wallet, ClipboardCheck, MessageSquare,
  Star, Heart, BookOpen, Users, Gift, User, FileText,
  Award, ArrowRight, Menu, X, ChevronDown, Bell, LogOut
} from 'lucide-react'

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

const NAV_LINKS = [
  { label: 'Book Session', to: '/user/book-session', icon: Calendar },
  { label: 'My Sessions', to: '/user/sessions', icon: Video },
  { label: 'Wallet', to: '/user/wallet', icon: Wallet },
  { label: 'Assessment', to: '/user/assessments', icon: ClipboardCheck },
  { label: 'Messages', to: '/user/messages', icon: MessageSquare },
  { label: 'Self Care', to: '/user/self-care', icon: Heart },
  { label: 'Knowledge', to: '/user/knowledge-center', icon: BookOpen },
  { label: 'Community', to: '/user/dashboard', icon: Users },
  { label: 'Refer & Earn', to: '/user/refer-earn', icon: Gift },
  { label: 'Profile', to: '/user/profile', icon: User },
  { label: 'Prescription', to: '/user/prescriptions', icon: FileText },
  { label: 'Rewards', to: '/user/rewards', icon: Award },
  { label: 'Reviews', to: '/user/feedback', icon: Star },
]

const CARDS = [
  { title: 'Book a Session', desc: 'Connect with a therapist', to: '/user/book-session', icon: Calendar, color: '#4A7A52' },
  { title: 'Online Sessions', desc: 'View your sessions', to: '/user/sessions', icon: Video, color: '#6B8FBF' },
  { title: 'Add Money', desc: 'Top up your wallet', to: '/user/wallet', icon: Wallet, color: '#3D7A5A' },
  { title: 'Assessment', desc: 'Take a self-assessment', to: '/user/assessments', icon: ClipboardCheck, color: '#5A7FA8' },
  { title: 'View Messages', desc: 'Check your inbox', to: '/user/messages', icon: MessageSquare, color: '#C9A96E' },
  { title: 'Give Review', desc: 'Share your feedback', to: '/user/feedback', icon: Star, color: '#B8854A' },
  { title: 'Self Care Tools', desc: 'Mood tracker & habits', to: '/user/self-care', icon: Heart, color: '#A0607A' },
  { title: 'Knowledge Center', desc: 'Blogs & videos', to: '/user/knowledge-center', icon: BookOpen, color: '#6E5FA0' },
  { title: 'Community', desc: 'Join our community', to: '/user/dashboard', icon: Users, color: '#8E4A6E' },
  { title: 'Refer & Earn', desc: 'Earn wallet credits', to: '/user/refer-earn', icon: Gift, color: '#C9A96E' },
  { title: 'Update Profile', desc: 'Manage your info', to: '/user/profile', icon: User, color: '#4A7A8E' },
  { title: 'Prescription', desc: 'View prescriptions', to: '/user/prescriptions', icon: FileText, color: '#3D7A6B' },
  { title: 'Rewards', desc: 'Claim your rewards', to: '/user/rewards', icon: Award, color: '#7A5F3D' },
]

export default function UserDashboard() {
  // ✅ FIX: logout function bhi liya authStore se
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdown, setProfileDropdown] = useState(false)

  // ✅ FIX: signout handler
  function handleSignOut() {
    logout()
    setProfileDropdown(false)
    navigate('/login')
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ud-root {
          min-height: 100vh;
          background: #F8F5EF;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── NAVBAR ── */
        .ud-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #1A1F2E;
          border-bottom: 1px solid rgba(139,175,142,0.15);
        }

        .ud-nav-inner {
          max-width: 90%;
          width: 90%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 20px;
          height: 64px;
        }

        /* Brand */
        .ud-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
          margin-right: 28px;
        }
        .ud-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          color: white;
          line-height: 1;
        }
        .ud-brand-sub {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #8BAF8E;
          margin-top: 2px;
        }

        /* Nav divider */
        .ud-nav-divider {
          width: 1px;
          height: 32px;
          background: rgba(139,175,142,0.2);
          margin-right: 20px;
          flex-shrink: 0;
        }

        /* Nav links scroll area */
        .ud-nav-links {
          display: none;
          align-items: center;
          gap: 4px;
          flex: 1;
          overflow-x: auto;
          scroll-behavior: smooth;
          scrollbar-width: none;
        }
        .ud-nav-links::-webkit-scrollbar { display: none; }
        @media (min-width: 768px) { .ud-nav-links { display: flex; } }

        .ud-nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          white-space: nowrap;
          flex-shrink: 0;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .ud-nav-link:hover { color: white; background: rgba(139,175,142,0.12); }
        .ud-nav-link.active { color: white; background: rgba(139,175,142,0.18); }
        .ud-nav-link svg { opacity: 0.7; flex-shrink: 0; }
        .ud-nav-link:hover svg, .ud-nav-link.active svg { opacity: 1; }

        /* Right side */
        .ud-nav-right {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: auto;
          flex-shrink: 0;
        }

        .ud-wallet-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background: rgba(201,169,110,0.12);
          border: 1px solid rgba(201,169,110,0.25);
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          color: #C9A96E;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          white-space: nowrap;
        }
        .ud-wallet-pill:hover { background: rgba(201,169,110,0.2); }

        .ud-icon-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          transition: all 0.2s;
        }
        .ud-icon-btn:hover { background: rgba(139,175,142,0.15); color: white; }

        /* Profile dropdown */
        .ud-profile-wrap { position: relative; }
        .ud-profile-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px 6px 6px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s;
          color: white;
          font-family: 'DM Sans', sans-serif;
        }
        .ud-profile-btn:hover { background: rgba(139,175,142,0.15); border-color: rgba(139,175,142,0.3); }
        .ud-avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8BAF8E, #4A7A52);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: white;
          font-family: 'Cormorant Garamond', serif;
        }
        .ud-profile-name {
          font-size: 13px; font-weight: 500;
          max-width: 90px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .ud-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: #1A1F2E;
          border: 1px solid rgba(139,175,142,0.18);
          border-radius: 14px;
          padding: 8px;
          min-width: 180px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
        }
        .ud-dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 13px;
          color: rgba(255,255,255,0.65);
          cursor: pointer;
          transition: all 0.15s;
          text-decoration: none;
          width: 100%;
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
          text-align: left;
        }
        .ud-dropdown-item:hover { background: rgba(139,175,142,0.12); color: white; }
        .ud-dropdown-item.danger:hover { background: rgba(220,80,80,0.12); color: #FF8080; }
        .ud-dropdown-sep { height: 1px; background: rgba(255,255,255,0.07); margin: 6px 0; }

        /* Mobile menu btn */
        .ud-hamburger {
          display: flex;
          align-items: center; justify-content: center;
          width: 36px; height: 36px;
          background: none; border: none;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
        }
        @media (min-width: 768px) { .ud-hamburger { display: none; } }

        /* Mobile drawer */
        .ud-mobile-drawer {
          display: block;
          position: fixed;
          top: 64px; left: 0; right: 0; bottom: 0;
          background: #1A1F2E;
          z-index: 99;
          overflow-y: auto;
          padding: 16px;
        }
        .ud-mobile-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
          width: 100%;
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
          text-align: left;
        }
        .ud-mobile-link:hover { background: rgba(139,175,142,0.12); color: white; }

        /* ── MARQUEE ── */
        .ud-marquee-wrap {
          background: #222b27;
          border-bottom: 1px solid rgba(139,175,142,0.2);
          padding: 9px 0;
          overflow: hidden;
        }
        .ud-marquee-track {
          display: flex; gap: 36px; white-space: nowrap;
          animation: udMarquee 22s linear infinite;
        }
        .ud-marquee-item {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; color: #e6eee8;
          font-family: 'Cormorant Garamond', serif; letter-spacing: 0.5px;
        }
        .ud-marquee-dot { width: 4px; height: 4px; background: #8BAF8E; border-radius: 50%; flex-shrink: 0; }
        @keyframes udMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* ── MAIN ── */
        .ud-main {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 28px 60px;
        }

        /* Hero welcome */
        .ud-hero {
          margin-bottom: 36px;
          position: relative;
        }
        .ud-hero-bg {
          position: absolute;
          inset: -20px -28px;
          background: radial-gradient(ellipse at 80% 50%, rgba(139,175,142,0.1) 0%, transparent 60%);
          pointer-events: none;
        }
        .ud-greeting {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-weight: 400;
          color: #8BAF8E;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .ud-welcome-name {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 700;
          color: #1A1F2E;
          line-height: 1.1;
          margin-bottom: 8px;
        }
        .ud-welcome-name em { font-style: italic; color: #4A7A52; }
        .ud-welcome-sub {
          font-size: 15px;
          color: #7A8090;
          font-weight: 300;
        }

        /* Stats row */
        .ud-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 36px;
        }
        @media (max-width: 640px) { .ud-stats { grid-template-columns: 1fr; } }

        .ud-stat-card {
          background: white;
          border-radius: 20px;
          padding: 22px 24px;
          border: 1px solid rgba(26,31,46,0.07);
          box-shadow: 0 4px 20px rgba(26,31,46,0.05);
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .ud-stat-icon {
          width: 48px; height: 48px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ud-stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #1A1F2E;
          line-height: 1;
          margin-bottom: 3px;
        }
        .ud-stat-label {
          font-size: 13px;
          color: #7A8090;
          font-weight: 400;
        }

        /* Section title */
        .ud-section-head {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 20px;
        }
        .ud-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #1A1F2E;
        }
        .ud-section-sub {
          font-size: 13px;
          color: #7A8090;
          font-weight: 300;
        }

        /* Cards grid */
        .ud-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }
        @media (max-width: 480px) { .ud-grid { grid-template-columns: repeat(2, 1fr); } }

        /* Card */
        .ud-card {
          background: white;
          border-radius: 20px;
          padding: 24px 22px;
          border: 1px solid rgba(26,31,46,0.07);
          box-shadow: 0 4px 20px rgba(26,31,46,0.04);
          cursor: pointer;
          transition: all 0.25s;
          position: relative;
          overflow: hidden;
        }
        .ud-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.25s;
          background: var(--card-color, #8BAF8E);
          border-radius: inherit;
        }
        .ud-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(26,31,46,0.1);
          border-color: var(--card-color, #8BAF8E);
        }
        .ud-card:hover::before { opacity: 0.04; }

        .ud-card-icon-wrap {
          width: 46px; height: 46px;
          border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
          flex-shrink: 0;
        }
        .ud-card-title {
          font-size: 15px;
          font-weight: 600;
          color: #1A1F2E;
          margin-bottom: 4px;
          transition: color 0.2s;
        }
        .ud-card:hover .ud-card-title { color: var(--card-color, #4A7A52); }
        .ud-card-desc {
          font-size: 12px;
          color: #7A8090;
          font-weight: 300;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .ud-card-action {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          color: #B0B5BF;
          transition: color 0.2s, gap 0.2s;
          letter-spacing: 0.3px;
        }
        .ud-card:hover .ud-card-action { color: var(--card-color, #4A7A52); gap: 8px; }

        @media (max-width: 767px) {
          .ud-marquee-wrap { display: none; }
          .ud-main { padding: 20px 16px 40px; }
          .ud-nav-inner { padding: 0 10px; max-width: 100%; width: 100%; }
          .ud-grid { grid-template-columns: 1fr; }
          .ud-brand { margin-right: 16px; }
          .ud-nav-divider { margin-right: 10px; }
          .ud-welcome-name { font-size: 28px; }
          .ud-hero-bg { inset: -10px -16px; }
          .ud-stat-card { padding: 18px 20px; }
          .ud-card { padding: 20px 18px; }
          .ud-brand-name { font-size: 20px; }
          .ud-section-title { font-size: 20px; }
          .ud-stat-icon { width: 40px; height: 40px; }
          .ud-stat-value { font-size: 24px; }
          .ud-card-icon-wrap { width: 40px; height: 40px; }
          .ud-nav-right { gap: 6px; }
          .ud-wallet-pill { display: none; }
          .ud-profile-name { display: none; }
          .ud-icon-btn { display: none; }
        }
      `}</style>

      <div className="ud-root">

        {/* ── NAVBAR ── */}
        <nav className="ud-nav">
          <div className="ud-nav-inner">

            {/* Brand */}
            <Link to="/user/dashboard" className="ud-brand">
              <PsychoCareLogo size={36} />
              <div>
                <div className="ud-brand-name">PsychoCare</div>
                <div className="ud-brand-sub">Mental Health</div>
              </div>
            </Link>

            <div className="ud-nav-divider" />

            {/* Nav links — scrollable */}
            <div className="ud-nav-links">
              {NAV_LINKS.map(({ label, to, icon: Icon }) => (
                <button
                  key={to}
                  className={`ud-nav-link${location.pathname === to ? ' active' : ''}`}
                  onClick={() => navigate(to)}
                >
                  <Icon size={13} />
                  {label}
                </button>
              ))}
            </div>

            {/* Right: wallet + bell + profile */}
            <div className="ud-nav-right">
              <Link to="/user/wallet" className="ud-wallet-pill">
                <Wallet size={13} />
                ₹{(user?.walletBalance || 0).toFixed(2)}
              </Link>

              <div className="ud-icon-btn">
                <Bell size={15} />
              </div>

              {/* Profile dropdown */}
              <div className="ud-profile-wrap">
                <button
                  className="ud-profile-btn"
                  onClick={() => setProfileDropdown(v => !v)}
                >
                  <div className="ud-avatar">
                    {(user?.firstName?.[0] || 'U').toUpperCase()}
                  </div>
                  <span className="ud-profile-name">{user?.firstName || 'User'}</span>
                  <ChevronDown size={13} style={{ opacity: 0.5 }} />
                </button>

                <AnimatePresence>
                  {profileDropdown && (
                    <motion.div
                      className="ud-dropdown"
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Link to="/user/profile" className="ud-dropdown-item" onClick={() => setProfileDropdown(false)}>
                        <User size={14} /> My Profile
                      </Link>
                      <Link to="/user/rewards" className="ud-dropdown-item" onClick={() => setProfileDropdown(false)}>
                        <Award size={14} /> Rewards
                      </Link>
                      <Link to="/user/refer-earn" className="ud-dropdown-item" onClick={() => setProfileDropdown(false)}>
                        <Gift size={14} /> Refer & Earn
                      </Link>
                      <div className="ud-dropdown-sep" />

                      {/* ✅ FIX: onClick handler add kiya */}
                      <button
                        className="ud-dropdown-item danger"
                        onClick={handleSignOut}
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Hamburger */}
              <button className="ud-hamburger" onClick={() => setMobileMenuOpen(v => !v)}>
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="ud-mobile-drawer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {NAV_LINKS.map(({ label, to, icon: Icon }) => (
                <button
                  key={to}
                  className="ud-mobile-link"
                  onClick={() => { navigate(to); setMobileMenuOpen(false) }}
                >
                  <Icon size={16} style={{ color: '#8BAF8E' }} />
                  {label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Marquee */}
        <div className="ud-marquee-wrap">
          <div className="ud-marquee-track">
            {['Anxiety & Stress','Depression Support','Relationship Counseling','Trauma & PTSD','Marriage Therapy','Child Psychology','Anger Management','OCD & Phobias',
              'Anxiety & Stress','Depression Support','Relationship Counseling','Trauma & PTSD','Marriage Therapy','Child Psychology','Anger Management','OCD & Phobias'].map((item, i) => (
              <div className="ud-marquee-item" key={i}><span className="ud-marquee-dot" />{item}</div>
            ))}
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <main className="ud-main">

          {/* Welcome Hero */}
          <motion.div
            className="ud-hero"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="ud-hero-bg" />
            <div className="ud-greeting">Good to see you again</div>
            <div className="ud-welcome-name">
              Welcome back, <em>{user?.firstName || 'Friend'}</em>
            </div>
            <div className="ud-welcome-sub">Your mental health journey continues here</div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="ud-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {[
              { icon: Video, bg: '#EDF3EE', color: '#4A7A52', value: '0', label: 'Sessions Completed' },
              { icon: Award, bg: '#FAF5EA', color: '#C9A96E', value: '0', label: 'Reward Points' },
              { icon: Heart, bg: '#FDF0F5', color: '#A0607A', value: 'Good', label: 'Wellness Score' },
            ].map(({ icon: Icon, bg, color, value, label }) => (
              <div className="ud-stat-card" key={label}>
                <div className="ud-stat-icon" style={{ background: bg }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <div>
                  <div className="ud-stat-value">{value}</div>
                  <div className="ud-stat-label">{label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Services section */}
          <div className="ud-section-head">
            <div className="ud-section-title">All Services</div>
            <div className="ud-section-sub">Everything you need in one place</div>
          </div>

          <motion.div
            className="ud-grid"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
            }}
          >
            {CARDS.map((card) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.title}
                  variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                  className="ud-card"
                  style={{ '--card-color': card.color } as React.CSSProperties}
                  onClick={() => navigate(card.to)}
                >
                  <div className="ud-card-icon-wrap" style={{ background: card.color + '18' }}>
                    <Icon size={20} style={{ color: card.color }} />
                  </div>
                  <div className="ud-card-title">{card.title}</div>
                  <div className="ud-card-desc">{card.desc}</div>
                  <div className="ud-card-action">
                    Get Started <ArrowRight size={12} />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

        </main>
      </div>
    </>
  )
}







