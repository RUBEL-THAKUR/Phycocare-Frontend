import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { userApi } from '../../api'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'
import { Gift, Copy, Users, Calendar, Check, Wallet, Award } from 'lucide-react'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
*, *::before, *::after { box-sizing: border-box; }

.re-page { max-width: 760px; margin: 0 auto; font-family:'DM Sans',sans-serif; }
.re-eyebrow { font-family:'Cormorant Garamond',serif; font-size:11px; letter-spacing:2.5px; text-transform:uppercase; color:#8BAF8E; margin-bottom:5px; }
.re-title   { font-family:'Playfair Display',serif; font-size:28px; font-weight:700; color:#1A1F2E; margin-bottom:4px; }
.re-sub     { font-size:13.5px; color:#7A8090; font-weight:300; margin-bottom:28px; }

/* Hero referral card */
.re-hero {
  background:#1A1F2E; border-radius:22px; padding:28px;
  margin-bottom:18px; position:relative; overflow:hidden;
}
.re-hero-g1 { position:absolute; width:220px; height:220px; background:radial-gradient(ellipse, rgba(139,175,142,0.15) 0%, transparent 65%); top:-60px; right:-60px; pointer-events:none; }
.re-hero-g2 { position:absolute; width:160px; height:160px; background:radial-gradient(ellipse, rgba(201,169,110,0.1) 0%, transparent 65%); bottom:-40px; left:-40px; pointer-events:none; }
.re-hero-inner { position:relative; z-index:1; }
.re-hero-head { display:flex; align-items:center; gap:12px; margin-bottom:20px; }
.re-hero-icon { width:44px; height:44px; border-radius:12px; background:rgba(201,169,110,0.15); border:1px solid rgba(201,169,110,0.25); display:flex; align-items:center; justify-content:center; }
.re-hero-lbl { font-size:11px; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,0.35); margin-bottom:2px; }
.re-hero-sub { font-size:10px; color:rgba(255,255,255,0.2); }
.re-code-row { display:flex; align-items:center; gap:16px; margin-bottom:14px; flex-wrap:wrap; }
.re-code { font-family:'Cormorant Garamond',serif; font-size:38px; font-weight:600; color:white; letter-spacing:4px; line-height:1; }
.re-copy-btn {
  display:flex; align-items:center; gap:7px; padding:9px 16px;
  border-radius:10px; border:1px solid rgba(201,169,110,0.3);
  background:rgba(201,169,110,0.1); color:#C9A96E;
  font-size:13px; font-weight:600; font-family:'DM Sans',sans-serif;
  cursor:pointer; transition:all 0.18s;
}
.re-copy-btn:hover { background:rgba(201,169,110,0.2); }
.re-hero-note { font-size:13px; color:rgba(255,255,255,0.35); }

/* Stats */
.re-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:18px; }
@media(max-width:550px){ .re-stats { grid-template-columns:1fr; } }
.re-stat { background:white; border-radius:18px; padding:20px; text-align:center; border:1px solid rgba(26,31,46,0.08); box-shadow:0 4px 16px rgba(26,31,46,0.05); }
.re-stat-icon { width:40px; height:40px; border-radius:11px; display:flex; align-items:center; justify-content:center; margin:0 auto 10px; }
.re-stat-val  { font-family:'Playfair Display',serif; font-size:24px; font-weight:700; color:#1A1F2E; }
.re-stat-lbl  { font-size:12px; color:#7A8090; margin-top:2px; }

/* History table */
.re-card { background:white; border-radius:22px; padding:26px; border:1px solid rgba(26,31,46,0.08); box-shadow:0 4px 20px rgba(26,31,46,0.06); }
.re-card-head { display:flex; align-items:center; gap:10px; margin-bottom:20px; }
.re-card-icon { width:40px; height:40px; border-radius:11px; display:flex; align-items:center; justify-content:center; background:rgba(201,169,110,0.1); }
.re-card-title { font-family:'Playfair Display',serif; font-size:17px; font-weight:700; color:#1A1F2E; }
.re-table { width:100%; border-collapse:collapse; }
.re-thead th { padding:10px 14px; text-align:left; font-size:11px; font-weight:600; color:#7A8090; letter-spacing:1px; text-transform:uppercase; border-bottom:1px solid rgba(26,31,46,0.08); }
.re-tr { border-bottom:1px solid rgba(26,31,46,0.05); transition:background 0.15s; }
.re-tr:hover { background:rgba(139,175,142,0.04); }
.re-td { padding:13px 14px; font-size:13.5px; color:#1A1F2E; }
.re-td.muted { color:#7A8090; }
.re-badge { display:inline-block; padding:3px 10px; border-radius:7px; font-size:12px; font-weight:600; }
.re-badge.yes { background:rgba(74,122,82,0.1); color:#4A7A52; border:1px solid rgba(74,122,82,0.2); }
.re-badge.no  { background:rgba(26,31,46,0.05); color:#7A8090; border:1px solid rgba(26,31,46,0.1); }
.re-empty { text-align:center; padding:50px 20px; color:#7A8090; font-size:13.5px; }
`

export default function ReferEarnPage() {
  const { user }             = useAuthStore()
  const [refs, setRefs]      = useState<any[]>([])
  const [copied, setCopied]  = useState(false)

  useEffect(() => {
    userApi.getReferrals().then((r) => setRefs(r.data.data?.content || []))
  }, [])

  function copyCode() {
    navigator.clipboard.writeText(user?.referralCode || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast.success('Referral code copied!')
  }

  const stats = [
    { label: 'Total Referrals',  value: refs.length,                                    icon: Users,    bg:'rgba(74,122,82,0.1)',   color:'#4A7A52'  },
    { label: 'Sessions Booked',  value: refs.filter(r => r.sessionBooked).length,        icon: Calendar, bg:'rgba(90,127,168,0.1)',  color:'#5A7FA8'  },
    { label: 'Credits Earned',   value: '₹' + refs.filter(r => r.creditIssued).length * 200, icon: Wallet,   bg:'rgba(201,169,110,0.1)',color:'#C9A96E' },
  ]

  return (
    <>
      <style>{CSS}</style>
      <div className="re-page">
        <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}>
          <div className="re-eyebrow">Earn Together</div>
          <div className="re-title">Refer & Earn</div>
          <div className="re-sub">Earn ₹200 for every friend who books their first session</div>
        </motion.div>

        {/* Referral Code Card */}
        <motion.div className="re-hero" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}>
          <div className="re-hero-g1" /><div className="re-hero-g2" />
          <div className="re-hero-inner">
            <div className="re-hero-head">
              <div className="re-hero-icon"><Gift size={20} color="#C9A96E" /></div>
              <div>
                <div className="re-hero-lbl">Your Referral Code</div>
                <div className="re-hero-sub">Share with friends & family</div>
              </div>
            </div>
            <div className="re-code-row">
              <div className="re-code">{user?.referralCode}</div>
              <button className="re-copy-btn" onClick={copyCode}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <div className="re-hero-note">When your friend signs up & books a session — you earn ₹200!</div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div className="re-stats" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}>
          {stats.map(s => {
            const Icon = s.icon
            return (
              <div key={s.label} className="re-stat">
                <div className="re-stat-icon" style={{ background: s.bg }}>
                  <Icon size={18} color={s.color} />
                </div>
                <div className="re-stat-val">{s.value}</div>
                <div className="re-stat-lbl">{s.label}</div>
              </div>
            )
          })}
        </motion.div>

        {/* History */}
        <motion.div className="re-card" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
          <div className="re-card-head">
            <div className="re-card-icon"><Award size={18} color="#C9A96E" /></div>
            <div className="re-card-title">Referral History</div>
          </div>
          {refs.length === 0 ? (
            <div className="re-empty"><Gift size={36} style={{ margin:'0 auto 12px', color:'#C0C5CE', display:'block' }} />No referrals yet. Share your code to start earning!</div>
          ) : (
            <div style={{ overflowX:'auto' }}>
              <table className="re-table">
                <thead className="re-thead"><tr><th>Used By</th><th>Date</th><th>Session</th><th>Credit</th></tr></thead>
                <tbody>
                  {refs.map((r: any, i: number) => (
                    <motion.tr key={r.id} className="re-tr" initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }} transition={{ delay: i * 0.03 }}>
                      <td className="re-td">{r.referredUser?.firstName} {r.referredUser?.lastName}</td>
                      <td className="re-td muted">{new Date(r.usedOn).toLocaleDateString()}</td>
                      <td className="re-td"><span className={`re-badge ${r.sessionBooked ? 'yes' : 'no'}`}>{r.sessionBooked ? 'Yes' : 'No'}</span></td>
                      <td className="re-td" style={{ fontWeight:700, color: r.creditIssued ? '#4A7A52' : '#7A8090' }}>
                        {r.creditIssued ? '+₹' + r.creditAmount : 'Pending'}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </>
  )
}