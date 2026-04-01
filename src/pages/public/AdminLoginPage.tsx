// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { adminApi } from '../../api'
// import { useAuthStore } from '../../store/authStore'
// import toast from 'react-hot-toast'
// import { Mail, Lock, ArrowRight } from 'lucide-react'
//
// function PsychoCareLogo({ size = 36 }: { size?: number }) {
//   return (
//     <svg viewBox="0 0 40 40" fill="none" width={size} height={size}>
//       <circle cx="20" cy="20" r="18" fill="#8BAF8E" opacity="0.25" />
//       <path d="M20 10 C14 10 10 14 10 19 C10 24 14 27 20 31 C26 27 30 24 30 19 C30 14 26 10 20 10Z" fill="#4A7A52" />
//       <circle cx="17" cy="18" r="2" fill="white" />
//       <circle cx="23" cy="18" r="2" fill="white" />
//       <path d="M15 24 Q20 28 25 24" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
//     </svg>
//   )
// }
//
// export default function AdminLoginPage() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)
//   const { setAdminAuth } = useAuthStore()
//   const navigate = useNavigate()
//
//   async function submit(e: React.FormEvent) {
//     e.preventDefault()
//     setLoading(true)
//     try {
//       const res = await adminApi.login({ email, password })
//       const d = res.data.data
//       setAdminAuth(d.token, d.name)
//       navigate('/admin/dashboard')
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || 'Login failed')
//     } finally {
//       setLoading(false)
//     }
//   }
//
//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//
//         .al-root {
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-family: 'DM Sans', sans-serif;
//           background: #F8F5EF;
//           position: relative;
//           overflow: hidden;
//           padding: 40px 24px;
//         }
//
//         .al-root::before {
//           content: '';
//           position: absolute;
//           width: 700px; height: 700px;
//           background: radial-gradient(ellipse, rgba(139,175,142,0.13) 0%, transparent 65%);
//           top: -200px; right: -200px;
//           pointer-events: none;
//         }
//         .al-root::after {
//           content: '';
//           position: absolute;
//           width: 500px; height: 500px;
//           background: radial-gradient(ellipse, rgba(201,169,110,0.08) 0%, transparent 65%);
//           bottom: -150px; left: -150px;
//           pointer-events: none;
//         }
//
//         .al-wrap {
//           position: relative;
//           z-index: 1;
//           width: 100%;
//           max-width: 420px;
//         }
//
//         /* Logo row */
//         .al-logo-row {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 12px;
//           margin-bottom: 10px;
//         }
//         .al-brand-name {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 30px;
//           font-weight: 600;
//           color: #1A1F2E;
//           line-height: 1;
//         }
//
//         .al-portal-tag {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 7px;
//           margin-bottom: 32px;
//         }
//         .al-portal-badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           padding: 5px 14px;
//           border-radius: 100px;
//           background: rgba(201,169,110,0.1);
//           border: 1px solid rgba(201,169,110,0.28);
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: 1.5px;
//           text-transform: uppercase;
//           color: #8A6020;
//         }
//         .al-portal-dot {
//           width: 6px; height: 6px;
//           border-radius: 50%;
//           background: #C9A96E;
//         }
//
//         /* Card */
//         .al-card {
//           background: white;
//           border-radius: 28px;
//           padding: 44px 40px;
//           border: 1px solid rgba(26,31,46,0.07);
//           box-shadow: 0 20px 60px rgba(26,31,46,0.08), 0 4px 16px rgba(26,31,46,0.04);
//         }
//
//         .al-title {
//           font-family: 'Playfair Display', serif;
//           font-size: 28px;
//           font-weight: 700;
//           color: #1A1F2E;
//           margin-bottom: 6px;
//         }
//         .al-sub {
//           font-size: 14px;
//           color: #7A8090;
//           font-weight: 300;
//           margin-bottom: 30px;
//           line-height: 1.6;
//         }
//
//         /* Field */
//         .al-field { margin-bottom: 18px; }
//         .al-label {
//           display: block;
//           font-size: 13px;
//           font-weight: 500;
//           color: #3D4454;
//           margin-bottom: 8px;
//           letter-spacing: 0.2px;
//         }
//         .al-input-wrap { position: relative; }
//         .al-icon {
//           position: absolute;
//           left: 14px; top: 50%;
//           transform: translateY(-50%);
//           color: #8BAF8E;
//           pointer-events: none;
//         }
//         .al-input {
//           width: 100%;
//           padding: 13px 16px 13px 44px;
//           border-radius: 12px;
//           border: 1.5px solid rgba(26,31,46,0.1);
//           background: #FDFAF5;
//           font-size: 14px;
//           color: #1A1F2E;
//           font-family: 'DM Sans', sans-serif;
//           transition: border-color 0.2s, box-shadow 0.2s;
//           outline: none;
//         }
//         .al-input::placeholder { color: #B0B5BF; }
//         .al-input:focus {
//           border-color: #C9A96E;
//           box-shadow: 0 0 0 3px rgba(201,169,110,0.12);
//         }
//
//         /* Button */
//         .al-btn {
//           width: 100%;
//           display: flex; align-items: center; justify-content: center; gap: 8px;
//           padding: 15px;
//           border-radius: 14px;
//           border: none;
//           background: #1A1F2E;
//           color: white;
//           font-size: 15px;
//           font-weight: 500;
//           font-family: 'DM Sans', sans-serif;
//           cursor: pointer;
//           transition: all 0.25s;
//           margin-top: 26px;
//           letter-spacing: 0.2px;
//         }
//         .al-btn:hover:not(:disabled) {
//           background: #8A6020;
//           box-shadow: 0 12px 30px rgba(201,169,110,0.25);
//           transform: translateY(-1px);
//         }
//         .al-btn:disabled { opacity: 0.6; cursor: not-allowed; }
//
//         .al-spinner {
//           width: 18px; height: 18px;
//           border: 2px solid rgba(255,255,255,0.25);
//           border-top-color: white;
//           border-radius: 50%;
//           animation: alSpin 0.7s linear infinite;
//         }
//         @keyframes alSpin { to { transform: rotate(360deg); } }
//
//         /* Security notice */
//         .al-notice {
//           margin-top: 28px;
//           padding-top: 24px;
//           border-top: 1px solid rgba(26,31,46,0.07);
//         }
//         .al-notice-box {
//           display: flex;
//           align-items: flex-start;
//           gap: 12px;
//           padding: 14px 16px;
//           border-radius: 14px;
//           background: rgba(201,169,110,0.06);
//           border: 1px solid rgba(201,169,110,0.2);
//         }
//         .al-notice-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
//         .al-notice-text {
//           font-size: 12px;
//           color: #7A8090;
//           line-height: 1.65;
//           font-weight: 300;
//         }
//
//         /* Trust strip */
//         .al-trust {
//           display: flex;
//           justify-content: center;
//           gap: 22px;
//           margin-top: 22px;
//           flex-wrap: wrap;
//         }
//         .al-trust-item {
//           display: flex; align-items: center; gap: 5px;
//           font-size: 12px;
//           color: #7A8090;
//         }
//       `}</style>
//
//       <div className="al-root">
//         <motion.div
//           className="al-wrap"
//           initial={{ opacity: 0, y: 22 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
//         >
//           {/* Logo */}
//           <div className="al-logo-row">
//             <PsychoCareLogo size={38} />
//             <span className="al-brand-name">PsychoCare</span>
//           </div>
//
//           {/* Admin badge */}
//           <div className="al-portal-tag">
//             <div className="al-portal-badge">
//               <span className="al-portal-dot" />
//               Admin Control Panel
//             </div>
//           </div>
//
//           {/* Card */}
//           <div className="al-card">
//             <div className="al-title">Admin <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Login</em></div>
//             <div className="al-sub">Restricted access — authorised personnel only.</div>
//
//             <form onSubmit={submit}>
//               <div className="al-field">
//                 <label className="al-label">Email Address</label>
//                 <div className="al-input-wrap">
//                   <Mail size={16} className="al-icon" />
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="admin@psychocare.com"
//                     required
//                     className="al-input"
//                   />
//                 </div>
//               </div>
//
//               <div className="al-field">
//                 <label className="al-label">Password</label>
//                 <div className="al-input-wrap">
//                   <Lock size={16} className="al-icon" />
//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Enter admin password"
//                     required
//                     className="al-input"
//                   />
//                 </div>
//               </div>
//
//               <motion.button
//                 type="submit"
//                 disabled={loading}
//                 className="al-btn"
//                 whileHover={{ scale: loading ? 1 : 1.015 }}
//                 whileTap={{ scale: loading ? 1 : 0.985 }}
//               >
//                 {loading
//                   ? <div className="al-spinner" />
//                   : <><span>Access Dashboard</span><ArrowRight size={16} /></>
//                 }
//               </motion.button>
//             </form>
//
//             <div className="al-notice">
//               <div className="al-notice-box">
//                 <span className="al-notice-icon">🔐</span>
//                 <p className="al-notice-text">
//                   This is a secure admin area. All login attempts are monitored and logged for security purposes.
//                 </p>
//               </div>
//             </div>
//           </div>
//
//           {/* Trust strip */}
//           <div className="al-trust">
//             {[['🔐', 'Encrypted'], ['📋', 'Audit Logged'], ['🛡️', 'Secure Access']].map(([icon, label]) => (
//               <div className="al-trust-item" key={label as string}><span>{icon}</span>{label}</div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </>
//   )
// }

// In 5 pages ko sirf responsive bnao inme responsiveness nahi ...... No UI changes ......... No Font Changes ........ Only add Responsiveness code in these files and give me the updated files// import { useState } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { adminApi } from '../../api'
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

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { setAdminAuth } = useAuthStore()
  const navigate = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await adminApi.login({ email, password })
      const d = res.data.data
      setAdminAuth(d.token, d.name)
      navigate('/admin/dashboard')
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

        .al-root {
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

        /* Responsive padding adjustments */
        @media (max-width: 768px) {
          .al-root {
            padding: 24px 16px;
          }
        }

        @media (max-width: 480px) {
          .al-root {
            padding: 16px 12px;
          }
        }

        .al-root::before {
          content: '';
          position: absolute;
          width: 700px; height: 700px;
          background: radial-gradient(ellipse, rgba(139,175,142,0.13) 0%, transparent 65%);
          top: -200px; right: -200px;
          pointer-events: none;
        }

        /* Responsive background gradient adjustments */
        @media (max-width: 768px) {
          .al-root::before {
            width: 500px;
            height: 500px;
            top: -150px;
            right: -150px;
          }
          .al-root::after {
            width: 400px;
            height: 400px;
            bottom: -120px;
            left: -120px;
          }
        }

        @media (max-width: 480px) {
          .al-root::before {
            width: 350px;
            height: 350px;
            top: -100px;
            right: -100px;
          }
          .al-root::after {
            width: 280px;
            height: 280px;
            bottom: -80px;
            left: -80px;
          }
        }

        .al-root::after {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          background: radial-gradient(ellipse, rgba(201,169,110,0.08) 0%, transparent 65%);
          bottom: -150px; left: -150px;
          pointer-events: none;
        }

        .al-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 420px;
        }

        /* Responsive max-width adjustments */
        @media (max-width: 480px) {
          .al-wrap {
            max-width: 100%;
          }
        }

        /* Logo row */
        .al-logo-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        /* Responsive logo row adjustments */
        @media (max-width: 480px) {
          .al-logo-row {
            gap: 8px;
            margin-bottom: 8px;
          }
        }

        .al-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 600;
          color: #1A1F2E;
          line-height: 1;
        }

        /* Responsive brand name */
        @media (max-width: 480px) {
          .al-brand-name {
            font-size: 26px;
          }
        }

        .al-portal-tag {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-bottom: 32px;
        }

        /* Responsive portal tag */
        @media (max-width: 480px) {
          .al-portal-tag {
            margin-bottom: 24px;
          }
        }

        .al-portal-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 100px;
          background: rgba(201,169,110,0.1);
          border: 1px solid rgba(201,169,110,0.28);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #8A6020;
        }

        /* Responsive badge */
        @media (max-width: 480px) {
          .al-portal-badge {
            padding: 4px 12px;
            font-size: 10px;
            letter-spacing: 1.2px;
          }
        }

        .al-portal-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #C9A96E;
        }

        /* Card */
        .al-card {
          background: white;
          border-radius: 28px;
          padding: 44px 40px;
          border: 1px solid rgba(26,31,46,0.07);
          box-shadow: 0 20px 60px rgba(26,31,46,0.08), 0 4px 16px rgba(26,31,46,0.04);
        }

        /* Responsive card padding */
        @media (max-width: 768px) {
          .al-card {
            padding: 36px 32px;
          }
        }

        @media (max-width: 480px) {
          .al-card {
            padding: 28px 20px;
            border-radius: 24px;
          }
        }

        .al-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #1A1F2E;
          margin-bottom: 6px;
        }

        /* Responsive title */
        @media (max-width: 480px) {
          .al-title {
            font-size: 24px;
          }
        }

        .al-sub {
          font-size: 14px;
          color: #7A8090;
          font-weight: 300;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        /* Responsive sub text */
        @media (max-width: 480px) {
          .al-sub {
            font-size: 13px;
            margin-bottom: 24px;
          }
        }

        /* Field */
        .al-field { margin-bottom: 18px; }

        /* Responsive field spacing */
        @media (max-width: 480px) {
          .al-field {
            margin-bottom: 16px;
          }
        }

        .al-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #3D4454;
          margin-bottom: 8px;
          letter-spacing: 0.2px;
        }

        /* Responsive label */
        @media (max-width: 480px) {
          .al-label {
            font-size: 12px;
            margin-bottom: 6px;
          }
        }

        .al-input-wrap { position: relative; }
        .al-icon {
          position: absolute;
          left: 14px; top: 50%;
          transform: translateY(-50%);
          color: #8BAF8E;
          pointer-events: none;
        }

        /* Responsive icon size */
        @media (max-width: 480px) {
          .al-icon {
            left: 12px;
          }
        }

        .al-input {
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

        /* Responsive input padding */
        @media (max-width: 480px) {
          .al-input {
            padding: 11px 14px 11px 38px;
            font-size: 13px;
          }
        }

        .al-input::placeholder { color: #B0B5BF; }
        .al-input:focus {
          border-color: #C9A96E;
          box-shadow: 0 0 0 3px rgba(201,169,110,0.12);
        }

        /* Button */
        .al-btn {
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

        /* Responsive button */
        @media (max-width: 480px) {
          .al-btn {
            padding: 13px;
            font-size: 14px;
            margin-top: 22px;
          }
        }

        .al-btn:hover:not(:disabled) {
          background: #8A6020;
          box-shadow: 0 12px 30px rgba(201,169,110,0.25);
          transform: translateY(-1px);
        }
        .al-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .al-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.25);
          border-top-color: white;
          border-radius: 50%;
          animation: alSpin 0.7s linear infinite;
        }
        @keyframes alSpin { to { transform: rotate(360deg); } }

        /* Security notice */
        .al-notice {
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid rgba(26,31,46,0.07);
        }

        /* Responsive notice spacing */
        @media (max-width: 480px) {
          .al-notice {
            margin-top: 24px;
            padding-top: 20px;
          }
        }

        .al-notice-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 14px;
          background: rgba(201,169,110,0.06);
          border: 1px solid rgba(201,169,110,0.2);
        }

        /* Responsive notice box */
        @media (max-width: 480px) {
          .al-notice-box {
            padding: 12px 14px;
            gap: 10px;
          }
        }

        .al-notice-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }

        /* Responsive notice icon */
        @media (max-width: 480px) {
          .al-notice-icon {
            font-size: 14px;
          }
        }

        .al-notice-text {
          font-size: 12px;
          color: #7A8090;
          line-height: 1.65;
          font-weight: 300;
        }

        /* Responsive notice text */
        @media (max-width: 480px) {
          .al-notice-text {
            font-size: 11px;
          }
        }

        /* Trust strip */
        .al-trust {
          display: flex;
          justify-content: center;
          gap: 22px;
          margin-top: 22px;
          flex-wrap: wrap;
        }

        /* Responsive trust strip */
        @media (max-width: 768px) {
          .al-trust {
            gap: 18px;
            margin-top: 20px;
          }
        }

        @media (max-width: 480px) {
          .al-trust {
            gap: 14px;
            margin-top: 18px;
          }
        }

        .al-trust-item {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px;
          color: #7A8090;
        }

        /* Responsive trust item */
        @media (max-width: 480px) {
          .al-trust-item {
            font-size: 11px;
            gap: 4px;
          }
        }
      `}</style>

      <div className="al-root">
        <motion.div
          className="al-wrap"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Logo */}
          <div className="al-logo-row">
            <PsychoCareLogo size={38} />
            <span className="al-brand-name">PsychoCare</span>
          </div>

          {/* Admin badge */}
          <div className="al-portal-tag">
            <div className="al-portal-badge">
              <span className="al-portal-dot" />
              Admin Control Panel
            </div>
          </div>

          {/* Card */}
          <div className="al-card">
            <div className="al-title">Admin <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Login</em></div>
            <div className="al-sub">Restricted access — authorised personnel only.</div>

            <form onSubmit={submit}>
              <div className="al-field">
                <label className="al-label">Email Address</label>
                <div className="al-input-wrap">
                  <Mail size={16} className="al-icon" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@psychocare.com"
                    required
                    className="al-input"
                  />
                </div>
              </div>

              <div className="al-field">
                <label className="al-label">Password</label>
                <div className="al-input-wrap">
                  <Lock size={16} className="al-icon" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    className="al-input"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="al-btn"
                whileHover={{ scale: loading ? 1 : 1.015 }}
                whileTap={{ scale: loading ? 1 : 0.985 }}
              >
                {loading
                  ? <div className="al-spinner" />
                  : <><span>Access Dashboard</span><ArrowRight size={16} /></>
                }
              </motion.button>
            </form>

            <div className="al-notice">
              <div className="al-notice-box">
                <span className="al-notice-icon">🔐</span>
                <p className="al-notice-text">
                  This is a secure admin area. All login attempts are monitored and logged for security purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div className="al-trust">
            {[['🔐', 'Encrypted'], ['📋', 'Audit Logged'], ['🛡️', 'Secure Access']].map(([icon, label]) => (
              <div className="al-trust-item" key={label as string}><span>{icon}</span>{label}</div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}