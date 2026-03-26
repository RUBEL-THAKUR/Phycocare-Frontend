import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { therapistApi } from '../../api'
import toast from 'react-hot-toast'
import { Calendar, CheckCircle2, XCircle, Clock, Video, MessageSquare, IndianRupee } from 'lucide-react'

const TABS = ['ALL', 'UPCOMING', 'COMPLETED', 'CANCELLED_BY_USER', 'CANCELLED_BY_THERAPIST', 'EXPIRED']

const SC: Record<string, { gradient: string; icon: any }> = {
  UPCOMING: { gradient: 'from-blue-500 to-cyan-500', icon: Clock },
  COMPLETED: { gradient: 'from-emerald-500 to-teal-500', icon: CheckCircle2 },
  CANCELLED_BY_USER: { gradient: 'from-red-500 to-rose-500', icon: XCircle },
  CANCELLED_BY_THERAPIST: { gradient: 'from-orange-500 to-amber-500', icon: XCircle },
  EXPIRED: { gradient: 'from-gray-500 to-slate-500', icon: Clock }
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
    } finally { setLoading(false) }
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
      className="space-y-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white"
      >
        My Sessions
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin"
      >
        {TABS.map((t, i) => (
          <motion.button
            key={t}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              tab === t
                ? 'bg-gradient-to-r from-neon-pink to-neon-purple text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
            }`}
          >
            {t.replace(/_/g, ' ')}
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 border-3 border-white/10 border-t-neon-pink rounded-full"
            />
          </motion.div>
        ) : sessions.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card p-16 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Calendar className="w-10 h-10 text-white/30" />
            </div>
            <p className="text-white/50 text-lg">No sessions found</p>
          </motion.div>
        ) : (
          <motion.div
            key="sessions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {sessions.map((s: any, i: number) => {
              const statusConfig = SC[s.status] || { gradient: 'from-gray-500 to-slate-500', icon: Clock }
              const StatusIcon = statusConfig.icon
              const ModeIcon = s.mode === 'VIDEO' ? Video : MessageSquare

              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-6 hover:bg-white/[0.08] transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${statusConfig.gradient} text-white`}>
                          <StatusIcon className="w-3 h-3" />
                          {s.status.replace(/_/g, ' ')}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70">
                          <ModeIcon className="w-3 h-3" />
                          {s.mode}
                        </span>
                      </div>

                      <div className="text-lg font-bold text-white">{s.userName}</div>

                      <div className="flex items-center gap-2 text-sm text-white/50">
                        <Calendar className="w-4 h-4" />
                        {Array.isArray(s.scheduledAt)
                          ? new Date(
                              s.scheduledAt[0],
                              s.scheduledAt[1] - 1,
                              s.scheduledAt[2],
                              s.scheduledAt[3] || 0,
                              s.scheduledAt[4] || 0
                            ).toLocaleString('en-IN')
                          : new Date(s.scheduledAt).toLocaleString('en-IN')}
                        <span className="text-white/30">|</span>
                        <Clock className="w-4 h-4" />
                        {s.durationMinutes} min
                      </div>
                    </div>

                    <div className="text-right space-y-3">
                      <div className="flex items-center justify-end gap-1 text-xl font-bold text-white">
                        <IndianRupee className="w-5 h-5" />
                        {s.amountPaid}
                      </div>

                      {s.status === 'UPCOMING' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => complete(s.id)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold"
                        >
                          Mark Complete
                        </motion.button>
                      )}
                    </div>
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
