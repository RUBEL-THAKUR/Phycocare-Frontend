import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import { therapistApi } from '../../api'
import { Calendar, Users, CheckCircle2, UserCircle, FileText, ArrowRight, Video } from 'lucide-react'

const COLORS = {
  sage: "#8BAF8E", sageLight: "#B8D4BB", sageDark: "#4A7A52",
  cream: "#F5F0E8", warmWhite: "#FDFAF5", deep: "#1A1F2E",
  charcoal: "#3D4454", gold: "#C9A96E", muted: "#7A8090", bg: "#F8F5EF",
}

export default function TherapistDashboard() {
  const { therapist } = useAuthStore()
  const navigate = useNavigate()
  const [stats, setStats] = useState({ total: 0, upcoming: 0, completed: 0 })

  useEffect(() => {
    therapistApi.getSessions().then(r => {
      const content: any[] = r.data.data?.content || []
      const total: number = r.data.data?.totalElements || 0
      setStats({
        total,
        upcoming: content.filter(s => s.status === 'UPCOMING').length,
        completed: content.filter(s => s.status === 'COMPLETED').length,
      })
    }).catch(() => {})
  }, [])

  const navCards = [
    { title: 'My Sessions', desc: 'View and manage your appointments', to: '/therapist/sessions', icon: Video, color: COLORS.sageDark, bg: 'rgba(74,122,82,0.1)' },
    { title: 'Profile & Onboarding', desc: 'Complete your therapist profile setup', to: '/therapist/profile', icon: UserCircle, color: '#6B7DBF', bg: 'rgba(107,125,191,0.1)' },
    { title: 'Prescriptions', desc: 'Issue and manage prescriptions', to: '/therapist/prescriptions', icon: FileText, color: COLORS.gold, bg: 'rgba(201,169,110,0.1)' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <style>{`
        .td-stat-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(26,31,46,0.1) !important; }
        .td-stat-card { transition: all 0.3s ease; }
        .td-nav-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(26,31,46,0.1) !important; border-color: var(--card-color) !important; }
        .td-nav-card:hover .td-card-title { color: var(--card-color); }
        .td-nav-card:hover .td-card-arrow { opacity: 1 !important; gap: 10px !important; }
        .td-nav-card { transition: all 0.3s cubic-bezier(0.25,0.46,0.45,0.94); cursor: pointer; }
      `}</style>

      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ marginBottom: 36, position: 'relative' }}
      >
        <div style={{ position: 'absolute', inset: '-20px -28px', background: 'radial-gradient(ellipse at 80% 50%, rgba(139,175,142,0.09) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: COLORS.sageDark, fontWeight: 500, marginBottom: 8 }}>
          Therapist Dashboard
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: COLORS.deep, lineHeight: 1.1, marginBottom: 8 }}>
          Welcome back, <em style={{ fontStyle: 'italic', color: COLORS.sageDark }}>{therapist?.firstName || 'Doctor'}</em>
        </h1>
        <p style={{ fontSize: 15, color: COLORS.muted, fontWeight: 300 }}>Here's an overview of your sessions and activity.</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 36 }}
      >
        {[
          { icon: Calendar, bg: 'rgba(74,122,82,0.1)', color: COLORS.sageDark, value: stats.total, label: 'Total Sessions' },
          { icon: Users, bg: 'rgba(107,125,191,0.1)', color: '#6B7DBF', value: stats.upcoming, label: 'Upcoming' },
          { icon: CheckCircle2, bg: 'rgba(74,122,82,0.08)', color: COLORS.sageDark, value: stats.completed, label: 'Completed' },
        ].map(({ icon: Icon, bg, color, value, label }) => (
          <div
            key={label}
            className="td-stat-card"
            style={{ background: 'white', borderRadius: 20, padding: '22px 24px', border: '1px solid rgba(26,31,46,0.07)', boxShadow: '0 4px 20px rgba(26,31,46,0.05)', display: 'flex', alignItems: 'center', gap: 16 }}
          >
            <div style={{ width: 52, height: 52, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={24} style={{ color }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: COLORS.deep, lineHeight: 1, marginBottom: 4 }}>{value}</div>
              <div style={{ fontSize: 13, color: COLORS.muted, fontWeight: 400 }}>{label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Section title */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: COLORS.deep }}>Quick Actions</div>
        <div style={{ fontSize: 13, color: COLORS.muted, fontWeight: 300 }}>Navigate to key areas</div>
      </div>

      {/* Nav Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}
      >
        {navCards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              className="td-nav-card"
              style={{ background: 'white', borderRadius: 22, padding: '28px 26px', border: '1px solid rgba(26,31,46,0.07)', boxShadow: '0 4px 20px rgba(26,31,46,0.05)', '--card-color': card.color } as React.CSSProperties}
              onClick={() => navigate(card.to)}
            >
              <div style={{ width: 52, height: 52, borderRadius: 16, background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Icon size={24} style={{ color: card.color }} />
              </div>
              <div className="td-card-title" style={{ fontSize: 17, fontWeight: 600, color: COLORS.deep, marginBottom: 6, fontFamily: "'Playfair Display', serif", transition: 'color 0.2s' }}>
                {card.title}
              </div>
              <div style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.6, fontWeight: 300, marginBottom: 20 }}>{card.desc}</div>
              <div className="td-card-arrow" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: COLORS.muted, opacity: 0.6, transition: 'all 0.25s' }}>
                Go to <ArrowRight size={12} />
              </div>
            </div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}