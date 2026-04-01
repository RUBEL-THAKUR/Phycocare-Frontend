import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { therapistApi } from '../../api'
import toast from 'react-hot-toast'
import { Calendar, CheckCircle2, XCircle, Clock, Video, MessageSquare, IndianRupee } from 'lucide-react'

const COLORS = {
  sage: "#8BAF8E",
  sageLight: "#B8D4BB",
  sageDark: "#4A7A52",
  cream: "#F5F0E8",
  warmWhite: "#FDFAF5",
  deep: "#1A1F2E",
  charcoal: "#3D4454",
  gold: "#C9A96E",
  muted: "#7A8090",
  bg: "#F8F5EF",
}

const TABS = ['ALL', 'UPCOMING', 'COMPLETED', 'CANCELLED_BY_USER', 'CANCELLED_BY_THERAPIST', 'EXPIRED']

const STATUS_CONFIG: Record<string, { bg: string; color: string; border: string; icon: any; label: string }> = {
  UPCOMING: {
    bg: 'rgba(107,125,191,0.08)',
    color: '#6B7DBF',
    border: 'rgba(107,125,191,0.25)',
    icon: Clock,
    label: 'Upcoming',
  },
  COMPLETED: {
    bg: 'rgba(74,122,82,0.08)',
    color: COLORS.sageDark,
    border: 'rgba(74,122,82,0.25)',
    icon: CheckCircle2,
    label: 'Completed',
  },
  CANCELLED_BY_USER: {
    bg: 'rgba(180,60,60,0.08)',
    color: '#B43C3C',
    border: 'rgba(180,60,60,0.2)',
    icon: XCircle,
    label: 'Cancelled by User',
  },
  CANCELLED_BY_THERAPIST: {
    bg: 'rgba(201,169,110,0.1)',
    color: COLORS.gold,
    border: 'rgba(201,169,110,0.3)',
    icon: XCircle,
    label: 'Cancelled by Therapist',
  },
  EXPIRED: {
    bg: 'rgba(122,128,144,0.08)',
    color: COLORS.muted,
    border: 'rgba(122,128,144,0.2)',
    icon: Clock,
    label: 'Expired',
  },
}

export default function TherapistSessions() {
  const [tab, setTab] = useState('ALL')
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [tab])

  async function load() {
    setLoading(true)
    try {
      const r = await therapistApi.getSessions(tab === 'ALL' ? undefined : tab)
      setSessions(r.data.data?.content || [])
    } finally {
      setLoading(false)
    }
  }

  async function complete(id: number) {
    try {
      await therapistApi.completeSession(id)
      toast.success('Marked as completed')
      load()
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}
    >
      <style>{`
        .ts-tab-btn {
          transition: all 0.25s ease;
          border: 1px solid transparent;
          cursor: pointer;
          font-family: inherit;
        }
        .ts-tab-btn:hover {
          background: rgba(139,175,142,0.12) !important;
          border-color: rgba(74,122,82,0.2) !important;
          color: ${COLORS.sageDark} !important;
        }
        .ts-session-card {
          transition: all 0.3s ease;
        }
        .ts-session-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(26,31,46,0.1) !important;
        }
        .ts-complete-btn {
          transition: all 0.25s ease;
          cursor: pointer;
          font-family: inherit;
        }
        .ts-complete-btn:hover {
          background: ${COLORS.sageDark} !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(74,122,82,0.3);
        }
      `}</style>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ marginBottom: 36, position: 'relative', textAlign: 'center' }}
      >
        <div style={{
          position: 'absolute', inset: '-20px -28px',
          background: 'radial-gradient(ellipse at 50% 60%, rgba(139,175,142,0.09) 0%, transparent 65%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          fontSize: 11, letterSpacing: 3, textTransform: 'uppercase',
          color: COLORS.sageDark, fontWeight: 500, marginBottom: 8
        }}>
          Session Management
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 36, fontWeight: 700, color: COLORS.deep,
          lineHeight: 1.1, marginBottom: 8
        }}>
          My <em style={{ fontStyle: 'italic', color: COLORS.sageDark }}>Sessions</em>
        </h1>
        <p style={{ fontSize: 15, color: COLORS.muted, fontWeight: 300 }}>
          Track and manage all your therapy appointments in one place.
        </p>
      </motion.div>

      {/* Tab Filters */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        style={{
          display: 'flex', gap: 8, flexWrap: 'wrap',
          justifyContent: 'center', marginBottom: 32
        }}
      >
        {TABS.map((t) => {
          const isActive = tab === t
          return (
            <button
              key={t}
              className="ts-tab-btn"
              onClick={() => setTab(t)}
              style={{
                padding: '8px 16px',
                borderRadius: 12,
                fontSize: 12,
                fontWeight: isActive ? 600 : 400,
                letterSpacing: isActive ? 0.3 : 0,
                background: isActive ? COLORS.sageDark : 'white',
                color: isActive ? 'white' : COLORS.charcoal,
                border: isActive
                  ? `1px solid ${COLORS.sageDark}`
                  : '1px solid rgba(26,31,46,0.1)',
                boxShadow: isActive ? '0 4px 14px rgba(74,122,82,0.25)' : 'none',
              }}
            >
              {t.replace(/_/g, ' ')}
            </button>
          )
        })}
      </motion.div>

      {/* Sessions List */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '80px 0' }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              border: `3px solid ${COLORS.sageLight}`,
              borderTopColor: COLORS.sageDark,
              animation: 'spin 0.9s linear infinite',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </motion.div>

        ) : sessions.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'white',
              borderRadius: 24,
              padding: '64px 40px',
              textAlign: 'center',
              border: '1px solid rgba(26,31,46,0.07)',
              boxShadow: '0 4px 20px rgba(26,31,46,0.05)',
            }}
          >
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(139,175,142,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <Calendar size={32} style={{ color: COLORS.sageLight }} />
            </div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22, fontWeight: 700,
              color: COLORS.deep, marginBottom: 8,
            }}>
              No sessions found
            </div>
            <p style={{ fontSize: 14, color: COLORS.muted, fontWeight: 300 }}>
              There are no sessions matching the selected filter.
            </p>
          </motion.div>

        ) : (
          <motion.div
            key="sessions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {sessions.map((s: any, i: number) => {
              const cfg = STATUS_CONFIG[s.status] || STATUS_CONFIG['EXPIRED']
              const StatusIcon = cfg.icon
              const ModeIcon = s.mode === 'VIDEO' ? Video : MessageSquare

              const scheduledDate = Array.isArray(s.scheduledAt)
                ? new Date(
                    s.scheduledAt[0], s.scheduledAt[1] - 1,
                    s.scheduledAt[2], s.scheduledAt[3] || 0, s.scheduledAt[4] || 0
                  ).toLocaleString('en-IN')
                : new Date(s.scheduledAt).toLocaleString('en-IN')

              return (
                <motion.div
                  key={s.id}
                  className="ts-session-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    background: 'white',
                    borderRadius: 20,
                    padding: '24px 28px',
                    border: '1px solid rgba(26,31,46,0.07)',
                    boxShadow: '0 4px 20px rgba(26,31,46,0.05)',
                  }}
                >
                  {/* Top row: badges + amount */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {/* Status Badge */}
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        padding: '5px 12px', borderRadius: 999,
                        fontSize: 11, fontWeight: 600,
                        background: cfg.bg, color: cfg.color,
                        border: `1px solid ${cfg.border}`,
                        letterSpacing: 0.3,
                      }}>
                        <StatusIcon size={11} />
                        {cfg.label}
                      </span>
                      {/* Mode Badge */}
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        padding: '5px 12px', borderRadius: 999,
                        fontSize: 11, fontWeight: 500,
                        background: 'rgba(139,175,142,0.1)',
                        color: COLORS.sageDark,
                        border: '1px solid rgba(139,175,142,0.25)',
                      }}>
                        <ModeIcon size={11} />
                        {s.mode}
                      </span>
                    </div>

                    {/* Amount */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 3,
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 22, fontWeight: 700, color: COLORS.deep,
                    }}>
                      <IndianRupee size={16} style={{ color: COLORS.muted, marginTop: 3 }} />
                      {s.amountPaid}
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, background: 'rgba(26,31,46,0.06)', marginBottom: 16 }} />

                  {/* Patient name + meta + button */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 18, fontWeight: 700,
                        color: COLORS.deep, marginBottom: 8,
                      }}>
                        {s.userName}
                      </div>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 16,
                        fontSize: 13, color: COLORS.muted, fontWeight: 300,
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <Calendar size={13} style={{ color: COLORS.sage }} />
                          {scheduledDate}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <Clock size={13} style={{ color: COLORS.sage }} />
                          {s.durationMinutes} min
                        </span>
                      </div>
                    </div>

                    {/* Mark Complete */}
                    {s.status === 'UPCOMING' && (
                      <button
                        className="ts-complete-btn"
                        onClick={() => complete(s.id)}
                        style={{
                          padding: '9px 20px',
                          borderRadius: 12,
                          background: COLORS.sageDark,
                          color: 'white',
                          fontSize: 13, fontWeight: 600,
                          border: 'none',
                          boxShadow: '0 4px 14px rgba(74,122,82,0.2)',
                        }}
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}