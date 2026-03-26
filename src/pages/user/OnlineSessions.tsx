import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { userApi } from '../../api'
import toast from 'react-hot-toast'
import { Calendar, Clock, X, ChevronLeft, ChevronRight, Video, MessageSquare, Phone } from 'lucide-react'

const TABS = ['ALL', 'UPCOMING', 'COMPLETED', 'CANCELLED_BY_USER', 'CANCELLED_BY_THERAPIST', 'EXPIRED']
const TAB_LABELS: Record<string, string> = {
  ALL: 'All',
  UPCOMING: 'Upcoming',
  COMPLETED: 'Completed',
  CANCELLED_BY_USER: 'Cancelled by Me',
  CANCELLED_BY_THERAPIST: 'Cancelled by Therapist',
  EXPIRED: 'Expired'
}

const STATUS_STYLES: Record<string, string> = {
  UPCOMING: 'bg-accent-blue/20 text-accent-blue border-accent-blue/30',
  COMPLETED: 'bg-green-500/20 text-green-400 border-green-500/30',
  CANCELLED_BY_USER: 'bg-red-500/20 text-red-400 border-red-500/30',
  CANCELLED_BY_THERAPIST: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  EXPIRED: 'bg-white/10 text-text-muted border-white/10',
  IN_PROGRESS: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
}

const MODE_ICONS: Record<string, React.ElementType> = {
  CHAT: MessageSquare,
  AUDIO: Phone,
  VIDEO: Video
}

export default function OnlineSessions() {
  const [tab, setTab] = useState('ALL')
  const [sessions, setSessions] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState<number | null>(null)

  useEffect(() => {
    load()
  }, [tab, page])

  async function load() {
    setLoading(true)
    try {
      const r = await userApi.getSessions(tab === 'ALL' ? undefined : tab, page)
      setSessions(r.data.data?.content || [])
      setTotalPages(r.data.data?.totalPages || 0)
    } finally {
      setLoading(false)
    }
  }

  async function cancel(id: number) {
    if (!confirm('Cancel this session? Amount will be refunded.')) return
    setCancelling(id)
    try {
      await userApi.cancelSession(id, 'Cancelled by user')
      toast.success('Cancelled & refunded')
      load()
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed')
    } finally {
      setCancelling(null)
    }
  }

  function fmt(dt: any) {
    if (!dt) return '-'
    const d = Array.isArray(dt)
      ? new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0)
      : new Date(dt)
    return d.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Online Sessions</h1>
        <p className="text-text-secondary">Manage your therapy sessions</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-6 overflow-x-auto pb-2"
      >
        {TABS.map((t) => (
          <motion.button
            key={t}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setTab(t)
              setPage(0)
            }}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              tab === t
                ? 'bg-gradient-primary text-white shadow-glow-sm'
                : 'bg-dark-500/50 text-text-secondary hover:text-white border border-white/10'
            }`}
          >
            {TAB_LABELS[t]}
          </motion.button>
        ))}
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center h-64"
          >
            <div className="w-8 h-8 border-2 border-accent-purple/30 border-t-accent-purple rounded-full animate-spin" />
          </motion.div>
        ) : sessions.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card p-16 text-center"
          >
            <Calendar className="w-16 h-16 mx-auto text-text-muted mb-4" />
            <p className="text-text-muted">No sessions found</p>
          </motion.div>
        ) : (
          <motion.div
            key="sessions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {sessions.map((s: any, i: number) => {
              const ModeIcon = MODE_ICONS[s.mode] || Video
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium border ${
                          STATUS_STYLES[s.status] || STATUS_STYLES.EXPIRED
                        }`}
                      >
                        {s.status.replace(/_/g, ' ')}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-white/5 text-text-secondary border border-white/10">
                        <ModeIcon className="w-3 h-3" />
                        {s.mode}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-lg">{s.therapistName}</h3>
                    <div className="flex items-center gap-4 mt-2 text-text-muted text-sm">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {fmt(s.scheduledAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {s.durationMinutes} min
                      </span>
                    </div>
                    {s.cancellationReason && (
                      <p className="mt-2 text-sm text-red-400">Reason: {s.cancellationReason}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">Rs. {s.amountPaid}</div>
                    </div>
                    {s.status === 'UPCOMING' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => cancel(s.id)}
                        disabled={cancelling === s.id}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors text-sm font-medium"
                      >
                        {cancelling === s.id ? (
                          <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                        ) : (
                          <>
                            <X className="w-4 h-4" />
                            Cancel
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-4 mt-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-500/50 border border-white/10 text-text-secondary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </motion.button>
          <span className="text-text-secondary text-sm">
            Page {page + 1} of {totalPages}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-500/50 border border-white/10 text-text-secondary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
