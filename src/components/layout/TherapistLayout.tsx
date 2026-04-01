// import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useAuthStore } from '../../store/authStore'
// import {
//   LayoutDashboard,
//   Video,
//   User,
//   FileText,
//   LogOut,
//   Stethoscope,
//   ChevronRight
// } from 'lucide-react'
//
// const NAV = [
//   { to: '/therapist/dashboard', label: 'Dashboard', icon: LayoutDashboard },
//   { to: '/therapist/sessions', label: 'My Sessions', icon: Video },
//   { to: '/therapist/profile', label: 'Profile & Onboarding', icon: User },
//   { to: '/therapist/prescriptions', label: 'Prescriptions', icon: FileText },
// ]
//
// export default function TherapistLayout() {
//   const { therapist, logout } = useAuthStore()
//   const navigate = useNavigate()
//   const location = useLocation()
//
//   return (
//     <div className="flex h-screen overflow-hidden bg-dark-900">
//       {/* Sidebar */}
//       <aside className="w-64 bg-dark-800/50 backdrop-blur-xl border-r border-white/5 flex flex-col flex-shrink-0">
//         {/* Logo */}
//         <div className="p-5 border-b border-white/5">
//           <div className="flex items-center gap-2">
//             <Stethoscope className="w-7 h-7 text-accent-cyan" />
//             <div>
//               <div className="text-xl font-bold text-gradient">PsychoCare</div>
//               <div className="text-[10px] text-text-muted uppercase tracking-wider">Therapist Portal</div>
//             </div>
//           </div>
//         </div>
//
//         {/* User Profile */}
//         <div className="p-4 border-b border-white/5">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0"
//               style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' }}>
//               {therapist?.firstName?.[0]}{therapist?.lastName?.[0]}
//             </div>
//             <div className="overflow-hidden flex-1">
//               <div className="text-sm font-semibold text-white truncate">
//                 {therapist?.firstName} {therapist?.lastName}
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//                 <span className="text-xs text-green-400 font-medium">Active Therapist</span>
//               </div>
//             </div>
//           </div>
//         </div>
//
//         {/* Navigation */}
//         <nav className="flex-1 p-3 overflow-y-auto">
//           <div className="space-y-1">
//             {NAV.map((item) => {
//               const Icon = item.icon
//               const isActive = location.pathname === item.to
//
//               return (
//                 <NavLink
//                   key={item.to}
//                   to={item.to}
//                   className="block"
//                 >
//                   <motion.div
//                     whileHover={{ x: 4 }}
//                     className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
//                       isActive
//                         ? 'bg-gradient-to-r from-accent-cyan/20 to-accent-blue/10 text-white font-medium'
//                         : 'text-text-secondary hover:text-white hover:bg-white/5'
//                     }`}
//                   >
//                     {isActive && (
//                       <motion.div
//                         layoutId="therapistActiveIndicator"
//                         className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
//                         style={{ background: 'linear-gradient(180deg, #06b6d4 0%, #3b82f6 100%)' }}
//                       />
//                     )}
//                     <Icon className={`w-4 h-4 ${isActive ? 'text-accent-cyan' : ''}`} />
//                     <span className="flex-1">{item.label}</span>
//                     {isActive && <ChevronRight className="w-3 h-3 text-accent-cyan" />}
//                   </motion.div>
//                 </NavLink>
//               )
//             })}
//           </div>
//         </nav>
//
//         {/* Logout Button */}
//         <div className="p-4 border-t border-white/5">
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => {
//               logout()
//               navigate('/therapist/login')
//             }}
//             className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/10 text-red-400 font-medium text-sm hover:from-red-500/30 hover:to-red-600/20 transition-all border border-red-500/20"
//           >
//             <LogOut className="w-4 h-4" />
//             Logout
//           </motion.button>
//         </div>
//       </aside>
//
//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto">
//         <div className="p-6 lg:p-8">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={location.pathname}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.2 }}
//             >
//               <Outlet />
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </main>
//     </div>
//   )
// }

import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import { useState } from 'react'
import {
  LayoutDashboard, Video, User, FileText, LogOut,
  ChevronDown, Bell, Menu, X
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
  { label: 'Dashboard', to: '/therapist/dashboard', icon: LayoutDashboard },
  { label: 'My Sessions', to: '/therapist/sessions', icon: Video },
  { label: 'Profile & Onboarding', to: '/therapist/profile', icon: User },
  { label: 'Prescriptions', to: '/therapist/prescriptions', icon: FileText },
]

export default function TherapistLayout() {
  const { therapist, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdown, setProfileDropdown] = useState(false)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .tlay-root { min-height: 100vh; background: #F8F5EF; font-family: 'DM Sans', sans-serif; }

        /* ── NAVBAR ── */
        .tlay-nav {
          position: sticky; top: 0; z-index: 100;
          background: #1A1F2E;
          border-bottom: 1px solid rgba(139,175,142,0.15);
        }
        .tlay-nav-inner {
          max-width: 90%; width: 90%; margin: 0 auto;
          display: flex; align-items: center; gap: 8px;
          padding: 0 20px; height: 64px;
        }

        .tlay-brand {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0; margin-right: 28px; cursor: pointer;
        }
        .tlay-brand-name { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: white; line-height: 1; }
        .tlay-brand-sub { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: #8BAF8E; margin-top: 2px; }

        .tlay-nav-divider { width: 1px; height: 32px; background: rgba(139,175,142,0.2); margin-right: 20px; flex-shrink: 0; }

        .tlay-nav-links {
          display: none; align-items: center; gap: 4px; flex: 1;
          overflow-x: auto; scroll-behavior: smooth; scrollbar-width: none;
        }
        .tlay-nav-links::-webkit-scrollbar { display: none; }
        @media (min-width: 768px) { .tlay-nav-links { display: flex; } }

        .tlay-nav-link {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 12px; border-radius: 10px;
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.55);
          white-space: nowrap; flex-shrink: 0;
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .tlay-nav-link:hover { color: white; background: rgba(139,175,142,0.12); }
        .tlay-nav-link.active { color: white; background: rgba(139,175,142,0.18); }
        .tlay-nav-link svg { opacity: 0.7; flex-shrink: 0; }
        .tlay-nav-link:hover svg, .tlay-nav-link.active svg { opacity: 1; }

        /* Active indicator dot */
        .tlay-nav-link.active::before {
          content: '';
          display: inline-block;
          width: 5px; height: 5px;
          background: #8BAF8E;
          border-radius: 50%;
          margin-right: 4px;
          flex-shrink: 0;
        }

        .tlay-nav-right { display: flex; align-items: center; gap: 10px; margin-left: auto; flex-shrink: 0; }

        /* Online badge */
        .tlay-online-pill {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 12px;
          background: rgba(74,122,82,0.15);
          border: 1px solid rgba(139,175,142,0.25);
          border-radius: 20px;
          font-size: 12px; font-weight: 500; color: #8BAF8E;
          white-space: nowrap;
        }
        .tlay-online-dot { width: 7px; height: 7px; border-radius: 50%; background: #4A7A52; animation: tlayPulse 2s infinite; }
        @keyframes tlayPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .tlay-icon-btn {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.6); cursor: pointer; transition: all 0.2s;
        }
        .tlay-icon-btn:hover { background: rgba(139,175,142,0.15); color: white; }

        .tlay-profile-wrap { position: relative; }
        .tlay-profile-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 12px 6px 6px;
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px; cursor: pointer; transition: all 0.2s; color: white;
          font-family: 'DM Sans', sans-serif;
        }
        .tlay-profile-btn:hover { background: rgba(139,175,142,0.15); border-color: rgba(139,175,142,0.3); }
        .tlay-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          background: linear-gradient(135deg, #8BAF8E, #4A7A52);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: white;
          font-family: 'Cormorant Garamond', serif;
        }
        .tlay-profile-name { font-size: 13px; font-weight: 500; max-width: 90px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        .tlay-dropdown {
          position: absolute; top: calc(100% + 8px); right: 0;
          background: #1A1F2E; border: 1px solid rgba(139,175,142,0.18);
          border-radius: 14px; padding: 8px; min-width: 180px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
        }
        .tlay-dropdown-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 10px;
          font-size: 13px; color: rgba(255,255,255,0.65);
          cursor: pointer; transition: all 0.15s;
          text-decoration: none; background: none; border: none;
          width: 100%; font-family: 'DM Sans', sans-serif;
        }
        .tlay-dropdown-item:hover { background: rgba(139,175,142,0.12); color: white; }
        .tlay-dropdown-item.danger:hover { background: rgba(220,80,80,0.12); color: #FF8080; }
        .tlay-dropdown-sep { height: 1px; background: rgba(255,255,255,0.07); margin: 6px 0; }

        .tlay-hamburger {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; background: none; border: none;
          color: rgba(255,255,255,0.7); cursor: pointer;
        }
        @media (min-width: 768px) { .tlay-hamburger { display: none; } }

        /* Mobile drawer */
        .tlay-mobile-drawer {
          position: fixed; top: 64px; left: 0; right: 0; bottom: 0;
          background: #1A1F2E; z-index: 99; overflow-y: auto; padding: 16px;
        }
        .tlay-mobile-link {
          display: flex; align-items: center; gap: 12px;
          padding: 13px 16px; border-radius: 12px;
          font-size: 14px; font-weight: 500;
          color: rgba(255,255,255,0.65);
          background: none; border: none; width: 100%; font-family: 'DM Sans', sans-serif;
          text-align: left; cursor: pointer; transition: all 0.2s;
        }
        .tlay-mobile-link:hover { background: rgba(139,175,142,0.12); color: white; }

        /* Marquee */
        .tlay-marquee-wrap {
          background: #1e2a22;
          border-bottom: 1px solid rgba(139,175,142,0.2);
          padding: 9px 0; overflow: hidden;
        }
        .tlay-marquee-track { display: flex; gap: 36px; white-space: nowrap; animation: tlayMarquee 22s linear infinite; }
        .tlay-marquee-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #e6eee8; font-family: 'Cormorant Garamond', serif; letter-spacing: 0.5px; }
        .tlay-marquee-dot { width: 4px; height: 4px; background: #8BAF8E; border-radius: 50%; flex-shrink: 0; }
        @keyframes tlayMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* Main */
        .tlay-main { max-width: 1400px; margin: 0 auto; padding: 40px 28px 60px; }
      `}</style>

      <div className="tlay-root">
        {/* NAVBAR */}
        <nav className="tlay-nav">
          <div className="tlay-nav-inner">
            <div className="tlay-brand" onClick={() => navigate('/therapist/dashboard')}>
              <PsychoCareLogo size={36} />
              <div>
                <div className="tlay-brand-name">PsychoCare</div>
                <div className="tlay-brand-sub">Therapist Portal</div>
              </div>
            </div>

            <div className="tlay-nav-divider" />

            <div className="tlay-nav-links">
              {NAV_LINKS.map(({ label, to, icon: Icon }) => (
                <button
                  key={to}
                  className={`tlay-nav-link${location.pathname === to ? ' active' : ''}`}
                  onClick={() => navigate(to)}
                >
                  <Icon size={13} />
                  {label}
                </button>
              ))}
            </div>

            <div className="tlay-nav-right">
              <div className="tlay-online-pill">
                <span className="tlay-online-dot" /> Online
              </div>

              <div className="tlay-icon-btn">
                <Bell size={15} />
              </div>

              <div className="tlay-profile-wrap">
                <button className="tlay-profile-btn" onClick={() => setProfileDropdown(v => !v)}>
                  <div className="tlay-avatar">
                    {(therapist?.firstName?.[0] || 'T').toUpperCase()}
                  </div>
                  <span className="tlay-profile-name">{therapist?.firstName || 'Therapist'}</span>
                  <ChevronDown size={13} style={{ opacity: 0.5 }} />
                </button>

                <AnimatePresence>
                  {profileDropdown && (
                    <motion.div
                      className="tlay-dropdown"
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                    >
                      <button className="tlay-dropdown-item" onClick={() => { navigate('/therapist/profile'); setProfileDropdown(false) }}>
                        <User size={14} /> My Profile
                      </button>
                      <button className="tlay-dropdown-item" onClick={() => { navigate('/therapist/prescriptions'); setProfileDropdown(false) }}>
                        <FileText size={14} /> Prescriptions
                      </button>
                      <div className="tlay-dropdown-sep" />
                      <button className="tlay-dropdown-item danger" onClick={() => { logout(); navigate('/therapist/login') }}>
                        <LogOut size={14} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button className="tlay-hamburger" onClick={() => setMobileMenuOpen(v => !v)}>
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="tlay-mobile-drawer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {NAV_LINKS.map(({ label, to, icon: Icon }) => (
                <button key={to} className="tlay-mobile-link" onClick={() => { navigate(to); setMobileMenuOpen(false) }}>
                  <Icon size={16} style={{ color: '#8BAF8E' }} />
                  {label}
                </button>
              ))}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '12px 0' }} />
              <button className="tlay-mobile-link" style={{ color: '#FF8080' }} onClick={() => { logout(); navigate('/therapist/login') }}>
                <LogOut size={16} style={{ color: '#FF8080' }} /> Sign Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Marquee */}
        <div className="tlay-marquee-wrap">
          <div className="tlay-marquee-track">
            {['Anxiety & Stress','Depression Support','Relationship Counseling','Trauma & PTSD','Marriage Therapy','Child Psychology','Anger Management','OCD & Phobias',
              'Anxiety & Stress','Depression Support','Relationship Counseling','Trauma & PTSD','Marriage Therapy','Child Psychology','Anger Management','OCD & Phobias'].map((item, i) => (
              <div className="tlay-marquee-item" key={i}><span className="tlay-marquee-dot" />{item}</div>
            ))}
          </div>
        </div>

        {/* Page Content */}
        <main className="tlay-main">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </>
  )
}