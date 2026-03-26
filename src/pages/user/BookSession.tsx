import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { publicApi, userApi } from '../../api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Search, Star, Clock, ArrowLeft, MessageSquare, Phone, Video, Calendar, ChevronRight } from 'lucide-react'

interface Therapist {
  id: string
  firstName: string
  lastName: string
  category?: string
  briefDescription?: string
  experience?: number
  rating: number
  totalSessions: number
  consultationFeeChat?: number
  consultationFeeAudio?: number
  consultationFeeVideo?: number
  specializations: string[]
}

const MODE_CONFIG = {
  CHAT: { label: 'Chat', icon: MessageSquare, color: 'from-accent-purple to-accent-blue' },
  AUDIO: { label: 'Audio Call', icon: Phone, color: 'from-accent-cyan to-accent-blue' },
  VIDEO: { label: 'Video Call', icon: Video, color: 'from-accent-pink to-accent-purple' }
}

export default function BookSession() {
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Therapist | null>(null)
  const [mode, setMode] = useState<'CHAT' | 'AUDIO' | 'VIDEO'>('CHAT')
  const [scheduledAt, setScheduledAt] = useState('')
  const [booking, setBooking] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    publicApi
      .listTherapists()
      .then((r) => setTherapists(r.data.data || []))
      .finally(() => setLoading(false))
  }, [])

  const filtered = therapists.filter(
    (t) =>
      !search ||
      `${t.firstName} ${t.lastName} ${t.category || ''} ${(t.specializations || []).join(' ')}`
        .toLowerCase()
        .includes(search.toLowerCase())
  )

  function fee(t: Therapist) {
    return mode === 'CHAT'
      ? t.consultationFeeChat
      : mode === 'AUDIO'
        ? t.consultationFeeAudio
        : t.consultationFeeVideo
  }

  async function book() {
    if (!scheduledAt) {
      toast.error('Select date and time')
      return
    }
    setBooking(true)
    try {
      await userApi.bookSession({
        therapistId: selected!.id,
        mode,
        scheduledAt: scheduledAt + ':00',
        durationMinutes: 60
      })
      toast.success('Session booked!')
      navigate('/user/sessions')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Booking failed')
    } finally {
      setBooking(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-accent-purple/30 border-t-accent-purple rounded-full animate-spin" />
      </div>
    )
  }

  if (selected) {
    const ModeIcon = MODE_CONFIG[mode].icon
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="max-w-lg"
      >
        <motion.button
          whileHover={{ x: -4 }}
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-accent-purple hover:text-accent-purple/80 mb-6 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to therapists
        </motion.button>

        <div className="glass-card p-6">
          {/* Therapist Info */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-white font-bold text-xl shadow-glow-sm">
              {selected.firstName[0]}
              {selected.lastName[0]}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {selected.firstName} {selected.lastName}
              </h2>
              <p className="text-accent-purple font-medium">{selected.category}</p>
              <div className="flex items-center gap-2 mt-1 text-text-muted text-sm">
                <Star className="w-4 h-4 text-accent-gold fill-accent-gold" />
                <span>{selected.rating.toFixed(1)}</span>
                <span className="text-white/20">|</span>
                <span>{selected.totalSessions} sessions</span>
              </div>
            </div>
          </div>

          {/* Session Mode */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-secondary mb-3">Session Mode</label>
            <div className="grid grid-cols-3 gap-3">
              {(['CHAT', 'AUDIO', 'VIDEO'] as const).map((m) => {
                const config = MODE_CONFIG[m]
                const Icon = config.icon
                const f =
                  m === 'CHAT'
                    ? selected.consultationFeeChat
                    : m === 'AUDIO'
                      ? selected.consultationFeeAudio
                      : selected.consultationFeeVideo

                return (
                  <motion.button
                    key={m}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMode(m)}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      mode === m
                        ? 'border-accent-purple bg-accent-purple/10'
                        : 'border-white/10 bg-dark-500/50 hover:border-white/20'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 mb-2 mx-auto ${mode === m ? 'text-accent-purple' : 'text-text-muted'}`}
                    />
                    <div className={`text-sm font-medium ${mode === m ? 'text-white' : 'text-text-secondary'}`}>
                      {config.label}
                    </div>
                    <div className={`text-xs mt-1 ${mode === m ? 'text-accent-purple' : 'text-text-muted'}`}>
                      Rs. {f || 'N/A'}
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Date & Time */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-secondary mb-2">Date & Time</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                className="input-field pl-12"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="glass-card p-4 mb-6 bg-dark-600/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-text-muted text-sm">Session fee</span>
              <span className="font-bold text-white">Rs. {fee(selected) || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted text-sm">Duration</span>
              <span className="text-white">60 minutes</span>
            </div>
          </div>

          {/* Book Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={book}
            disabled={booking || !scheduledAt}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {booking ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Confirm & Pay Rs. {fee(selected) || ''} <ChevronRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Book a Session</h1>
        <p className="text-text-secondary">Find the right therapist for you</p>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, category, specialization..."
            className="input-field pl-12"
          />
        </div>
      </motion.div>

      {/* Therapists Grid */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card p-16 text-center"
          >
            <div className="text-4xl mb-4">
              <Search className="w-12 h-12 mx-auto text-text-muted" />
            </div>
            <p className="text-text-muted">No therapists found</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="glass-card-hover p-5 cursor-pointer group"
                onClick={() => setSelected(t)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold shadow-glow-sm flex-shrink-0">
                    {t.firstName[0]}
                    {t.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white truncate">
                      {t.firstName} {t.lastName}
                    </h3>
                    <p className="text-accent-purple text-sm font-medium">{t.category}</p>
                    <div className="flex items-center gap-2 mt-1 text-text-muted text-xs">
                      <Star className="w-3 h-3 text-accent-gold fill-accent-gold" />
                      <span>{t.rating.toFixed(1)}</span>
                      <span className="text-white/20">|</span>
                      <Clock className="w-3 h-3" />
                      <span>{t.totalSessions} sessions</span>
                    </div>
                  </div>
                </div>

                {t.briefDescription && (
                  <p className="text-text-muted text-sm mb-3 line-clamp-2">{t.briefDescription}</p>
                )}

                {t.specializations?.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="inline-block bg-accent-purple/10 text-accent-purple text-xs px-2 py-1 rounded-lg mr-2 mb-2"
                  >
                    {s}
                  </span>
                ))}

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                  <div>
                    <div className="text-xs text-text-muted">Chat from</div>
                    <div className="font-bold text-white">Rs. {t.consultationFeeChat || 'N/A'}</div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary py-2 px-4 text-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelected(t)
                    }}
                  >
                    Book
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
