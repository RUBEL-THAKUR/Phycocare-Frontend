import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { userApi } from '../../api'
import toast from 'react-hot-toast'
import { Award, Copy, Calendar, ChevronDown, ChevronUp, Gift } from 'lucide-react'

export default function RewardsPage() {
  const [rewards, setRewards] = useState<any[]>([])
  const [expanded, setExpanded] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userApi
      .getRewards()
      .then((r) => setRewards(r.data.data || []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Rewards</h1>
        <p className="text-text-secondary">Exclusive offers for PsychoCare users</p>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-accent-purple/30 border-t-accent-purple rounded-full animate-spin" />
        </div>
      ) : rewards.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-16 text-center"
        >
          <Award className="w-16 h-16 mx-auto text-text-muted mb-4" />
          <p className="text-text-muted">No rewards available</p>
          <p className="text-sm text-text-muted mt-2">Check back later for exclusive offers</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((r: any, i: number) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card border-2 border-accent-gold/30 overflow-hidden"
            >
              {/* Header with discount */}
              <div className="bg-gradient-to-r from-accent-gold/20 to-yellow-500/10 p-4 border-b border-accent-gold/20">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white">{r.partnerName}</h3>
                    <p className="text-sm text-text-muted mt-1">{r.description}</p>
                  </div>
                  <span className="flex-shrink-0 bg-gradient-to-r from-accent-gold to-yellow-500 text-black text-sm font-bold px-3 py-1 rounded-lg">
                    Rs. {r.discountValue} OFF
                  </span>
                </div>
              </div>

              <div className="p-4">
                {/* Promo Code */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-dark-600/50 border border-white/10 mb-3">
                  <span className="font-mono font-bold text-lg text-gradient">{r.promoCode}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigator.clipboard.writeText(r.promoCode)
                      toast.success('Code copied!')
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-purple text-white text-xs font-medium"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </motion.button>
                </div>

                {/* Valid till */}
                {r.validTill && (
                  <div className="flex items-center gap-2 text-sm text-text-muted mb-3">
                    <Calendar className="w-4 h-4" />
                    Valid till: {new Date(r.validTill).toLocaleDateString()}
                  </div>
                )}

                {/* Terms toggle */}
                <button
                  onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                  className="flex items-center gap-1 text-sm text-accent-purple hover:text-accent-purple/80 transition-colors mb-3"
                >
                  {expanded === r.id ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Hide Terms
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      View Terms
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {expanded === r.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-text-muted mb-3 p-3 rounded-lg bg-dark-600/30"
                    >
                      {r.terms}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Claim button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-gold flex items-center justify-center gap-2 py-2.5"
                >
                  <Gift className="w-4 h-4" />
                  Claim Reward
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
