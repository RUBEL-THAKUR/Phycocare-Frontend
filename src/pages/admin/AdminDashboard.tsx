import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { adminApi } from '../../api'
import { Users, UserCheck, Clock, CheckCircle2, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const COLORS = {
  sage: "#8BAF8E", sageLight: "#B8D4BB", sageDark: "#4A7A52",
  cream: "#F5F0E8", warmWhite: "#FDFAF5", deep: "#1A1F2E",
  charcoal: "#3D4454", gold: "#C9A96E", goldLight: "#E8C98A",
  muted: "#7A8090", bg: "#F8F5EF",
}

const STAT_CONFIG = [
  { key: 'totalUsers', label: 'Total Users', icon: Users, color: '#6B7DBF', bg: 'rgba(107,125,191,0.1)' },
  { key: 'totalTherapists', label: 'Total Therapists', icon: UserCheck, color: COLORS.sageDark, bg: 'rgba(74,122,82,0.1)' },
  { key: 'pendingTherapists', label: 'Pending Approvals', icon: Clock, color: '#C9A96E', bg: 'rgba(201,169,110,0.1)' },
  { key: 'approvedTherapists', label: 'Approved Therapists', icon: CheckCircle2, color: COLORS.sageDark, bg: 'rgba(74,122,82,0.08)' },
  { key: 'totalSessions', label: 'Total Sessions', icon: Calendar, color: '#8A6020', bg: 'rgba(138,96,32,0.08)' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminApi.getStats().then(r => setStats(r.data.data)).finally(() => setLoading(false))
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <style>{`
        .ad-stat-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(26,31,46,0.1) !important; border-color: var(--stat-color) !important; }
        .ad-stat-card { transition: all 0.3s cubic-bezier(0.25,0.46,0.45,0.94); }
        .ad-spin { animation: adSpin 1s linear infinite; }
        @keyframes adSpin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ marginBottom: 36, position: 'relative' }}
      >
        <div style={{ position: 'absolute', inset: '-20px -28px', background: 'radial-gradient(ellipse at 80% 50%, rgba(201,169,110,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: COLORS.gold, fontWeight: 500, marginBottom: 8 }}>
          Control Panel
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: COLORS.deep, lineHeight: 1.1, marginBottom: 8 }}>
          Admin <em style={{ fontStyle: 'italic', color: COLORS.gold }}>Dashboard</em>
        </h1>
        <p style={{ fontSize: 15, color: COLORS.muted, fontWeight: 300 }}>Platform overview and live statistics.</p>
      </motion.div>

      {/* Loading */}
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
          <div className="ad-spin" style={{ width: 36, height: 36, border: `2px solid rgba(201,169,110,0.2)`, borderTopColor: COLORS.gold, borderRadius: '50%' }} />
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 36 }}
          >
            {STAT_CONFIG.map(({ key, label, icon: Icon, color, bg }, i) => (
              <motion.div
                key={key}
                className="ad-stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{ background: 'white', borderRadius: 22, padding: '26px 22px', border: '1px solid rgba(26,31,46,0.07)', boxShadow: '0 4px 20px rgba(26,31,46,0.05)', '--stat-color': color } as React.CSSProperties}
              >
                <div style={{ width: 50, height: 50, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 44, fontWeight: 600, color: COLORS.deep, lineHeight: 1, marginBottom: 6 }}>
                  {stats?.[key] ?? 0}
                </div>
                <div style={{ fontSize: 13, color: COLORS.muted, fontWeight: 400, lineHeight: 1.4 }}>{label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Summary section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: COLORS.deep }}>Platform Health</div>
              <div style={{ fontSize: 13, color: COLORS.muted, fontWeight: 300 }}>At a glance</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              {/* Approval rate */}
              <div style={{ background: 'white', borderRadius: 22, padding: '28px 28px', border: '1px solid rgba(26,31,46,0.07)', boxShadow: '0 4px 20px rgba(26,31,46,0.05)' }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: COLORS.muted, fontWeight: 600, marginBottom: 16 }}>Therapist Approval Rate</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 600, color: COLORS.sageDark, lineHeight: 1, marginBottom: 10 }}>
                  {stats?.totalTherapists > 0 ? Math.round((stats?.approvedTherapists / stats?.totalTherapists) * 100) : 0}%
                </div>
                <div style={{ height: 8, background: 'rgba(26,31,46,0.07)', borderRadius: 100, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 100,
                    background: `linear-gradient(90deg, ${COLORS.sage}, ${COLORS.sageDark})`,
                    width: `${stats?.totalTherapists > 0 ? Math.round((stats?.approvedTherapists / stats?.totalTherapists) * 100) : 0}%`,
                    transition: 'width 1s ease',
                  }} />
                </div>
                <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 10, fontWeight: 300 }}>
                  {stats?.approvedTherapists} approved out of {stats?.totalTherapists} total
                </div>
              </div>

              {/* Pending notice */}
              <div style={{ background: stats?.pendingTherapists > 0 ? 'rgba(201,169,110,0.06)' : 'white', borderRadius: 22, padding: '28px 28px', border: `1px solid ${stats?.pendingTherapists > 0 ? 'rgba(201,169,110,0.25)' : 'rgba(26,31,46,0.07)'}`, boxShadow: '0 4px 20px rgba(26,31,46,0.05)' }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: stats?.pendingTherapists > 0 ? '#8A6020' : COLORS.muted, fontWeight: 600, marginBottom: 16 }}>
                  Pending Actions
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 600, color: stats?.pendingTherapists > 0 ? COLORS.gold : COLORS.deep, lineHeight: 1, marginBottom: 10 }}>
                  {stats?.pendingTherapists ?? 0}
                </div>
                <div style={{ fontSize: 14, color: stats?.pendingTherapists > 0 ? '#8A6020' : COLORS.muted, fontWeight: stats?.pendingTherapists > 0 ? 500 : 300 }}>
                  {stats?.pendingTherapists > 0
                    ? `${stats.pendingTherapists} therapist${stats.pendingTherapists > 1 ? 's' : ''} awaiting your review`
                    : 'No pending approvals — all clear!'}
                </div>
                {stats?.pendingTherapists > 0 && (
                  <div style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 100, background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.28)', fontSize: 12, fontWeight: 500, color: '#8A6020', cursor: 'pointer' }}>
                    Review Now →
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}
